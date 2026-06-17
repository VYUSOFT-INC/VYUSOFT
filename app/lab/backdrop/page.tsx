"use client";

import { useEffect, useRef } from "react";

/**
 * Look-test v28 — the "fast-forward film" (pencil.mp4) placed in the
 * hero with proper execution: full-bleed, seamless dual-player blend at
 * the loop point (the montage cuts back to the pencil shot through a
 * soft dissolve instead of a hard jump), a left-column scrim so the
 * headline holds against both the ivory and the dark shots, white type.
 * Sections below are plain paper — no video anywhere else.
 */

const FADE = 0.9;

export default function BackdropLab() {
    const videoARef = useRef<HTMLVideoElement>(null);
    const videoBRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const a = videoARef.current;
        const b = videoBRef.current;
        if (!a || !b) return;

        let active = a;
        let standby = b;
        let raf = 0;
        let standbyStarted = false;

        active.style.opacity = "1";
        standby.style.opacity = "0";
        const tryPlay = (v: HTMLVideoElement) => {
            const p = v.play();
            if (p) p.catch(() => undefined);
        };
        tryPlay(active);

        /* Backstop: if the tab was hidden and the fade clock never ran,
           swap instantly at the end instead of freezing on last frame. */
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
        <div className="lab-root">
            <style>{`
                .lab-root {
                    position: relative;
                    overflow-x: hidden;
                    color: #1c2030;
                    background: #faf7f2;
                }
                .lab-hero {
                    position: relative;
                    min-height: 100vh;
                    overflow: hidden;
                    display: flex;
                    align-items: flex-end;
                    padding: 8rem 7vw 7rem;
                    background: #171a24;
                }
                .lab-hero video {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 0;
                }
                .lab-scrim {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                    background:
                        linear-gradient(90deg, rgba(13, 16, 26, 0.52) 0%, rgba(13, 16, 26, 0.28) 34%, transparent 62%),
                        linear-gradient(0deg, rgba(13, 16, 26, 0.42) 0%, transparent 36%),
                        radial-gradient(260px 200px at 100% 100%, rgba(13, 16, 26, 0.55), transparent 72%);
                }
                .lab-hero .lab-inner { position: relative; z-index: 2; }
                .lab-hero .lab-kicker { color: rgba(246, 244, 240, 0.66); }
                .lab-hero .lab-title { color: #faf7f2; }
                .lab-hero .lab-copy { color: rgba(246, 244, 240, 0.78); }
                .lab-section {
                    min-height: 110vh;
                    display: flex;
                    align-items: center;
                    padding: 8rem 7vw;
                    background: #faf7f2;
                    color: #0e0e14;
                }
                .lab-section.alt { background: #f4efe4; }
                .lab-inner { width: min(1280px, 100%); margin: 0 auto; }
                .lab-kicker {
                    margin: 0 0 1.1rem;
                    font-family: var(--font-jetbrains), monospace;
                    font-size: 0.7rem;
                    font-weight: 500;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: #9a9aa3;
                }
                .lab-title {
                    max-width: 16ch;
                    margin: 0;
                    font-family: var(--font-sans), sans-serif;
                    font-size: clamp(2.4rem, 5.6vw, 5.2rem);
                    font-weight: 540;
                    line-height: 1.03;
                    letter-spacing: -0.035em;
                    color: #0e0e14;
                }
                .lab-copy {
                    max-width: 42ch;
                    margin: 1.4rem 0 0;
                    font-size: clamp(1rem, 1.3vw, 1.12rem);
                    line-height: 1.62;
                    color: #5a5a66;
                }
                .lab-badge {
                    position: fixed;
                    left: 18px;
                    bottom: 16px;
                    z-index: 4;
                    font-family: var(--font-jetbrains), monospace;
                    font-size: 0.62rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: rgba(60, 66, 92, 0.5);
                    pointer-events: none;
                    mix-blend-mode: difference;
                }
                @media (max-width: 760px) {
                    .lab-hero, .lab-section { padding: 6rem 1.4rem; }
                    .lab-title { font-size: clamp(2.2rem, 12vw, 3.8rem); }
                }
            `}</style>

            <section className="lab-hero">
                <video ref={videoARef} src="/lab-videos/master.mp4" muted playsInline preload="auto" autoPlay />
                <video ref={videoBRef} src="/lab-videos/master.mp4" muted playsInline preload="auto" />
                <div className="lab-scrim" aria-hidden="true" />
                <div className="lab-inner">
                    <p className="lab-kicker">01 / The film</p>
                    <h1 className="lab-title">Your End-to-End Technology Partner.</h1>
                    <p className="lab-copy">
                        Stand-in for the home hero. The film runs full-bleed
                        behind the headline, looping through a soft dissolve.
                    </p>
                </div>
            </section>

            <section className="lab-section">
                <div className="lab-inner">
                    <p className="lab-kicker">02 / Plain section</p>
                    <h2 className="lab-title">No video here.</h2>
                    <p className="lab-copy">
                        Warm paper, exactly like the site&apos;s opaque sections.
                    </p>
                </div>
            </section>

            <section className="lab-section alt">
                <div className="lab-inner">
                    <p className="lab-kicker">03 / Plain section</p>
                    <h2 className="lab-title">Still no video.</h2>
                    <p className="lab-copy">
                        A second paper block to feel the rhythm after the
                        film hero.
                    </p>
                </div>
            </section>

            <section className="lab-section">
                <div className="lab-inner">
                    <p className="lab-kicker">04 / Close</p>
                    <h2 className="lab-title">Where the site would end.</h2>
                    <p className="lab-copy">
                        Footer territory. The hero film is long gone above.
                    </p>
                </div>
            </section>

            <span className="lab-badge">Look-test v28 / the film hero / lab only</span>
        </div>
    );
}
