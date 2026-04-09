---
title: Palette Tour and Layout Switches
description: The starter now shows how the same structure can feel different through palette choices and sidebar toggles.
date: 2026-04-08
tags:
  - post
  - design
  - palettes
  - pages
eyebrow: field-note-004.md
---
One of the nicest things about a personal-site theme is when the **same structure** can hold several moods without turning into three separate codebases.

In this starter, that mostly comes down to two decisions:

## Palette choice changes tone fast

`Ember` feels warm and familiar. `Surf` feels cooler and more technical. `Mint` feels a little more zine-like and homegrown.

> The layout should stay recognizable even when the color story changes.

## Sidebars should be optional

Not every page needs a second column. Standalone pages now render full width by default, and only create a sidebar when the page front matter explicitly asks for it.

```yaml
---
layout: layouts/page.njk
title: Notes
sidebarTitle: links.txt
sidebar: |
  - Add any supporting links here
  - Or leave both fields out for a full-width page
---
```

The goal is to make layout choices feel intentional rather than inherited by accident.
