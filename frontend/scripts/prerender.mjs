// Prerendering en build-time: levanta un server estático sobre /build, renderiza
// la app con Chrome headless (puppeteer-core + Chrome del sistema), y reescribe
// build/index.html con el HTML REAL ya renderizado. El cliente hidrata encima.
// Objetivo: que el HTML inicial exponga el contenido (SEO, crawlers, previews,
// "View Source") en lugar de un <div id="root"> vacío.
import http from "node:http";
import { readFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD = path.resolve(__dirname, "..", "build");
const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// Rutas a prerenderizar. La home (/) es la principal (V3Page). /v3 sirve el mismo
// HTML vía el SPA-fallback de Vercel, así que con / alcanza para el SEO principal.
const ROUTES = ["/"];

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
};

// Server estático con SPA-fallback a index.html para rutas sin extensión.
function startServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      let filePath = path.join(BUILD, urlPath);
      const hasExt = !!path.extname(urlPath);
      let isFile = false;
      try {
        isFile = (await stat(filePath)).isFile();
      } catch {
        isFile = false;
      }
      if (!isFile) {
        if (hasExt) {
          res.statusCode = 404;
          res.end("not found");
          return;
        }
        filePath = path.join(BUILD, "index.html"); // SPA fallback
      }
      const data = await readFile(filePath);
      res.setHeader(
        "Content-Type",
        MIME[path.extname(filePath)] || "application/octet-stream"
      );
      res.end(data);
    } catch (e) {
      res.statusCode = 500;
      res.end(String(e));
    }
  });
  return new Promise((resolve) =>
    server.listen(0, "127.0.0.1", () => resolve(server))
  );
}

async function main() {
  if (!existsSync(CHROME)) {
    throw new Error(
      `Chrome no encontrado en ${CHROME}. Seteá CHROME_PATH al ejecutable de Chrome.`
    );
  }
  if (!existsSync(path.join(BUILD, "index.html"))) {
    throw new Error("No existe build/index.html. Corré el build primero.");
  }

  const server = await startServer();
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });

      // No descargar videos pesados durante el prerender (no aportan al HTML de texto)
      await page.setRequestInterception(true);
      page.on("request", (r) =>
        r.resourceType() === "media" ? r.abort() : r.continue()
      );

      await page.goto(base + route, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });

      // Esperar a que React monte y haya contenido real (h1 + secciones)
      await page.waitForFunction(
        () => {
          const root = document.getElementById("root");
          return (
            root &&
            root.childElementCount > 0 &&
            document.querySelector("h1") &&
            document.querySelectorAll("[data-theme-section]").length >= 10
          );
        },
        { timeout: 60000 }
      );

      // Respiro para que se asienten los reveals iniciales
      await new Promise((r) => setTimeout(r, 1500));

      const html = await page.content();
      const outFile =
        route === "/"
          ? path.join(BUILD, "index.html")
          : path.join(BUILD, route.replace(/^\//, ""), "index.html");
      await writeFile(outFile, html, "utf8");
      console.log(
        `✓ prerendered ${route} -> ${path.relative(BUILD, outFile)} (${(
          html.length / 1024
        ).toFixed(0)} KB)`
      );
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main()
  .then(() => {
    console.log("prerender done");
    process.exit(0);
  })
  .catch((e) => {
    console.error("prerender FAILED:", e.message);
    process.exit(1);
  });
