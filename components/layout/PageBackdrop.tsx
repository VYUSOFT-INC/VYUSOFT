/**
 * PageBackdrop — initial state.
 *
 * No animation. No canvas. No shaders. Just a static dark fixed layer
 * that sits behind the page content. Dark-transparent sections let it
 * show through; warm-paper sections cover it.
 *
 * The scroll-driven generative motion system has been intentionally
 * removed pending a different direction (likely: a properly designed
 * 3D asset with baked materials + lighting, rendered with minimal
 * motion, rather than procedural shader effects).
 *
 * Accepts `accent` so call sites don't need to change when the
 * animation is rebuilt later.
 */

type Props = {
    accent?: string;
};

export function PageBackdrop(_props: Props = {}) {
    return (
        <div
            aria-hidden="true"
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                /* Static dark base — supports the dark-transparent sections
                   that expect a dark backdrop to show through. No motion. */
                background:
                    "radial-gradient(ellipse 110% 80% at 60% 40%, #131a28 0%, #0a0f1a 60%, #050810 100%)",
            }}
        />
    );
}
