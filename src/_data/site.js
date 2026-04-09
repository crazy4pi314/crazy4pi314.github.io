const inferredDeployUrl =
  process.env.SITE_URL ||
  process.env.DEPLOY_PRIME_URL ||
  process.env.DEPLOY_URL ||
  process.env.URL ||
  process.env.CF_PAGES_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

const siteUrl = inferredDeployUrl || "https://retro-garden-eleventy-theme.vercel.app";

export default {
  title: "Retro Garden",
  description: "Retro Garden is an open source Eleventy theme that blends IndieWeb publishing habits with bright, hand-made early-web energy.",
  url: siteUrl,
  language: "en",
  locale: "en_US",
  tagline: "Dial-up soul, garden-path links, modern static bones.",
  heroLead:
    "Build a **small web home** with RSS, WebC components, OG cards, share links, markdown posting, and accessible defaults without sanding off the weird edges that make personal sites memorable.",
  author: {
    name: "Your Name",
    email: "hello@example.com",
    url: siteUrl,
    summary:
      "Independent publisher, hand-coder, and keeper of a brightly opinionated corner of the internet."
  },
  navigation: [
    { label: "Home", url: "/" },
    { label: "Journal", url: "/journal/" },
    { label: "Style Guide", url: "/style-guide/" },
    { label: "Customize", url: "/customize/" },
    { label: "About", url: "/about/" },
    { label: "Tags", url: "/tags/" }
  ],
  badges: [
    { label: "RSS FEED", url: "/feed.xml", accent: "ember" },
    { label: "STYLE GUIDE", url: "/style-guide/", accent: "surf" },
    { label: "CUSTOMIZE", url: "/customize/", accent: "mint" },
    { label: "TAG CLOUD", url: "/tags/", accent: "ember" }
  ],
  examplePages: [
    {
      label: "Style Guide",
      url: "/style-guide/",
      layout: "Full width page",
      note: "Shows typography, badges, panels, code blocks, and the full palette system in one place."
    },
    {
      label: "Customize",
      url: "/customize/",
      layout: "Optional sidebar page",
      note: "Maps which parts of the theme can be removed, swapped, or extended without rebuilding the whole starter."
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
      name: "Ember",
      slug: "ember",
      vibe: "sunset modem glow",
      note: "Warm oranges with a bright blue companion accent. This is the most overtly nostalgic default.",
      swatches: [
        { label: "Main", value: "#ef7f45" },
        { label: "Soft", value: "#fff1dd" },
        { label: "Strong", value: "#b94f18" },
        { label: "Secondary", value: "#3f93ff" }
      ]
    },
    {
      name: "Surf",
      slug: "surf",
      vibe: "icy portal chrome",
      note: "Cool blue panels with teal highlights. Good when you want the retro shell to feel lighter and more technical.",
      swatches: [
        { label: "Main", value: "#2578e7" },
        { label: "Soft", value: "#e5f3ff" },
        { label: "Strong", value: "#174da2" },
        { label: "Secondary", value: "#17b7b3" }
      ]
    },
    {
      name: "Mint",
      slug: "mint",
      vibe: "garden terminal",
      note: "A greener palette that leans a little more handmade and zine-like while still keeping strong contrast.",
      swatches: [
        { label: "Main", value: "#00a878" },
        { label: "Soft", value: "#e8fff5" },
        { label: "Strong", value: "#076451" },
        { label: "Secondary", value: "#f28f3b" }
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
    { label: "Email", url: "mailto:hello@example.com" },
    { label: "GitHub", url: "https://github.com/kylereddoch/retro-garden-eleventy-theme" },
    { label: "Vercel Demo", url: siteUrl },
    { label: "RSS", url: "/feed.xml" }
  ]
};
