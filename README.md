# Personal Website

Single-page landing site for [jedwards.cc](https://jedwards.cc).

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- Plain CSS — light/dark via `prefers-color-scheme`
- [Plausible](https://plausible.io/) analytics (no JS package, just a `<script>` tag)
- [Cloudflare Pages](https://pages.cloudflare.com/) hosting

## Scripts

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `bun run dev`       | Vite dev server on http://localhost:3000         |
| `bun run build`     | Type-check + production build to `dist/`         |
| `bun run preview`   | Serve the built `dist/` on http://localhost:4173 |
| `bun run lint`      | ESLint (flat config)                             |
| `bun run typecheck` | `tsc -b --noEmit`                                |
| `bun run format`    | Prettier (tabs, width 4)                         |
| `bun run test:e2e`  | Playwright smoke tests                           |
| `bun run deploy`    | Build + `wrangler pages deploy dist`             |

## Deploy

Auto-deploys on push to `main` via Cloudflare Pages. The Pages project is provisioned
via Terraform — see [CLAUDE.md](./CLAUDE.md) for build image requirements and the
Terraform module location.

The static `public/404.html` is served automatically on unmatched routes.
