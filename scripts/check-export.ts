import { readFile, stat } from "node:fs/promises";
import assert from "node:assert/strict";
import type { Post } from "../lib/content";

const posts = JSON.parse(
  await readFile(".generated/posts.json", "utf8"),
) as Post[];
const routes = ["/", "/bio/", ...posts.map((p) => `/music/${p.slug}/`)];
const sitemap = await readFile("out/sitemap.xml", "utf8");
const pageTitles = new Set<string>();
const pageDescriptions = new Set<string>();

function routeFile(pathname: string): string {
  if (pathname === "/") return "out/index.html";
  if (/\.[a-z0-9]+$/i.test(pathname)) return `out${pathname}`;
  return `out${pathname.endsWith("/") ? pathname : `${pathname}/`}index.html`;
}

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
  const title = markup.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title, `${route} title missing`);
  assert.ok(!pageTitles.has(title), `${route} title is not unique`);
  pageTitles.add(title);
  const description = markup.match(
    /<meta name="description" content="([^"]*)"/,
  )?.[1];
  assert.ok(description, `${route} description is missing`);
  assert.ok(description.trim(), `${route} description is empty`);
  assert.ok(
    !pageDescriptions.has(description),
    `${route} description is not unique`,
  );
  pageDescriptions.add(description);
  assert.ok(
    markup.includes('property="og:title"'),
    `${route} Open Graph title missing`,
  );
  assert.ok(
    markup.includes('property="og:description"'),
    `${route} Open Graph description missing`,
  );
  assert.ok(
    markup.includes('property="og:image"'),
    `${route} Open Graph image missing`,
  );
  assert.ok(
    markup.includes('name="twitter:card"'),
    `${route} Twitter card missing`,
  );

  for (const [, rawHref] of markup.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = rawHref.replaceAll("&amp;", "&");
    if (/^(https?:|mailto:|tel:)/i.test(href)) continue;
    assert.ok(
      !/^[a-z][a-z0-9+.-]*:/i.test(href),
      `${route} has unsafe link: ${href}`,
    );
    const target = new URL(href, `https://www.alexxeon.com${route}`);
    const targetPath = decodeURIComponent(target.pathname);
    const targetFile = routeFile(targetPath);
    try {
      await stat(targetFile);
    } catch {
      assert.fail(`${route} links to missing local target: ${href}`);
    }
    if (target.hash) {
      const targetMarkup = await readFile(targetFile, "utf8");
      assert.ok(
        targetMarkup.includes(
          `id="${decodeURIComponent(target.hash.slice(1))}"`,
        ),
        `${route} links to missing anchor: ${href}`,
      );
    }
  }
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
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  ([, url]) => url,
);
assert.deepEqual(
  [...sitemapUrls].sort(),
  routes.map((route) => `https://www.alexxeon.com${route}`).sort(),
  "Sitemap must contain each canonical route exactly once",
);
console.log(
  `Verified ${routes.length} pages, unique SEO/social metadata, local links, sitemap, robots, and 404 page.`,
);
