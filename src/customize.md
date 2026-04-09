---
layout: layouts/page.njk
title: Customize
description: A map of the pieces you can remove, keep, or extend as you turn Retro Garden into your own site.
eyebrow: customize.md
section: editing guide
sidebarTitle: theme-map.txt
sidebar: |
  **Start here**

  - `src/_data/site.js` for the site title, navigation, palette metadata, and demo URL logic
  - `src/_includes/layouts/base.njk` for the header, footer, and site-wide chrome
  - `src/_includes/layouts/page.njk` for full-width pages with an optional sidebar
  - `src/_includes/layouts/post.njk` for article metadata, share links, author box, and post sidebar behavior
  - `src/_includes/partials/share-links.njk` for the post share row
  - `src/assets/css/theme.css` for all visual tokens and component classes

  **Toggles**

  - Remove a page sidebar by omitting `sidebar` and `sidebarTitle`
  - Add a page sidebar by supplying those front matter keys
  - Disable a post sidebar with `postSidebar: false`
---
This page intentionally uses the **optional sidebar** so you can see the on/off behavior in the same theme.

## What you can remove cleanly

- The marquee strip in `base.njk` if you want a calmer header.
- The palette picker if you would rather ship with a single brand direction.
- The example pages and sample posts once you replace them with your own content.
- The home page side panels if you want a more minimal front page.

## What you can add next

- A blogroll, bookmark feed, or notes stream.
- Webmentions and reply contexts.
- A guestbook or contact page with a more explicit IndieWeb flavor.
- Additional palettes if you want seasonal or project-specific variants.

## Pages now default to full width

The `page.njk` layout no longer reserves empty sidebar space. It only creates a second column when you provide sidebar content in front matter.

## Posts keep the author context with the article

The about-the-author block now sits at the bottom of the post panel instead of living in the global footer, which makes the article feel more self-contained.

## Suggested first edits

1. Replace the placeholder identity and production URL settings in `site.js`.
2. Decide which home page panels actually belong to your site.
3. Pick one palette as the default and adjust the others until they feel intentionally different.
