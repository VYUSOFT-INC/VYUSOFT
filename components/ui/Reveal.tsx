"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal — universal fade-up scroll-reveal wrapper.
 *
 * Wrap any block (section, card, headline, image) and it fades up + in
 * the moment its top crosses the viewport. Uses framer-motion's
 * `whileInView` (IntersectionObserver under the hood) so it's cheap and
 * doesn't fight Lenis.
 *
 * `MotionConfig reducedMotion="user"` (mounted in layout.tsx via MotionRoot)
 * already disables this when the user requests reduced motion.
 *
 * @example
 *   <Reveal>
 *     <h2>Our pillars</h2>
 *   </Reveal>
 *
 * @example  Stagger children:
 *   <Reveal delay={0.0}>...</Reveal>
 *   <Reveal delay={0.08}>...</Reveal>
 *   <Reveal delay={0.16}>...</Reveal>
 *
 * Note: always renders as `<div>` for type simplicity. Use the `className`
 * prop to apply layout. If you need a semantic element wrapper, put the
 * Reveal *inside* it (`<section><Reveal>...</Reveal></section>`).
 */
type RevealProps = {
    children: ReactNode;
    /** Stagger delay in seconds. Default 0. */
    delay?: number;
    /** Travel distance in px. Default 24. */
    y?: number;
    /** Animation duration in seconds. Default 0.7. */
    duration?: number;
    /** When to trigger — px or % from viewport top. Default "-10%". */
    margin?: `${number}%` | `${number}px`;
    /** Run only once (true) or every time it enters view (false). Default true. */
    once?: boolean;
    className?: string;
    /** Optional id for anchor links. */
    id?: string;
};

export function Reveal({
    children,
    delay = 0,
    y = 24,
    duration = 0.7,
    margin = "-10%",
    once = true,
    className,
    id,
}: RevealProps) {
    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, margin }}
            transition={{
                duration,
                delay,
                // Custom easing — gentle ease-out with tiny overshoot at end.
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
