import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? "github" : "list",
	use: {
		baseURL: "http://localhost:4173",
		trace: "on-first-retry",
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	webServer: {
		// Use wrangler pages dev (not vite preview) so the smoke test
		// exercises the same 404.html fallback behavior that production
		// Cloudflare Pages provides. Vite preview returns 200 + index.html
		// for unmatched routes, which would mask 404-handling regressions.
		command: "bunx wrangler pages dev dist --port 4173 --ip 127.0.0.1",
		url: "http://localhost:4173",
		reuseExistingServer: !process.env.CI,
		timeout: 60_000,
	},
});
