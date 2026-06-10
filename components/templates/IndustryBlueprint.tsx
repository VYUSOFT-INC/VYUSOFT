"use client";

import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";

type Solution = { slug: string; title: string };

type Props = {
    industry: string;
    solutions: Solution[];
    /** Hex accent for the spine + node + lowercase italic anchor. */
    accent?: string;
};


/**
 * IndustryBlueprint — schematic stack diagram per industry, sized to sit as
 * the right-column `aside` in PageHero on dark transparent backdrop. Four
 * horizontal tiers (Engagement, Data, Core, Infrastructure) with the
 * industry's top four solutions populating the tier titles, a coloured
 * spine connecting them, and the industry name in Fraunces italic at the
 * bottom as the anchor.
 *
 * Reworked for the PeachWeb dark canvas: translucent white strokes/text,
 * accent only on the spine + the centre node + the anchor wordmark.
 */
export function IndustryBlueprint({ industry, solutions, accent }: Props) {
    const localStyle = accent
        ? ({ "--accent": accent } as React.CSSProperties)
        : undefined;
    const four = solutions.slice(0, 4);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: slowBurn, delay: 0.3 }}
            className="industry-blueprint"
            style={localStyle}
        >
            <svg viewBox="0 0 460 488" className="industry-blueprint-svg" aria-hidden="true">
                {/* Frame */}
                <rect
                    x="0.5"
                    y="0.5"
                    width="459"
                    height="487"
                    fill="none"
                    stroke="rgba(255,255,255,0.14)"
                    strokeDasharray="3 3"
                />
                <text
                    x="14"
                    y="22"
                    fontFamily="var(--font-mono)"
                    fontSize="10"
                    letterSpacing="0.16em"
                    fill="rgba(255,255,255,0.5)"
                >
                    BLUEPRINT / {industry.toUpperCase()}
                </text>
                <text
                    x="446"
                    y="22"
                    textAnchor="end"
                    fontFamily="var(--font-mono)"
                    fontSize="10"
                    letterSpacing="0.16em"
                    fill="rgba(255,255,255,0.5)"
                >
                    REV.01
                </text>

                {/* Tiers */}
                {[
                    { y: 70, label: "ENGAGEMENT", count: "01" },
                    { y: 170, label: "DATA PLANE", count: "02" },
                    { y: 270, label: "CORE SYSTEMS", count: "03" },
                    { y: 370, label: "INFRASTRUCTURE", count: "04" },
                ].map((t, i) => (
                    <g key={t.label}>
                        <motion.rect
                            x="40"
                            y={t.y}
                            width="380"
                            height="60"
                            fill="none"
                            stroke="rgba(255,255,255,0.32)"
                            strokeWidth="1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                ease: slowBurn,
                                delay: 0.6 + i * 0.1,
                            }}
                        />
                        <text
                            x="52"
                            y={t.y + 22}
                            fontFamily="var(--font-mono)"
                            fontSize="10"
                            letterSpacing="0.16em"
                            fill="rgba(255,255,255,0.48)"
                        >
                            {t.count}
                        </text>
                        <text
                            x="52"
                            y={t.y + 42}
                            fontFamily="var(--font-sans)"
                            fontSize="13"
                            fontWeight="540"
                            fill="rgba(255,255,255,0.92)"
                        >
                            {four[i]?.title || t.label}
                        </text>
                        <text
                            x="408"
                            y={t.y + 42}
                            textAnchor="end"
                            fontFamily="var(--font-mono)"
                            fontSize="10"
                            letterSpacing="0.16em"
                            fill="rgba(255,255,255,0.48)"
                        >
                            {t.label}
                        </text>
                    </g>
                ))}

                {/* Spine */}
                <motion.line
                    x1="230"
                    y1="130"
                    x2="230"
                    y2="370"
                    stroke="var(--accent, rgba(255,255,255,0.7))"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: slowBurn, delay: 1.2 }}
                />

                {/* Anchor */}
                <motion.g
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        ease: slowBurn,
                        delay: 1.6,
                    }}
                >
                    <text
                        x="230"
                        y="445"
                        textAnchor="middle"
                        fontFamily="var(--font-display)"
                        fontStyle="italic"
                        fontSize="28"
                        fill="rgba(255,255,255,0.95)"
                    >
                        {industry.split(" ")[0].toLowerCase()}
                    </text>
                    <text
                        x="230"
                        y="465"
                        textAnchor="middle"
                        fontFamily="var(--font-mono)"
                        fontSize="9"
                        letterSpacing="0.2em"
                        fill="rgba(255,255,255,0.42)"
                    >
                        VERTICAL ANCHOR
                    </text>
                </motion.g>

                {/* Junction node */}
                <motion.circle
                    cx="230"
                    cy="370"
                    r="4"
                    fill="var(--accent, rgba(255,255,255,0.9))"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 0.3,
                        ease: slowBurn,
                        delay: 1.4,
                    }}
                />
            </svg>
        </motion.div>
    );
}
