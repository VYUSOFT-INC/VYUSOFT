import Image from "next/image";

/**
 * ClientsStrip — compact single-band trust strip.
 *
 * Layout mirrors the reference: heading on the LEFT, a horizontal logo
 * marquee filling the rest of the row on the RIGHT. One thin band, not a
 * full-height grid. The marquee keeps the carousel motion requested; the
 * track is duplicated so a single translateX keyframe loops seamlessly.
 */

const LOGOS: { src: string; alt: string }[] = [
    { src: "/trust/kink-2.png", alt: "Kinko Architecture" },
    { src: "/trust/Garret-2.png", alt: "Garreth" },
    { src: "/trust/square-pixel-2.png", alt: "Square Pixel" },
    { src: "/trust/Domoo-2.png", alt: "Domo" },
];

// Three copies per track keeps the strip dense at any width; the track
// itself is rendered twice for the seamless -100% loop.
const TRACK = [...LOGOS, ...LOGOS, ...LOGOS];

export function ClientsStrip() {
    return (
        <section
            className="clients-strip"
            aria-labelledby="clients-strip-heading"
            data-theme="dark"
        >
            <div className="clients-strip-content">
                <h2 id="clients-strip-heading" className="clients-strip-title">
                    Trusted by leading teams worldwide.
                </h2>

                <div
                    className="clients-marquee"
                    role="region"
                    aria-label="Selected clients"
                >
                    <div className="clients-marquee-track" aria-hidden="true">
                        {TRACK.map((logo, i) => (
                            <span key={`a-${i}`} className="clients-marquee-item">
                                <Image
                                    src={logo.src}
                                    alt=""
                                    width={120}
                                    height={34}
                                    className="clients-marquee-logo"
                                    style={{ height: 34, width: "auto" }}
                                />
                            </span>
                        ))}
                    </div>
                    <div className="clients-marquee-track" aria-hidden="true">
                        {TRACK.map((logo, i) => (
                            <span key={`b-${i}`} className="clients-marquee-item">
                                <Image
                                    src={logo.src}
                                    alt=""
                                    width={120}
                                    height={34}
                                    className="clients-marquee-logo"
                                    style={{ height: 34, width: "auto" }}
                                />
                            </span>
                        ))}
                    </div>
                    <ul className="sr-only">
                        {LOGOS.map((l) => (
                            <li key={l.alt}>{l.alt}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
