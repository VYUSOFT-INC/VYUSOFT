"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";


type Props = {
    name: string;
    category: string;
    tagline: string;
    positioning: string;
    description: string;
    status: string;
    accent: string;
    image: string | null;
    secondary?: { label: string; href: string };
};

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};
const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: slowBurn } },
};

/**
 * ProductHero — bespoke product-page hero. Dark transparent panel over the
 * fixed PageBackdrop. Text column on the left (category eyebrow, name,
 * Fraunces-italic tagline, status pill, positioning, CTAs), product visual
 * on the right. Engagement-model entries (no image) render a schematic
 * stack diagram instead so the right column never collapses to whitespace.
 */
export function ProductHero({
    name,
    category,
    tagline,
    positioning,
    description,
    status,
    accent,
    image,
    secondary,
}: Props) {
    return (
        <section
            className="product-hero"
            aria-label={`${name} introduction`}
            data-theme="dark"
            style={{ ["--accent" as string]: accent }}
        >
            <div className="product-hero-inner">
                <motion.div
                    className="product-hero-grid"
                    initial="hidden"
                    animate="show"
                    variants={container}
                >
                    <div className="product-hero-text">
                        <motion.p className="product-hero-eyebrow" variants={item}>
                            <span className="product-hero-tick" aria-hidden="true" />
                            {category.toUpperCase()}
                        </motion.p>

                        <motion.h1 className="product-hero-name" variants={item}>
                            {name}
                        </motion.h1>

                        <motion.p className="product-hero-tagline" variants={item}>
                            {tagline}
                        </motion.p>

                        <motion.div className="product-hero-status-row" variants={item}>
                            <span className="product-hero-status">
                                <span className="product-hero-status-dot" aria-hidden="true" />
                                {status}
                            </span>
                        </motion.div>

                        <motion.p className="product-hero-body" variants={item}>
                            {description}
                        </motion.p>

                        <motion.div className="product-hero-actions" variants={item}>
                            <Link href="/contact" className="product-hero-cta-primary">
                                Start a Project
                                <span className="product-hero-cta-icon">
                                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                                </span>
                            </Link>
                            <Link
                                href={secondary?.href ?? "/products"}
                                className="product-hero-cta-secondary"
                            >
                                {secondary?.label ?? "All products"}
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        className="product-hero-visual"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: slowBurn, delay: 0.3 }}
                    >
                        {image ? (
                            <div className="product-hero-frame">
                                <Image
                                    src={image}
                                    alt={`${name} interface`}
                                    width={720}
                                    height={520}
                                    className="product-hero-image"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        ) : (
                            <EngagementSchematic name={name} positioning={positioning} />
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* Schematic shown when a product has no screenshot (engagement model).
   Four stacked tiers with an accent spine — echoes IndustryBlueprint so it
   reads as part of the same visual language. */
function EngagementSchematic({
    name,
    positioning,
}: {
    name: string;
    positioning: string;
}) {
    const tiers = ["STRATEGY", "DESIGN", "ENGINEERING", "OPERATIONS"];
    return (
        <div className="product-hero-schematic">
            <svg viewBox="0 0 460 420" aria-hidden="true" className="product-hero-schematic-svg">
                <rect
                    x="0.5"
                    y="0.5"
                    width="459"
                    height="419"
                    fill="none"
                    stroke="rgba(255,255,255,0.14)"
                    strokeDasharray="3 3"
                />
                <text
                    x="14"
                    y="24"
                    fontFamily="var(--font-mono)"
                    fontSize="10"
                    letterSpacing="0.16em"
                    fill="rgba(255,255,255,0.5)"
                >
                    MODEL / ONE CALENDAR
                </text>
                {tiers.map((label, i) => {
                    const y = 70 + i * 78;
                    return (
                        <g key={label}>
                            <motion.rect
                                x="60"
                                y={y}
                                width="340"
                                height="56"
                                rx="6"
                                fill="none"
                                stroke="rgba(255,255,255,0.3)"
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease: slowBurn, delay: 0.6 + i * 0.1 }}
                            />
                            <text
                                x="80"
                                y={y + 34}
                                fontFamily="var(--font-sans)"
                                fontSize="15"
                                fontWeight="540"
                                fill="rgba(255,255,255,0.92)"
                            >
                                {label}
                            </text>
                            <text
                                x="388"
                                y={y + 34}
                                textAnchor="end"
                                fontFamily="var(--font-mono)"
                                fontSize="10"
                                letterSpacing="0.16em"
                                fill="rgba(255,255,255,0.45)"
                            >
                                {String(i + 1).padStart(2, "0")}
                            </text>
                        </g>
                    );
                })}
                <motion.line
                    x1="230"
                    y1="126"
                    x2="230"
                    y2="360"
                    stroke="var(--accent, rgba(255,255,255,0.7))"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: slowBurn, delay: 1.1 }}
                />
            </svg>
            <p className="product-hero-schematic-caption">{positioning}</p>
        </div>
    );
}
