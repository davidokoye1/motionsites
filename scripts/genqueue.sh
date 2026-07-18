#!/bin/bash
# Sequential gpt-image-2 generation queue — endpoint times out under parallel load.
# Skips images that already exist, so it's safe to re-run.
G="python3 /home/okoye/.claude/skills/gpt-image/generate.py"
A="/home/okoye/motionsites/src/assets"

[ -f "$A/mat-glass.png" ] || $G "Extreme close-up photograph of floor-to-ceiling glass pane edge with warm golden hour light refracting through it, soft bokeh of a pale interior behind, subtle green edge tint of glass, abstract minimal composition, muted warm tones, no text" -s 1024x1536 -q high --timeout 580 -o "$A/mat-glass.png"

[ -f "$A/mat-timber.png" ] || $G "Extreme close-up photograph of pale oak timber surface, fine straight grain, warm soft daylight from the side, minimal abstract composition, muted warm honey and cream tones, full-frame texture, no text" -s 1024x1536 -q high --timeout 580 -o "$A/mat-timber.png"

[ -f "$A/mat-stone.png" ] || $G "Extreme close-up photograph of honed limestone surface with subtle fossil traces, warm raking evening light, fine mineral texture, minimal abstract composition, muted warm beige and gray tones, full-frame texture, no text" -s 1024x1536 -q high --timeout 580 -o "$A/mat-stone.png"

[ -f "$A/journal-drawing.png" ] || $G "Minimalist photograph of an architect's hand-drawn pencil sketch of a floor plan on tracing paper, rolls of trace and a brass scale ruler nearby, warm desk lamp light, muted warm-gray tones, shallow depth of field, quiet editorial mood, no faces, no readable text" -s 1536x1024 -q high --timeout 580 -o "$A/journal-drawing.png"

[ -f "$A/journal-light.png" ] || $G "Minimalist photograph of warm sunlight falling through a narrow concrete aperture onto a bare interior wall, sharp light geometry, dust in the light beam, muted warm-gray grading, abstract architectural stillness, no people, no text" -s 1536x1024 -q high --timeout 580 -o "$A/journal-light.png"

[ -f "$A/journal-site.png" ] || $G "Minimalist photograph of a small white architectural concept model held against a blurred dry grassland site at golden hour, warm haze, muted tones, shallow depth of field, quiet documentary mood, hands barely visible at frame edge, no faces, no text" -s 1536x1024 -q high --timeout 580 -o "$A/journal-site.png"

[ -f "$A/detail-courtyard.png" ] || $G "Minimalist architecture photograph, interior detail of a warm concrete courtyard house: built-in concrete bench with linen cushion beside a floor-to-ceiling glass wall, olive tree shadow patterns on polished concrete floor, warm afternoon light, muted warm-gray grading, no people, no text" -s 1536x1024 -q high --timeout 580 -o "$A/detail-courtyard.png"

[ -f "$A/detail-chapel.png" ] || $G "Minimalist architecture photograph, exterior detail of a tall concrete chapel at dusk: narrow vertical glowing slot of warm light in a monolithic board-formed concrete facade, deep blue evening sky, quiet monumental mood, no people, no text" -s 1536x1024 -q high --timeout 580 -o "$A/detail-chapel.png"

[ -f "$A/detail-pavilion.png" ] || $G "Minimalist architecture photograph, interior of a low concrete art pavilion gallery: single sculpture on a plinth lit by a strip of skylight, still reflecting pool visible through full-height glass, warm hazy morning light, muted warm-gray grading, no people, no text" -s 1536x1024 -q high --timeout 580 -o "$A/detail-pavilion.png"

[ -f "$A/detail-hillside.png" ] || $G "Minimalist architecture photograph, terrace of a concrete residence stepping down a dry grassy hillside at golden hour: long infinity edge of a shallow water channel, cantilevered roof plane above, warm rim light, distant hazy hills, muted warm grading, no people, no text" -s 1536x1024 -q high --timeout 580 -o "$A/detail-hillside.png"

echo "QUEUE_DONE"
