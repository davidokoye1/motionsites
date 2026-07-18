// SmoothScroll — Framer code component (Lenis)
// Port of src/lib/scroll.js for the architectural Framer project.
// Drop ONCE on each page (e.g. pinned in a corner, 1x1). It renders nothing
// visible and enables Lenis smooth scrolling on the live site / preview only —
// the Framer canvas is left untouched.
// Respects prefers-reduced-motion. Exposes the instance as window.lenis so
// other code components/overrides can call lenis.scrollTo(), stop(), start().

import { useEffect } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import Lenis from "lenis"

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 24
 * @framerIntrinsicHeight 24
 * @framerDisableUnlink
 */
export default function SmoothScroll(props: any) {
    const {
        lerp = 0.09,
        wheelMultiplier = 1,
        touchMultiplier = 1.4,
        smoothAnchors = true,
        anchorDuration = 1.4,
    } = props

    useEffect(() => {
        // Never hijack scrolling inside the Framer editor canvas
        if (RenderTarget.current() === RenderTarget.canvas) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return
        // Guard against double-init (component placed on multiple frames)
        const w = window as any
        if (w.lenis) return

        // Inline the essentials of lenis/dist/lenis.css (no CSS imports in Framer)
        let styleEl = document.getElementById("lenis-css")
        if (!styleEl) {
            styleEl = document.createElement("style")
            styleEl.id = "lenis-css"
            styleEl.textContent = `
html.lenis, html.lenis body { height: auto; }
.lenis:not(.lenis-autoToggle).lenis-stopped { overflow: clip; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-smooth iframe { pointer-events: none; }
`
            document.head.appendChild(styleEl)
        }

        const lenis = new Lenis({
            lerp,
            wheelMultiplier,
            touchMultiplier,
            anchors: smoothAnchors ? { duration: anchorDuration } : false,
        })
        w.lenis = lenis

        let rafId = 0
        const raf = (time: number) => {
            lenis.raf(time)
            rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)

        return () => {
            cancelAnimationFrame(rafId)
            lenis.destroy()
            if (w.lenis === lenis) delete w.lenis
        }
    }, [lerp, wheelMultiplier, touchMultiplier, smoothAnchors, anchorDuration])

    // Invisible marker on canvas so it's easy to find/select
    if (RenderTarget.current() === RenderTarget.canvas) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 4,
                    border: "1px dashed rgba(153,153,153,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    color: "#999",
                    fontFamily: "monospace",
                }}
            >
                lenis
            </div>
        )
    }
    return null
}

addPropertyControls(SmoothScroll, {
    lerp: {
        type: ControlType.Number,
        title: "Lerp",
        defaultValue: 0.09,
        min: 0.01,
        max: 0.3,
        step: 0.01,
        description: "Lower = floatier. Site source uses 0.09.",
    },
    wheelMultiplier: {
        type: ControlType.Number,
        title: "Wheel",
        defaultValue: 1,
        min: 0.2,
        max: 3,
        step: 0.1,
    },
    touchMultiplier: {
        type: ControlType.Number,
        title: "Touch",
        defaultValue: 1.4,
        min: 0.2,
        max: 3,
        step: 0.1,
    },
    smoothAnchors: {
        type: ControlType.Boolean,
        title: "Anchors",
        defaultValue: true,
        description: "Smooth-scroll same-page # links via Lenis",
    },
    anchorDuration: {
        type: ControlType.Number,
        title: "Anchor Dur",
        defaultValue: 1.4,
        min: 0.3,
        max: 3,
        step: 0.1,
        hidden: (props) => !props.smoothAnchors,
    },
})
