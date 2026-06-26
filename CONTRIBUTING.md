# Contributing to personal-website

Single-page landing site for [jedwards.cc](https://jedwards.cc) — pure SPA built with Vite, React 19, and TypeScript. All changes go through the workflow below.

## Prerequisites

- [Bun](https://bun.sh/) (latest) — used for installs, running scripts, and the dev server
- [Node.js](https://nodejs.org/) >= 22 — required by Wrangler for the e2e job

Install Playwright browsers once before running e2e tests:

```bash
bunx playwright install chromium
```

## Build, test & lint

```bash
bun install --frozen-lockfile

# Lint and type-check (run before every commit)
bun run lint
bun run typecheck

# Production build
bun run build

# Playwright e2e smoke tests (runs against the built dist/ via wrangler pages dev)
bun run test:e2e

# Format (Prettier — tabs, width 4)
bun run format
```

CI runs `lint`, `typecheck`, and `build` in the `build` job, then `test:e2e` in a separate `e2e` job that needs `build` to succeed first.

## Documentation

Keep documentation current as part of the change, not as a follow-up — update the README and any affected docs in the same PR.

## Before you open a PR

- Make sure all CI checks pass locally first — run the formatter, linter, and tests.

## Branching & commits

- Branch off `main`; never commit directly to `main`.
- Use [Conventional Commits](https://www.conventionalcommits.org/) prefixes (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, …).
- Sign your commits where possible (`git commit -S`).
- Keep each PR focused; delete dead code rather than commenting it out.

## Pull requests

- Open the PR against `main`.
- Every PR runs CI. Resolve **all** review threads before the PR is merged.
- An automated code review runs on each PR; address and resolve its threads like any other review.
- A PR can be merged once CI is green and all review threads are resolved.

## Releases

This repo is not a versioned artifact — there is no release step. Merging to `main` deploys automatically via Cloudflare Pages.
