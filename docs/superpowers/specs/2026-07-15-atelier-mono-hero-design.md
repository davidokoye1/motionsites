# Atelier Mono — Architecture Studio Hero Landing Page

**Date:** 2026-07-15
**Status:** Approved by user

## Overview

A single full-screen hero landing page for a fictional minimal architecture studio, "Atelier Mono". Layout, structure, and animation choreography are ported from a fintech hero spec; niche, copy, palette, and media are changed. The background video is replaced by a gpt-image-2 generated architectural image with a Ken Burns effect.

## Stack

- React 19 + Vite
- `motion` (framer-motion, imported from `motion/react`)
- `lucide-react` (Plus icon)
- Plain CSS (no Tailwind), mobile-first, breakpoint at 768px
- Font: Inter (300, 400, 500, 600) via Google Fonts

## Palette (warm minimal)

- Background / gradient base: `#FAF9F7` (off-white)
- Ink (logo, buttons, text): `#1A1A18` (charcoal)
- Light pill background: `#F0EEEA`
- Subtle borders: `rgba(0,0,0,0.12)`; outline button border `rgba(0,0,0,0.35)`
- Muted text: charcoal at 55% opacity

## Layout

- `min-height: 100vh`, off-white background, flex column, `justify-content: space-between`
- Fixed navbar top, z-50, `pointer-events: none` on nav, `auto` on children
- Absolutely positioned full-screen hero image behind everything (z-0)
- Footer content pinned bottom (z-30) over gradient: `linear-gradient(to top, #FAF9F7 0%, rgba(250,249,247,0.8) 50%, transparent 100%)`

## Navbar

Left:
1. Logo: custom SVG — two rotated rounded rectangles at -35deg, charcoal fill — plus brand text "Atelier Mono" (hidden < 768px)
2. Menu button: charcoal pill containing a white/off-white circle with a Plus icon (lucide, size 12, strokeWidth 3) + "Menu" text (11px, off-white)
3. Tags pill: `#F0EEEA` rounded-full container with "Residential" and "Cultural Spaces" labels (hidden < 768px)

Right:
- Light pill with a charcoal circle button (4-dot grid SVG icon) + label "Studio Practice" (label hidden < 768px)

## Hero Media (replaces video)

- One gpt-image-2 image (~1536×1024): minimalist concrete-and-glass structure, warm daylight, soft haze, muted warm-gray grading
- `<img>` inside wrapper, `object-fit: cover`
- Mobile: wrapper 80% width/height, centered; desktop: 100%
- Entrance: opacity 0 + scale 1.05 → opacity 1 + scale 1, duration 1.8s
- Then continuous Ken Burns: scale 1 → 1.06 over ~30s, `repeatType: 'reverse'`, linear ease

## Footer Content

- Mobile: stacked vertically; desktop: row, items aligned bottom
- Left block:
  1. Subtitle: 8px charcoal dot + "Architecture Firm of the Year 2026" (13px, 55% opacity)
  2. Heading: "Space, Reduced / to Its Essence." on two lines. Weight 300, `clamp(2rem, 8vw, 4.5rem)` mobile / `clamp(2.5rem, 5.5vw, 4.5rem)` desktop, letter-spacing -0.03em, line-height 1
  3. Buttons: "View Projects" (charcoal pill, off-white text, 13px) and "Our Process" (transparent, border `rgba(0,0,0,0.35)`, 13px)
- Right block: tag pills "Concrete", "Light", "Landscape" (off-white bg, border `rgba(0,0,0,0.12)`, 11px, rounded-full)

## Animations (motion/react, all ease `[0.16, 1, 0.3, 1]` unless noted)

- Navbar: y -16 → 0, opacity 0 → 1, 0.8s
- Hero image: fade/scale entrance 1.8s (then Ken Burns, linear)
- Footer wrapper: y 20 → 0, delay 0.5s, 1s
- Subtitle: y 16 → 0, delay 0.6s, 0.8s
- Heading: y 20 → 0, delay 0.8s, 0.8s
- Buttons: y 16 → 0, delay 1.0s, 0.8s

## Responsive

- Mobile: navbar padding 16px, 28px circles, brand text/tags/right-label hidden, footer stacked, hero wrapper 80%
- Desktop 768px+: navbar padding 24px 32px, 32px circles, all visible, footer row, hero 100%

## Files

- `index.html` (Google Fonts links, root div)
- `package.json`, `vite.config.js`
- `src/main.jsx`, `src/App.jsx`, `src/index.css`
- `src/assets/hero.png` (gpt-image-2 generated)

## Verification

`npm run dev`, load in browser, confirm layout at mobile and desktop widths and that animations fire.
