/**
 * PhaseMediaSlot — the designed placeholder for the phase's visual.
 *
 * Layout ships first; the user generates a unique image per phase once
 * the layout is approved (hard rule: no visual is ever reused across
 * the site). Until then this panel must look intentional: an accent-
 * tinted atmosphere with the phase ordinal and a quiet production
 * note. Swapping in the real image later = replacing this component's
 * body with an <Image>, nothing else moves.
 */

export function PhaseMediaSlot({
    phaseNumber,
    title,
    accent,
    image,
    imagePosition,
}: {
    phaseNumber: number;
    title: string;
    accent: string;
    image?: string;
    imagePosition?: string;
}) {
    return (
        <div
            className="phase-media-slot"
            role="img"
            aria-label={`${title} phase visual`}
            style={{ ["--accent" as string]: accent }}
        >
            {image ? (
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${encodeURI(image)})`,
                        backgroundPosition: imagePosition || "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            ) : (
                <>
                    <svg className="phase-media-crosshair" aria-hidden="true" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="60" cy="60" r="32" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
                        <circle cx="60" cy="60" r="4" fill="currentColor" fillOpacity="0.6" />
                        <line x1="60" y1="20" x2="60" y2="44" stroke="currentColor" strokeWidth="0.75" />
                        <line x1="60" y1="76" x2="60" y2="100" stroke="currentColor" strokeWidth="0.75" />
                        <line x1="20" y1="60" x2="44" y2="60" stroke="currentColor" strokeWidth="0.75" />
                        <line x1="76" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="0.75" />
                    </svg>
                    <span className="phase-media-ordinal">
                        {String(phaseNumber).padStart(2, "0")}
                    </span>
                </>
            )}
        </div>
    );
}
