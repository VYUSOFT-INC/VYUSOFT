"use client";

import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";
import type { RegulatoryFramework } from "@/lib/industryMeta";


type Props = {
    eyebrow: string;
    title: string;
    description?: string;
    frameworks: RegulatoryFramework[];
};

const SECTION_STYLE: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    width: "100%",
    color: "oklch(99% 0.005 80)",
    background: "transparent",
    padding: "120px 0 140px",
};
const INNER_STYLE: React.CSSProperties = {
    width: "100%",
    maxWidth: 1480,
    margin: "0 auto",
    padding: "0 32px",
};
const HEADER_STYLE: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: 32,
    marginBottom: 72,
};
const CARDS_GRID: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 20,
    margin: 0,
    padding: 0,
    listStyle: "none",
};
const CARD_STYLE: React.CSSProperties = {
    background: "oklch(99% 0.005 80 / 0.04)",
    backdropFilter: "blur(12px) saturate(140%)",
    WebkitBackdropFilter: "blur(12px) saturate(140%)",
    border: "1px solid oklch(99% 0.005 80 / 0.10)",
    borderRadius: 18,
    padding: "28px 26px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
};

export function RegulatoryGrid({ eyebrow, title, description, frameworks }: Props) {
    return (
        <section
            className="inner-dark regulatory-grid"
            aria-labelledby="regulatory-heading"
            data-theme="dark"
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
                                color: "oklch(99% 0.005 80 / 0.78)",
                                margin: "0 0 24px",
                            }}
                        >
                            {eyebrow}
                        </motion.p>
                        <motion.h2
                            id="regulatory-heading"
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
                                color: "oklch(99% 0.005 80)",
                                margin: 0,
                                maxWidth: "22ch",
                            }}
                        >
                            {title}
                        </motion.h2>
                    </div>
                    {description && (
                        <motion.p
                            className="inner-section-body"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.7, ease: slowBurn, delay: 0.16 }}
                            style={{
                                fontSize: "1.0625rem",
                                lineHeight: 1.65,
                                color: "oklch(99% 0.005 80 / 0.72)",
                                margin: 0,
                                maxWidth: "50ch",
                            }}
                        >
                            {description}
                        </motion.p>
                    )}
                </div>

                <ul style={CARDS_GRID}>
                    {frameworks.map((f, i) => (
                        <motion.li
                            key={`${f.label}-${i}`}
                            className="regulatory-card"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{
                                duration: 0.65,
                                ease: slowBurn,
                                delay: 0.22 + i * 0.05,
                            }}
                            style={CARD_STYLE}
                        >
                            <p
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.6875rem",
                                    fontWeight: 500,
                                    letterSpacing: "0.2em",
                                    color: "var(--accent, oklch(99% 0.005 80 / 0.55))",
                                    margin: "0 0 4px",
                                }}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </p>
                            <h3
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontWeight: 540,
                                    fontSize: "1.25rem",
                                    lineHeight: 1.15,
                                    letterSpacing: "-0.015em",
                                    color: "oklch(99% 0.005 80)",
                                    margin: 0,
                                }}
                            >
                                {f.label}
                            </h3>
                            <p
                                style={{
                                    fontSize: "0.9375rem",
                                    lineHeight: 1.55,
                                    color: "oklch(99% 0.005 80 / 0.7)",
                                    margin: 0,
                                }}
                            >
                                {f.scope}
                            </p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
