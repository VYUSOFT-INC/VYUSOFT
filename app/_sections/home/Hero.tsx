"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Hero — exact PeachWeb 1:1 match (dark photographic, full-bleed).
 *
 * Composition (from PeachWeb screenshots):
 *   • Full-bleed dark photographic backdrop — provided by global
 *     <PageBackdrop /> on the page.
 *   • Global <SiteHeader /> floats fixed above (no longer inline here).
 *   • Headline LEFT: "Your End-to-End Technology Partner for Digital
 *     Transformation." — bold white sans-serif, large.
 *   • Trust line LOWER-LEFT: 4 avatar circles + caption.
 *   • Body+CTAs LOWER-RIGHT: body copy + WHITE pill "Start a Project"
 *     + transparent ghost "Learn More".
 */
export function Hero() {
    return (
        <section className="hero-dark" aria-label="VyuSoft hero" data-theme="dark">
            <div className="hero-dark-content">
                <div className="hero-dark-grid">
                    {/* Left column: headline + trust */}
                    <div className="hero-dark-headline-col">
                        <h1 className="hero-dark-headline">
                            Your End-to-End
                            <br />
                            Technology Partner
                            <br />
                            for
                            <br />
                            Digital
                            <br />
                            Transformation.
                        </h1>

                        <div className="hero-dark-trust">
                            <p className="hero-dark-trust-text">
                                Trusted by startups and enterprises globally
                            </p>
                            <div className="hero-dark-trust-avatars" aria-hidden="true">
                                {/* Real human portraits via pravatar (deterministic
                                    seed → same diverse faces every render). Sized at
                                    96 × 96 source, displayed at 28 × 28; high DPR
                                    headroom built in. */}
                                <img
                                    src="https://i.pravatar.cc/96?img=68"
                                    alt=""
                                    className="hero-dark-trust-avatar hero-dark-trust-avatar--1"
                                    loading="lazy"
                                    width={28}
                                    height={28}
                                />
                                <img
                                    src="https://i.pravatar.cc/96?img=47"
                                    alt=""
                                    className="hero-dark-trust-avatar hero-dark-trust-avatar--2"
                                    loading="lazy"
                                    width={28}
                                    height={28}
                                />
                                <img
                                    src="https://i.pravatar.cc/96?img=24"
                                    alt=""
                                    className="hero-dark-trust-avatar hero-dark-trust-avatar--3"
                                    loading="lazy"
                                    width={28}
                                    height={28}
                                />
                                <img
                                    src="https://i.pravatar.cc/96?img=15"
                                    alt=""
                                    className="hero-dark-trust-avatar hero-dark-trust-avatar--4"
                                    loading="lazy"
                                    width={28}
                                    height={28}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right column: body copy + CTAs */}
                    <div className="hero-dark-body-col">
                        <p className="hero-dark-body-text">
                            We build, modernize, and scale digital systems for
                            businesses using AI, cloud, and custom engineering.
                            Your innovation journey starts here.
                        </p>

                        <div className="hero-dark-actions">
                            <Link href="/services" className="hero-dark-cta-primary">
                                See how we build
                                <span className="hero-dark-cta-icon">
                                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                                </span>
                            </Link>
                            <Link href="/contact" className="hero-dark-cta-secondary">
                                Tell us your idea
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
