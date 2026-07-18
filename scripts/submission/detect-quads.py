#!/usr/bin/env python3
"""Detect the laptop screen quad in each scene image.

Screens are rendered off (near-black) in the scene renders. We threshold
dark pixels, keep the largest connected component, then take the extreme
points along the diagonals as the four screen corners.
"""
import json
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

SCENES = {
    'scene-chair': ('/home/okoye/motionsites/submission-assets/scene-chair.png', 60),
    'scene-plinth': ('/home/okoye/motionsites/submission-assets/scene-plinth.png', 60),
    'scene-desk': ('/home/okoye/motionsites/submission-assets/scene-desk.png', 4),
}

out = {}
for name, (path, thresh) in SCENES.items():
    img = np.asarray(Image.open(path).convert('L'), dtype=np.uint8)
    mask = img < thresh
    labels, n = ndimage.label(mask)
    if n == 0:
        sys.exit(f'{name}: no dark region found at threshold {thresh}')
    sizes = ndimage.sum(mask, labels, range(1, n + 1))
    comp = labels == (int(np.argmax(sizes)) + 1)
    ys, xs = np.nonzero(comp)
    pts = np.stack([xs, ys], axis=1).astype(float)
    s = pts.sum(axis=1)      # x + y
    d = pts[:, 0] - pts[:, 1]  # x - y
    tl = pts[np.argmin(s)]
    br = pts[np.argmax(s)]
    tr = pts[np.argmax(d)]
    bl = pts[np.argmin(d)]
    quad = [tl.tolist(), tr.tolist(), br.tolist(), bl.tolist()]
    out[name] = quad
    print(name, 'area', int(comp.sum()), 'quad', [[round(x), round(y)] for x, y in quad])

with open('/home/okoye/motionsites/scripts/submission/quads.json', 'w') as f:
    json.dump(out, f, indent=1)
print('wrote quads.json')
