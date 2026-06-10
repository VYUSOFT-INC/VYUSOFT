"use client";

import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";
import type { ProductFeature } from "@/lib/products";


type Props = {
    name: string;
    accent: string;
    features: ProductFeature[];
};

/**
 * ProductFeatures — light showcase grid of feature highlights for a product
 * detail page. Numbered surface cards on the warm-paper canvas, accent on
 * the ordinal. Reveals in stagger as the grid enters view.
 */
export function ProductFeatures({ name, accent, features }: Props) {
    return (
        <section
            className="inner-light product-features"
            aria-labelledby="product-features-heading"
            data-theme="light"
            style={{ ["--accent" as string]: accent }}
        >
            <div className="inner-section-inner">
                <div className="product-features-header">
                    <motion.p
                        className="inner-section-eyebrow"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.6, ease: slowBurn }}
                    >
                        CAPABILITIES
                    </motion.p>
                    <motion.h2
                        id="product-features-heading"
                        className="inner-section-headline"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.75, ease: slowBurn, delay: 0.08 }}
                    >
                        What {name} does.
                    </motion.h2>
                </div>

                <ul className="product-features-grid">
                    {features.map((f, i) => (
                        <motion.li
                            key={f.title}
                            className="product-feature-card"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.65, ease: slowBurn, delay: 0.08 + i * 0.05 }}
                        >
                            <span className="product-feature-num">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="product-feature-title">{f.title}</h3>
                            <p className="product-feature-desc">{f.description}</p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
