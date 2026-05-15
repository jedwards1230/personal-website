# Personal Website

Single-page landing site for [jedwards.cc](https://jedwards.cc).

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first config)
- [Plausible](https://plausible.io/) analytics (no JS package, just a `<script>` tag)
- [Cloudflare Pages](https://pages.cloudflare.com/) hosting

## Scripts

| Command | What it does |
|---|---|
| `bun run dev` | Vite dev server on http://localhost:3000 |
| `bun run build` | Type-check + production build to `dist/` |
| `bun run preview` | Serve the built `dist/` on http://localhost:4173 |
| `bun run lint` | ESLint (flat config) |
| `bun run typecheck` | `tsc -b --noEmit` |
| `bun run format` | Prettier (with Tailwind class sorting) |
| `bun run test:e2e` | Playwright smoke tests |
| `bun run deploy` | Build + `wrangler pages deploy dist` |

## Cloudflare Pages

`wrangler.toml` points at `dist/`. The dashboard build command should be `bun run build`. Framework preset: **None** (or "Vite"). Output directory: `dist`.

The static `public/404.html` is served automatically on unmatched routes.
