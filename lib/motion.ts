// Shared framer-motion variants for the PARALLEL design system.
// One source of truth so motion grammar stays consistent across pages.

import type { Variants, Transition } from "framer-motion";

/* ── Easings ─────────────────────────────────────────────────────────── */

/** Default ease-out, Apple-grade. Use for most transitions. */
export const easeDefault = [0.32, 0.72, 0, 1] as const;

/** Slow-burn ease-out. Use for page intros (700–900ms). */
export const easeSlowBurn = [0.16, 1, 0.3, 1] as const;

/* ── Durations ───────────────────────────────────────────────────────── */

export const dur = {
    fast: 0.15,
    base: 0.2,
    smooth: 0.32,
    slow: 0.6,
    intro: 0.8,
} as const;

/* ── Reusable transitions ────────────────────────────────────────────── */

export const tBase: Transition = { duration: dur.base, ease: easeDefault };
export const tSmooth: Transition = { duration: dur.smooth, ease: easeDefault };
export const tIntro: Transition = { duration: dur.intro, ease: easeSlowBurn };

/* ── Variants ────────────────────────────────────────────────────────── */

/** Page-load orchestrator. Apply to a wrapping <motion.div>. */
export const pageStagger: Variants = {
    hidden: { opacity: 1 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

/** Hero h1 line stagger. Each <span> per line uses this.
 *  Trimmed to 0.55s per the Kowalski productivity-tone budget; total hero
 *  intro lands under the 1.4s ceiling defined in DESIGN.md §5.
 *  Adds subtle blur-up (Krehel-grade polish) so the type "settles" into
 *  focus rather than just sliding. */
export const lineReveal: Variants = {
    hidden: { y: "110%", opacity: 0, filter: "blur(6px)" },
    show: {
        y: "0%",
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.55, ease: easeSlowBurn },
    },
};

/** Generic fade-up reveal. */
export const fadeUp: Variants = {
    hidden: { y: 14, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.55, ease: easeSlowBurn },
    },
};

/** Section-marker reveal: slide from left + hairline draw-in. */
export const markerReveal: Variants = {
    hidden: { x: -16, opacity: 0 },
    show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.45, ease: easeSlowBurn },
    },
};

/** Hairline rule draw-in. Animate scaleX from 0→1. */
export const ruleDraw: Variants = {
    hidden: { scaleX: 0 },
    show: {
        scaleX: 1,
        transition: { duration: 0.55, ease: easeSlowBurn, delay: 0.15 },
    },
};

/** Hairline-row stagger child. */
export const rowReveal: Variants = {
    hidden: { y: 8, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: easeDefault },
    },
};

/** Mobile sheet slide-in. */
export const sheetSlide: Variants = {
    hidden: { x: "100%" },
    show: {
        x: 0,
        transition: { duration: 0.32, ease: easeDefault },
    },
    exit: {
        x: "100%",
        transition: { duration: 0.24, ease: easeDefault },
    },
};

/** Form success stamp. */
export const stampReveal: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.45, ease: easeSlowBurn },
    },
};
