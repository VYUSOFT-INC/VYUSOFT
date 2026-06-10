"use client";

import { motion } from "framer-motion";
import { easeSlowBurn } from "@/lib/motion";

/**
 * Page transition wrapper. Re-mounts on every route change in the App Router,
 * giving each navigation a quick opacity fade so route changes feel smooth
 * rather than snapping.
 *
 * Kept very short (220ms) and opacity-only so it doesn't compete with the
 * hero's own choreography on the home page.
 */
export default function Template({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22, ease: easeSlowBurn }}
        >
            {children}
        </motion.div>
    );
}
