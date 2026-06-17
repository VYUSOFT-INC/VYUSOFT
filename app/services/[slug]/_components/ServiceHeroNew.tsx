import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ServiceHeroNew({
    practice,
    eyebrow,
    headline,
    hook,
    intro,
    accent,
    capabilities,
    heroImage,
    heroImagePosition,
    heroImageBrightness,
}: {
    practice: string;
    eyebrow: string;
    headline: string;
    hook?: string;
    intro: string;
    accent: string;
    capabilities: string[];
    heroImage?: string;
    heroImagePosition?: string;
    heroImageBrightness?: number;
}) {
    return (
        <section
            className={`svp-hero${heroImage ? " svp-hero--media" : ""}`}
            data-theme="dark"
            aria-label={`${practice} service overview`}
            style={{ ["--accent" as string]: accent }}
        >
            {heroImage && (
                <>
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 0,
                            pointerEvents: "none",
                            backgroundImage: `url(${encodeURI(heroImage)})`,
                            backgroundPosition: heroImagePosition || "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            maskImage: "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                            filter: heroImageBrightness != null ? `brightness(${heroImageBrightness})` : undefined,
                        }}
                    />
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 0,
                            pointerEvents: "none",
                            background: "linear-gradient(to right, oklch(7% 0.018 270 / 0.94) 0%, oklch(7% 0.018 270 / 0.82) 40%, oklch(7% 0.018 270 / 0.45) 70%, transparent 100%), linear-gradient(to top, oklch(7% 0.018 270 / 0.75) 0%, oklch(7% 0.018 270 / 0.35) 35%, transparent 60%)",
                        }}
                    />
                </>
            )}
            <div className="svp-hero-inner" style={heroImage ? { position: "relative", zIndex: 1 } : undefined}>
                <div className="svp-hero-text">
                    <p className="svp-hero-eyebrow">
                        <span className="svp-hero-tick" aria-hidden="true" />
                        {eyebrow}
                    </p>
                    {hook ? (
                        <p className="svp-hero-hook">{hook}</p>
                    ) : null}
                    <h1 className="svp-hero-title">{headline}</h1>
                    <p className="svp-hero-intro">{intro}</p>
                    <div className="svp-hero-actions">
                        <Link href="/contact" className="svcd-hero-cta-primary">
                            Discuss your use case
                            <span className="svcd-hero-cta-icon">
                                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                            </span>
                        </Link>
                        <Link href="/services" className="svcd-hero-cta-secondary">
                            Explore all services
                        </Link>
                    </div>
                    <ol className="svp-hero-mini">
                        {capabilities.slice(0, 3).map((c, i) => (
                            <li key={c}>
                                <span className="svp-hero-mini-ord">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="svp-hero-mini-text">{c}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
