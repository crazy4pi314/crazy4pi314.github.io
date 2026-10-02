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
    const safeAccent = ["laser", "laser-dark"].includes(accent) ? accent : "laser";

    return `<a class="button-88 button-88--${safeAccent}" href="${escapeHtml(href)}"><span>${escapeHtml(
      label
    )}</span></a>`;
  });

  eleventyConfig.addCollection("posts", collectionApi => {
    return collectionApi.getFilteredByTag("post").reverse();
  });

  eleventyConfig.addCollection("events", collectionApi => {
    return collectionApi.getFilteredByTag("event").reverse();
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
