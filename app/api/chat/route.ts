import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const DAILY_LIMIT = 10;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

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
    const text = content.trim();
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

    const recentMessages = messages.slice(-10);
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

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
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
