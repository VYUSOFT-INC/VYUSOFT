"use client";

import { Reveal } from "@/components/ui/Reveal";
import type { Feature } from "@/lib/services";

/**
 * ServiceCapabilities — the practice's offering as a warm-paper editorial
 * grid (numbered, accent ordinals). This is the single place the list of
 * capabilities/services appears on the page.
 */
export function ServiceCapabilities({
    eyebrow = "What we deliver",
    title,
    lede,
    accent,
    features,
}: {
    eyebrow?: string;
    title: string;
    lede?: string;
    accent: string;
    features: Feature[];
}) {
    return (
        <section
            className="svcd-caps"
            data-theme="light"
            aria-label="Services"
            style={{ ["--accent" as string]: accent }}
        >
            <div className="svcd-caps-inner">
                <div className="svcd-caps-head">
                    <Reveal>
                        <p className="svcd-caps-eyebrow">{eyebrow}</p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <h2 className="svcd-caps-title">{title}</h2>
                    </Reveal>
                    {lede && (
                        <Reveal delay={0.16}>
                            <p className="svcd-caps-lede">{lede}</p>
                        </Reveal>
                    )}
                </div>

                <div className="svcd-caps-grid">
                    {features.map((f, i) => (
                        <Reveal key={f.title} delay={0.05 * i} y={24}>
                            <article className="svcd-cap">
                                <span className="svcd-cap-num">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="svcd-cap-title">{f.title}</h3>
                                <p className="svcd-cap-desc">{f.description}</p>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
