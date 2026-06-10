"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ServicesDashboard } from "./ServicesDashboard";

/**
 * ServicesIntro — "Building the future, together."
 *
 * Matches PeachWeb's first content section after the hero. The signature
 * detail is the frosted-glass panel that overlays this entire section:
 * a translucent dark pane with a soft top fade that bleeds into the hero
 * above. The backdrop shows through the glass at the top edge and gets
 * progressively diffused as the eye moves down — that's what creates the
 * visual seam between hero and services without needing a hard divider.
 *
 * Composition:
 *   • Frosted-glass overlay (`.services-intro-glass`)
 *       - position: absolute, fills the section
 *       - linear gradient transparent → dark
 *       - backdrop-filter blur for the "lens" feel
 *       - mask-image fades the top 18% so the seam is soft
 *   • Section content sits at z-index 1 above the glass
 *       - OUR SERVICES eyebrow + display headline (left)
 *       - body copy + 2 CTAs (right)
 *       - dashboard mockup below
 */

const GLASS_STYLE: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background:
        "linear-gradient(180deg, " +
        "rgba(10, 15, 26, 0) 0%, " +
        "rgba(10, 15, 26, 0.42) 22%, " +
        "rgba(10, 15, 26, 0.68) 100%)",
    backdropFilter: "blur(14px) saturate(115%)",
    WebkitBackdropFilter: "blur(14px) saturate(115%)",
    /* Soft top edge — glass fades in over the top 18% so it blends into
       the hero section above instead of starting with a hard seam. */
    maskImage:
        "linear-gradient(180deg, transparent 0%, black 18%, black 100%)",
    WebkitMaskImage:
        "linear-gradient(180deg, transparent 0%, black 18%, black 100%)",
    pointerEvents: "none",
    zIndex: 0,
    /* Subtle hairline at the top to mark the panel edge after the fade. */
    boxShadow:
        "inset 0 1px 0 0 rgba(255, 255, 255, 0.06)",
};

export function ServicesIntro() {
    return (
        <section className="services-intro" aria-labelledby="services-intro-heading" data-theme="dark">
            {/* Frosted-glass overlay — the visual seam between hero and services. */}
            <div className="services-intro-glass" aria-hidden="true" style={GLASS_STYLE} />

            <div className="services-intro-content">
                <div className="services-intro-grid">
                    {/* Left: heading + CTAs */}
                    <Reveal>
                        <div className="services-intro-heading-col">
                            <p className="services-intro-eyebrow">OUR SERVICES</p>
                            <h2
                                id="services-intro-heading"
                                className="services-intro-title"
                            >
                                Five disciplines.
                                <br />
                                One team to run them.
                            </h2>
                            <div className="services-intro-actions">
                                <Link
                                    href="/contact"
                                    className="services-intro-cta-primary"
                                >
                                    Start a Project
                                    <span className="services-intro-cta-icon">
                                        <ArrowUpRight
                                            className="w-3.5 h-3.5"
                                            strokeWidth={2}
                                        />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </Reveal>

                    {/* Right: body copy */}
                    <Reveal delay={0.12}>
                        <div className="services-intro-body-col">
                            <p className="services-intro-body">
                                AI, engineering, enterprise systems, growth,
                                and operations — the whole stack under one
                                accountable team, on one calendar. Explore the
                                practices below, or just tell us where it hurts.
                            </p>
                        </div>
                    </Reveal>
                </div>

                {/* Floating services dashboard */}
                <Reveal delay={0.2} y={48}>
                    <div className="services-intro-dashboard">
                        <ServicesDashboard />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
