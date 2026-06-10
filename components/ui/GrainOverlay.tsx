"use client";

import { useEffect, useState } from "react";

/**
 * Animated SVG film grain overlay.
 * The CSS `prefers-reduced-motion` media query does not affect SVG `<animate>`
 * elements, so we gate the animate child manually via JS.
 */
export function GrainOverlay() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        setAnimated(!reduced);
    }, []);

    return (
        <svg
            className="grain"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
        >
            <filter id="grain-filter">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.92"
                    numOctaves="2"
                    stitchTiles="stitch"
                >
                    {animated && (
                        <animate
                            attributeName="baseFrequency"
                            dur="6s"
                            values="0.92;0.95;0.9;0.92"
                            repeatCount="indefinite"
                        />
                    )}
                </feTurbulence>
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-filter)" />
        </svg>
    );
}
