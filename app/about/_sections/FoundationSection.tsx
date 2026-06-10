"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { slowBurn } from "./motion";

type Purpose = { kicker: string; title: string };

type Props = {
    purposes: Purpose[];
};

/**
 * FoundationSection — sticky-scroll three-statement reveal.
 *
 * The eyebrow + headline column pins on the left while the three purpose
 * statements scroll past on the right. The pinned header dims toward the
 * end of the section so the final statement gets its own moment.
 *
 * Driven by Framer Motion's useScroll + useTransform — entirely visual,
 * does not block the user from scrolling at their own pace.
 */
export function FoundationSection({ purposes }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const headerOpacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.7, 1],
        [0, 1, 1, 0.4],
    );

    return (
        <section
            ref={containerRef}
            className="inner-dark about-purpose"
            aria-labelledby="about-purpose-heading"
        >
            <div className="inner-section-inner about-purpose-grid">
                <motion.div
                    className="about-purpose-headcol"
                    style={{ opacity: headerOpacity }}
                >
                    <p className="inner-section-eyebrow">FOUNDATION</p>
                    <h2 id="about-purpose-heading" className="inner-section-headline">
                        Three statements we orient by.
                    </h2>
                </motion.div>

                <div className="about-purpose-stack">
                    {purposes.map((p, i) => (
                        <motion.article
                            key={p.kicker}
                            className="about-purpose-row"
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20% 0px" }}
                            transition={{
                                duration: 0.85,
                                ease: slowBurn,
                                delay: i * 0.08,
                            }}
                        >
                            <p className="about-purpose-kicker">{p.kicker}</p>
                            <p className="about-purpose-body">{p.title}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
