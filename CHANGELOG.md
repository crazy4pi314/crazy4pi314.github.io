# Changelog

All notable changes to Retro Garden are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and releases use [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-08-21

### Added

- Private static search powered by Pagefind.
- Responsive local image processing with AVIF, WebP, multiple widths, intrinsic dimensions, and lazy loading.
- Journal pagination, Eleventy Navigation breadcrumbs, and previous/next metadata.
- A true Midnight palette and system-aware light/dark palette selection.
- Optional webmention endpoints, reply and reaction displays, stronger author microformats, and `rel="me"` identity links.
- A generated sitemap, `robots.txt`, web manifest, and themed 404 page.
- Feature flags for search, images, social cards, breadcrumbs, sidebars, sharing, sample content, analytics, and webmentions.
- HTML validation, internal-link validation, expanded Pa11y coverage, and Windows/Ubuntu GitHub Actions checks.

### Changed

- Updated Eleventy to 3.1.6 and refreshed the supported theme dependencies.
- Raised the required Node.js version to 22 for the current responsive image pipeline.
- Replaced platform-specific cleanup and preview commands with cross-platform Node.js scripts.
- Moved Tinylytics configuration to the `TINYLYTICS_ID` environment variable.
- Expanded the README, customization guide, style guide, sample content, and toolbox details.
- Improved responsive header behavior and the desktop layout for the larger navigation and palette controls.
- Made Open Graph and Twitter image URLs absolute for reliable sharing previews.

### Fixed

- Removed mobile horizontal overflow from the animated status strip and populated Pagefind results.
- Restored palette hydration so the active choice, browser color scheme, and theme color update together.
- Improved accessible heading permalinks and replaced simulated share lists with native list markup.
- Excluded heading helper text from search snippets and included every generated pagination page in the sitemap.

### Security

- Disabled analytics and webmention requests until explicitly configured.
- Normalized and escaped remote webmention data before rendering.
- Updated non-breaking transitive dependencies; the production dependency audit reports zero vulnerabilities.

## [0.1.0] - 2026-04-09

### Added

- Initial Retro Garden Eleventy theme with WebC components, three palettes, feeds, social images, syntax highlighting, tag archives, and IndieWeb-inspired layouts.

[0.2.0]: https://github.com/kylereddoch/retro-garden-eleventy-theme/releases/tag/v0.2.0
[0.1.0]: https://github.com/kylereddoch/retro-garden-eleventy-theme/tree/a6f4a5c
