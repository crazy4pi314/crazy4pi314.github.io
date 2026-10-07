# Retro Garden

[![License: MIT](https://img.shields.io/badge/license-MIT-2ea44f.svg)](./LICENSE)
[![Eleventy 3](https://img.shields.io/badge/11ty-3.x-222222?logo=eleventy&logoColor=white)](https://www.11ty.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Accessibility: Pa11y CI](https://img.shields.io/badge/a11y-pa11y--ci-0f766e.svg)](https://pa11y.org/)
[![Deploy: Static Host Ready](https://img.shields.io/badge/deploy-static_host_ready-f97316.svg)](https://www.11ty.dev/docs/deployment/)

Retro Garden is an open source Eleventy theme for personal sites that want IndieWeb publishing habits and early-web personality without giving up modern tooling. It mixes WebC components, private static search, responsive images, pagination, RSS, OG image generation, optional webmentions, and accessible defaults into one hand-made starter.

## Demo

- Production demo: [https://retro-garden-eleventy-theme.vercel.app](https://retro-garden-eleventy-theme.vercel.app)
- Local development: <http://127.0.0.1:8080>
- Release history: [CHANGELOG.md](./CHANGELOG.md)

`src/_data/site.js` will use `SITE_URL` when you provide it and can also infer common preview URLs on Vercel, Netlify, and Cloudflare Pages. The production default is `https://retro-garden-eleventy-theme.vercel.app`, so swap that if you deploy under a different hostname.

## Features

The homepage and `/blog/` archive use a shared, newest-first `blogFeed` collection of posts and events with matching card formatting. Talk, panel, and workshop cards keep only the type label in their colored header, group the subtitle with the title and show `date :: event name` beneath it, without locations. Event cards show `eventType` labels; the archive loads more entries as readers scroll (with a Load more button and paginated no-JavaScript fallback), and year filtering covers both content types. RSS and JSON feeds remain post-only.

`site.features.eventsPage` and `site.features.projects` control the standalone listing pages (both default off). Individual event and project pages remain available. Feed card markup lives in `src/_includes/partials/feed-card.njk`.

Feed cards use type-specific layouts: dot-grid blog notes, poster-style talks and panels, workshop lab sheets, and podcast/livestream media panels. Resource buttons are derived from each entry's existing metadata; decorative media graphics are static and hidden from assistive technology.

- Eleventy 3.1 with Windows, macOS, and Linux-friendly scripts
- Eleventy Fetch for friendly remote-data caching
- Eleventy Image for responsive AVIF, WebP, and original image output
- Pagefind static search with no hosted service or search analytics
- Build-time OG image generation
- Nunjucks shortcodes and markdown-first authoring
- Accessible defaults with multi-page Pa11y and HTML validation
- Tailwind CSS 4 plus custom retro component styles
- RSS and JSON feeds, sitemap, robots file, web manifest, and themed 404 page
- Eleventy WebC components and is-land progressive enhancement
- Blog pagination, read time, tag archives, breadcrumbs, and previous/next metadata
- Official Eleventy syntax highlighting
- Post share links with copy-to-clipboard support
- Optional sidebars, share links, analytics, webmentions, and sample sections
- Stronger IndieWeb author markup, `rel=me`, and configurable webmention endpoints
- Ember, Surf, Mint, Midnight, and system-aware palette switching

## Quick Start

```bash
git clone <your-repo-url> retro-garden
cd retro-garden
npm install
npm run start
```

Open <http://127.0.0.1:8080> to preview the theme locally.

## Available Scripts

- `npm run start` starts Eleventy in serve mode and Tailwind in watch mode
- `npm run build` creates the production build in `_site/`
- `npm run preview` serves an existing production build at <http://127.0.0.1:4173>
- `npm run validate:html` checks generated HTML
- `npm run validate:links` checks internal page and asset targets
- `npm run audit:a11y` serves the build and audits representative pages with Pa11y
- `npm run check` builds the theme and runs every validation step

## Configuration

Start with `src/_data/site.js`. It contains the site identity, author, navigation, palettes, social links, and a `features` object for search, responsive images, social cards, breadcrumbs, post sidebars, share links, sample content, analytics, and webmentions.

Supported environment variables:

- `SITE_URL`: canonical production URL
- `TINYLYTICS_ID`: enables the optional Tinylytics script; empty by default
- `WEBMENTION_ENDPOINT`: endpoint advertised by published pages
- `PINGBACK_ENDPOINT`: optional pingback endpoint
- `WEBMENTION_API`: JSON endpoint used to retrieve webmentions at build time

Analytics and webmentions are off in a fresh clone. Pagefind search runs entirely from the generated static files.

To process a local content image, add a normal Markdown or HTML `img` element. You can set `eleventy:widths="320,640,960"` and a `sizes` attribute when the default widths are not a good fit. Remote avatars and other images that should not be processed can use `eleventy:ignore`.

## Using The Theme

1. Update the site identity in `src/_data/site.js`.
2. Replace the sample pages in `src/` and the demo posts in `src/posts/`.
3. Choose Ember, Surf, Mint, Midnight, or system-aware mode as the default palette.
4. Edit the layouts in `src/_includes/layouts/` to remove or expand theme features.
5. Update social links, sponsor links, and author metadata before publishing.

## Project Structure

- `src/_data/site.js` stores the main site identity, navigation, palettes, and social links
- `src/_includes/layouts/base.njk` controls the shared shell, header, footer, and metadata
- `src/_includes/layouts/page.njk` renders full-width pages with an optional sidebar
- `src/_includes/layouts/post.njk` renders blog posts, share links, and the author panel
- `src/_includes/partials/breadcrumbs.njk` renders Eleventy Navigation breadcrumbs
- `src/_includes/partials/share-links.njk` contains the reusable share section
- `src/_includes/partials/webmentions.njk` renders optional reactions and replies
- `src/_includes/components/*.webc` contains the reusable WebC components
- `src/assets/css/theme.css` holds the design tokens and component styling
- `src/search.njk` contains the Pagefind component interface
- `scripts/` contains cross-platform cleanup, preview, and internal-link checks
- `src/style-guide.njk` shows palettes, UI patterns, and syntax-highlight examples
- `vercel.json` is included as an optional Vercel preset for the generated `_site/` folder

## Deployment

Retro Garden is a static Eleventy theme, so it can be deployed anywhere that can run `npm run build` and publish the `_site/` folder.

### General setup

1. Install dependencies with `npm install`
2. Build the site with `npm run build`
3. Publish the `_site/` directory on your host
4. Set `SITE_URL` to your production domain so feeds, canonicals, and OG metadata use the correct URL

### Common hosts

- Vercel: `vercel.json` is already included. Set `SITE_URL` in project environment variables.
- Netlify: build command `npm run build`, publish directory `_site`, and set `SITE_URL`.
- Cloudflare Pages: build command `npm run build`, output directory `_site`, and set `SITE_URL`.
- GitHub Pages or any other static host: run `npm run build` in CI and publish `_site/`.

Preview deployments will render cleanly on common platforms because the theme can infer several host-provided preview URLs when `SITE_URL` is not set.

## Customization Notes

- Pages are full width by default and only render a sidebar when you add `sidebarTitle` and `sidebar` in front matter.
- Posts include a share row after the article body and before the author panel.
- The palette picker in the header uses query-string links, so you can preview each palette on any route.
- Production builds generate the Pagefind index after Eleventy finishes writing pages.
- Local images are transformed during the build and keep intrinsic dimensions to reduce layout movement.
- The style guide and sample posts intentionally show markdown, code fences, badges, and optional layout patterns.

## Sponsor

If Retro Garden helps you ship something fun, you can support its maintenance here. Replace the placeholder handles before publishing your own fork. GitHub's funding button can be configured in [.github/FUNDING.yml](./.github/FUNDING.yml).

- GitHub Sponsors: [https://github.com/sponsors/kylereddoch](https://github.com/sponsors/kylereddoch)
- Ko-fi: [https://ko-fi.com/kylereddoch](https://ko-fi.com/kylereddoch)
- Buy Me a Coffee: [https://buymeacoffee.com/kylereddoch](https://buymeacoffee.com/kylereddoch)

## Contributing

Issues and pull requests are welcome. For changes that touch templates, styles, or build behavior, please run:

```bash
npm run check
```

The included GitHub Actions workflow runs the same check on Node 22 under both Ubuntu and Windows. When contributing, try to preserve the balance between readable content surfaces, playful retro chrome, and accessible defaults.

## Inspiration

- [zachleat.com](https://www.zachleat.com/)
- [Eleventy Excellent](https://github.com/madrilene/eleventy-excellent)
- [Retroweird](https://github.com/brennanbrown/retroweird)
- [11ty Indie Web Blog Starter](https://github.com/brennanbrown/11ty-Indie-Web-Blog-Starter)

## License

MIT. See [LICENSE](./LICENSE).
