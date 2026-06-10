"use client";

import { motion } from "framer-motion";
import { slowBurn } from "./motion";

type Props = {
    index: number;
    title: string;
    desc: string;
    icon: React.ReactNode;
};

/**
 * CompetencyCard — single competency card on About. Reuses home's
 * `.pillars-card` markup so the four-up grid visually inherits the
 * home Pillars pattern; the image slot carries a lucide icon instead
 * of a photograph.
 */
export function CompetencyCard({ index, title, desc, icon }: Props) {
    return (
        <motion.article
            className="pillars-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
                duration: 0.7,
                ease: slowBurn,
                delay: index * 0.08,
            }}
        >
            <div className="pillars-card-image-wrap pillars-card-icon-wrap">
                {icon}
            </div>
            <div className="pillars-card-body">
                <h3 className="pillars-card-title">{title}</h3>
                <p className="pillars-card-desc">{desc}</p>
            </div>
        </motion.article>
    );
}
