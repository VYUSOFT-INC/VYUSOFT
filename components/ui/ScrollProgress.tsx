"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * 2px scroll-progress bar pinned to the top of the viewport.
 * scaleX driven by useScroll, smoothed via useSpring for that buttery feel.
 * Renders above the fixed header (z-index 60).
 */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 220,
        damping: 30,
        mass: 0.2,
    });

    return (
        <motion.div
            aria-hidden="true"
            style={{
                scaleX,
                transformOrigin: "0% 50%",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "var(--color-cobalt)",
                zIndex: 60,
            }}
        />
    );
}
