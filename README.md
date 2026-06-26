# Personal Website

Single-page landing site for [jedwards.cc](https://jedwards.cc).

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- Plain CSS — light/dark via `prefers-color-scheme`
- [Plausible](https://plausible.io/) analytics (no JS package, just a `<script>` tag)
- [Cloudflare Pages](https://pages.cloudflare.com/) hosting

## Scripts

| Command           | What it does                                     |
| ----------------- | ------------------------------------------------ |
| `bun run dev`     | Vite dev server on http://localhost:3000         |
| `bun run build`   | Type-check + production build to `dist/`         |
| `bun run preview` | Serve the built `dist/` on http://localhost:4173 |
| `bun run deploy`  | Build + `wrangler pages deploy dist`             |

## Deploy

Auto-deploys on push to `main` via Cloudflare Pages. The Pages project is provisioned
via Terraform at `modules/cloudflare/main.tf` in
[lilbro-tf](https://github.com/jedwards1230/lilbro-tf).

The static `public/404.html` is served automatically on unmatched routes.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for build, test, lint, and PR workflow.

## License

MIT — see [LICENSE](LICENSE).
