# Retro Garden

[![License: MIT](https://img.shields.io/badge/license-MIT-2ea44f.svg)](./LICENSE)
[![Eleventy 3](https://img.shields.io/badge/11ty-3.x-222222?logo=eleventy&logoColor=white)](https://www.11ty.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Accessibility: Pa11y CI](https://img.shields.io/badge/a11y-pa11y--ci-0f766e.svg)](https://pa11y.org/)
[![Deploy: Static Host Ready](https://img.shields.io/badge/deploy-static_host_ready-f97316.svg)](https://www.11ty.dev/docs/deployment/)

Retro Garden is an open source Eleventy theme for personal sites that want IndieWeb publishing habits and early-web personality without giving up modern tooling. It mixes WebC components, palette switching, RSS, OG image generation, syntax highlighting, share links, and accessible defaults into one hand-made starter.

## Demo

- Production demo: [https://retro-garden-eleventy-theme.vercel.app](https://retro-garden-eleventy-theme.vercel.app)
- Local development: <http://127.0.0.1:8080>

`src/_data/site.js` will use `SITE_URL` when you provide it and can also infer common preview URLs on Vercel, Netlify, and Cloudflare Pages. The production default is `https://retro-garden-eleventy-theme.vercel.app`, so swap that if you deploy under a different hostname.

## Features

- Eleventy 3 with current plugin wiring
- Eleventy Fetch for friendly remote-data caching
- Build-time OG image generation
- Nunjucks shortcodes and markdown-first authoring
- Accessible defaults with a `pa11y-ci` audit script
- Tailwind CSS 4 plus custom retro component styles
- RSS and JSON feeds
- Eleventy WebC components
- is-land powered progressive enhancement
- Read time on journal posts
- Slugify-based clean tag URLs
- Official Eleventy syntax highlighting
- Post share links with copy-to-clipboard support
- Optional sidebars on pages and posts
- Built-in palette switching for Ember, Surf, and Mint

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
- `npm run audit:a11y` runs Pa11y against the built site

## Using The Theme

1. Update the site identity in `src/_data/site.js`.
2. Replace the sample pages in `src/` and the demo posts in `src/posts/`.
3. Choose your default palette and tweak the alternates to suit your brand.
4. Edit the layouts in `src/_includes/layouts/` to remove or expand theme features.
5. Update social links, sponsor links, and author metadata before publishing.

## Project Structure

- `src/_data/site.js` stores the main site identity, navigation, palettes, and social links
- `src/_includes/layouts/base.njk` controls the shared shell, header, footer, and metadata
- `src/_includes/layouts/page.njk` renders full-width pages with an optional sidebar
- `src/_includes/layouts/post.njk` renders journal posts, share links, and the author panel
- `src/_includes/partials/share-links.njk` contains the reusable share section
- `src/_includes/components/*.webc` contains the reusable WebC components
- `src/assets/css/theme.css` holds the design tokens and component styling
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
- The style guide and sample posts intentionally show markdown, code fences, badges, and optional layout patterns.

## Sponsor

If Retro Garden helps you ship something fun, you can support its maintenance here. Replace the placeholder handles before publishing your own fork. GitHub's funding button can be configured in [.github/FUNDING.yml](./.github/FUNDING.yml).

- GitHub Sponsors: [https://github.com/sponsors/kylereddoch](https://github.com/sponsors/kylereddoch)
- Ko-fi: [https://ko-fi.com/kylereddoch](https://ko-fi.com/kylereddoch)
- Buy Me a Coffee: [https://buymeacoffee.com/kylereddoch](https://buymeacoffee.com/kylereddoch)

## Contributing

Issues and pull requests are welcome. For changes that touch templates, styles, or build behavior, please run:

```bash
npm run build
npm run audit:a11y
```

When contributing, try to preserve the balance between readable content surfaces, playful retro chrome, and accessible defaults.

## Inspiration

- [zachleat.com](https://www.zachleat.com/)
- [Eleventy Excellent](https://github.com/madrilene/eleventy-excellent)
- [Retroweird](https://github.com/brennanbrown/retroweird)
- [11ty Indie Web Blog Starter](https://github.com/brennanbrown/11ty-Indie-Web-Blog-Starter)

## License

MIT. See [LICENSE](./LICENSE).
