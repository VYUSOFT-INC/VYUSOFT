"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";

type Props = {
    eyebrow: string;
    title: string;
    description: string;
    accent?: string;
    cta?: { label: string; href: string };
    secondary?: { label: string; href: string };
    aside?: React.ReactNode;
    marginalia?: string[];
    heroImage?: string;
    heroImagePosition?: string;
    heroImageBrightness?: number;
};

/* Motion choreography — slow-burn ease-out, line-by-line stagger.
 * Eyebrow first, then headline lines one at a time, then body, then CTAs.
 * Total entrance ~1.4s — earned, not flashy. */

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const eyebrowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: slowBurn } },
};

const lineVariants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: slowBurn } },
};

const bodyVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: slowBurn, delay: 0.25 },
    },
};

const ctaVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: slowBurn, delay: 0.45 },
    },
};

/**
 * PageHero — dark atmospheric inner-page hero with choreographed entry.
 *
 * Entry sequence (one-shot, on mount):
 *   eyebrow → headline line 1 → headline line 2 (90ms stagger) → body → CTA
 *
 * Per-page accent tints the eyebrow tick. Transparent panel — sits over
 * the fixed PageBackdrop and lets the atmospheric video show through.
 */
export function PageHero({
    eyebrow,
    title,
    description,
    accent,
    cta = { label: "Start a Project", href: "/contact" },
    secondary,
    aside,
    marginalia,
    heroImage,
    heroImagePosition,
    heroImageBrightness,
}: Props) {
    const localStyle = accent
        ? ({ "--accent": accent, overflow: heroImage ? "hidden" : undefined } as React.CSSProperties)
        : heroImage
          ? ({ overflow: "hidden" } as React.CSSProperties)
          : undefined;

    const lines = title.split("\n");

    return (
        <section
            className="page-hero"
            aria-label="Page introduction"
            data-theme="dark"
            style={localStyle}
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
            <div className="page-hero-inner" style={heroImage ? { position: "relative", zIndex: 1 } : undefined}>
                <motion.div
                    className={`page-hero-grid ${aside ? "page-hero-grid--with-aside" : ""}`}
                    initial="hidden"
                    animate="show"
                    variants={containerVariants}
                >
                    <div className="page-hero-headline-col">
                        <motion.p
                            className="page-hero-eyebrow"
                            variants={eyebrowVariants}
                        >
                            <span className="page-hero-eyebrow-tick" aria-hidden="true" />
                            {eyebrow}
                        </motion.p>

                        <h1 className="page-hero-headline">
                            {lines.map((line, i) => (
                                <motion.span
                                    key={i}
                                    className="page-hero-headline-line"
                                    variants={lineVariants}
                                >
                                    {line}
                                </motion.span>
                            ))}
                        </h1>

                        <motion.div
                            className="page-hero-actions"
                            variants={ctaVariants}
                        >
                            <Link href={cta.href} className="page-hero-cta-primary">
                                {cta.label}
                                <span className="page-hero-cta-icon">
                                    <ArrowUpRight
                                        className="w-3.5 h-3.5"
                                        strokeWidth={2}
                                    />
                                </span>
                            </Link>
                            {secondary && (
                                <Link href={secondary.href} className="page-hero-cta-secondary">
                                    {secondary.label}
                                </Link>
                            )}
                        </motion.div>
                    </div>

                    <motion.div
                        className="page-hero-body-col"
                        variants={bodyVariants}
                    >
                        {aside ? (
                            <div className="page-hero-aside">{aside}</div>
                        ) : (
                            <p className="page-hero-body">{description}</p>
                        )}
                    </motion.div>
                </motion.div>

                {aside && description && (
                    <motion.p
                        className="page-hero-body page-hero-body--below"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: slowBurn, delay: 0.7 }}
                    >
                        {description}
                    </motion.p>
                )}

                {marginalia && marginalia.length > 0 && (
                    <motion.p
                        className="page-hero-marginalia"
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: slowBurn, delay: 0.95 }}
                    >
                        {marginalia.join(" · ")}
                    </motion.p>
                )}
            </div>
        </section>
    );
}
