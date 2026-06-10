"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { easeSlowBurn as slowBurn } from "@/lib/motion";

type Feature = { title: string; description: string };

type Props = {
    features: Feature[];
    /** Section eyebrow above the headline. */
    eyebrow?: string;
    /** Big headline above the TOC + features grid. */
    title?: string;
    /** Optional intro lede paragraph. */
    description?: string;
};


/**
 * ServiceTOCLayout — sticky left-rail numbered TOC + scrolling right-column
 * feature articles. White opaque section (the canonical reading surface for
 * service detail pages). Drives all 30 /services/[slug] pages.
 *
 * On mobile the TOC collapses; features render as a long-form list.
 */
export function ServiceTOCLayout({
    features,
    eyebrow = "WHAT WE DELIVER",
    title = "How we run the engagement.",
    description,
}: Props) {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const els = features.map((_, i) =>
            document.getElementById(`svc-${i + 1}`),
        );
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) =>
                            (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
                    )[0];
                if (visible) {
                    const idx = els.indexOf(visible.target as HTMLElement);
                    if (idx >= 0) setActiveIdx(idx);
                }
            },
            { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
        );
        els.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [features]);

    return (
        <section className="inner-light service-toc" aria-labelledby="service-toc-heading" data-theme="light">
            <div className="inner-section-inner">
                <div className="service-toc-header">
                    <motion.p
                        className="inner-section-eyebrow"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.7, ease: slowBurn }}
                    >
                        {eyebrow}
                    </motion.p>
                    <motion.h2
                        id="service-toc-heading"
                        className="inner-section-headline"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.8, ease: slowBurn, delay: 0.08 }}
                    >
                        {title}
                    </motion.h2>
                    {description && (
                        <motion.p
                            className="inner-section-body service-toc-lede"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.7, ease: slowBurn, delay: 0.16 }}
                        >
                            {description}
                        </motion.p>
                    )}
                </div>

                <div className="service-toc-grid">
                    <aside className="service-toc-rail" aria-label="Capabilities index">
                        <p className="service-toc-rail-label">INDEX</p>
                        <ol className="service-toc-rail-list">
                            {features.map((f, i) => {
                                const num = String(i + 1).padStart(2, "0");
                                const isActive = i === activeIdx;
                                return (
                                    <li key={i}>
                                        <a
                                            href={`#svc-${i + 1}`}
                                            className={`service-toc-rail-link${isActive ? " is-active" : ""}`}
                                        >
                                            <span className="service-toc-rail-num">
                                                {num}
                                            </span>
                                            <span className="service-toc-rail-title">
                                                {f.title}
                                            </span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ol>
                    </aside>

                    <div className="service-toc-body">
                        {features.map((f, i) => {
                            const num = String(i + 1).padStart(2, "0");
                            return (
                                <motion.article
                                    key={i}
                                    id={`svc-${i + 1}`}
                                    initial={{ opacity: 0, y: 32 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-15% 0px" }}
                                    transition={{ duration: 0.75, ease: slowBurn }}
                                    className="service-toc-article"
                                >
                                    <p className="service-toc-article-num">
                                        {num} &middot; CAPABILITY
                                    </p>
                                    <h3 className="service-toc-article-title">
                                        {f.title}
                                    </h3>
                                    <p className="service-toc-article-body">
                                        {f.description}
                                    </p>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
