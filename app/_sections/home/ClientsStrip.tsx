"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * ClientsStrip — "Trusted by leading teams worldwide."
 *
 * 7 client logos as glassmorphism cards on the same dark backdrop continued
 * from ServicesIntro. Static row (no marquee) like PeachWeb's frame 120.
 */

/* Real VyuSoft client logos — 4 unique, no duplicates. */
const LOGOS: { src: string; alt: string; ariaHidden?: boolean }[] = [
    { src: "/trust/kink-2.png", alt: "Kinko Architecture" },
    { src: "/trust/Garret-2.png", alt: "Garreth" },
    { src: "/trust/square-pixel-2.png", alt: "Square Pixel" },
    { src: "/trust/Domoo-2.png", alt: "Domo" },
];

export function ClientsStrip() {
    return (
        <section className="clients-strip" aria-labelledby="clients-strip-heading" data-theme="dark">
            <div className="clients-strip-content">
                <Reveal>
                    <div className="clients-strip-header">
                        <p className="clients-strip-eyebrow">OUR CLIENTS</p>
                        <h2
                            id="clients-strip-heading"
                            className="clients-strip-title"
                        >
                            Trusted by leading
                            <br />
                            teams worldwide.
                        </h2>
                    </div>
                </Reveal>

                <Reveal delay={0.1} y={32}>
                    <div className="clients-strip-grid">
                        {LOGOS.map((logo, i) => (
                            <Reveal
                                key={`${logo.alt}-${i}`}
                                delay={0.07 * i}
                                y={20}
                                duration={0.55}
                            >
                                <div
                                    className="clients-strip-card"
                                    aria-hidden={logo.ariaHidden || undefined}
                                >
                                    <Image
                                        src={logo.src}
                                        alt={logo.ariaHidden ? "" : logo.alt}
                                        width={120}
                                        height={48}
                                        className="clients-strip-logo"
                                    />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
