"use server";

import nodemailer from "nodemailer";

type FormState = { ok: boolean; error?: string; ref?: string };

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
    },
});

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
        await transporter.sendMail({
            from: `"VyuSoft Contact" <${process.env.ZOHO_USER}>`,
            to: "business@vyusoft.com",
            replyTo: email,
            subject: `New dispatch #${ref} — ${firstName} ${lastName}`,
            text: body,
        });
    } catch (e) {
        console.error("Zoho SMTP error:", e);
        return { ok: false, error: "Failed to send. Please email us directly at business@vyusoft.com." };
    }

    return { ok: true, ref };
}
