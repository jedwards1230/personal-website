#!/bin/bash
# SessionStart hook: provision the browsers this repo needs.
#
# Two consumers need browser binaries, and a fresh container ships without them:
#   - firefox: the Playwright MCP server declared in .mcp.json (`--browser firefox`)
#     used for interactive visual verification. Without it the first
#     browser_navigate call fails with "Browser firefox is not installed".
#   - chromium: the automated `test:e2e` suite (playwright.config.ts pins the
#     `chromium` project). Without it `bun run test:e2e` fails on web.
#
# Scoped to Claude Code on the web (remote) sessions; local machines are assumed
# to manage their own Playwright install. Safe to re-run: every command is
# idempotent and the downloaded browsers are cached in the container image.
set -euo pipefail

# Only provision in the remote (web) environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Keep the browsers in the well-known cache the container persists.
export PLAYWRIGHT_BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-/opt/pw-browsers}"

echo "[session-start] installing Playwright OS deps + browsers (firefox, chromium)..."

# OS-level shared libraries the browsers need (apt; requires root).
npx -y playwright@latest install-deps firefox chromium

# firefox: keep its build in lockstep with the @playwright/mcp server we run.
npx -y @playwright/mcp@latest install-browser firefox

# chromium: the browser the automated test:e2e suite (playwright.config.ts) uses.
npx -y playwright@latest install chromium

echo "[session-start] Playwright firefox + chromium ready."
