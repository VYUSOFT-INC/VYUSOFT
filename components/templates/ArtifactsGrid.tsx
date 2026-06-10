"use client";

import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";
import { FileText } from "lucide-react";
import type { Artifact } from "@/lib/developmentMeta";


type Props = {
    eyebrow: string;
    title: string;
    description?: string;
    artifacts: Artifact[];
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
    background: "var(--color-surface)",
    border: "1px solid var(--color-rule)",
    borderRadius: 18,
    padding: "28px 26px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
};
const ICON_WRAP_STYLE: React.CSSProperties = {
    width: 42,
    height: 42,
    borderRadius: 12,
    background: "var(--color-paper-deep)",
    color: "var(--color-ink)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
};

export function ArtifactsGrid({ eyebrow, title, description, artifacts }: Props) {
    return (
        <section
            className="inner-light artifacts-grid"
            aria-labelledby="artifacts-heading"
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
                            id="artifacts-heading"
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
                            className="inner-section-body"
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

                <ul style={CARDS_GRID}>
                    {artifacts.map((a, i) => (
                        <motion.li
                            key={`${a.title}-${i}`}
                            className="artifact-card"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{
                                duration: 0.65,
                                ease: slowBurn,
                                delay: 0.22 + i * 0.06,
                            }}
                            style={CARD_STYLE}
                        >
                            <div style={ICON_WRAP_STYLE} aria-hidden="true">
                                <FileText
                                    strokeWidth={1.25}
                                    style={{ width: 18, height: 18 }}
                                />
                            </div>
                            <h3
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontWeight: 540,
                                    fontSize: "1.125rem",
                                    lineHeight: 1.2,
                                    letterSpacing: "-0.015em",
                                    color: "var(--color-ink)",
                                    margin: 0,
                                }}
                            >
                                {a.title}
                            </h3>
                            <p
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.6875rem",
                                    fontWeight: 500,
                                    letterSpacing: "0.16em",
                                    textTransform: "uppercase",
                                    color: "var(--color-ink-low)",
                                    margin: 0,
                                }}
                            >
                                {a.kind}
                            </p>
                            <p
                                style={{
                                    fontSize: "0.9375rem",
                                    lineHeight: 1.55,
                                    color: "var(--color-ink-mid)",
                                    margin: 0,
                                }}
                            >
                                {a.description}
                            </p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
