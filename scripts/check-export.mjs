import { readFile, stat } from "node:fs/promises";
import assert from "node:assert/strict";
const posts = JSON.parse(await readFile(".generated/posts.json", "utf8"));
const routes = ["/", "/bio/", ...posts.map((p) => `/music/${p.slug}/`)];
const sitemap = await readFile("out/sitemap.xml", "utf8");
for (const route of routes) {
  const html = await readFile(`out${route}index.html`, "utf8");
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  assert.equal(
    (markup.match(/<h1[ >]/g) || []).length,
    1,
    `${route} needs one H1`,
  );
  assert.ok(
    markup.includes(`rel="canonical" href="https://www.alexxeon.com${route}"`),
    `${route} canonical missing`,
  );
  assert.ok(
    markup.includes('name="description"'),
    `${route} description missing`,
  );
  assert.ok(
    !markup.includes('name="robots" content="noindex"'),
    `${route} blocks indexing`,
  );
  assert.ok(
    sitemap.includes(`https://www.alexxeon.com${route}`),
    `${route} missing from sitemap`,
  );
  assert.ok(markup.includes('id="main"'), `${route} missing landmark`);
}
for (const post of posts) {
  const html = await readFile(`out/music/${post.slug}/index.html`, "utf8");
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  assert.ok(
    markup.includes(
      post.title
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;"),
    ),
    `${post.slug} title absent from initial HTML`,
  );
}
assert.ok(
  (await readFile("out/robots.txt", "utf8")).includes(
    "Sitemap: https://www.alexxeon.com/sitemap.xml",
  ),
);
assert.ok((await readFile("out/404.html", "utf8")).includes("Page not found"));
assert.ok((await stat("out/og-image.jpg")).size < 200000);
console.log(
  `Verified ${routes.length} pre-rendered pages, canonical URLs, metadata, sitemap, robots, and 404 page.`,
);
