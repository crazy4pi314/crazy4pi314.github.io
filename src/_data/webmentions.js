import EleventyFetch from "@11ty/eleventy-fetch";
import site from "./site.js";

function safeHttpUrl(value = "") {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function safeDate(value = "") {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "" : date.toISOString();
}

function normalizeMention(mention = {}) {
  const author = mention.author || {};

  return {
    author: {
      name: String(author.name || "A reader"),
      photo: safeHttpUrl(author.photo),
      url: safeHttpUrl(author.url)
    },
    content: String(mention.content?.text || ""),
    published: safeDate(mention.published || mention["wm-received"]),
    source: safeHttpUrl(mention.url),
    target: safeHttpUrl(mention["wm-target"]),
    type: String(mention["wm-property"] || "mention-of")
  };
}

export default async function () {
  if (!site.features.webmentions || !site.indieweb.webmentionApi) {
    return [];
  }

  try {
    const data = await EleventyFetch(site.indieweb.webmentionApi, {
      duration: "30m",
      type: "json",
      directory: ".cache/eleventy-fetch"
    });

    return (data.children || []).map(normalizeMention).filter(mention => mention.target && mention.source);
  } catch (error) {
    console.warn(`[Webmentions] Using an empty response: ${error.message}`);
    return [];
  }
}
