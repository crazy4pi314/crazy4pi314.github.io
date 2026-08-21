import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const host = "127.0.0.1";
const port = Number.parseInt(process.env.PORT || "4173", 10);
const root = path.resolve(process.cwd(), "_site");
const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"]
]);

async function resolveRequestPath(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const relativePath = decodedPath.endsWith("/") ? `${decodedPath}index.html` : decodedPath;
  let filePath = path.resolve(root, `.${relativePath}`);

  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    return null;
  }

  try {
    const details = await stat(filePath);
    if (details.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    return filePath;
  } catch {
    if (!path.extname(filePath)) {
      const indexPath = path.join(filePath, "index.html");
      try {
        await stat(indexPath);
        return indexPath;
      } catch {
        return null;
      }
    }
    return null;
  }
}

const server = http.createServer(async (request, response) => {
  if (!request.url || !["GET", "HEAD"].includes(request.method || "")) {
    response.writeHead(405, { "content-type": "text/plain; charset=utf-8" });
    response.end("Method not allowed");
    return;
  }

  const requestUrl = new URL(request.url, `http://${host}:${port}`);
  const filePath = await resolveRequestPath(requestUrl.pathname);

  if (!filePath) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const contentType = mimeTypes.get(path.extname(filePath).toLowerCase()) || "application/octet-stream";
  response.writeHead(200, {
    "cache-control": "no-store",
    "content-type": contentType
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Retro Garden preview: http://${host}:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
