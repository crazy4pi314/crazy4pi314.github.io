import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve(process.cwd(), "_site");
const origin = "https://retro-garden.test";
const htmlFiles = [];

async function collectHtmlFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await collectHtmlFiles(entryPath);
    } else if (entry.name.endsWith(".html")) {
      htmlFiles.push(entryPath);
    }
  }
}

function pageUrlForFile(filePath) {
  const relativePath = path.relative(outputDirectory, filePath).split(path.sep).join("/");
  if (relativePath === "index.html") {
    return "/";
  }
  return `/${relativePath.replace(/index\.html$/, "")}`;
}

async function firstExistingPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath);
  const relativePath = decodedPath.replace(/^\/+/, "");
  const candidates = [
    path.join(outputDirectory, relativePath),
    path.join(outputDirectory, relativePath, "index.html")
  ];

  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);
    if (resolved !== outputDirectory && !resolved.startsWith(`${outputDirectory}${path.sep}`)) {
      return null;
    }
    try {
      await access(resolved);
      return resolved;
    } catch {
      // Try the next candidate.
    }
  }

  return null;
}

await collectHtmlFiles(outputDirectory);

// Migrated Reveal.js decks under /talks/ are vendored historical archives that ship
// their own libraries and example pages; they are not theme output to validate.
const ignoredPagePattern = /^\/talks\//;

const failures = [];
let checkedLinks = 0;
const attributePattern = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;

for (const htmlFile of htmlFiles) {
  const source = await readFile(htmlFile, "utf8");
  const pageUrl = pageUrlForFile(htmlFile);

  if (ignoredPagePattern.test(pageUrl)) {
    continue;
  }

  for (const match of source.matchAll(attributePattern)) {
    const value = match[1].trim();
    if (
      !value ||
      value.startsWith("#") ||
      value.startsWith("//") ||
      /^(?:data|javascript|mailto|tel):/i.test(value)
    ) {
      continue;
    }

    let targetUrl;
    try {
      targetUrl = new URL(value, `${origin}${pageUrl}`);
    } catch {
      failures.push(`${pageUrl} contains an invalid URL: ${value}`);
      continue;
    }

    if (targetUrl.origin !== origin) {
      continue;
    }

    checkedLinks += 1;
    const targetPath = await firstExistingPath(targetUrl.pathname);
    if (!targetPath) {
      failures.push(`${pageUrl} -> ${value}`);
    }
  }
}

if (failures.length) {
  console.error(`Found ${failures.length} broken internal reference(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Validated ${checkedLinks} internal links and assets across ${htmlFiles.length} HTML files.`);
}
