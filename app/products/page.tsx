import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { PageHero } from "@/components/templates/PageHero";
import { ClosingCta } from "@/components/templates/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { allProducts } from "@/lib/products";
import { ProductShowcase } from "./_components/ProductShowcase";

export const metadata = {
    title: "Products",
    description:
        "VyuSoft's in-house product portfolio: Vyudine, Mivyu, and Vyuflo — applications in active development — plus the VYU Startup Solutions engagement model. We back our consulting with products we build ourselves.",
};

/**
 * /products — the in-house portfolio. Each product gets its own generous,
 * landing-page-style showcase (alternating image side + theme) rather than
 * a uniform card grid, so the page reads as built, not generated. Apps use
 * their real screenshots; the engagement model uses a typographic stack.
 */
export default function ProductsIndexPage() {
    return (
        <>
            <PageBackdrop />

            <PageHero
                eyebrow="PRODUCTS"
                title={"We don't just pitch —\nwe build our own."}
                description="Three applications in active development under the VyuSoft label, plus a senior-led engagement track for funded founders. We back our consulting with products we build, run, and stand behind — so we feel the same edges our clients do."
                cta={{ label: "Start a Project", href: "/contact" }}
                secondary={{ label: "See our services", href: "/services" }}
                heroImage="/sections/products/products index.png"
                heroImagePosition="75% center"
                marginalia={[
                    "BUILT IN-HOUSE",
                    "SHIPPED, NOT PITCHED",
                    "AVAILABLE SOON",
                ]}
            />

            {allProducts.map((product, i) => (
                <ProductShowcase key={product.slug} product={product} index={i} />
            ))}

            <ClosingCta
                title="Have a product idea of your own?"
                subtitle="We&rsquo;re building ours the same way we&rsquo;d build yours."
                primary={{ label: "Start a Project", href: "/contact" }}
                secondary={{ label: "See our services", href: "/services" }}
                media="/sections/products/products cta.png"
            />

            <SiteFooter />
        </>
    );
}
