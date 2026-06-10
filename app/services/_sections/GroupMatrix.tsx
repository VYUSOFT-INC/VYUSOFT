"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GroupHead, type GroupSectionProps } from "./GroupHead";

/**
 * GroupMatrix — Enterprise group, rendered as a layered system stack: a
 * single connected module of slabs joined by an accent spine down the left,
 * reading like an architecture diagram rather than a list. Dark canvas.
 */
export function GroupMatrix({ practices, accent, eyebrow, title, lede }: GroupSectionProps) {
    return (
        <section
            className="svc-sec svc-stack-sec"
            data-theme="dark"
            aria-label={`${title} services`}
            style={{ ["--accent" as string]: accent }}
        >
            <div className="svc-sec-inner">
                <GroupHead eyebrow={eyebrow} title={title} lede={lede} variant="dark" />
                <div className="svc-stack">
                    {practices.map((p, i) => (
                        <Reveal key={p.slug} delay={0.04 * i} y={14} className="svc-stack-row">
                            <Link href={`/services/${p.slug}`} className="svc-stack-link">
                                <span className="svc-stack-tier">
                                    L{String(i + 1).padStart(2, "0")}
                                </span>
                                <div className="svc-stack-body">
                                    <h3 className="svc-stack-name">{p.title}</h3>
                                    <p className="svc-stack-desc">{p.description}</p>
                                </div>
                                <ArrowUpRight className="svc-stack-go" strokeWidth={1.5} />
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
