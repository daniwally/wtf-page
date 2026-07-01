import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sitemapPath = path.resolve(__dirname, "../public/sitemap.xml");
const today = new Date().toISOString().slice(0, 10);

const sitemap = fs.readFileSync(sitemapPath, "utf8");
const updated = sitemap.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

fs.writeFileSync(sitemapPath, updated);
console.log(`sitemap lastmod updated to ${today}`);
