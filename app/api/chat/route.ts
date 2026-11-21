import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";

// --- Maîtrise des coûts -----------------------------------------------------
// Les compteurs vivent en mémoire de l'instance serverless : ils sont remis à
// zéro à chaque démarrage à froid. Ils freinent les abus ordinaires ; la
// limite de dépense mensuelle fixée dans la console Anthropic reste le
// plafond dur.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const DAILY_LIMIT = 10;              // messages par adresse IP et par jour
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const BURST_WINDOW_MS = 60 * 1000;
const BURST_LIMIT_PER_IP = 4;        // messages par IP et par minute
const GLOBAL_LIMIT_PER_MINUTE = 30;  // messages toutes IP confondues, par instance
const MAX_MESSAGE_CHARS = 1200;      // taille d'un message utilisateur
const MAX_HISTORY_MESSAGES = 8;      // fenêtre d'historique envoyée au modèle
const MAX_HISTORY_CHARS = 5000;      // taille totale de l'historique
const MAX_BODY_BYTES = 20_000;       // taille brute du corps JSON
const MAX_OUTPUT_TOKENS = 700;

const burstMap = new Map<string, number[]>();
let globalWindowStart = Date.now();
let globalWindowCount = 0;

function checkBurst(ip: string): boolean {
  const now = Date.now();
  const times = (burstMap.get(ip) ?? []).filter((t) => now - t < BURST_WINDOW_MS);
  if (times.length >= BURST_LIMIT_PER_IP) {
    burstMap.set(ip, times);
    return false;
  }
  times.push(now);
  burstMap.set(ip, times);
  // Évite une croissance sans fin de la table sur une instance chaude.
  if (burstMap.size > 5000) burstMap.clear();
  return true;
}

function checkGlobal(): boolean {
  const now = Date.now();
  if (now - globalWindowStart > BURST_WINDOW_MS) {
    globalWindowStart = now;
    globalWindowCount = 0;
  }
  if (globalWindowCount >= GLOBAL_LIMIT_PER_MINUTE) return false;
  globalWindowCount++;
  return true;
}

/**
 * N'accepte que les appels émis depuis le site lui-même. Un en-tête Origin se
 * falsifie, mais ce contrôle écarte les scripts tiers et les réutilisations de
 * l'endpoint depuis d'autres sites, qui constituent l'essentiel des abus.
 */
function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin") ?? req.headers.get("referer");
  if (!origin) return false;
  let host: string;
  try {
    host = new URL(origin).hostname;
  } catch {
    return false;
  }
  if (host === "localhost" || host === "127.0.0.1") return true;
  const allowed = ["carloshounsinou.com"];
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site) {
    try { allowed.push(new URL(site).hostname); } catch { /* ignorée */ }
  }
  if (process.env.VERCEL_URL) allowed.push(process.env.VERCEL_URL);
  if (process.env.VERCEL_BRANCH_URL) allowed.push(process.env.VERCEL_BRANCH_URL);
  return allowed.some((a) => host === a || host.endsWith("." + a));
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + ONE_DAY_MS });
    return { allowed: true, remaining: DAILY_LIMIT - 1 };
  }

  if (entry.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: DAILY_LIMIT - entry.count };
}

const CHAT_MODEL = "claude-haiku-4-5";

type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * Nettoie l'historique reçu du client avant l'appel à l'API Anthropic.
 * L'API exige des rôles strictement alternés commençant par "user" : un
 * historique mal formé (deux messages "user" consécutifs après un échec, un
 * contenu vide, un rôle inconnu) provoque sinon une erreur 4xx transformée en
 * 500 côté client.
 */
function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];

  const cleaned: ChatMessage[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    // Un contenu trop long est tronqué plutôt que rejeté : l'historique
    // renvoyé par le client peut contenir de longues réponses de l'assistant.
    const text = content.trim().slice(0, MAX_MESSAGE_CHARS * 2);
    if (!text) continue;

    const last = cleaned[cleaned.length - 1];
    if (last && last.role === role) {
      // Fusionne les tours consécutifs de même rôle pour préserver l'alternance.
      last.content = `${last.content}\n\n${text}`;
    } else {
      cleaned.push({ role, content: text });
    }
  }

  // L'API impose que le premier message provienne de l'utilisateur.
  while (cleaned.length > 0 && cleaned[0].role === "assistant") cleaned.shift();
  return cleaned;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ error: "Origine non autorisée" }, { status: 403 });
    }

    if (!checkGlobal() || !checkBurst(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Patientez une minute avant de réessayer." },
        { status: 429 }
      );
    }

    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Requête trop volumineuse" }, { status: 413 });
    }

    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Limite quotidienne atteinte. Pour échanger directement avec Carlos, utilisez le formulaire Contact.",
          rateLimited: true,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const messages = sanitizeMessages(body?.messages);

    if (messages.length === 0) {
      return NextResponse.json({ error: "Messages requis" }, { status: 400 });
    }

    const lastUser = messages[messages.length - 1];
    if (lastUser.role !== "user" || lastUser.content.length > MAX_MESSAGE_CHARS) {
      return NextResponse.json(
        { error: `Message trop long (${MAX_MESSAGE_CHARS} caractères maximum).` },
        { status: 400 }
      );
    }

    // Fenêtre d'historique bornée en nombre de messages et en caractères.
    const recentMessages = messages.slice(-MAX_HISTORY_MESSAGES);
    let total = 0;
    for (let i = recentMessages.length - 1; i >= 0; i--) {
      total += recentMessages[i].content.length;
      if (total > MAX_HISTORY_CHARS) {
        recentMessages.splice(0, i + 1);
        break;
      }
    }
    // La fenêtre glissante peut débuter par un message assistant : on le retire
    // pour respecter la contrainte "premier message = utilisateur".
    while (recentMessages.length > 0 && recentMessages[0].role === "assistant") {
      recentMessages.shift();
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY manquante");
      return NextResponse.json(
        { error: "Service temporairement indisponible" },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY.trim() });

    const response = await anthropic.messages.create({
      model: CHAT_MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      // Le prompt système (~9 000 tokens) est mis en cache côté Anthropic :
      // les lectures suivantes coûtent un dixième du prix d'entrée.
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: recentMessages,
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const assistantMessage =
      textBlock?.type === "text" && textBlock.text.trim()
        ? textBlock.text
        : "Je n'ai pas pu générer de réponse. Reformulez votre question ou utilisez le formulaire Contact.";

    return NextResponse.json({
      message: assistantMessage,
      remaining: rateLimit.remaining,
    });
  } catch (error) {
    // Erreurs typées du SDK : on distingue un problème de configuration
    // (clé invalide, modèle inconnu) d'une saturation ou d'une panne passagère,
    // pour que le message affiché et les logs pointent vers la bonne cause.
    if (
      error instanceof Anthropic.AuthenticationError ||
      error instanceof Anthropic.PermissionDeniedError
    ) {
      console.error("Erreur API chat: clé ANTHROPIC_API_KEY refusée par l'API (", error.status, ")");
      return NextResponse.json(
        { error: "Service temporairement indisponible. Pour échanger avec Carlos, utilisez le formulaire Contact." },
        { status: 503 }
      );
    }
    if (error instanceof Anthropic.NotFoundError) {
      console.error("Erreur API chat: modèle introuvable", error.message);
      return NextResponse.json(
        { error: "Service temporairement indisponible. Pour échanger avec Carlos, utilisez le formulaire Contact." },
        { status: 503 }
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      console.error("Erreur API chat: limite de débit Anthropic atteinte");
      return NextResponse.json(
        { error: "Le service est saturé. Veuillez réessayer dans quelques instants." },
        { status: 429 }
      );
    }
    console.error("Erreur API chat:", error);
    return NextResponse.json(
      {
        error:
          "Une erreur est survenue. Veuillez réessayer ou utiliser le formulaire Contact.",
      },
      { status: 500 }
    );
  }
}

/**
 * Diagnostic de configuration (GET /api/chat) : vérifie, sans dépenser de
 * tokens ni exposer la clé, que ANTHROPIC_API_KEY est présente et acceptée par
 * l'API et que le modèle utilisé existe. Ne renvoie que des catégories d'état.
 */
let lastDiagnosticAt = 0;

export async function GET() {
  // Au plus un contrôle toutes les 10 secondes par instance.
  const now = Date.now();
  if (now - lastDiagnosticAt < 10_000) {
    return NextResponse.json({ status: "throttled" }, { status: 429 });
  }
  lastDiagnosticAt = now;

  const raw = process.env.ANTHROPIC_API_KEY;
  if (!raw || !raw.trim()) {
    return NextResponse.json(
      { status: "missing_key", detail: "ANTHROPIC_API_KEY absente de l'environnement Vercel" },
      { status: 503 }
    );
  }
  const key = raw.trim();
  const shape = key.startsWith("sk-ant-") ? "ok" : "unexpected_prefix";
  try {
    const anthropic = new Anthropic({ apiKey: key });
    const model = await anthropic.models.retrieve(CHAT_MODEL);
    return NextResponse.json({ status: "ok", keyShape: shape, keyLength: key.length, model: model.id });
  } catch (error) {
    const status =
      error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError
        ? "invalid_key"
        : error instanceof Anthropic.NotFoundError
          ? "model_not_found"
          : "api_error";
    const httpStatus = error instanceof Anthropic.APIError ? error.status : undefined;
    console.error("Diagnostic chat:", status, httpStatus, error instanceof Error ? error.message : error);
    return NextResponse.json({ status, keyShape: shape, keyLength: key.length, httpStatus }, { status: 503 });
  }
}
