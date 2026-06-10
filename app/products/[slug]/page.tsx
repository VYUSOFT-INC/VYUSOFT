import { notFound } from "next/navigation";
import { allProductSlugs, getProductBySlug } from "@/lib/products";
import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { OutcomesStrip } from "@/components/templates/OutcomesStrip";
import { MarqueeStrip } from "@/components/templates/MarqueeStrip";
import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal } from "@/components/ui/Reveal";
import { ProductHero } from "../_components/ProductHero";
import { ProductFeatures } from "../_components/ProductFeatures";

export function generateStaticParams() {
    return allProductSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) return { title: "Product" };
    return {
        title: product.name,
        description: product.description,
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) notFound();

    const isApp = product.kind === "app";

    const marqueeTokens = isApp
        ? [
              product.name.toUpperCase(),
              product.category.toUpperCase(),
              "IN DEVELOPMENT",
              "A VYUSOFT APP",
              "AVAILABLE SOON",
              "BUILT IN-HOUSE",
          ]
        : [
              product.name.toUpperCase(),
              product.category.toUpperCase(),
              "ENGAGEMENT MODEL",
              "SENIOR-LED",
              "ONE ACCOUNTABLE PRINCIPAL",
          ];

    return (
        <>
            <PageBackdrop accent={product.accent} />

            <ProductHero
                name={product.name}
                category={product.category}
                tagline={product.tagline}
                positioning={product.positioning}
                description={product.description}
                status={product.status}
                accent={product.accent}
                image={product.image}
                secondary={product.secondaryCta}
            />

            <MarqueeStrip items={marqueeTokens} accent={product.accent} variant="dark" />

            {/* Overview — warm-paper editorial split */}
            <section
                className="inner-light product-overview"
                aria-labelledby="product-overview-heading"
                data-theme="light"
                style={{ ["--accent" as string]: product.accent }}
            >
                <div className="inner-section-inner">
                    <div className="product-overview-grid">
                        <div>
                            <Reveal>
                                <p className="inner-section-eyebrow">OVERVIEW</p>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <h2
                                    id="product-overview-heading"
                                    className="inner-section-headline"
                                >
                                    {product.tagline}
                                </h2>
                            </Reveal>
                        </div>
                        <Reveal delay={0.16}>
                            <div className="product-overview-body">
                                <p className="product-overview-lede">{product.overview}</p>
                                <p className="product-overview-audience">
                                    {product.audience}
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Engagement model carries real descriptive numbers; apps are
                pre-launch, so they show an honest "in development" band instead. */}
            {product.metrics ? (
                <OutcomesStrip
                    eyebrow="BY THE NUMBERS"
                    title="What it delivers."
                    description="Descriptive figures for how the engagement runs — not performance claims."
                    outcomes={product.metrics}
                />
            ) : (
                <StatusBand name={product.name} accent={product.accent} />
            )}

            <ProductFeatures
                name={product.name}
                accent={product.accent}
                features={product.features}
            />

            {isApp ? (
                <ClosingCta
                    title={`${product.name} is coming soon.`}
                    subtitle="Tell us how you'd use it — we'll keep you posted."
                    primary={{ label: "Register interest", href: "/contact" }}
                    secondary={{ label: "See all products", href: "/products" }}
                />
            ) : (
                <ClosingCta
                    title={`Want ${product.name} for your business?`}
                    subtitle="Tell us what you're trying to ship."
                    primary={{ label: "Start a Project", href: "/contact" }}
                    secondary={
                        product.secondaryCta ?? {
                            label: "See all products",
                            href: "/products",
                        }
                    }
                />
            )}

            <SiteFooter />
        </>
    );
}

/* Honest pre-launch band shown for apps still in development, in place of
   the metrics strip. Dark transparent over the PageBackdrop. */
function StatusBand({ name, accent }: { name: string; accent: string }) {
    return (
        <section
            className="inner-dark product-status"
            aria-labelledby="product-status-heading"
            data-theme="dark"
            style={{ ["--accent" as string]: accent }}
        >
            <div className="inner-section-inner">
                <div className="product-status-inner">
                    <Reveal>
                        <p className="inner-section-eyebrow">STATUS</p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <h2
                            id="product-status-heading"
                            className="inner-section-headline product-status-headline"
                        >
                            In development. Available soon.
                        </h2>
                    </Reveal>
                    <Reveal delay={0.16}>
                        <p className="inner-section-body product-status-body">
                            {name} is being built in-house right now. We&rsquo;re shaping
                            it with early users — if you&rsquo;d want a first look or have
                            a use case that should influence it, tell us how you&rsquo;d
                            use it and we&rsquo;ll keep you posted.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
