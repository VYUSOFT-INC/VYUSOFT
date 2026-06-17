"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";

/**
 * IndustryHero — the Industries hero, mirroring the approved
 * Development-family anatomy: left column carries the editorial
 * content (eyebrow, headline, vision, CTA, ruled meta strip from real
 * data), right column carries a designed media slot awaiting the
 * sector's generated image (same drop-in pattern as PhaseMediaSlot).
 *
 * No diagrams, no invented vocabulary, no VyuSoft-at-center motifs.
 * Pure dark stage; the cream rhythm begins in the next section.
 */

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: slowBurn } },
};

export function IndustryHero({
    industry,
    eyebrow,
    headline,
    vision,
    accent,
    solutionsCount,
    heroImage,
    heroImagePosition,
    heroImageBrightness,
}: {
    industry: string;
    eyebrow: string;
    headline: string;
    vision: string;
    accent: string;
    solutionsCount: number;
    heroImage?: string;
    heroImagePosition?: string;
    heroImageBrightness?: number;
}) {
    return (
        <section
            className="ind-hero"
            data-theme="dark"
            aria-label={`${industry} industry overview`}
            style={{ ["--accent" as string]: accent, overflow: heroImage ? "hidden" : undefined } as React.CSSProperties}
        >
            {heroImage && (
                <>
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 0,
                            pointerEvents: "none",
                            backgroundImage: `url(${encodeURI(heroImage)})`,
                            backgroundPosition: heroImagePosition || "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            maskImage: "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                            filter: heroImageBrightness != null ? `brightness(${heroImageBrightness})` : undefined,
                        }}
                    />
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 0,
                            pointerEvents: "none",
                            background: "linear-gradient(to right, oklch(7% 0.018 270 / 0.94) 0%, oklch(7% 0.018 270 / 0.82) 40%, oklch(7% 0.018 270 / 0.45) 70%, transparent 100%), linear-gradient(to top, oklch(7% 0.018 270 / 0.75) 0%, oklch(7% 0.018 270 / 0.35) 35%, transparent 60%)",
                        }}
                    />
                </>
            )}
            <div className="ind-hero-inner" style={heroImage ? { position: "relative", zIndex: 1 } : undefined}>
                <motion.div
                    className="ind-hero-grid"
                    initial="hidden"
                    animate="show"
                    variants={container}
                >
                    <div className="ind-hero-text">
                        <motion.p className="ind-hero-eyebrow" variants={item}>
                            <span className="ind-hero-tick" aria-hidden="true" />
                            {eyebrow}
                        </motion.p>
                        <motion.h1 className="ind-hero-title" variants={item}>
                            {headline}
                        </motion.h1>
                        <motion.p className="ind-hero-vision" variants={item}>
                            {vision}
                        </motion.p>
                        <motion.div className="ind-hero-actions" variants={item}>
                            <Link href="/contact" className="svcd-hero-cta-primary">
                                Start a project
                                <span className="svcd-hero-cta-icon">
                                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                                </span>
                            </Link>
                            <Link href="/industries" className="svcd-hero-cta-secondary">
                                All industries
                            </Link>
                        </motion.div>
                        <motion.dl className="ind-hero-meta" variants={item}>
                            <div>
                                <dt>CORE SOLUTIONS</dt>
                                <dd>{String(solutionsCount).padStart(2, "0")}</dd>
                            </div>
                            <div>
                                <dt>DELIVERY POSTURE</dt>
                                <dd>Compliance-first</dd>
                            </div>
                        </motion.dl>
                    </div>

                    {!heroImage && (
                        <motion.div
                            className="ind-hero-slot"
                            role="img"
                            aria-label={`${industry} sector visual`}
                            variants={item}
                        >
                            <span className="ind-hero-slot-ordinal">
                                {industry.slice(0, 2).toUpperCase()}
                            </span>
                            <svg className="ind-hero-slot-crosshair" aria-hidden="true" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="60" cy="60" r="32" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
                                <circle cx="60" cy="60" r="4" fill="currentColor" fillOpacity="0.5" />
                                <line x1="60" y1="20" x2="60" y2="44" stroke="currentColor" strokeWidth="0.75" />
                                <line x1="60" y1="76" x2="60" y2="100" stroke="currentColor" strokeWidth="0.75" />
                                <line x1="20" y1="60" x2="44" y2="60" stroke="currentColor" strokeWidth="0.75" />
                                <line x1="76" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="0.75" />
                            </svg>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
