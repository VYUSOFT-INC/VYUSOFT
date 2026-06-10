"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";


export type RelatedItem = {
    slug: string;
    title: string;
    href: string;
    subtitle?: string;
    description?: string;
};

type Props = {
    eyebrow: string;
    title: string;
    description?: string;
    items: RelatedItem[];
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
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24,
};
const CARD_STYLE: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    padding: "36px 32px",
    background: "oklch(99% 0.005 80 / 0.04)",
    backdropFilter: "blur(14px) saturate(140%)",
    WebkitBackdropFilter: "blur(14px) saturate(140%)",
    border: "1px solid oklch(99% 0.005 80 / 0.10)",
    borderRadius: 22,
    color: "oklch(99% 0.005 80)",
    minHeight: 220,
    overflow: "hidden",
    textDecoration: "none",
};
const ARROW_WRAP: React.CSSProperties = {
    position: "absolute",
    top: 28,
    right: 28,
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "oklch(99% 0.005 80 / 0.10)",
    color: "oklch(99% 0.005 80)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

export function RelatedCards({ eyebrow, title, description, items }: Props) {
    if (items.length === 0) return null;

    return (
        <section
            className="inner-dark related-cards"
            aria-labelledby="related-heading"
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
                            id="related-heading"
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

                <div style={CARDS_GRID}>
                    {items.map((item, i) => (
                        <motion.div
                            key={item.slug}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{
                                duration: 0.7,
                                ease: slowBurn,
                                delay: 0.22 + i * 0.07,
                            }}
                        >
                            <Link href={item.href} style={CARD_STYLE} className="related-card">
                                {item.subtitle && (
                                    <p
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.6875rem",
                                            fontWeight: 500,
                                            letterSpacing: "0.2em",
                                            textTransform: "uppercase",
                                            color: "var(--accent, oklch(99% 0.005 80 / 0.55))",
                                            margin: 0,
                                        }}
                                    >
                                        {item.subtitle}
                                    </p>
                                )}
                                <h3
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontWeight: 540,
                                        fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)",
                                        lineHeight: 1.1,
                                        letterSpacing: "-0.02em",
                                        color: "oklch(99% 0.005 80)",
                                        margin: 0,
                                        maxWidth: "16ch",
                                    }}
                                >
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p className="related-card-desc">{item.description}</p>
                                )}
                                <span style={ARROW_WRAP} aria-hidden="true">
                                    <ArrowUpRight
                                        strokeWidth={1.5}
                                        style={{ width: 16, height: 16 }}
                                    />
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
