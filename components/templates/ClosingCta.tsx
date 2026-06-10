"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type ClosingCtaProps = {
    /** Big closing line. Two-line format reads strongest. */
    title: string;
    /** Optional second line (rendered with <br/>). */
    subtitle?: string;
    /** Primary CTA — usually links to /contact. */
    primary?: { label: string; href: string };
    /** Optional secondary ghost CTA. */
    secondary?: { label: string; href: string };
};

/**
 * ClosingCta — the "Ready to transform?" stretch every page ends with.
 *
 * Dark transparent panel (PageBackdrop video shows through). Customisable
 * copy so each page can speak to its own context — "Ready to migrate to
 * the cloud?", "Working in banking?", "Bring us a hard problem.".
 *
 * Pulled out of FinalCta so /services, /industries, /about etc. can use it.
 */
export function ClosingCta({
    title,
    subtitle,
    primary = { label: "Start a Project", href: "/contact" },
    secondary,
}: ClosingCtaProps) {
    return (
        <section className="closing-cta" aria-labelledby="closing-cta-heading" data-theme="dark">
            <div className="closing-cta-inner">
                <Reveal delay={0.05}>
                    <h2 id="closing-cta-heading" className="closing-cta-headline">
                        {title}
                        {subtitle && (
                            <>
                                <br />
                                {subtitle}
                            </>
                        )}
                    </h2>
                </Reveal>

                <Reveal delay={0.15}>
                    <div className="closing-cta-actions">
                        <Link href={primary.href} className="closing-cta-primary">
                            {primary.label}
                            <span className="closing-cta-primary-icon">
                                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                            </span>
                        </Link>
                        {secondary && (
                            <Link href={secondary.href} className="closing-cta-secondary">
                                {secondary.label}
                            </Link>
                        )}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
