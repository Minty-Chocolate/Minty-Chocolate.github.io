# Personal research portfolio

A local Next.js App Router, TypeScript, and Tailwind CSS website. All identity details and writing are placeholders. Static export and a GitHub Pages deployment workflow are configured.

## Run

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000/. The build script uses Next.js’s webpack builder. For production validation: `npm run build`; the generated `out/` folder is the static website. `npm start` is not supported with static export. Run `npm run typecheck` to check TypeScript.

## Customize

- Update `lib/site.ts` and the introduction in `app/page.tsx` with your name, bio, and contact URLs. Replace the placeholder resume at `/resume` or point its link to your PDF in `public/`.
- Add MDX files to `content/projects`, `content/papers`, and `content/writing`. A filename becomes its URL slug. Category pages include every entry, sorted by date; the homepage shows up to two entries marked `featured: true`.
- Keep only trusted, locally authored MDX: MDX supports executable JSX and is not a safe format for visitor-submitted content.
- Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the full canonical site URL, without a repository path prefix. It defaults to `https://minty-chocolate.github.io`. Restart/rebuild after changing it.

## Frontmatter

```yaml
---
title: "An experiment"
description: "A short, descriptive summary."
date: "2026-09-18"
tags: ["Python", "Statistics"]
featured: true
cover: "/images/allocation.svg"
coverAlt: "An illustrative allocation chart"
---
```

`title`, `description`, `date`, and `tags` are required. Paper reviews also require `authors` (string) and `year` (number); `source` optionally links to the original paper. `cover` and `coverAlt` are optional. Quote dates so they remain strings. Content validation fails the build for invalid required fields.

## MDX features

Standard Markdown, GFM tables, fenced code with Shiki highlighting, inline `$...$` and display `$$...$$` LaTeX via KaTeX, images, and a reusable `<Callout>` component. Store image assets in `public/images` and use descriptive alt text. The example project demonstrates each feature.

## Writing images and card covers

Place images under `public/images/`, for example:

```text
public/images/writing/industry-trend-reversal/pic1.png
```

In the MDX body, reference the image with a leading `/` (omit `public`):

```md
![Industry trend and reversal performance chart](/images/writing/industry-trend-reversal/pic1.png)
```

A relative URL such as `pic1.png` does not serve a file from `content/writing/`.
Use ordinary Markdown parentheses without a backslash.

To show the plot on both the homepage Writing cards and `/writing`, add these
optional fields inside the article's existing frontmatter:

```yaml
cover: "/images/writing/industry-trend-reversal/pic1.png"
coverAlt: "Industry trend and reversal performance chart"
```

The homepage still requires `featured: true`. Omit `cover` (or leave it blank)
for the original text-only card. Covers are explicitly chosen, not extracted
from the first body image. Writing cards fit the complete plot inside a 16:9
frame without cropping; body images scale to the article width and preserve
their aspect ratio. Use meaningful alt text for plots.

With `npm run dev`, save the MDX and refresh the page if needed; a production
static site needs a new `npm run build` and upload after
content changes.

## Structure

- `app/`: homepage, category listings, statically generated dynamic detail routes, 404, resume, sitemap, robots, and layout metadata.
- `components/`: navigation, cards, tags, sections, and MDX renderer.
- `lib/`: validated local content loader and site settings.
- `content/`: three projects, three paper reviews, and three articles.
- `public/images/`: original SVG research illustrations.

Accessibility includes a skip link, visible keyboard focus, semantic landmarks, current-page navigation, responsive layouts, image alternatives, and reduced-motion support. The Geist font is bundled locally rather than fetched during builds. Colors follow the requested warm-white/light theme. SEO includes page titles/descriptions, canonical URLs, social metadata, sitemap, and robots.

## GitHub Pages

The site exports to `out/` at the domain root with trailing
slashes. Internal `next/link` links and public assets use root-relative paths.
`lib/paths.ts` keeps the base path empty for the GitHub user site. Keep content image paths as `/images/...`.
All three detail route categories use `generateStaticParams()` and reject unknown slugs.

When ready, set the repository **Settings → Pages → Build and deployment → Source**
to **GitHub Actions**. After you commit and push to `main`,
`.github/workflows/deploy.yml` installs dependencies, builds, and deploys `out/`
to https://minty-chocolate.github.io/. No deployment is performed
by local builds.
