# personal-website

Single-page landing site for [jedwards.cc](https://jedwards.cc) — pure SPA, no SSR.

## Stack

- Vite 8 + React 19 + TypeScript 6
- Plain CSS (no framework) — variables + media query for light/dark in `src/index.css`
- Bun for installs (`bun.lock`, text format since Bun 1.2)
- Plausible analytics via plain `<script>` tag in `index.html`
- Inter font loaded from Google Fonts (`index.html`)
- Cloudflare Pages hosting (V3 build image required — V2 is pinned to Node 18)

## Commands

| Command                         | Description                                            |
| ------------------------------- | ------------------------------------------------------ |
| `bun install --frozen-lockfile` | Install deps                                           |
| `bun run dev`                   | Vite dev server on http://localhost:3000               |
| `bun run build`                 | `tsc -b` + Vite production build to `dist/`            |
| `bun run preview`               | Serve built `dist/` on http://localhost:4173           |
| `bun run lint`                  | ESLint (flat config)                                   |
| `bun run typecheck`             | `tsc -b --noEmit`                                      |
| `bun run format`                | Prettier (tabs, width 4)                               |
| `bun run test:e2e`              | Playwright smoke tests                                 |
| `bun run deploy`                | Build + manual deploy via `wrangler pages deploy dist` |

## Layout

```
.
├── src/
│   ├── App.tsx        # the homepage (everything renders here)
│   ├── main.tsx       # React entry
│   └── index.css      # Plain CSS (variables + prefers-color-scheme)
├── public/            # static assets (resume PDF, favicon, portfolio preview images)
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

`.github/workflows/ci.yml` runs lint, typecheck, build, and Playwright e2e on every
PR (both jobs install and build independently). Both must be green before merging.

## Visual Verification

For CSS/layout/rendered-output changes, verify visually before a PR (skip for
config/tooling-only changes):

```bash
bun install --frozen-lockfile
# Run the Vite dev server (it renders the full UI — see note below).
bun run dev -- --port 9875
# Use Playwright (MCP): navigate to http://localhost:9875/ and screenshot the
# homepage in both light and dark mode. Save under .playwright-mcp/ (gitignored)
# so screenshots are never committed.
```

This site is a **static SPA** — `src/App.tsx` renders the entire homepage (name,
role, email) with no data fetching or backend. The Vite dev server renders the
full UI on its own, so **no seeded fixtures or mock data are required**. The
only route is `/`.

**Dark mode** is driven purely by `prefers-color-scheme` in `src/index.css`
(there is no `data-theme` toggle). To screenshot dark mode via Playwright MCP,
emulate the color scheme (`browser_resize`/`browser_run_code_unsafe` with the
emulation API, or launch with the dark scheme) rather than setting an attribute.

The Playwright MCP server is declared in `.mcp.json` (`--browser firefox`). On
Claude Code on the web, `.claude/hooks/session-start.sh` installs the firefox
browser binary (for the MCP server) and chromium (for the automated suite below)
so `browser_navigate` and `test:e2e` both work without manual setup; locally,
run `bunx playwright install firefox chromium` once.

This interactive visual check is **separate from the automated `test:e2e`
suite**: `bun run test:e2e` runs `tests/smoke.spec.ts` against `chromium` via
`wrangler pages dev` on the built `dist/` (to exercise the production 404.html
fallback), while visual verification drives the live Vite dev server in firefox
for ad-hoc screenshots. They complement each other — neither replaces the other.

## Conventions

- **Indentation**: tabs (see `.prettierrc` — `useTabs: true`, `tabWidth: 4`)
- **Linting**: ESLint flat config (`eslint.config.js`)
- **Formatting**: run `bun run format` before committing
