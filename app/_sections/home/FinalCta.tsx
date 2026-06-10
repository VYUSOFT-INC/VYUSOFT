"use client";

import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * FinalCta — the home's closing stretch. Now a thin composition of the
 * two reusable pieces every page ends with:
 *
 *   <ClosingCta />  — big "Ready to transform?" closer
 *   <SiteFooter /> — VYUSOFT colophon + menu + socials
 *
 * Both pieces are dark-transparent over the page-wide <PageBackdrop>.
 * Previously this component owned the moon/glow div + mini-nav — those
 * have been removed: PageBackdrop now supplies the moon (via the
 * continuous video), and SiteHeader is fixed at top so the mini-nav is
 * always visible without a duplicate inside FinalCta.
 */
export function FinalCta() {
    return (
        <section className="final-cta" aria-label="Closing" data-theme="dark">
            <ClosingCta
                title="Start with a paragraph."
                subtitle="A principal replies within one business day &mdash; no discovery-call gate."
                primary={{ label: "Start a Project", href: "/contact" }}
                secondary={{ label: "Learn More", href: "/services" }}
            />
            <SiteFooter />
        </section>
    );
}
