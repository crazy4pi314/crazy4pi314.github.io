import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import EleventyPluginRss from "@11ty/eleventy-plugin-rss";
import EleventyPluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import EleventyPluginWebc from "@11ty/eleventy-plugin-webc";
import EleventyPluginOgImage from "eleventy-plugin-og-image";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import readingTime from "reading-time";
import slugify from "slugify";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const controlTags = new Set(["all", "nav", "post", "posts"]);

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

const markdownLibrary = markdownIt({
  html: true,
  linkify: true,
  breaks: false
})
  .use(markdownItAttrs)
  .use(markdownItAnchor, {
    slugify: toSlug,
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "heading-anchor",
      symbol: "#"
    })
  });

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(EleventyPluginRss);
  eleventyConfig.addPlugin(EleventyPluginSyntaxHighlight);
  eleventyConfig.addPlugin(EleventyPluginWebc, {
    components: "src/_includes/components/**/*.webc",
    useTransform: true
  });
  eleventyConfig.addPlugin(EleventyPluginOgImage, {
    previewMode: false,
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
          name: "Silkscreen",
          data: fs.readFileSync(
            path.join(__dirname, "node_modules/@fontsource/silkscreen/files/silkscreen-latin-400-normal.woff")
          ),
          weight: 400,
          style: "normal"
        }
      ]
    }
  });

  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addFilter("slugify", toSlug);
  eleventyConfig.addFilter("stripTags", stripTags);
  eleventyConfig.addFilter("formatDate", formatDate);
  eleventyConfig.addFilter("machineDate", machineDate);
  eleventyConfig.addFilter("readTime", value => readingTime(String(value || "")).text);
  eleventyConfig.addFilter("renderMarkdown", value => markdownLibrary.render(String(value || "")));
  eleventyConfig.addFilter("renderMarkdownInline", value => markdownLibrary.renderInline(String(value || "")));
  eleventyConfig.addFilter("limit", (values = [], amount = 3) => values.slice(0, amount));
  eleventyConfig.addFilter("publicTags", (tags = []) => tags.filter(tag => !controlTags.has(tag)));
  eleventyConfig.addFilter("urlencode", value => encodeURIComponent(String(value ?? "")));

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("button88", (label, href, accent = "ember") => {
    const safeAccent = ["ember", "surf", "mint"].includes(accent) ? accent : "ember";

    return `<a class="button-88 button-88--${safeAccent}" href="${escapeHtml(href)}"><span>${escapeHtml(
      label
    )}</span></a>`;
  });

  eleventyConfig.addCollection("posts", collectionApi => {
    return collectionApi.getFilteredByTag("post").reverse();
  });

  eleventyConfig.addCollection("tagList", collectionApi => {
    const tags = new Set();

    for (const item of collectionApi.getFilteredByTag("post")) {
      for (const tag of item.data.tags || []) {
        if (!controlTags.has(tag)) {
          tags.add(tag);
        }
      }
    }

    return Array.from(tags).sort((left, right) => left.localeCompare(right));
  });

  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource/atkinson-hyperlegible/files": "assets/css/files"
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource/silkscreen/files": "assets/css/files"
  });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "node_modules/@11ty/is-land/is-land.js": "assets/js/is-land.js" });
  eleventyConfig.addWatchTarget("./src/assets/");

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
