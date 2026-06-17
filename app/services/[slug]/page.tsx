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
import { ServiceHeroNew } from "./_components/ServiceHeroNew";
import { ServiceSpecSheet } from "./_components/ServiceSpecSheet";
import { ServiceSpine } from "./_components/ServiceSpine";
import { ServiceStackLedger } from "./_components/ServiceStackLedger";

const SERVICE_HERO_IMAGES: Record<string, { src: string; position?: string; brightness?: number }> = {
    "artificial-intelligence": { src: "/sections/service images/ai hero.jpeg", position: "70% center" },
    "cyber-security": { src: "/sections/service images/cyber security hero.jpeg", position: "80% 40%", brightness: 0.5 },
    cloud: { src: "/sections/service images/cloud hero.jpeg", position: "75% center" },
    data: { src: "/sections/service images/data hero.jpeg", position: "70% center" },
    devops: { src: "/sections/service images/devops hero.jpeg", position: "75% center", brightness: 0.6 },
    "network-solutions": { src: "/sections/service images/network solutions.jpeg" },
    "digital-solutions-web-app": { src: "/sections/service images/web & app.jpeg", position: "75% center" },
    "ui-ux-development": { src: "/sections/service images/ui ux.jpeg", position: "85% 55%", brightness: 0.45 },
    "cross-platform-apps": { src: "/sections/service images/cross app dev.png", position: "75% center", brightness: 0.6 },
    "operational-tools": { src: "/sections/service images/operational tools.png", position: "72% 45%", brightness: 0.55 },
    "backup-data-protection": { src: "/sections/service images/data and backup.jpeg", position: "78% 48%", brightness: 0.55 },
    "wearables": { src: "/sections/service images/wearables.png", position: "75% 50%", brightness: 0.5 },
    "aws-microsoft-google": { src: "/sections/service images/aws azure.png", position: "70% 48%", brightness: 0.55 },
    "payment-solutions": { src: "/sections/service images/payment solutions.png", position: "75% center" },
    "software-quality-testing": { src: "/sections/service images/quality testing.png", position: "75% 45%", brightness: 0.55 },
    "info-xchange": { src: "/sections/service images/info exchange.png", position: "75% center" },
    "iot-digital-engineering": { src: "/sections/service images/iot.jpeg", position: "75% center" },
    "blockchain-app-development": { src: "/sections/service images/block chain.png", position: "72% 46%", brightness: 0.55 },
    "erps": { src: "/sections/service images/erps.png", position: "75% center" },
    "enterprise-solutions": { src: "/sections/service images/enterprise solutions.png", position: "75% 48%", brightness: 0.5 },
    "cognitive-business-operation": { src: "/sections/service images/cognitive business ops.png", position: "75% center" },
    "vyu-migrations": { src: "/sections/service images/vyu migrations.png", position: "75% center" },
    "digital-architect": { src: "/sections/service images/digital achitect.png", position: "75% center" },
    "end-user-computing": { src: "/sections/service images/end user computing.png", position: "78% 50%", brightness: 0.55 },
    "vyu-startup-solutions": { src: "/sections/service images/startup solutions.png", position: "75% 48%", brightness: 0.55 },
    "prototyping": { src: "/sections/service images/prototyping.png", position: "75% 48%", brightness: 0.55 },
    "consulting": { src: "/sections/service images/consulting.png", position: "75% center" },
    "hr-services": { src: "/sections/service images/hr services.png", position: "72% 50%", brightness: 0.55 },
    "business-development": { src: "/sections/service images/business development.png", position: "75% center" },
    "digital-marketing-monitoring": { src: "/sections/service images/digital marketing.png", position: "78% 48%", brightness: 0.55 },
};

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

    /* ── New template — for services with extended content (spine/stack) ── */
    if (content?.spine && content?.stack) {
        return (
            <>
                <PageBackdrop accent={service.accent} />

                <ServiceHeroNew
                    practice={service.title}
                    eyebrow={`PRACTICE / ${service.group.toUpperCase()}`}
                    headline={heroTitle}
                    hook={content.hook}
                    intro={heroIntro}
                    accent={service.accent}
                    capabilities={features.map((f) => f.title)}
                    heroImage={SERVICE_HERO_IMAGES[slug]?.src}
                    heroImagePosition={SERVICE_HERO_IMAGES[slug]?.position}
                    heroImageBrightness={SERVICE_HERO_IMAGES[slug]?.brightness}
                />

                <ServiceSpecSheet
                    practice={service.title}
                    accent={service.accent}
                    capabilities={features}
                />

                <ServiceSpine
                    practice={service.title}
                    accent={service.accent}
                    phases={content.spine}
                />

                <ServiceStackLedger
                    practice={service.title}
                    accent={service.accent}
                    stack={content.stack}
                />

                <ClosingCta
                    title={`Bring your ${service.title.toLowerCase()} brief.`}
                    subtitle="A principal responds within one business day."
                    primary={{ label: "Start the conversation", href: "/contact" }}
                    secondary={{ label: "See all services", href: "/services" }}
                    media="/sections/service images/services cta.png"
                />

                <SiteFooter />
            </>
        );
    }

    /* ── Legacy template (services without extended content) ──────────── */
    return (
        <>
            <PageBackdrop accent={service.accent} />

            <ServiceHero
                eyebrow={service.title}
                title={heroTitle}
                description={heroIntro}
                accent={service.accent}
                heroImage={SERVICE_HERO_IMAGES[slug]?.src}
                heroImagePosition={SERVICE_HERO_IMAGES[slug]?.position}
                heroImageBrightness={SERVICE_HERO_IMAGES[slug]?.brightness}
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
                media="/sections/service images/services cta.png"
            />

            <SiteFooter />
        </>
    );
}
