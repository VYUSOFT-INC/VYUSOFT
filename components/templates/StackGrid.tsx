"use client";

import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";


type Props = {
    eyebrow: string;
    title: string;
    description?: string;
    items: string[];
};

const SECTION_STYLE: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    width: "100%",
    color: "var(--color-ink)",
    background: "var(--color-paper)",
    padding: "120px 0 140px",
};
const INNER_STYLE: React.CSSProperties = {
    width: "100%",
    maxWidth: 1480,
    margin: "0 auto",
    padding: "0 32px",
};
const PILLS_STYLE: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px 14px",
    margin: 0,
    padding: 0,
    listStyle: "none",
};
const PILL_STYLE: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "12px 22px",
    background: "var(--color-surface)",
    border: "1px solid var(--color-rule)",
    borderRadius: 999,
    fontFamily: "var(--font-sans)",
    fontSize: "0.9375rem",
    fontWeight: 500,
    letterSpacing: "-0.005em",
    color: "var(--color-ink)",
    transition:
        "transform 240ms cubic-bezier(0.16, 1, 0.3, 1), background 240ms cubic-bezier(0.32, 0.72, 0, 1), border-color 240ms cubic-bezier(0.32, 0.72, 0, 1)",
};
const HEADER_STYLE: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: 32,
    marginBottom: 64,
};

export function StackGrid({ eyebrow, title, description, items }: Props) {
    return (
        <section
            className="inner-light stack-grid"
            aria-labelledby="stack-grid-heading"
            data-theme="light"
            style={SECTION_STYLE}
        >
            <div style={INNER_STYLE}>
                <div style={HEADER_STYLE}>
                    <div>
                        <motion.p
                            className="inner-section-eyebrow"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.6, ease: slowBurn }}
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "var(--color-ink-low)",
                                margin: "0 0 24px",
                            }}
                        >
                            {eyebrow}
                        </motion.p>
                        <motion.h2
                            id="stack-grid-heading"
                            className="inner-section-headline"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.75, ease: slowBurn, delay: 0.08 }}
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontWeight: 540,
                                fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
                                lineHeight: 1.05,
                                letterSpacing: "-0.028em",
                                color: "var(--color-ink)",
                                margin: 0,
                                maxWidth: "22ch",
                            }}
                        >
                            {title}
                        </motion.h2>
                    </div>
                    {description && (
                        <motion.p
                            className="inner-section-body stack-grid-lede"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.7, ease: slowBurn, delay: 0.16 }}
                            style={{
                                fontSize: "1.0625rem",
                                lineHeight: 1.65,
                                color: "var(--color-ink-mid)",
                                margin: 0,
                                maxWidth: "50ch",
                            }}
                        >
                            {description}
                        </motion.p>
                    )}
                </div>

                <ul style={PILLS_STYLE}>
                    {items.map((label, i) => (
                        <motion.li
                            key={`${label}-${i}`}
                            className="stack-grid-pill"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{
                                duration: 0.55,
                                ease: slowBurn,
                                delay: 0.22 + i * 0.035,
                            }}
                            style={PILL_STYLE}
                        >
                            {label}
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
