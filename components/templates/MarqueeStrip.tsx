"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
    items: string[];
    durationSec?: number;
    direction?: "left" | "right";
    accent?: string;
    variant?: "light" | "dark";
};

export function MarqueeStrip({
    items,
    durationSec = 38,
    direction = "left",
    accent,
    variant = "dark",
}: Props) {
    const shouldReduceMotion = useReducedMotion();
    const doubled = [...items, ...items];
    const animX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

    const wrapperStyle: React.CSSProperties = {
        position: "relative",
        zIndex: 1,
        width: "100%",
        overflow: "hidden",
        borderTop: variant === "dark"
            ? "1px solid oklch(99% 0.005 80 / 0.08)"
            : "1px solid var(--color-rule)",
        borderBottom: variant === "dark"
            ? "1px solid oklch(99% 0.005 80 / 0.08)"
            : "1px solid var(--color-rule)",
        padding: "20px 0",
        background: variant === "light" ? "var(--color-paper)" : "transparent",
        color: variant === "dark" ? "oklch(99% 0.005 80)" : "var(--color-ink)",
        WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
    };

    const trackStyle: React.CSSProperties = {
        display: "flex",
        width: "max-content",
        willChange: "transform",
    };

    const itemStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: 24,
        paddingRight: 24,
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        fontWeight: 500,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        color: variant === "dark"
            ? "oklch(99% 0.005 80 / 0.62)"
            : "var(--color-ink-mid)",
    };

    const dotStyle: React.CSSProperties = {
        width: 6,
        height: 6,
        borderRadius: "50%",
        display: "inline-block",
        background: accent ?? "currentColor",
    };

    return (
        <div style={wrapperStyle} aria-hidden="true">
            <motion.div
                style={trackStyle}
                animate={shouldReduceMotion ? undefined : { x: animX }}
                transition={{
                    duration: durationSec,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {doubled.map((item, i) => (
                    <span key={i} style={itemStyle}>
                        <span>{item}</span>
                        <span style={dotStyle} aria-hidden="true" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
