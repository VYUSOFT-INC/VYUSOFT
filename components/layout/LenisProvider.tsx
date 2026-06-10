"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * LenisProvider — buttery smooth scroll for the whole site.
 *
 * Replaces the browser's snap-y wheel scroll with eased lerp scrolling.
 * Honors `prefers-reduced-motion`: when reduced motion is requested we
 * skip Lenis entirely and let the browser scroll natively (Lenis still
 * delegates touch / keyboard correctly).
 *
 * `lerp: 0.08` is the value PeachWeb-class sites use — tight enough to
 * feel responsive, loose enough to feel premium. Lower = more glide,
 * higher = more snap.
 *
 * Mounts client-side only; renders nothing.
 */
export function LenisProvider() {
    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (reduce.matches) return;

        const lenis = new Lenis({
            lerp: 0.08,
            wheelMultiplier: 1,
            touchMultiplier: 1.4,
            // Smooth wheel scroll only; let touch use native momentum.
            smoothWheel: true,
        });

        let rafId = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return null;
}
