"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { easeSlowBurn as slowBurn } from "@/lib/motion";

type ScreenAsset = { src: string; label: string };

const PRODUCT_SCREENS: Record<string, ScreenAsset[]> = {
    vyudine: [
        { src: "/sections/products/vyudine ui/Onboarding 1.png", label: "Food delivery" },
        { src: "/sections/products/vyudine ui/Onboarding 2.png", label: "Grocery ordering" },
        { src: "/sections/products/vyudine ui/Onboarding 3.png", label: "Rewards & payments" },
    ],
    mivyu: [
        { src: "/sections/products/mivyu ui/Body (1).png", label: "Discover fashion" },
        { src: "/sections/products/mivyu ui/Body.png", label: "Welcome & onboarding" },
        { src: "/sections/products/mivyu ui/Body (2).png", label: "Personalized picks" },
    ],
    vyuflo: [
        { src: "/sections/products/vyuflo ui/HR - DashBoard.png", label: "HR Dashboard" },
        { src: "/sections/products/vyuflo ui/LOGIN - Login Page.png", label: "Sign in" },
        { src: "/sections/products/vyuflo ui/SIGNUP - Create Account 1.png", label: "Registration" },
    ],
};

type Props = {
    slug: string;
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

const ROTATE_MS = 4000;
const SHIFT = 55;

export function ProductHero({
    slug,
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
    const screens = PRODUCT_SCREENS[slug];

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
                        {screens && screens.length > 1 ? (
                            <ScreenCarousel screens={screens} name={name} />
                        ) : image ? (
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
                            <EngagementSchematic positioning={positioning} />
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function ScreenCarousel({ screens, name }: { screens: ScreenAsset[]; name: string }) {
    const n = screens.length;
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const advance = useCallback(() => setActive((i) => (i + 1) % n), [n]);

    useEffect(() => {
        if (paused) return;
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) return;
        const id = window.setInterval(advance, ROTATE_MS);
        return () => window.clearInterval(id);
    }, [paused, advance]);

    return (
        <div
            className="product-hero-carousel"
            role="group"
            aria-label={`${name} app screens`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
        >
            <div className="product-hero-carousel-track">
                {screens.map((screen, i) => {
                    let offset = i - active;
                    if (offset > n / 2) offset -= n;
                    if (offset < -n / 2) offset += n;
                    const dist = Math.abs(offset);
                    const center = offset === 0;
                    const neighbour = dist === 1;

                    return (
                        <div
                            key={screen.src}
                            className={`product-hero-slide ${center ? "product-hero-slide--active" : ""}`}
                            style={{
                                transform: `translateX(calc(-50% + ${offset * SHIFT}%)) scale(${center ? 1 : neighbour ? 0.82 : 0.65})`,
                                opacity: center ? 1 : neighbour ? 0.45 : 0,
                                zIndex: n - dist,
                                pointerEvents: center || neighbour ? "auto" : "none",
                            }}
                            aria-hidden={!center}
                            onClick={center ? advance : () => setActive(i)}
                        >
                            <div className="product-hero-slide-frame">
                                <Image
                                    src={screen.src}
                                    alt={`${name} — ${screen.label}`}
                                    width={720}
                                    height={520}
                                    className="product-hero-slide-img"
                                    sizes="(max-width: 1024px) 80vw, 440px"
                                    priority={center}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="product-hero-carousel-dots" role="tablist" aria-label="Select screen">
                {screens.map((screen, i) => (
                    <button
                        key={screen.src}
                        type="button"
                        role="tab"
                        className={`product-hero-carousel-dot ${i === active ? "is-active" : ""}`}
                        aria-label={screen.label}
                        aria-selected={i === active}
                        onClick={() => setActive(i)}
                    />
                ))}
            </div>
        </div>
    );
}

function EngagementSchematic({
    positioning,
}: {
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
