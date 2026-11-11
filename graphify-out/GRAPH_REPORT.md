# Graph Report - alexxeon  (2026-11-11)

## Corpus Check
- 102 files · ~14,067 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 27 file(s) not represented in the graph (top: .css 15, (none) 8, .ico 2)

## Summary
- 485 nodes · 892 edges · 43 communities (17 shown, 26 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `60217a1e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Website Package Dependencies
- Content Repository Verification
- Shared UI Views
- Localized Routes Metadata
- Sanity Studio Schemas
- CI Verification Jobs
- Preferences State Controls
- Website Architecture Documentation
- architecture.test.ts
- Website TypeScript Configuration
- Content Normalization Pipeline
- Render Deployment Configuration
- Studio TypeScript Configuration
- Biome Lint Configuration
- Dependency Update Groups
- Dependency Security Overrides
- Graph Navigation Rules
- Smiling Portrait Asset
- Stairs Portrait Asset
- Doorway Portrait Asset
- Microphone Portrait Asset
- Tiled Doorway Portrait
- Upward Looking Portrait
- Android Small Icon
- Android Large Icon
- Apple Touch Icon
- Small Favicon Asset
- Large Favicon Asset
- Green Wordmark Assets
- White Wordmark Assets
- PDF Wordmark Asset
- Small Tile Logo
- Medium Tile Logo
- Wide Tile Logo
- Large Tile Logo
- Tiny Tile Logo
- Pinned Tab Logo
- Video Background Asset
- Raster Logo Asset
- Vector Logo Asset
- Q: read path to preferences changes

## God Nodes (most connected - your core abstractions)
1. `Locale` - 27 edges
2. `Alexx Eon static music website` - 20 edges
3. `resolveLocaleParams()` - 18 edges
4. `Post` - 16 edges
5. `messages` - 16 edges
6. `compilerOptions` - 16 edges
7. `Page()` - 14 edges
8. `scripts` - 13 edges
9. `env` - 12 edges
10. `next` - 11 edges

## Surprising Connections (you probably didn't know these)
- `sitemap()` --calls--> `getPosts`  [EXTRACTED]
  app/sitemap.ts → modules/content/server.ts
- `DefaultLocaleLayout()` --calls--> `ThemeScript()`  [EXTRACTED]
  app/(root)/layout.tsx → modules/preferences/internal/ThemeScript.tsx
- `DefaultLocalePage()` --calls--> `LanguageRedirect()`  [EXTRACTED]
  app/(root)/page.tsx → views/language-redirect/LanguageRedirectPage.tsx
- `Bio()` --calls--> `BioPage()`  [EXTRACTED]
  app/[locale]/bio/page.tsx → views/bio/BioPage.tsx
- `generateMetadata()` --calls--> `resolveLocaleParams()`  [EXTRACTED]
  app/[locale]/layout.tsx → modules/i18n/server.ts

## Import Cycles
- None detected.

## Communities (43 total, 26 thin omitted)

### Community 0 - "Website Package Dependencies"
Cohesion: 0.05
Nodes (48): dependencies, next@16.4.3, @portabletext/react@8.0.1, react@19.3.1, react-dom@19.3.1, @sanity/client@8.11.0, devDependencies, @biomejs/biome@2.6.3 (+40 more)

### Community 1 - "Content Repository Verification"
Cohesion: 0.09
Nodes (20): dynamic, sitemap(), Post, PostsRepository, PostsByLocale, StaticJsonPostsRepository, Locale, pageDescriptions (+12 more)

### Community 2 - "Shared UI Views"
Cohesion: 0.08
Nodes (25): GlobalNotFound(), Body(), components, Video(), VideoProps, Button(), ButtonProps, ButtonLink() (+17 more)

### Community 3 - "Localized Routes Metadata"
Cohesion: 0.08
Nodes (41): Bio(), BioProps, generateMetadata(), dynamicParams, generateMetadata(), LocaleLayout(), LocaleLayoutProps, viewport (+33 more)

### Community 4 - "Sanity Studio Schemas"
Cohesion: 0.07
Nodes (33): sanity, @sanity/document-internationalization, @sanity/vision, styled-components, dependencies, react@19.3.1, react-dom@19.3.1, sanity@6.20.0 (+25 more)

### Community 5 - "CI Verification Jobs"
Cohesion: 0.07
Nodes (34): run, AUDIT_RESULT, BROWSER_RESULT, BROWSER_SETUP_RESULT, BUILD_RESULT, EXPORT_RESULT, FORMAT_RESULT, LINT_RESULT (+26 more)

### Community 6 - "Preferences State Controls"
Cohesion: 0.16
Nodes (18): DefaultLocaleLayout(), DefaultLocalePage(), getPreferredLocale(), isTheme(), replacePathLocale(), Theme, PreferencesContext, PreferencesContextValue (+10 more)

### Community 7 - "Website Architecture Documentation"
Cohesion: 0.13
Nodes (23): Alexx Eon static music website, Public module interfaces and client/server boundaries, Published content validation, Site and Studio verification workflow, Build-only content fetch and posts snapshot, Server-only snapshot reads, English Italian German localization, Optional localized lyrics (+15 more)

### Community 8 - "architecture.test.ts"
Cohesion: 0.20
Nodes (8): check(), clients, files, graph, imports, known, roots, sources()

### Community 9 - "Website TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "Content Normalization Pipeline"
Cohesion: 0.28
Nodes (7): normalizePosts(), orderPostsLike(), SanityPostInput, plainText(), fetchPublishedPosts(), locales, youtubeId()

### Community 11 - "Render Deployment Configuration"
Cohesion: 0.13
Nodes (14): name, path, value, destination, source, type, services, buildCommand (+6 more)

### Community 12 - "Studio TypeScript Configuration"
Cohesion: 0.14
Nodes (13): compilerOptions, esModuleInterop, isolatedModules, lib, module, moduleResolution, noEmit, resolveJsonModule (+5 more)

### Community 13 - "Biome Lint Configuration"
Cohesion: 0.15
Nodes (12): files, ignoreUnknown, includes, linter, enabled, rules, preset, $schema (+4 more)

### Community 14 - "Dependency Update Groups"
Cohesion: 0.17
Nodes (11): react, sanity, patterns, patterns, interval, updates, directory, groups (+3 more)

### Community 15 - "Dependency Security Overrides"
Cohesion: 0.25
Nodes (8): undici, overrides, @module-federation/dts-plugin, typeid-js, @vercel/frameworks, uuid, js-yaml, smol-toml

### Community 42 - "Q: read path to preferences changes"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: read path to preferences changes, Source Nodes

## Knowledge Gaps
- **30 isolated node(s):** `AST graph update after code changes`, `Smiling portrait with green cap`, `Portrait seated on metal stairs`, `Portrait beside green doorway`, `Portrait holding microphone` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 199 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@sanity/client` connect `Website Package Dependencies` to `Content Normalization Pipeline`, `Sanity Studio Schemas`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **What connects `AST graph update after code changes`, `Smiling portrait with green cap`, `Portrait seated on metal stairs` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Website Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05061224489795919 - nodes in this community are weakly interconnected._
- **Why does `next` connect `Localized Routes Metadata` to `Website Package Dependencies`, `Content Repository Verification`, `Shared UI Views`, `Preferences State Controls`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Should `Content Repository Verification` be split into smaller, more focused modules?**
  _Cohesion score 0.08527131782945736 - nodes in this community are weakly interconnected._
- **Should `Shared UI Views` be split into smaller, more focused modules?**
  _Cohesion score 0.08078431372549019 - nodes in this community are weakly interconnected._
- **Should `Localized Routes Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.0764423076923077 - nodes in this community are weakly interconnected._