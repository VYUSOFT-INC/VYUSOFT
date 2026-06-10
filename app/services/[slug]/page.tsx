import { notFound } from "next/navigation";
import { allServiceSlugs, getServiceBySlug } from "@/lib/services";
import { stackForService, relatedServices } from "@/lib/serviceMeta";
import { getServicePageContent } from "@/lib/servicePages";
import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { StackGrid } from "@/components/templates/StackGrid";
import { RelatedCards } from "@/components/templates/RelatedCards";
import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ServiceHero } from "./_components/ServiceHero";
import { ServiceCapabilities } from "./_components/ServiceCapabilities";

export function generateStaticParams() {
    return allServiceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    if (!service) return { title: "Service" };
    return {
        title: service.title,
        description: service.description,
    };
}

export default async function ServicePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    if (!service) notFound();

    const content = getServicePageContent(service.slug);
    const stack = stackForService(service.slug, service.group);
    const related = relatedServices(service.slug, service.group).map((r) => ({
        slug: r.slug,
        title: r.title,
        href: `/services/${r.slug}`,
        subtitle: r.group,
        description: getServiceBySlug(r.slug)?.description,
    }));

    const heroTitle = content?.headline ?? service.title;
    const heroIntro = content?.intro ?? service.description;
    const features = content?.services ?? service.features;

    return (
        <>
            <PageBackdrop accent={service.accent} />

            <ServiceHero
                eyebrow={service.title}
                title={heroTitle}
                description={heroIntro}
                accent={service.accent}
            />

            <ServiceCapabilities
                eyebrow="Services"
                title="What we deliver."
                accent={service.accent}
                features={features}
            />

            <StackGrid
                eyebrow={`STACK · ${service.group.toUpperCase()}`}
                title="What we reach for."
                description={`The toolchain we default to for ${service.title.toLowerCase()} engagements. Substitute or extend per your stack — we are tools-agnostic at the architecture level.`}
                items={stack}
            />

            <RelatedCards
                eyebrow={`MORE · ${service.group.toUpperCase()}`}
                title="Adjacent practices in this group."
                description="Sister practices that often share patterns or platforms with this one."
                items={related}
            />

            <ClosingCta
                title={`Bring your ${service.title.toLowerCase()} brief.`}
                subtitle="A principal responds within one business day."
                primary={{ label: "Start the conversation", href: "/contact" }}
                secondary={{ label: "See all services", href: "/services" }}
            />

            <SiteFooter />
        </>
    );
}
