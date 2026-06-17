"use client";

import { useEffect, useRef } from "react";

/**
 * HeroFilm — the brand film as part of the BACKGROUND layer.
 *
 * Renders fixed behind all sections (same layer family as PageBackdrop,
 * painted just above it), exactly where the scroll-driven backdrop was
 * always meant to live. The hero's transparent section lets it show
 * through; as the hero scrolls away the film dissolves out, handing
 * back to the dark gradient for the sections below. Cream sections
 * cover it like everything else in the backdrop system. Page content
 * and nav are untouched — this layer has no layout footprint.
 *
 * Loop: two stacked players cross-dissolve near the clip's end (no
 * restart cut), with an `ended` backstop so a throttled tab can never
 * freeze the loop on its last frame. The film pauses while invisible.
 * Honors prefers-reduced-motion by holding a single still frame.
 */

const FADE = 0.9; /* seconds of cross-dissolve at the loop point */

/* Connection-aware source pick: data-saver visitors keep the poster only
   (no video bytes spent); slow connections and small screens get the
   3.5MB 720p rendition; everyone else the 10.6MB 1080p. */
type NetInfo = { saveData?: boolean; effectiveType?: string };
function pickSource(): string | null {
    const net = (navigator as Navigator & { connection?: NetInfo }).connection;
    if (net?.saveData) return null;
    const type = net?.effectiveType ?? "";
    if (type.includes("2g")) return null;
    if (type === "3g" || window.innerWidth < 760) return "/media/hero-film-720.mp4";
    return "/media/hero-film.mp4";
}

export function HeroFilm() {
    const rootRef = useRef<HTMLDivElement>(null);
    const videoARef = useRef<HTMLVideoElement>(null);
    const videoBRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        const a = videoARef.current;
        const b = videoBRef.current;
        if (!root || !a || !b) return;

        const src = pickSource();
        if (!src) return; /* poster-only: the still hero, zero video data */
        a.src = src;
        b.src = src;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let active = a;
        let standby = b;
        let raf = 0;
        let standbyStarted = false;
        let visible = true;

        active.style.opacity = "1";
        standby.style.opacity = "0";
        const tryPlay = (v: HTMLVideoElement) => {
            const p = v.play();
            if (p) p.catch(() => undefined);
        };

        if (reduce) {
            a.pause();
            a.currentTime = 0.2;
        } else {
            tryPlay(active);
        }

        const onEnded = (ev: Event) => {
            if (ev.target !== active) return;
            active.style.opacity = "0";
            standby.currentTime = 0;
            tryPlay(standby);
            standby.style.opacity = "1";
            const swap = active;
            active = standby;
            standby = swap;
            standbyStarted = false;
        };
        a.addEventListener("ended", onEnded);
        b.addEventListener("ended", onEnded);

        const tick = () => {
            /* Scroll-linked dissolve: fully present while the hero owns
               the viewport, gone before the next section settles in. */
            const hero = document.querySelector(".hero-dark");
            const vh = Math.max(1, window.innerHeight);
            const bottom = hero ? hero.getBoundingClientRect().bottom : 0;
            const fade = Math.max(0, Math.min(1, (bottom / vh - 0.3) / 0.45));
            root.style.opacity = String(fade);

            const nowVisible = fade > 0.01;
            if (nowVisible !== visible) {
                visible = nowVisible;
                if (!reduce) {
                    if (visible) tryPlay(active);
                    else {
                        active.pause();
                        standby.pause();
                    }
                }
            }

            if (!reduce && visible) {
                const dur = active.duration;
                if (Number.isFinite(dur) && dur > 0) {
                    const remaining = dur - active.currentTime;
                    if (remaining <= FADE) {
                        if (!standbyStarted) {
                            standby.currentTime = 0;
                            tryPlay(standby);
                            standbyStarted = true;
                        }
                        const k = Math.max(0, Math.min(1, 1 - remaining / FADE));
                        standby.style.opacity = String(k);
                        active.style.opacity = String(1 - k);
                        if (remaining <= 0.06 || active.ended) {
                            active.pause();
                            active.style.opacity = "0";
                            standby.style.opacity = "1";
                            const swap = active;
                            active = standby;
                            standby = swap;
                            standbyStarted = false;
                        }
                    }
                }
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            a.removeEventListener("ended", onEnded);
            b.removeEventListener("ended", onEnded);
            a.pause();
            b.pause();
        };
    }, []);

    return (
        <div className="hero-film" ref={rootRef} aria-hidden="true">
            <video
                ref={videoARef}
                poster="/media/hero-poster.jpg"
                muted
                playsInline
                preload="auto"
            />
            <video ref={videoBRef} muted playsInline preload="none" />
            <div className="hero-film-scrim" />
        </div>
    );
}
