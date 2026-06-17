"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: slowBurn } },
};

/**
 * ServiceHero — service-detail hero. Statement column: eyebrow, headline,
 * intro, CTAs.
 */
export function ServiceHero({
    eyebrow,
    title,
    description,
    accent,
    heroImage,
    heroImagePosition,
    heroImageBrightness,
}: {
    eyebrow: string;
    title: string;
    description: string;
    accent: string;
    heroImage?: string;
    heroImagePosition?: string;
    heroImageBrightness?: number;
}) {
    return (
        <section
            className="svcd-hero"
            data-theme="dark"
            aria-label={`${title} introduction`}
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
            <div className="svcd-hero-inner" style={heroImage ? { position: "relative", zIndex: 1 } : undefined}>
                <motion.div
                    className="svcd-hero-text"
                    initial="hidden"
                    animate="show"
                    variants={container}
                >
                    <motion.p className="svcd-hero-eyebrow" variants={item}>
                        <span className="svcd-hero-tick" aria-hidden="true" />
                        {eyebrow}
                    </motion.p>
                    <motion.h1 className="svcd-hero-title" variants={item}>
                        {title}
                    </motion.h1>
                    <motion.p className="svcd-hero-desc" variants={item}>
                        {description}
                    </motion.p>
                    <motion.div className="svcd-hero-actions" variants={item}>
                        <Link href="/contact" className="svcd-hero-cta-primary">
                            Start a project
                            <span className="svcd-hero-cta-icon">
                                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                            </span>
                        </Link>
                        <Link href="/services" className="svcd-hero-cta-secondary">
                            All services
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
