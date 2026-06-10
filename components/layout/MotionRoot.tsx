"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps children in framer-motion's MotionConfig with `reducedMotion="user"`,
 * which respects the user's `prefers-reduced-motion` system setting across all
 * framer-motion animations. This is required because framer-motion uses the
 * Web Animations API, which is NOT affected by CSS `prefers-reduced-motion`
 * overrides. See DESIGN.md §5.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
