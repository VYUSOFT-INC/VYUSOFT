import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { Hero } from "./_sections/home/Hero";
import { ServicesIntro } from "./_sections/home/ServicesIntro";
import { ClientsStrip } from "./_sections/home/ClientsStrip";
import { Pillars } from "./_sections/home/Pillars";
import { ProcessSection } from "./_sections/home/ProcessSection";
import { Products } from "./_sections/home/Products";
import { WhyChooseUs } from "./_sections/home/WhyChooseUs";
import { Testimonials } from "./_sections/home/Testimonials";
import { IndustriesGrid } from "./_sections/home/IndustriesGrid";
import { FinalCta } from "./_sections/home/FinalCta";

/**
 * Home — single fixed atmospheric backdrop runs the entire scroll. White
 * sections cover it; dark sections are transparent and let it show through.
 *
 * Section rhythm (dark = transparent over backdrop, white = opaque lid):
 *   Hero · ServicesIntro · ClientsStrip       — dark
 *   Pillars · ProcessSection                  — white
 *   Products · WhyChooseUs                    — dark
 *   Testimonials · IndustriesGrid             — white
 *   FinalCta                                  — dark
 *
 * Each section is its own file in ./_sections/home/ and owns its data
 * and motion. This file is the page composition only — no rendering logic.
 */
export default function HomePage() {
    return (
        <>
            <PageBackdrop />

            <Hero />
            <ServicesIntro />
            <ClientsStrip />

            <Pillars />
            <ProcessSection />

            <Products />
            <WhyChooseUs />

            <Testimonials />
            <IndustriesGrid />

            <FinalCta />
        </>
    );
}
