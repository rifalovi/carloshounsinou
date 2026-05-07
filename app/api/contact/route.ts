import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Carlos Hounsinou <contact@carloshounsinou.com>";
const TO = "contact@carloshounsinou.com";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      name?: string;
      email?: string;
      topic?: string;
      message?: string;
      project?: string;
      website?: string;
    };

    const { name, email, topic, message, project, website } = body;

    // Honeypot — bots fill hidden fields, real users don't
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email.trim(),
      subject: `Message depuis carloshounsinou.com · ${esc(name.trim())}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#0A1628;border-bottom:2px solid #B45309;padding-bottom:8px">
            Nouveau message depuis carloshounsinou.com
          </h2>
          <p><strong>De :</strong> ${esc(name.trim())} &lt;${esc(email.trim())}&gt;</p>
          ${project ? `<p><strong>Projet :</strong> ${esc(project)}</p>` : ""}
          ${topic ? `<p><strong>Thème :</strong> ${esc(topic)}</p>` : ""}
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
          <p><strong>Message :</strong></p>
          <p style="white-space:pre-wrap;line-height:1.6;color:#1F2937">${esc(message.trim())}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Échec de l'envoi" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Server error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
