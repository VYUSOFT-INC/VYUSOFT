"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type FormState = { ok: boolean; error?: string; ref?: string };

export async function sendContactForm(
    _prev: FormState,
    formData: FormData,
): Promise<FormState> {
    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || "Not provided";
    const company = (formData.get("company") as string) || "Not provided";
    const service = (formData.get("service") as string) || "Not specified";
    const message = formData.get("message") as string;

    if (!firstName || !email || !message) {
        return { ok: false, error: "Required fields missing." };
    }

    const ref = (
        Math.random().toString(36).slice(2, 8) +
        Date.now().toString(36)
    )
        .slice(0, 9)
        .toUpperCase();

    const body = `
New contact dispatch — #${ref}

Name:       ${firstName} ${lastName}
Email:      ${email}
Phone:      ${phone}
Company:    ${company}
Service:    ${service}

Brief:
${message}
`.trim();

    try {
        await resend.emails.send({
            from: "VyuSoft Contact <onboarding@resend.dev>",
            to: ["sales@vyusoft.com"],
            replyTo: email,
            subject: `New dispatch #${ref} — ${firstName} ${lastName}`,
            text: body,
        });
    } catch (e) {
        console.error("Resend error:", e);
        return { ok: false, error: "Failed to send. Please email us directly." };
    }

    return { ok: true, ref };
}
