---
layout: layouts/page.njk
title: About
description: What Retro Garden is trying to do, and why it leans into personality over sterile defaults.
eyebrow: about.md
section: who + why
---
Retro Garden is built for people who want their site to feel **lived in**.

It borrows from the IndieWeb in spirit and in structure:

- RSS and JSON feeds ship by default.
- Posts use microformat-friendly classes such as `h-entry`, `p-name`, `p-summary`, and `e-content`.
- The layout leaves room for badge walls, blogrolls, side notes, and personal flourishes.

It also borrows from the earlier web without trying to become a parody:

- Window-chrome panels and marquee-style status strips create a little friendly friction.
- The palette switcher keeps the page playful without making it illegible.
- The typography mixes a readable body face with a deliberate pixel-ish display face.

## Example routes to click through

- [Style Guide](/style-guide/) shows the component language, typography, badges, code colors, and all three palettes.
- [Customize](/customize/) demonstrates the optional page sidebar and maps out which files control which features.
- [Journal](/journal/) shows the read-time, tag archive, share links, feed links, and the author panel at the bottom of each post.

## Included features

{% for item in site.stack %}
- **{{ item.name }}**: {{ item.detail }}
{% endfor %}

## Accessibility choices

The theme includes a skip link, visible focus outlines, reduced-motion-aware animation, semantic landmarks, and a `pa11y-ci` script so accessibility can stay part of the workflow rather than an afterthought.

## What to customize first

1. Update the sample identity values in `src/_data/site.js`.
2. Replace the demo posts in `src/posts/`.
3. Set `SITE_URL` to your real production domain before publishing feeds or OG images on Vercel.
