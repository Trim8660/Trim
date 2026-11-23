// ============================================================
// Static site generator.
// Turns the client-rendered category.html?cat=x pages into real
// static pages at clean URLs (/pimple-patches/, /korean-sunscreen/…)
// because query-string URLs rank worse and rarely get cited by
// AI overviews. Run: node build.js  → output in ./dist
// ============================================================
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SRC = __dirname;
const OUT = path.join(SRC, "dist");

// Load category and skin-profile definitions from the shared product database.
const dataSrc = fs.readFileSync(path.join(SRC, "data.js"), "utf8");
const dataContext = {};
vm.createContext(dataContext);
vm.runInContext(`${dataSrc}\n;this.CATEGORIES = CATEGORIES; this.SKIN_PROFILES = SKIN_PROFILES;`, dataContext);
const CATS = Object.keys(dataContext.CATEGORIES);
const SKINS = Object.values(dataContext.SKIN_PROFILES);
if (!CATS.length) { console.error("no categories found in data.js"); process.exit(1); }
if (!SKINS.length) { console.error("no skin profiles found in data.js"); process.exit(1); }

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// --- shared files, copied to dist root ---
for (const f of ["affiliate.js", "data.js", "nav.js", "hero-motion.js", "styles.css", "home.css", "tokens.css", "base.css"]) {
  fs.copyFileSync(path.join(SRC, f), path.join(OUT, f));
}
// product images
const IMG_SRC = path.join(SRC, "images");
if (fs.existsSync(IMG_SRC)) {
  fs.cpSync(IMG_SRC, path.join(OUT, "images"), { recursive: true });
}

// --- blog index and articles ---
const BLOG_SRC = path.join(SRC, "blog");
const blogUrls = [];
if (fs.existsSync(BLOG_SRC)) {
  fs.cpSync(BLOG_SRC, path.join(OUT, "blog"), { recursive: true });
  blogUrls.push("blog/");
  for (const entry of fs.readdirSync(BLOG_SRC, { withFileTypes: true })) {
    if (entry.isDirectory() && fs.existsSync(path.join(BLOG_SRC, entry.name, "index.html"))) {
      blogUrls.push(`blog/${entry.name}/`);
    }
  }
}

// --- category pages at /{cat}/ ---
const catTpl = fs.readFileSync(path.join(SRC, "category.html"), "utf8");
const CATKEY_LINE = 'const catKey = new URLSearchParams(location.search).get("cat") || "pimple-patches";';

// Pages generated one level below root share these asset and legacy-link rewrites.
function nestedPage(html) {
  html = html
    .replaceAll('href="index.html"', 'href="../index.html"')
    .replaceAll('href="quiz.html"', 'href="../quiz.html"')
    .replaceAll('href="blog/"', 'href="../blog/"')
    .replaceAll('href="styles.css"', 'href="../styles.css"')
    .replaceAll('src="images/', 'src="../images/')
    .replaceAll('src="affiliate.js"', 'src="../affiliate.js"')
    .replaceAll('src="data.js"', 'src="../data.js"')
    .replaceAll('src="nav.js"', 'src="../nav.js"')
    .replaceAll('category.html?cat=${k}', '../${k}/')
    .replaceAll('category.html?cat=${answers.cat}', '../${answers.cat}/');
  for (const k of CATS) {
    html = html.replaceAll(`category.html?cat=${k}`, `../${k}/`);
  }
  return html;
}

for (const cat of CATS) {
  const html = nestedPage(catTpl.replace(
    CATKEY_LINE,
    `const catKey = ${JSON.stringify(cat)}; // baked at build time`
  ));
  const dir = path.join(OUT, cat);
  fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

// --- skin-type recommendations at /{skin.path}/ ---
const skinTpl = fs.readFileSync(path.join(SRC, "skin-type.html"), "utf8");
const SKINKEY_LINE = 'const skinKey = new URLSearchParams(location.search).get("skin") || "sensitive";';
for (const [key, skin] of Object.entries(dataContext.SKIN_PROFILES)) {
  const html = nestedPage(skinTpl.replace(
    SKINKEY_LINE,
    `const skinKey = ${JSON.stringify(key)}; // baked at build time`
  ));
  const dir = path.join(OUT, skin.path);
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
    .replaceAll('category.html?cat=${key}', '/${key}/')
    .replaceAll('category.html?cat=${k}', '/${k}/')
    .replaceAll('category.html?cat=${answers.cat}', '${answers.cat}/');
  fs.writeFileSync(path.join(OUT, f), html);
}

// Preview route manifest is derived from the same source as the static output.
const previewRoutes = [
  { path: "/", title: "Home" },
  { path: "/index.html", title: "Home" },
  { path: "/quiz.html", title: "Skin match quiz" },
  ...CATS.map(c => ({ path: `/${c}/`, title: dataContext.CATEGORIES[c].name })),
  ...SKINS.map(s => ({ path: `/${s.path}/`, title: s.navName })),
  ...blogUrls.map(url => ({ path: `/${url}`, title: url === "blog/" ? "The K-Beauty Edit" : url.split("/")[1].replaceAll("-", " ") }))
];
fs.writeFileSync(path.join(OUT, "manus-routes.json"), JSON.stringify({ routes: previewRoutes }, null, 2) + "\n");

// --- sitemap + robots ---
const BASE = "https://decodekbeauty.com"; // production domain
const urls = ["", "quiz.html", ...CATS.map(c => `${c}/`), ...SKINS.map(s => `${s.path}/`), ...blogUrls];
fs.writeFileSync(path.join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${BASE}/${u}</loc><changefreq>monthly</changefreq></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *
Allow: /
Sitemap: ${BASE}/sitemap.xml
`);

console.log(`built ${CATS.length} category pages + ${SKINS.length} skin pages + 2 root pages + ${blogUrls.length} blog pages → dist/`);
