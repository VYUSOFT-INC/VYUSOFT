"use client";

import { motion } from "framer-motion";
import { slowBurn } from "./motion";

type Props = {
    children: React.ReactNode;
    /** Stagger offset in seconds. */
    delay?: number;
    /** Vertical translation distance (px) before settling. */
    y?: number;
    className?: string;
};

/**
 * Generic fade-up wrapper used by every About-page section. Triggers
 * once when the element enters the viewport. Honors slow-burn easing.
 */
export function ScrollReveal({ children, delay = 0, y = 24, className }: Props) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.75, ease: slowBurn, delay }}
        >
            {children}
        </motion.div>
    );
}
