"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GroupHead, type GroupSectionProps } from "./GroupHead";

/**
 * GroupBento — Technology group. Asymmetric bento of six practices on the
 * dark canvas; the first practice gets the large hero cell.
 */
export function GroupBento({ practices, accent, eyebrow, title, lede }: GroupSectionProps) {
    return (
        <section
            className="svc-sec svc-bento"
            data-theme="dark"
            aria-label={`${title} services`}
            style={{ ["--accent" as string]: accent }}
        >
            <div className="svc-sec-inner">
                <GroupHead eyebrow={eyebrow} title={title} lede={lede} variant="dark" />
                <div className="svc-bento-grid">
                    {practices.map((p, i) => (
                        <Reveal
                            key={p.slug}
                            delay={i * 0.05}
                            y={24}
                            className={`svc-bento-cell svc-bento-cell--${i}`}
                        >
                            <Link
                                href={`/services/${p.slug}`}
                                className="svc-bento-link"
                                style={{ ["--accent" as string]: p.accent }}
                            >
                                <span className="svc-bento-dot" aria-hidden="true" />
                                <h3 className="svc-bento-name">{p.title}</h3>
                                <p className="svc-bento-desc">{p.description}</p>
                                <span className="svc-bento-go" aria-hidden="true">
                                    <ArrowUpRight strokeWidth={1.5} />
                                </span>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
