import EleventyFetch from "@11ty/eleventy-fetch";

const packages = [
  {
    name: "Eleventy",
    packageName: "@11ty/eleventy",
    url: "https://www.npmjs.com/package/@11ty/eleventy",
    fallback: "Static-first site generator"
  },
  {
    name: "WebC",
    packageName: "@11ty/eleventy-plugin-webc",
    url: "https://www.npmjs.com/package/@11ty/eleventy-plugin-webc",
    fallback: "Component authoring for Eleventy"
  },
  {
    name: "is-land",
    packageName: "@11ty/is-land",
    url: "https://www.npmjs.com/package/@11ty/is-land",
    fallback: "Partial hydration islands"
  },
  {
    name: "Tailwind",
    packageName: "tailwindcss",
    url: "https://www.npmjs.com/package/tailwindcss",
    fallback: "Utility-first styling engine"
  }
];

export default async function () {
  return Promise.all(
    packages.map(async item => {
      try {
        const data = await EleventyFetch(`https://registry.npmjs.org/${encodeURIComponent(item.packageName)}/latest`, {
          duration: "1d",
          type: "json",
          directory: ".cache/eleventy-fetch"
        });

        return {
          ...item,
          version: data.version,
          description: data.description
        };
      } catch {
        return {
          ...item,
          version: "cached/offline",
          description: item.fallback
        };
      }
    })
  );
}
