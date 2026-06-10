"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GroupHead, type GroupSectionProps } from "./GroupHead";

/**
 * GroupConsole — Operations group. Compact, utilitarian card grid with a
 * status-dot motif and terse copy — reads like an ops console. Dark canvas.
 */
export function GroupConsole({ practices, accent, eyebrow, title, lede }: GroupSectionProps) {
    return (
        <section
            className="svc-sec svc-console"
            data-theme="dark"
            aria-label={`${title} services`}
            style={{ ["--accent" as string]: accent }}
        >
            <div className="svc-sec-inner">
                <GroupHead eyebrow={eyebrow} title={title} lede={lede} variant="dark" />
                <div className="svc-console-grid">
                    {practices.map((p, i) => (
                        <Reveal key={p.slug} delay={0.04 * i} y={20}>
                            <Link
                                href={`/services/${p.slug}`}
                                className="svc-console-card"
                                style={{ ["--accent" as string]: p.accent }}
                            >
                                <span className="svc-console-top">
                                    <span className="svc-console-dot" aria-hidden="true" />
                                    <span className="svc-console-status">ONLINE</span>
                                </span>
                                <h3 className="svc-console-name">{p.title}</h3>
                                <p className="svc-console-desc">{p.description}</p>
                                <span className="svc-console-go" aria-hidden="true">
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
