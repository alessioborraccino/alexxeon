# Alexx Eon

A statically generated Next.js music website backed by the existing Sanity production dataset (`nulp5uls`). Public pages include complete content without JavaScript. The separate Studio edits the same documents and preserves their type names and fields.

## Development and checks

Use Node 24 (see `.node-version`). Run `npm ci`, then `npm run dev`. The predev step fetches published content and generates responsive images. Run `npm test`, `npm run build`, and `npm run check:export` before deployment. Build output is `out/`.

The build fetches published documents without credentials. An unavailable API, empty dataset, missing slug, or duplicate slug fails the build so Render can retain the previous successful deployment. Unpublished drafts are never included. A build is required after publishing, editing, or deleting content. Content is sorted by publication date, then creation date.

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
