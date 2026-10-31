# Alexx Eon

A statically generated Next.js music website backed by the existing Sanity production dataset (`nulp5uls`). Public pages include complete content without JavaScript. The separate Studio edits the same documents and preserves their type names and fields.

## Technologies

- **Node.js 24** — version pinned in `.node-version`.
- **TypeScript 7** — site and Sanity Studio source.
- **Next.js 16 and React 19** — statically generated portfolio site.
- **Sanity Studio 6** — content editor; published posts provide song pages.
- **Sharp** — generates responsive images and social preview during builds.
- **Biome and Prettier** — lint and format checks.
- **Playwright** — Chromium browser smoke tests.

## Localization

Site interface translations live in `messages/en.json`, `messages/it.json`, and `messages/de.json`. `lib/i18n.ts` defines supported locale codes and names. Localized pages use prefixed routes such as `/en/`, `/it/bio/`, and `/de/music/the-loneliest/`; `/` redirects to `/en/`. The home, biography, and song pages publish canonical URLs and language alternates.

Music translations are separate Sanity post documents. Set each document’s language to `en`, `it`, or `de`; keep its slug identical across languages so language switching stays on the same song. The Sanity Studio includes `@sanity/document-internationalization` for managing translation groups. The build reads published posts by language and stops if a locale is missing or its slugs do not match English. Translate content in Sanity; the build never machine-translates posts.

## Run the website locally

```sh
npm ci
npm run dev
```

Open <http://localhost:3000>. The development command fetches published Sanity posts and prepares responsive images before starting. It needs network access to Sanity’s public production dataset.

## Build the website

```sh
npm run build
npm run check:export
```

The build fetches published posts, generates responsive images, and exports the static website to `out/`. Render publishes this folder. A failed Sanity request, empty dataset, missing title or slug, duplicate slug, or invalid content fails the build. Drafts are excluded. Posts are sorted by publication date, then creation date. Rebuild after publishing, editing, or deleting content.

## Checks

Run the site checks from the repository root:

```sh
npm audit --audit-level=high
npm run lint
npm run format:check
npm run typecheck
npm test
npm run build
npm run check:export
npx playwright install chromium
npm run test:browser
```

These checks cover dependency vulnerabilities, lint and formatting, TypeScript, content normalization and Sanity field validation, production generation, exported page metadata and links, sitemap and robots files, and browser navigation/video activation.

Run Sanity Studio checks from `sanity/`:

```sh
npm ci
npm audit --audit-level=high
npm run validate
npm run typecheck
npm run build
```

Start the Studio locally with `npm run dev` from `sanity/`. GitHub Actions runs the site and Studio checks on pushes and pull requests. Each run summary shows a live ✅, ❌, cancelled, or not-run result for every check. The workflow is in `.github/workflows/check.yml`.

Photos in `assets/originals/` are preserved for future edits. Build-time Sharp processing generates 640px and 1280px AVIF/WebP variants and a social preview. Originals are not copied to the public deployment. Generated files are ignored by Git.

## Render deployment

Update the **existing** Render static site; importing the blueprint as a new service is not necessary. `render.yaml` records the intended configuration:

- Build command: `npm ci && npm test && npm run build && npm run check:export`
- Publish directory: `out`
- Node: the version in `.node-version`
- Remove the old single-page app rewrite `/* -> /index.html`. It would mask missing pages with HTTP 200 and break generated routes.
- Serve directory indexes for `/bio/` and `/music/<slug>/`. Render should serve `404.html` with HTTP 404 for unknown paths.
- Keep `www.alexxeon.com` as the canonical domain and redirect the apex domain and HTTP to its HTTPS equivalent. Confirm redirects in Render custom-domain settings before changing DNS.
- If Google supplies an HTML verification token, set `GOOGLE_SITE_VERIFICATION` to the token value and rebuild. DNS verification is preferred for a Domain property.

Use Render's private deploy hook URL as a Sanity webhook destination. In Sanity project settings create a webhook for the production dataset, filtered to `_type == "post" && !(_id in path("drafts.**"))`, with create, update, and delete events. Use POST and the deploy hook's requirements. Keep the hook URL secret; do not commit it. Publish a test edit and confirm a successful Render build and corresponding page change. Do not configure a hook until the static-site migration has been deployed successfully.

## Search Console

1. Sign in to Google Search Console and check for an existing `alexxeon.com` property.
2. If absent, add a Domain property and verify using Google's exact DNS TXT record. This requires the domain owner's DNS access. Alternatively use a URL-prefix property and the verification token above.
3. Submit `https://www.alexxeon.com/sitemap.xml`.
4. Inspect `/`, `/bio/`, and a song URL. Run the live URL test, confirm rendered content and canonical URLs, and request indexing.
5. Monitor indexing and Core Web Vitals. Submission does not guarantee indexing or rankings.

## Sanity Studio migration

In `sanity/`, run `npm ci`, `npm run validate`, `npm run build`, then `npm run dev`. The modern Studio config replaces the v2 parts system. Document names, field names, dataset, asset references, and existing content are unchanged. No dataset migration or deletion is performed. The YouTube field remains editable with a URL preview.

Before replacing the production Studio, confirm login, existing post loading, draft editing, preview, publishing, and webhook delivery against the expected project. The build check does not establish authenticated publishing access. Keep the old Studio deployment available until those checks pass. Export the dataset with an authenticated Sanity CLI before any future schema/data changes.

## Rollback and acceptance

Retain the previous Render deploy and its SPA rewrite configuration. Roll back the deploy and restore that rewrite together if needed. Revert the migration commit to restore the old build tool and Studio configuration; no content rollback is needed because this migration does not write to Sanity.

Before rollout, verify desktop/mobile navigation, video activation, biography photos, plain HTML content, unique metadata, sitemap, and missing routes. After rollout verify HTTP 200 for real pages, HTTP 404 for missing pages, HTTPS/domain redirects, and that no `X-Robots-Tag: noindex` header is configured. Never add a catch-all HTML rewrite to this static export.

## Lyrics and sharing

Each Sanity post has an optional **Lyrics** text field. Enter lyrics on the appropriate language document, preserving line breaks and blank lines between verses. Publish and rebuild the site to display them. Songs without lyrics omit the section.

Song pages include a sharing panel with native device sharing when available, a copy-link button, and email sharing. Shared URLs point to the canonical song page in the current language. If clipboard access fails, visitors can select and copy the visible URL manually.
