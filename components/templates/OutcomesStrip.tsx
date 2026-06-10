"use client";

import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";
import { NumeralCounter } from "@/components/ui/NumeralCounter";


export type Outcome = {
    figure: string;
    suffix?: string;
    label: string;
};

type Props = {
    eyebrow: string;
    title: string;
    description?: string;
    outcomes: Outcome[];
};

/* Inline structural styles — pinned here, not dependent on globals.css
   being recompiled by the dev server. Layout + card chrome locked. */
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
const CARDS_GRID: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
    margin: 0,
    padding: 0,
    listStyle: "none",
};
const CARD_STYLE: React.CSSProperties = {
    background: "oklch(99% 0.005 80 / 0.05)",
    backdropFilter: "blur(18px) saturate(140%)",
    WebkitBackdropFilter: "blur(18px) saturate(140%)",
    border: "1px solid oklch(99% 0.005 80 / 0.10)",
    borderRadius: 22,
    padding: "36px 32px 40px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
};

/**
 * OutcomesStrip — three-figure stat moment with NumeralCounter animation.
 * Used on service / industry detail pages + the index pages.
 */
export function OutcomesStrip({ eyebrow, title, description, outcomes }: Props) {
    return (
        <section
            className="inner-dark outcomes-strip"
            aria-labelledby="outcomes-heading"
            data-theme="dark"
            style={SECTION_STYLE}
        >
            <div style={INNER_STYLE}>
                <div className="outcomes-header" style={HEADER_STYLE}>
                    <div>
                        <motion.p
                            className="inner-section-eyebrow"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.6, ease: slowBurn }}
                            style={EYEBROW_STYLE}
                        >
                            {eyebrow}
                        </motion.p>
                        <motion.h2
                            id="outcomes-heading"
                            className="inner-section-headline"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.75, ease: slowBurn, delay: 0.08 }}
                            style={HEADLINE_STYLE}
                        >
                            {title}
                        </motion.h2>
                    </div>
                    {description && (
                        <motion.p
                            className="inner-section-body outcomes-lede"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.7, ease: slowBurn, delay: 0.16 }}
                            style={LEDE_STYLE}
                        >
                            {description}
                        </motion.p>
                    )}
                </div>

                <ol className="outcomes-cards" style={CARDS_GRID}>
                    {outcomes.map((o, i) => {
                        const numeric = parseInt(o.figure, 10);
                        const isNumeric =
                            !Number.isNaN(numeric) && String(numeric) === o.figure;
                        return (
                            <motion.li
                                key={`${o.label}-${i}`}
                                className="outcomes-card"
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10% 0px" }}
                                transition={{
                                    duration: 0.75,
                                    ease: slowBurn,
                                    delay: 0.22 + i * 0.08,
                                }}
                                style={CARD_STYLE}
                            >
                                <p style={CARD_NUM_STYLE}>
                                    {String(i + 1).padStart(2, "0")}
                                </p>
                                <p style={CARD_FIGURE_STYLE}>
                                    {isNumeric ? (
                                        <NumeralCounter
                                            to={numeric}
                                            durationMs={1100 + i * 120}
                                        />
                                    ) : (
                                        <span>{o.figure}</span>
                                    )}
                                    {o.suffix && (
                                        <span style={CARD_SUFFIX_STYLE}>{" "}{o.suffix}</span>
                                    )}
                                </p>
                                <p style={CARD_LABEL_STYLE}>{o.label}</p>
                            </motion.li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}

const HEADER_STYLE: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: 32,
    marginBottom: 72,
};

const EYEBROW_STYLE: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.75rem",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "oklch(99% 0.005 80 / 0.78)",
    margin: "0 0 24px",
};

const HEADLINE_STYLE: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontWeight: 540,
    fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
    lineHeight: 1.05,
    letterSpacing: "-0.028em",
    color: "oklch(99% 0.005 80)",
    margin: 0,
    maxWidth: "22ch",
};

const LEDE_STYLE: React.CSSProperties = {
    fontSize: "1.0625rem",
    lineHeight: 1.65,
    color: "oklch(99% 0.005 80 / 0.72)",
    margin: 0,
    maxWidth: "48ch",
};

const CARD_NUM_STYLE: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.6875rem",
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--accent, oklch(99% 0.005 80 / 0.55))",
    margin: 0,
};

const CARD_FIGURE_STYLE: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontWeight: 540,
    fontSize: "clamp(3rem, 5.5vw, 4.75rem)",
    lineHeight: 0.95,
    letterSpacing: "-0.035em",
    color: "oklch(99% 0.005 80)",
    margin: 0,
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: 6,
    fontFeatureSettings: '"tnum", "lnum"',
};

const CARD_SUFFIX_STYLE: React.CSSProperties = {
    fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
    fontWeight: 500,
    color: "oklch(99% 0.005 80 / 0.65)",
    letterSpacing: "-0.005em",
};

const CARD_LABEL_STYLE: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: "1rem",
    lineHeight: 1.55,
    color: "oklch(99% 0.005 80 / 0.78)",
    margin: 0,
    maxWidth: "32ch",
};
