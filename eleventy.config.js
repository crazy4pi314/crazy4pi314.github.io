import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import EleventyNavigationPlugin from "@11ty/eleventy-navigation";
import EleventyPluginRss from "@11ty/eleventy-plugin-rss";
import EleventyPluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import EleventyPluginWebc from "@11ty/eleventy-plugin-webc";
import EleventyPluginOgImage from "eleventy-plugin-og-image";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import * as pagefind from "pagefind";
import readingTime from "reading-time";
import slugify from "slugify";
import site from "./src/_data/site.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const controlTags = new Set(["all", "event", "events", "nav", "post", "posts", "project", "publication"]);

const talkDecks = new Set(
  fs.existsSync(path.join(__dirname, "src/talks"))
    ? fs
        .readdirSync(path.join(__dirname, "src/talks"), { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name)
        // Only link decks that ship a usable Reveal.js runtime; a few legacy decks
        // reference libraries that were never committed and cannot render.
        .filter(name => fs.existsSync(path.join(__dirname, "src/talks", name, "js/reveal.js")))
    : []
);

function toSlug(value = "") {
  return slugify(String(value), {
    lower: true,
    strict: true,
    trim: true
  });
}

function stripTags(value = "") {
  return String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long"
  }).format(new Date(value));
}

function machineDate(value) {
  return new Date(value).toISOString();
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function findHtmlFiles(directory) {
  const files = [];

  for (const entry of await fs.promises.readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await findHtmlFiles(entryPath)));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(entryPath);
    }
  }

  return files;
}

async function writeSitemap(outputPath) {
  const urls = [];

  for (const filePath of await findHtmlFiles(outputPath)) {
    const html = await fs.promises.readFile(filePath, "utf8");

    if (/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html)) {
      continue;
    }

    const relativePath = path.relative(outputPath, filePath).split(path.sep).join("/");
    const pagePath = relativePath === "index.html"
      ? "/"
      : relativePath.endsWith("/index.html")
        ? `/${relativePath.slice(0, -"index.html".length)}`
        : `/${relativePath}`;

    urls.push(new URL(pagePath, site.url).href);
  }

  urls.sort((left, right) => left.localeCompare(right));
  const sitemap = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(url => `  <url><loc>${escapeHtml(url)}</loc></url>`),
    "</urlset>",
    ""
  ].join("\n");

  await fs.promises.writeFile(path.join(outputPath, "sitemap.xml"), sitemap, "utf8");
  console.log(`[Sitemap] Wrote ${urls.length} URLs.`);
}

const markdownLibrary = markdownIt({
  html: true,
  linkify: true,
  breaks: false
})
  .use(markdownItAttrs)
  .use(markdownItAnchor, {
    slugify: toSlug,
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      placement: "after",
      class: "heading-anchor",
      symbol:
        '<span aria-hidden="true" data-pagefind-ignore>#</span><span class="visually-hidden" data-pagefind-ignore>Permalink to this heading</span>'
    })
  });

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(EleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyPluginRss);
  eleventyConfig.addPlugin(EleventyPluginSyntaxHighlight);
  eleventyConfig.addPlugin(EleventyPluginWebc, {
    components: "src/_includes/components/**/*.webc",
    useTransform: true
  });
  eleventyConfig.addPlugin(EleventyPluginOgImage, {
    previewMode: false,
    shortcodeOutput: async ogImage => {
      const imageUrl = new URL(await ogImage.outputUrl(), site.url).href;

      return [
        `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
        '<meta property="og:image:width" content="1200" />',
        '<meta property="og:image:height" content="630" />',
        `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`
      ].join("\n");
    },
    satoriOptions: {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Atkinson Hyperlegible",
          data: fs.readFileSync(
            path.join(
              __dirname,
              "node_modules/@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-400-normal.woff"
            )
          ),
          weight: 400,
          style: "normal"
        },
        {
          name: "Atkinson Hyperlegible",
          data: fs.readFileSync(
            path.join(
              __dirname,
              "node_modules/@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-700-normal.woff"
            )
          ),
          weight: 700,
          style: "normal"
        },
        {
          name: "Chakra Petch",
          data: fs.readFileSync(
            path.join(__dirname, "node_modules/@fontsource/chakra-petch/files/chakra-petch-latin-600-normal.woff")
          ),
          weight: 600,
          style: "normal"
        }
      ]
    }
  });

  if (!site.features.projects) {
    // Books share the projects folder, so only drop non-publication projects and the index.
    eleventyConfig.addPreprocessor("projects-feature-flag", "njk,md", data => {
      const inputPath = data.page.inputPath.replace(/\\/g, "/");
      const tags = [data.tags || []].flat();
      if (inputPath.endsWith("/src/projects.njk")) return false;
      if (inputPath.includes("/src/projects/") && !tags.includes("publication")) return false;
    });
  }

  if (site.features.responsiveImages) {
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
      formats: ["avif", "webp", "auto"],
      widths: [320, 640, 960, "auto"],
      htmlOptions: {
        imgAttributes: {
          loading: "lazy",
          decoding: "async"
        }
      }
    });
  }

  eleventyConfig.addBundle("html");

  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addFilter("slugify", toSlug);
  eleventyConfig.addFilter("stripTags", stripTags);
  eleventyConfig.addFilter("formatDate", formatDate);
  eleventyConfig.addFilter("machineDate", machineDate);
  eleventyConfig.addFilter("readTime", value => readingTime(String(value || "")).text);
  eleventyConfig.addFilter("renderMarkdown", value => markdownLibrary.render(String(value || "")));
  eleventyConfig.addFilter("renderMarkdownInline", value => markdownLibrary.renderInline(String(value || "")));
  eleventyConfig.addFilter("limit", (values = [], amount = 3) => values.slice(0, amount));
  eleventyConfig.addFilter("concat", (left = [], right = []) => [...left, ...right]);
  eleventyConfig.addFilter("publicTags", (tags = []) => tags.filter(tag => !controlTags.has(tag)));
  eleventyConfig.addFilter("feedType", data => {
    if (!(data.tags || []).includes("event")) return "blog";
    return ["talk", "panel", "workshop", "podcast", "livestream"].includes(data.eventType)
      ? data.eventType : "event";
  });
  eleventyConfig.addFilter("resourceUrl", value => {
    if (!value || typeof value !== "string") {
      return "";
    }

    if (/^https?:\/\//i.test(value) || value.startsWith("/static/")) {
      return value;
    }

    return /\.(pdf|pptx?|key)$/i.test(value) ? `/static/${value.replace(/^\.?\//, "")}` : "";
  });
  eleventyConfig.addFilter("slideLinks", value => {
    if (!value) {
      return [];
    }

    const links = [];

    if (typeof value === "object") {
      if (value.reveal && talkDecks.has(value.reveal)) {
        links.push({ url: `/talks/${value.reveal}/`, label: "Slides (Reveal.js)" });
      }
      if (value.revealUrl) {
        links.push({ url: String(value.revealUrl), label: "Slides (Reveal.js)" });
      }
      if (value.local) {
        links.push({ url: `/static/${String(value.local).replace(/^\.?\//, "")}`, label: "Slides (PDF)" });
      }
      return links;
    }

    if (typeof value !== "string") {
      return links;
    }

    const trimmed = value.trim().replace(/^\.\//, "").replace(/\/$/, "");
    if (!trimmed) {
      return links;
    }

    if (/^https?:\/\//i.test(trimmed)) {
      links.push({ url: trimmed, label: "View slides" });
    } else if (talkDecks.has(trimmed)) {
      links.push({ url: `/talks/${trimmed}/`, label: "Slides (Reveal.js)" });
    } else if (/\.(pdf|pptx?|key)$/i.test(trimmed)) {
      links.push({
        url: trimmed.startsWith("/static/") ? trimmed : `/static/${trimmed.replace(/^\//, "")}`,
        label: "Slides (PDF)"
      });
    }

    return links;
  });
  eleventyConfig.addFilter("urlencode", value => encodeURIComponent(String(value ?? "")));
  eleventyConfig.addFilter("json", value => JSON.stringify(value));
  eleventyConfig.addFilter("isCurrentNavigation", (pageUrl = "", itemUrl = "") => {
    if (pageUrl === false) return false;
    return itemUrl === "/" ? pageUrl === itemUrl : pageUrl.startsWith(itemUrl);
  });
  eleventyConfig.addFilter("webmentionsForUrl", (mentions = [], pageUrl = "", siteUrl = "") => {
    const target = new URL(pageUrl, siteUrl).href.replace(/\/$/, "");
    return mentions.filter(mention => String(mention.target || "").replace(/\/$/, "") === target);
  });
  eleventyConfig.addFilter("webmentionsOfType", (mentions = [], type = "") => {
    return mentions.filter(mention => mention.type === type);
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("button88", (label, href, accent = "laser") => {
    // Service marks from Simple Icons 11.0.0 (CC0).
    const icons = {
      rss: "M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301 3.29C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z",
      github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
      mastodon: "M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z",
      twitch: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z",
      linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    };
    const safeAccent = ["laser", "laser-dark", ...Object.keys(icons)].includes(accent) ? accent : "laser";
    const icon = Object.hasOwn(icons, safeAccent)
      ? `<svg class="button-88__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true" focusable="false"><path d="${icons[safeAccent]}"></path></svg>`
      : "";

    return `<a class="button-88 button-88--${safeAccent}" href="${escapeHtml(href)}">${icon}<span>${escapeHtml(
      label
    )}</span></a>`;
  });

  eleventyConfig.addCollection("posts", collectionApi => {
    return collectionApi.getFilteredByTag("post").reverse();
  });

  eleventyConfig.addCollection("events", collectionApi => {
    return collectionApi.getFilteredByTag("event").reverse();
  });

  eleventyConfig.addCollection("blogFeed", collectionApi => {
    return collectionApi.getAll()
      .filter(item => (item.data.tags || []).some(tag => tag === "post" || tag === "event"))
      .sort((left, right) => right.date - left.date);
  });

  eleventyConfig.addCollection("projects", collectionApi => {
    return collectionApi.getFilteredByTag("project").reverse();
  });

  eleventyConfig.addCollection("publications", collectionApi => {
    return collectionApi.getFilteredByTag("publication").reverse();
  });

  eleventyConfig.addCollection("tagList", collectionApi => {
    const tags = new Set();

    for (const item of collectionApi.getAll()) {
      for (const tag of item.data.tags || []) {
        if (!controlTags.has(tag)) {
          tags.add(tag);
        }
      }
    }

    return Array.from(tags).sort((left, right) => left.localeCompare(right));
  });

  eleventyConfig.addCollection("tagCounts", collectionApi => {
    const counts = new Map();

    for (const item of collectionApi.getAll()) {
      for (const tag of new Set(item.data.tags || [])) {
        if (!controlTags.has(tag)) {
          counts.set(tag, (counts.get(tag) || 0) + 1);
        }
      }
    }

    return Array.from(counts, ([tag, count]) => ({ tag, count }))
      .sort((left, right) => right.count - left.count || left.tag.localeCompare(right.tag));
  });

  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/static": "static" });
  eleventyConfig.addPassthroughCopy({ "src/talks": "talks" });
  eleventyConfig.ignores.add("src/talks/**");
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource/atkinson-hyperlegible/files": "assets/css/files"
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource/chakra-petch/files": "assets/css/files"
  });
  eleventyConfig.addPassthroughCopy({ "src/assets/images/logo": "assets/images/logo" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "node_modules/@11ty/is-land/is-land.js": "assets/js/is-land.js" });
  eleventyConfig.addWatchTarget("./src/assets/");

  eleventyConfig.on("eleventy.after", async ({ dir } = {}) => {
    const outputPath = path.resolve(dir?.output || "_site");

    if (site.features.search) {
      const { index, errors: createErrors = [] } = await pagefind.createIndex({
        rootSelector: "main[data-pagefind-body]",
        verbose: false
      });

      if (!index || createErrors.length) {
        throw new Error(`Pagefind could not create an index: ${createErrors.join("; ")}`);
      }

      const { errors: crawlErrors = [], page_count: pageCount = 0 } = await index.addDirectory({
        path: outputPath
      });
      if (crawlErrors.length) {
        throw new Error(`Pagefind could not index the site: ${crawlErrors.join("; ")}`);
      }

      const { errors: writeErrors = [] } = await index.writeFiles({
        outputPath: path.join(outputPath, "pagefind")
      });
      await index.deleteIndex();

      if (writeErrors.length) {
        throw new Error(`Pagefind could not write its bundle: ${writeErrors.join("; ")}`);
      }

      console.log(`[Pagefind] Indexed ${pageCount} pages.`);
    }

    await writeSitemap(outputPath);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html", "webc", "11ty.js"]
  };
}
