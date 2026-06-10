"use client";

import { Reveal } from "@/components/ui/Reveal";

/**
 * GroupHead — shared section intro (eyebrow + headline + lede) for the
 * /services capability-group sections. `variant` tunes colours for dark
 * (transparent over backdrop) vs light (warm paper) sections.
 */
export function GroupHead({
    eyebrow,
    title,
    lede,
    variant,
}: {
    eyebrow: string;
    title: string;
    lede: string;
    variant: "dark" | "light";
}) {
    return (
        <div className={`svc-group-head svc-group-head--${variant}`}>
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
    );
}

export type GroupSectionProps = {
    practices: { slug: string; title: string; description: string; accent: string }[];
    accent: string;
    eyebrow: string;
    title: string;
    lede: string;
};
