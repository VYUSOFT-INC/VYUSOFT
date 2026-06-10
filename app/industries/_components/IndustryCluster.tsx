"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export type ClusterIndustry = {
    slug: string;
    title: string;
    description: string;
    accent: string;
    frameworks: string[];
};

type Props = {
    eyebrow: string;
    title: string;
    lede: string;
    accent: string;
    theme: "dark" | "light";
    industries: ClusterIndustry[];
};

/**
 * IndustryCluster — one sector band on /industries. Sector framing header,
 * then the verticals in that cluster as cards that surface each one's key
 * regulatory frameworks (the nuance that makes the sector real). Theme
 * alternates per cluster for rhythm.
 */
export function IndustryCluster({ eyebrow, title, lede, accent, theme, industries }: Props) {
    return (
        <section
            className="svc-sec ind-cluster"
            data-theme={theme}
            aria-label={title}
            style={{ ["--accent" as string]: accent }}
        >
            <div className="svc-sec-inner">
                <div className="svc-group-head">
                    <Reveal>
                        <p className="svc-group-eyebrow">{eyebrow}</p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <h2 className="svc-group-title">{title}</h2>
                    </Reveal>
                    <Reveal delay={0.16}>
                        <p className="svc-group-lede">{lede}</p>
                    </Reveal>
                </div>

                <div className="ind-grid">
                    {industries.map((ind, i) => (
                        <Reveal key={ind.slug} delay={0.05 * i} y={22}>
                            <Link
                                href={`/industries/${ind.slug}`}
                                className="ind-card"
                                style={{ ["--accent" as string]: ind.accent }}
                            >
                                <span className="ind-card-head">
                                    <span className="ind-card-dot" aria-hidden="true" />
                                    <h3 className="ind-card-name">{ind.title}</h3>
                                    <ArrowUpRight className="ind-card-go" strokeWidth={1.5} />
                                </span>
                                <p className="ind-card-desc">{ind.description}</p>
                                {ind.frameworks.length > 0 && (
                                    <ul className="ind-card-frames">
                                        {ind.frameworks.map((f) => (
                                            <li key={f} className="ind-card-frame">{f}</li>
                                        ))}
                                    </ul>
                                )}
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
