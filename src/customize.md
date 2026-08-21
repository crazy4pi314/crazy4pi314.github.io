---
layout: layouts/page.njk
title: Customize
description: A map of the pieces you can remove, keep, or extend as you turn Retro Garden into your own site.
eyebrow: customize.md
section: editing guide
eleventyNavigation:
  key: Customize
sidebarTitle: theme-map.txt
sidebar: |
  **Start here**

  - `src/_data/site.js` for the site title, navigation, palette metadata, and demo URL logic
  - `src/_includes/layouts/base.njk` for the header, footer, and site-wide chrome
  - `src/_includes/layouts/page.njk` for full-width pages with an optional sidebar
  - `src/_includes/layouts/post.njk` for article metadata, share links, author box, and post sidebar behavior
  - `src/_includes/partials/share-links.njk` for the post share row
  - `src/search.njk` for the Pagefind search interface
  - `src/assets/css/theme.css` for all visual tokens and component classes

  **Toggles**

  - Remove a page sidebar by omitting `sidebar` and `sidebarTitle`
  - Add a page sidebar by supplying those front matter keys
  - Disable a post sidebar with `postSidebar: false`
  - Turn theme-wide features on or off in `site.features`
---
This page intentionally uses the **optional sidebar** so you can see the on/off behavior in the same theme.

## What you can remove cleanly

- The marquee strip in `base.njk` if you want a calmer header.
- The palette picker if you would rather ship with a single brand direction.
- The example pages and sample posts once you replace them with your own content.
- The home page side panels if you want a more minimal front page.

## Features you can switch off

The `features` object in `src/_data/site.js` controls search links, responsive image processing, generated social cards, breadcrumbs, post sidebars, share links, sample home-page content, analytics, and webmention displays. Keep the feature data and layouts in place, then change only the matching boolean when you want a quieter starter.

Analytics is disabled until `TINYLYTICS_ID` exists. Webmentions are disabled until both `WEBMENTION_ENDPOINT` and `WEBMENTION_API` are configured, so a fresh install makes no analytics or webmention requests.

## Images, search, and archives

- Add a local image to Markdown and Eleventy Image can generate AVIF and WebP sources, widths, lazy loading, and intrinsic dimensions.
- Pagefind indexes the completed site after every production build; edit `src/search.njk` to change the interface.
- The journal paginates at three posts per page in `src/journal.njk`.
- Eleventy Navigation data supplies the breadcrumb trail without duplicating it in each layout.

## Pages now default to full width

The `page.njk` layout no longer reserves empty sidebar space. It only creates a second column when you provide sidebar content in front matter.

## Posts keep the author context with the article

The about-the-author block now sits at the bottom of the post panel instead of living in the global footer, which makes the article feel more self-contained.

## Suggested first edits

1. Replace the placeholder identity and production URL settings in `site.js`.
2. Decide which home page panels actually belong to your site.
3. Pick Ember, Surf, Mint, Midnight, or system-aware mode as the default and adjust the palette tokens until they feel intentionally different.
