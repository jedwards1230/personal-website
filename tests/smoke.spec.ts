import { expect, test } from "@playwright/test";

test.describe("homepage", () => {
	test("renders name, title, and email", async ({ page }) => {
		const consoleErrors: string[] = [];
		page.on("pageerror", e => consoleErrors.push(e.message));
		page.on("console", m => {
			if (m.type() === "error") consoleErrors.push(m.text());
		});

		await page.goto("/");

		await expect(page.getByText("Justin Edwards")).toBeVisible();
		await expect(page.getByText("Platform Engineer")).toBeVisible();

		const email = page.getByRole("link", { name: "justin@jedwards.cc" });
		await expect(email).toBeVisible();
		await expect(email).toHaveAttribute(
			"href",
			"mailto:justin@jedwards.cc"
		);

		expect(consoleErrors).toEqual([]);
	});

	test("404 page renders for unknown route", async ({ page }) => {
		// `wrangler pages dev` (see playwright.config.ts webServer) serves
		// 404.html with HTTP 404 on unmatched routes — matching production
		// Cloudflare Pages behavior. `vite preview` would return 200 + the
		// SPA shell here, which is why we don't use it for the smoke test.
		const resp = await page.goto("/does-not-exist", {
			waitUntil: "domcontentloaded",
		});
		await expect(page.locator("h1")).toHaveText("404");
		await expect(page.locator("h2")).toHaveText(
			"This page could not be found."
		);
		expect(resp?.status()).toBe(404);
	});

	test("sends pageview and email_click beacons", async ({ page }) => {
		const events: Array<{ type: string; path: string; referrer: string }> =
			[];
		await page.route("**/api/collect", async route => {
			const req = route.request();
			expect(req.method()).toBe("POST");
			// The collector rejects beacons without a same-origin Origin header.
			expect(await req.headerValue("origin")).toBe(
				new URL(req.url()).origin
			);
			events.push(JSON.parse(req.postData() ?? "{}"));
			await route.fulfill({ status: 204 });
		});

		await page.goto("/");
		await expect.poll(() => events.map(e => e.type)).toEqual(["pageview"]);
		expect(events[0]).toEqual({
			type: "pageview",
			path: "/",
			referrer: "",
		});

		// Keep the mailto: link from navigating away (or opening a mail app);
		// preventDefault does not stop the beacon's click listener.
		await page.evaluate(() => {
			window.addEventListener("click", e => e.preventDefault(), {
				capture: true,
			});
		});
		await page.getByRole("link", { name: "justin@jedwards.cc" }).click();
		await expect
			.poll(() => events.map(e => e.type))
			.toEqual(["pageview", "email_click"]);
	});
});
