"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
    /** Final value. */
    to: number;
    /** Optional suffix string, e.g. "+", "%", "K". */
    suffix?: string;
    /** Optional prefix. */
    prefix?: string;
    /** Animation duration in ms. */
    durationMs?: number;
    /** Localised number formatting? Default true. */
    format?: boolean;
    /** ClassName passed to the wrapping span. */
    className?: string;
};

/**
 * Animated count-up. Runs once when entering the viewport.
 * Uses ease-out cubic. On completion, briefly flashes the accent color
 * (320ms) so the count "lands" — Krehel-grade landing detail.
 */
export function NumeralCounter({
    to,
    suffix = "",
    prefix = "",
    durationMs = 800,
    format = true,
    className = "",
}: Props) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });
    const [value, setValue] = useState(0);
    const [landed, setLanded] = useState(false);

    useEffect(() => {
        if (!inView) return;
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            setValue(to);
            setLanded(true);
            return;
        }

        let raf = 0;
        let landTimer: ReturnType<typeof setTimeout> | null = null;
        const start = performance.now();
        const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * to));
            if (progress < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setLanded(true);
                landTimer = setTimeout(() => setLanded(false), 320);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            if (landTimer) clearTimeout(landTimer);
        };
    }, [inView, to, durationMs]);

    const display = format ? value.toLocaleString("en-US") : String(value);

    return (
        <span
            ref={ref}
            className={className}
            style={{
                fontVariantNumeric: "tabular-nums",
                color: landed ? "var(--accent)" : undefined,
                transition: "color 320ms cubic-bezier(0.32, 0.72, 0, 1)",
            }}
        >
            {prefix}
            {display}
            {suffix}
        </span>
    );
}
