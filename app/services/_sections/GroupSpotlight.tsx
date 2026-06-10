"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GroupHead, type GroupSectionProps } from "./GroupHead";

/**
 * GroupSpotlight — Engineering group, rendered as a horizontal "surfaces"
 * strip: a swipeable row of window-chrome cards. Engineering is the part
 * users touch, so the layout reads like a row of product surfaces — a
 * different axis (horizontal) from the other sections. Warm-paper section.
 */
export function GroupSpotlight({ practices, accent, eyebrow, title, lede }: GroupSectionProps) {
    return (
        <section
            className="svc-sec svc-surf"
            data-theme="light"
            aria-label={`${title} services`}
            style={{ ["--accent" as string]: accent }}
        >
            <div className="svc-sec-inner">
                <GroupHead eyebrow={eyebrow} title={title} lede={lede} variant="light" />

                <div className="svc-surf-scroll" role="list">
                    {practices.map((p, i) => (
                        <Reveal key={p.slug} delay={i * 0.04} y={20} className="svc-surf-cell">
                            <Link
                                href={`/services/${p.slug}`}
                                className="svc-surf-card"
                                role="listitem"
                                style={{ ["--accent" as string]: p.accent }}
                            >
                                <span className="svc-surf-chrome" aria-hidden="true">
                                    <i />
                                    <i />
                                    <i />
                                </span>
                                <span className="svc-surf-num">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="svc-surf-name">{p.title}</h3>
                                <p className="svc-surf-desc">{p.description}</p>
                                <span className="svc-surf-cue">
                                    Open
                                    <ArrowUpRight strokeWidth={1.5} />
                                </span>
                            </Link>
                        </Reveal>
                    ))}
                </div>

                <p className="svc-surf-hint" aria-hidden="true">Scroll to explore →</p>
            </div>
        </section>
    );
}
