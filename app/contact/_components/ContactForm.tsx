"use client";

import { useEffect, useRef, useState, useActionState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { stampReveal, easeSlowBurn } from "@/lib/motion";
import { sendContactForm } from "../action";

const PREFILL_KEY = "vyu:contact-prefill";

const services = [
    { value: "ai", label: "Artificial Intelligence" },
    { value: "cybersecurity", label: "Cyber Security" },
    { value: "cloud", label: "Cloud Solutions" },
    { value: "data", label: "Data and Analytics" },
    { value: "consulting", label: "Consulting" },
    { value: "devops", label: "DevOps" },
    { value: "product", label: "Product Engineering" },
    { value: "other", label: "Something else" },
];

/**
 * Contact form, rendered as a technical drawing.
 * Mono field labels with `+ FIELD 01 / NAME` ordinals; success state is a
 * hairline dispatch stamp instead of a generic toast.
 */
export function ContactForm() {
    const [state, formAction, isPending] = useActionState(sendContactForm, { ok: false });
    const [sent, setSent] = useState(false);
    const [prefill, setPrefill] = useState<string>("");
    const messageRef = useRef<HTMLTextAreaElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);

    const submitted = sent;
    const ref = state.ref ?? "";

    useEffect(() => {
        if (state.ok) setSent(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.ok]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const stored = sessionStorage.getItem(PREFILL_KEY);
            if (stored) {
                setPrefill(stored);
                sessionStorage.removeItem(PREFILL_KEY);
                requestAnimationFrame(() => {
                    if (messageRef.current) {
                        messageRef.current.value = stored;
                        messageRef.current.focus();
                        const len = messageRef.current.value.length;
                        messageRef.current.setSelectionRange(len, len);
                    }
                });
            }
        } catch {
            /* storage may be disabled; no-op */
        }
    }, []);

    return (
        <div>
            <AnimatePresence mode="wait">
                {!submitted ? (
                    <motion.form
                        key="form"
                        ref={formRef}
                        action={formAction}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25, ease: easeSlowBurn }}
                        className="flex flex-col gap-7"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                            <Field id="first-name" label="First name" placeholder="Ada" required />
                            <Field id="last-name" label="Last name" placeholder="Lovelace" required />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                            <Field id="email" label="Work email" type="email" placeholder="ada@example.com" required />
                            <Field id="phone" label="Phone" type="tel" placeholder="+1 (555) 010-9999" />
                        </div>
                        <Field id="company" label="Company" placeholder="Your company" />

                        <div>
                            <Label label="Discipline of interest" htmlFor="service" />
                            <select
                                id="service"
                                name="service"
                                className="field appearance-none cursor-pointer"
                                defaultValue=""
                                style={{
                                    backgroundImage:
                                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%235A5A66' stroke-width='1.5' fill='none'/></svg>\")",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 16px center",
                                    paddingRight: 40,
                                }}
                            >
                                <option value="">Select a discipline</option>
                                {services.map((s) => (
                                    <option key={s.value} value={s.value}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label label="Brief" htmlFor="message" />
                            <textarea
                                ref={messageRef}
                                id="message"
                                name="message"
                                rows={5}
                                required
                                defaultValue={prefill}
                                placeholder="One paragraph is enough. What is the problem, what have you tried, what would good look like."
                                className="field resize-none"
                            />
                            <p
                                className="t-mono-micro mt-2"
                                style={{ color: "var(--color-ink-low)" }}
                            >
                                ↔ MIN 1 PARAGRAPH · NO NDA REQUIRED YET
                            </p>
                        </div>

                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="consent"
                                name="consent"
                                required
                                className="mt-1.5 accent-[color:var(--accent)]"
                            />
                            <label
                                htmlFor="consent"
                                className="t-body-sm"
                                style={{ color: "var(--color-ink-mid)" }}
                            >
                                I agree to receive a response. View our{" "}
                                <a
                                    href="/privacy"
                                    className="link-inline"
                                    style={{ color: "var(--color-ink)" }}
                                >
                                    privacy policy
                                </a>
                                .
                            </label>
                        </div>

                        {state.error && (
                            <p className="t-body-sm" style={{ color: "oklch(0.65 0.2 25)" }}>
                                {state.error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="btn-primary self-start"
                            style={{ opacity: isPending ? 0.6 : 1 }}
                        >
                            {isPending ? "Sending…" : "Dispatch the brief"}
                            {!isPending && <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />}
                        </button>
                    </motion.form>
                ) : (
                    <motion.div
                        key="stamp"
                        variants={stampReveal}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0 }}
                        className="relative"
                    >
                        <div
                            className="border p-10 lg:p-14 relative"
                            style={{
                                borderColor: "var(--color-rule)",
                                background: "var(--color-surface)",
                            }}
                        >
                            <div className="flex items-start gap-5 mb-8">
                                <span
                                    className="w-10 h-10 border flex items-center justify-center rounded-full"
                                    style={{
                                        borderColor: "var(--accent)",
                                        color: "var(--accent)",
                                    }}
                                >
                                    <Check className="w-4 h-4" strokeWidth={2} />
                                </span>
                                <div>
                                    <span
                                        className="t-mono-label block mb-2"
                                        style={{ color: "var(--accent)" }}
                                    >
                                        DISPATCHED · {new Date().toUTCString().slice(17, 25)} UTC
                                    </span>
                                    <h3
                                        className="t-display-2"
                                        style={{ color: "var(--color-ink)" }}
                                    >
                                        Brief received.
                                    </h3>
                                </div>
                            </div>
                            <p
                                className="t-body-lg max-w-[42ch]"
                                style={{ color: "var(--color-ink-mid)" }}
                            >
                                A principal engineer will respond personally within one
                                business day. Reference{" "}
                                <span
                                    className="t-mono-label"
                                    style={{ color: "var(--color-ink)" }}
                                >
                                    #{ref}
                                </span>
                                .
                            </p>
                            <button
                                type="button"
                                onClick={() => setSent(false)}
                                className="t-body-sm link-inline mt-8 inline-block"
                                style={{ color: "var(--color-ink)" }}
                            >
                                Send another
                            </button>

                            {/* SVG corner crosshairs for the stamp feel */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                aria-hidden="true"
                            >
                                <g
                                    stroke="var(--accent)"
                                    strokeWidth="1"
                                    opacity="0.4"
                                >
                                    <line x1="0" y1="0" x2="0" y2="14" />
                                    <line x1="0" y1="0" x2="14" y2="0" />
                                    <line x1="100%" y1="0" x2="100%" y2="14" transform="translate(-1)" />
                                    <line x1="100%" y1="0" x2="-14" y2="0" transform="translate(0)" />
                                </g>
                            </svg>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Label({
    label,
    htmlFor,
}: {
    label: string;
    htmlFor: string;
}) {
    return (
        <label htmlFor={htmlFor} className="flex items-baseline gap-2 mb-3">
            <span
                className="t-body-sm"
                style={{ color: "var(--color-ink)", fontWeight: 500 }}
            >
                {label}
            </span>
        </label>
    );
}

function Field({
    id,
    label,
    type = "text",
    placeholder,
    required = false,
}: {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
}) {
    return (
        <div>
            <Label label={label} htmlFor={id} />
            <input
                type={type}
                id={id}
                name={id}
                required={required}
                placeholder={placeholder}
                className="field"
            />
        </div>
    );
}
