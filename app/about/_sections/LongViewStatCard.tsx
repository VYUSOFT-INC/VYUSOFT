"use client";

import { motion } from "framer-motion";
import { NumeralCounter } from "@/components/ui/NumeralCounter";
import { slowBurn } from "./motion";

type Props = {
    index: number;
    target: number;
    suffix: string;
    label: string;
    emphasis?: boolean;
};

/**
 * LongViewStatCard — single animated stat card for the About-page
 * "Long View" section. Reuses home's `.why-us-stat` markup so visual
 * styling stays inherited from the home WhyChooseUs pattern.
 *
 * The numeric portion counts up via <NumeralCounter />; the suffix
 * (e.g. "+ engagements", "% retention") sits beside it as static text.
 * The `emphasis` flag switches the card to the white-on-dark variant
 * used to anchor the headline figure.
 */
export function LongViewStatCard({
    index,
    target,
    suffix,
    label,
    emphasis,
}: Props) {
    return (
        <motion.article
            className={`why-us-stat${emphasis ? " why-us-stat--emphasis" : ""}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
                duration: 0.7,
                ease: slowBurn,
                delay: index * 0.08,
            }}
        >
            <div className="why-us-stat-value about-stat-value">
                <NumeralCounter
                    to={target}
                    durationMs={1200 + index * 100}
                    className="about-stat-num"
                />
                <span className="about-stat-suffix">{suffix}</span>
            </div>
            <div className="why-us-stat-label">{label}</div>
        </motion.article>
    );
}
