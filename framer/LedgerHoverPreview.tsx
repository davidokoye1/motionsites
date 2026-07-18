// LedgerHoverPreview — Framer code component
// Drop inside each ledger Row (collection item). Bind `image` to the CMS cover field.
// On hover of the parent row it portals a mouse-following preview to <body>,
// matching the original React implementation (fixed, offset 24px, clamped to viewport).

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

const EASE = [0.16, 1, 0.3, 1]

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 24
 * @framerIntrinsicHeight 24
 * @framerDisableUnlink
 */
export default function LedgerHoverPreview(props) {
    const {
        image,
        previewWidth = 260,
        previewHeight = 173,
        radius = 4,
        shadow = "0px 24px 48px 0px rgba(26, 26, 24, 0.18)",
    } = props

    const anchorRef = useRef(null)
    const [active, setActive] = useState(false)
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    useEffect(() => {
        if (isCanvas) return
        const el = anchorRef.current
        if (!el) return
        // The collection item's link wrapper is the hover target
        const row = el.closest("a") ?? el.parentElement
        if (!row) return

        const canHover = () =>
            window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
            window.matchMedia("(min-width: 768px)").matches

        const move = (e) => {
            setPos({
                x: Math.min(e.clientX, window.innerWidth - (previewWidth + 48)),
                y: Math.min(e.clientY, window.innerHeight - (previewHeight + 49)),
            })
        }
        const enter = (e) => {
            if (!canHover()) return
            move(e)
            setActive(true)
        }
        const leave = () => setActive(false)

        row.addEventListener("mouseenter", enter)
        row.addEventListener("mousemove", move)
        row.addEventListener("mouseleave", leave)
        return () => {
            row.removeEventListener("mouseenter", enter)
            row.removeEventListener("mousemove", move)
            row.removeEventListener("mouseleave", leave)
        }
    }, [isCanvas, previewWidth, previewHeight])

    // On the canvas: show a small badge so the layer stays visible/selectable
    if (isCanvas) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 4,
                    border: "1px dashed rgba(26,26,24,0.35)",
                    background: image?.src
                        ? `url(${image.src}) center / cover`
                        : "rgba(26,26,24,0.06)",
                }}
                title="Hover preview (runs in preview/live)"
            />
        )
    }

    return (
        <>
            <span ref={anchorRef} style={{ display: "block", width: 1, height: 1 }} />
            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {active && image?.src && (
                            <motion.div
                                key="ledger-preview"
                                initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
                                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.35, ease: EASE }}
                                aria-hidden="true"
                                style={{
                                    position: "fixed",
                                    left: pos.x,
                                    top: pos.y,
                                    zIndex: 40,
                                    width: previewWidth,
                                    height: previewHeight,
                                    margin: "24px 0 0 24px",
                                    borderRadius: radius,
                                    overflow: "hidden",
                                    pointerEvents: "none",
                                    boxShadow: shadow,
                                }}
                            >
                                <img
                                    src={image.src}
                                    srcSet={image.srcSet}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                    }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    )
}

addPropertyControls(LedgerHoverPreview, {
    image: { type: ControlType.ResponsiveImage, title: "Image" },
    previewWidth: { type: ControlType.Number, title: "Width", defaultValue: 260, min: 120, max: 480 },
    previewHeight: { type: ControlType.Number, title: "Height", defaultValue: 173, min: 80, max: 360 },
    radius: { type: ControlType.Number, title: "Radius", defaultValue: 4, min: 0, max: 24 },
    shadow: {
        type: ControlType.String,
        title: "Shadow",
        defaultValue: "0px 24px 48px 0px rgba(26, 26, 24, 0.18)",
    },
})
