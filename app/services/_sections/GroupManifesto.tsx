"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GroupHead, type GroupSectionProps } from "./GroupHead";

/**
 * GroupManifesto — Growth group, rendered as an editorial two-column spread:
 * bold statement blocks on paper, hairline-separated, no card chrome —
 * a magazine feel that reads differently from the grids and the stack.
 */
export function GroupManifesto({ practices, accent, eyebrow, title, lede }: GroupSectionProps) {
    return (
        <section
            className="svc-sec svc-ed"
            data-theme="light"
            aria-label={`${title} services`}
            style={{ ["--accent" as string]: accent }}
        >
            <div className="svc-sec-inner">
                <GroupHead eyebrow={eyebrow} title={title} lede={lede} variant="light" />
                <div className="svc-ed-grid">
                    {practices.map((p, i) => (
                        <Reveal key={p.slug} delay={0.05 * i} y={24} className="svc-ed-cell">
                            <Link href={`/services/${p.slug}`} className="svc-ed-block">
                                <span className="svc-ed-num">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="svc-ed-name">{p.title}</h3>
                                <p className="svc-ed-desc">{p.description}</p>
                                <span className="svc-ed-cue">
                                    Explore
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
