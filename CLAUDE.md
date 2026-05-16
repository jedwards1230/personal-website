# personal-website

Single-page landing site for [jedwards.cc](https://jedwards.cc) — pure SPA, no SSR.

## Stack

- Vite 8 + React 19 + TypeScript 6
- Tailwind CSS v4 (CSS-first config in `src/index.css`)
- Bun for installs (`bun.lockb`)
- Plausible analytics via plain `<script>` tag in `index.html`
- Cloudflare Pages hosting (V3 build image required — V2 is pinned to Node 18)

## Commands

| Command | Description |
|---|---|
| `bun install --frozen-lockfile` | Install deps |
| `bun run dev` | Vite dev server on http://localhost:3000 |
| `bun run build` | `tsc -b` + Vite production build to `dist/` |
| `bun run preview` | Serve built `dist/` on http://localhost:4173 |
| `bun run lint` | ESLint (flat config) |
| `bun run typecheck` | `tsc -b --noEmit` |
| `bun run format` | Prettier with Tailwind class sorting |
| `bun run test:e2e` | Playwright smoke tests |
| `bun run deploy` | Manual deploy via `wrangler pages deploy dist` |

## Layout

```
.
├── src/
│   ├── App.tsx        # the homepage (everything renders here)
│   ├── main.tsx       # React entry
│   └── index.css      # Tailwind v4 directives + CSS-first config
├── public/            # static assets (resume PDF, screenshots)
│   └── 404.html       # CF Pages 404 fallback
├── tests/
│   └── smoke.spec.ts  # Playwright smoke
├── index.html         # Vite entry + Plausible <script>
├── vite.config.ts
├── wrangler.toml
└── .github/workflows/ci.yml
```

## Deploy

Cloudflare Pages auto-deploys on push to `main`. The Pages build image must be V3
(V2 is hardcoded to Node 18, which can't run Vite 8). The CF Pages project is
provisioned in [lilbro-tf](https://github.com/jedwards1230/lilbro-tf) at
`modules/cloudflare/main.tf` — change image/build settings there, not in the dashboard.

## CI

`.github/workflows/ci.yml` runs lint → typecheck → build, then a Playwright e2e
job, on every PR. Both jobs must be green before merging.

## Conventions

- **Indentation**: tabs (see `.prettierrc` — `useTabs: true`, `tabWidth: 4`)
- **Linting**: ESLint flat config (`eslint.config.js`)
- **Class sorting**: `prettier-plugin-tailwindcss` — run `bun run format` before committing
