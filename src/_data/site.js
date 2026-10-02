const inferredDeployUrl =
  process.env.SITE_URL ||
  process.env.DEPLOY_PRIME_URL ||
  process.env.DEPLOY_URL ||
  process.env.URL ||
  process.env.CF_PAGES_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

const siteUrl = inferredDeployUrl || "https://sckaiser.com";
const tinylyticsId = process.env.TINYLYTICS_ID || "";
const webmentionEndpoint = process.env.WEBMENTION_ENDPOINT || "";
const pingbackEndpoint = process.env.PINGBACK_ENDPOINT || "";
const webmentionApi = process.env.WEBMENTION_API || "";

export default {
  title: "Dr. Sarah Kaiser",
  description: "Sarah Kaiser: scientist, maker, community builder.",
  url: siteUrl,
  language: "en",
  locale: "en_US",
  defaultTheme: "auto",
  tagline: "scientist, maker, community builder.",
  heroLead:
    "I'm an **experimental physicist turned software developer** with 15+ years building and managing cutting-edge tech projects. I write books, cut things with lasers, and hang out with my pup Chewie 🐕💖",
  hero: {
    kicker: "Est. 2016 // a personal homepage, hand-tended",
    title: "Welcome to my corner of the web.",
    photo: {
      src: "/static/img/sarah-and-chewie.jpg",
      alt: "Sarah smiling on a couch while her German Shepherd, Chewie, leans over her shoulder."
    },
    chips: [
      {
        title: "What I make",
        text: "Quantum software, open-source dev tools, books, and things cut with lasers.",
        url: "/blog/"
      },
      {
        title: "Where I speak",
        text: "Conference talks, workshops, podcasts, and streams from PyCon to PyCascades.",
        url: "/events/"
      },
      {
        title: "What I'm learning",
        text: "Marine telemetry, Home Assistant, and keeping a vintage boat afloat.",
        url: "/events/pycascades-2026-a-bridge-over-not-troubled-waters/"
      }
    ]
  },
  features: {
    analytics: Boolean(tinylyticsId),
    breadcrumbs: false,
    marquee: false,
    ogImages: true,
    postSidebars: true,
    projects: false,
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
    { label: "Blog", url: "/blog/" },
    { label: "Events", url: "/events/" },
    { label: "Projects", url: "/projects/", feature: "projects" },
    { label: "Books", url: "/books/" },
    { label: "Search", url: "/search/", feature: "search" },
    { label: "About", url: "/about/" }
  ],
  marquee: "Now booting ★ caution: class 4 personal website ★ protective eyewear required beyond this point ★ quantum software :: lasers engaged :: Chewie on patrol :: boat still afloat ★ now with 100% more pixels ★",
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
      name: "Home Assistant",
      detail: "Open-source home automation that puts local control and privacy first.",
      url: "https://github.com/home-assistant/core"
    },
    {
      name: "Eleventy",
      detail: "A simpler static site generator for transforming templates and content into fast websites.",
      url: "https://github.com/11ty/eleventy"
    },
    {
      name: "Dev Containers",
      detail: "An open specification for creating reproducible, full-featured development environments in containers.",
      url: "https://github.com/devcontainers/spec"
    }
  ],
  neighborhood: [
    {
      name: "cassidoo",
      url: "https://cassidoo.co/",
      note: "Cassidy makes memes and dreams and software."
    },
    {
      name: "glyph",
      url: "https://blog.glyph.im/",
      note: "Glyph is mostly a computer programmer, mostly in Python."
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
