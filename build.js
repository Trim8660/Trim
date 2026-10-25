// ============================================================
// Static site generator.
// Turns the client-rendered category.html?cat=x pages into real
// static pages at clean URLs (/pimple-patches/, /korean-sunscreen/…)
// because query-string URLs rank worse and rarely get cited by
// AI overviews. Run: node build.js  → output in ./dist
// ============================================================
const fs = require("fs");
const path = require("path");

const SRC = __dirname;
const OUT = path.join(SRC, "dist");

// category keys, extracted from data.js so they never drift
const dataSrc = fs.readFileSync(path.join(SRC, "data.js"), "utf8");
const CATS = [...dataSrc.matchAll(/^  "([\w-]+)": \{$/gm)].map(m => m[1]);
if (!CATS.length) { console.error("no categories found in data.js"); process.exit(1); }

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// --- shared files, copied to dist root ---
for (const f of ["affiliate.js", "data.js", "styles.css"]) {
  fs.copyFileSync(path.join(SRC, f), path.join(OUT, f));
}

// --- category pages at /{cat}/ ---
const catTpl = fs.readFileSync(path.join(SRC, "category.html"), "utf8");
const CATKEY_LINE = 'const catKey = new URLSearchParams(location.search).get("cat") || "pimple-patches";';

for (const cat of CATS) {
  let html = catTpl.replace(
    CATKEY_LINE,
    `const catKey = ${JSON.stringify(cat)}; // baked at build time`
  );
  // pages live one level deep: point every internal reference up to root.
  // nav links are built at runtime from a JS template (`category.html?cat=${k}`),
  // so rewrite that pattern to a runtime-relative clean path too.
  html = html
    .replaceAll('href="index.html"', 'href="../index.html"')
    .replaceAll('href="quiz.html"', 'href="../quiz.html"')
    .replaceAll('href="styles.css"', 'href="../styles.css"')
    .replaceAll('src="affiliate.js"', 'src="../affiliate.js"')
    .replaceAll('src="data.js"', 'src="../data.js"')
    .replaceAll('category.html?cat=${k}', '../${k}/')
    .replaceAll('category.html?cat=${answers.cat}', '../${answers.cat}/');
  for (const k of CATS) {
    html = html.replaceAll(`category.html?cat=${k}`, `../${k}/`);
  }
  const dir = path.join(OUT, cat);
  fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

// --- root pages: index + quiz, links now point at clean paths ---
for (const f of ["index.html", "quiz.html"]) {
  let html = fs.readFileSync(path.join(SRC, f), "utf8");
  for (const k of CATS) {
    html = html.replaceAll(`category.html?cat=${k}`, `${k}/`);
  }
  html = html
    .replaceAll('category.html?cat=${k}', '${k}/')
    .replaceAll('category.html?cat=${answers.cat}', '${answers.cat}/');
  fs.writeFileSync(path.join(OUT, f), html);
}

// --- sitemap + robots ---
const BASE = "https://kbeautyranked.com"; // swap for the real domain at deploy time
const urls = ["", "quiz.html", ...CATS.map(c => `${c}/`)];
fs.writeFileSync(path.join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${BASE}/${u}</loc><changefreq>monthly</changefreq></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *
Allow: /
Sitemap: ${BASE}/sitemap.xml
`);

console.log(`built ${CATS.length} category pages + ${2} root pages → dist/`);
