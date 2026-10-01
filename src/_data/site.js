const inferredDeployUrl =
  process.env.SITE_URL ||
  process.env.DEPLOY_PRIME_URL ||
  process.env.DEPLOY_URL ||
  process.env.URL ||
  process.env.CF_PAGES_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

const siteUrl = inferredDeployUrl || "https://retro-garden-eleventy-theme.vercel.app";
const tinylyticsId = process.env.TINYLYTICS_ID || "";
const webmentionEndpoint = process.env.WEBMENTION_ENDPOINT || "";
const pingbackEndpoint = process.env.PINGBACK_ENDPOINT || "";
const webmentionApi = process.env.WEBMENTION_API || "";

export default {
  title: "Dr. Sarah Kaiser",
  description: "Sarah Kaiser's homepage: code, lasers, community.",
  url: siteUrl,
  language: "en",
  locale: "en_US",
  defaultTheme: "auto",
  tagline: "code. lasers. community.",
  heroLead:
    "I'm an **experimental physicist turned software developer** with 15+ years building and managing cutting-edge tech projects. I write books, cut things with lasers, and hang out with my pup Chewie 🐕💖",
  features: {
    analytics: Boolean(tinylyticsId),
    breadcrumbs: false,
    marquee: false,
    ogImages: true,
    postSidebars: true,
    responsiveImages: true,
    sampleContent: true,
    search: true,
    shareLinks: true,
    webmentions: Boolean(webmentionEndpoint && webmentionApi)
  },
  analytics: {
    tinylyticsId
  },
  indieweb: {
    webmentionEndpoint,
    pingbackEndpoint,
    webmentionApi,
    relMe: ["https://github.com/crazy4pi314", "https://mathstodon.xyz/@crazy4pi314"]
  },
  author: {
    name: "Sarah Kaiser",
    email: "sckaiser@sckaiser.com",
    url: "https://sckaiser.dev",
    summary:
      "Experimental physicist turned software developer. PhD in Quantum Computing, PSF Fellow, and developer advocate. Scientist, maker, community builder."
  },
  navigation: [
    { label: "Home", url: "/" },
    { label: "Journal", url: "/journal/" },
    { label: "Events", url: "/events/" },
    { label: "Projects", url: "/projects/" },
    { label: "Books", url: "/books/" },
    { label: "Search", url: "/search/", feature: "search" },
    { label: "About", url: "/about/" }
  ],
  marquee: "Search indexed :: responsive images online :: webmentions ready :: RSS flowing :: accessible by default",
  badges: [
    { label: "RSS FEED", url: "/feed.xml", accent: "laser" },
    { label: "GITHUB", url: "https://github.com/crazy4pi314", accent: "laser-dark" },
    { label: "MASTODON", url: "https://mathstodon.xyz/@crazy4pi314", accent: "laser" },
    { label: "TWITCH", url: "https://www.twitch.tv/crazy4pi314", accent: "laser-dark" },
    { label: "LINKEDIN", url: "https://www.linkedin.com/in/sckaiser1/", accent: "laser" }
  ],
  examplePages: [
    {
      label: "Search",
      url: "/search/",
      layout: "Static search page",
      note: "Uses a Pagefind index generated from the finished site, with no hosted search service or runtime database.",
      feature: "search"
    },
    {
      label: "About",
      url: "/about/",
      layout: "Full width page",
      note: "A plain content page that demonstrates the cleaner no-sidebar default for standalone pages."
    }
  ],
  palettes: [
    {
      name: "Laser Light",
      slug: "laser",
      vibe: "neon optics lab",
      note: "The light site theme: electric pink and blue over cool, bright neutral surfaces.",
      swatches: [
        { label: "Main", value: "#ff7cfe" },
        { label: "Soft", value: "#f2e2f7" },
        { label: "Strong", value: "#9a09be" },
        { label: "Secondary", value: "#3f93ff" }
      ]
    },
    {
      name: "Laser Dark",
      slug: "laser-dark",
      vibe: "after-hours optics lab",
      note: "The Laser palette after dark, with cool charcoal surfaces, luminous pink links, and brighter blue highlights.",
      swatches: [
        { label: "Main", value: "#ff8cff" },
        { label: "Soft", value: "#35243b" },
        { label: "Strong", value: "#ffb4ff" },
        { label: "Secondary", value: "#77b6ff" }
      ]
    }
  ],
  stack: [
    {
      name: "Eleventy Fetch",
      detail: "Caches remote data so the build stays friendly to APIs and still works offline after a successful fetch."
    },
    {
      name: "OG Image Generation",
      detail: "Build-time social cards powered by eleventy-plugin-og-image and local fonts."
    },
    {
      name: "Eleventy Image",
      detail: "Local images receive responsive dimensions, modern formats, lazy loading, and stable aspect ratios at build time."
    },
    {
      name: "Pagefind Search",
      detail: "A private static search index is generated after Eleventy writes the site—no hosted search account is required."
    },
    {
      name: "IndieWeb Hooks",
      detail: "Optional rel-me identity links, webmention endpoints, reply and like displays, and stronger author microformats are ready to configure."
    },
    {
      name: "Shortcodes",
      detail: "Custom theme helpers like the 88x31 button shortcode are wired into markdown and templates."
    },
    {
      name: "Markdown",
      detail: "Markdown-it is configured with heading anchors and attribute support for rich long-form posts."
    },
    {
      name: "Accessibility",
      detail: "Skip links, focus states, motion guards, semantic structure, and a Pa11y CI script are included."
    },
    {
      name: "Tailwind CSS",
      detail: "Tailwind 4 powers utilities while the theme layers in custom retro components and tokens."
    },
    {
      name: "RSS",
      detail: "RSS and JSON feeds are generated out of the box for journal posts."
    },
    {
      name: "WebC",
      detail: "Reusable components handle marquee strips, retro windows, dividers, and the palette switcher."
    },
    {
      name: "is-land",
      detail: "The accent palette switcher hydrates only when it is useful instead of loading everything up front."
    },
    {
      name: "Read Time",
      detail: "Posts display estimated reading time using the reading-time package."
    },
    {
      name: "Slugify",
      detail: "Clean tag and post URLs are generated with slugify."
    }
  ],
  neighborhood: [
    {
      name: "zachleat.com",
      url: "https://www.zachleat.com/",
      note: "A practical IndieWeb-feeling personal site with strong publishing ergonomics."
    },
    {
      name: "Eleventy Excellent",
      url: "https://github.com/madrilene/eleventy-excellent",
      note: "A thoughtful Eleventy starter with polished information architecture and modern defaults."
    },
    {
      name: "Retroweird",
      url: "https://github.com/brennanbrown/retroweird",
      note: "A direct line to playful 90s design language without abandoning readability."
    },
    {
      name: "11ty Indie Web Blog Starter",
      url: "https://github.com/brennanbrown/11ty-Indie-Web-Blog-Starter",
      note: "A useful reference for IndieWeb-flavored structure and publishing patterns."
    }
  ],
  social: [
    { label: "Email", url: "mailto:sckaiser@sckaiser.com" },
    { label: "GitHub", url: "https://github.com/crazy4pi314", relMe: true },
    { label: "Mastodon", url: "https://mathstodon.xyz/@crazy4pi314", relMe: true },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sckaiser1/" },
    { label: "Twitch", url: "https://www.twitch.tv/crazy4pi314" },
    { label: "RSS", url: "/feed.xml" }
  ]
};
