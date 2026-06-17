"use client";

import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function FinalCta() {
    return (
        <section className="final-cta" aria-label="Closing" data-theme="dark">
            <ClosingCta
                title="Start with a paragraph."
                subtitle="A principal replies within one business day &mdash; no discovery-call gate."
                primary={{ label: "Start a Project", href: "/contact" }}
                secondary={{ label: "Learn More", href: "/services" }}
                media="/media/home/final-cta-handshake.jpg"
            />
            <SiteFooter />
        </section>
    );
}
