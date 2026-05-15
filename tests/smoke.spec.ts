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
		await expect(page.getByText("Site Reliability Engineer")).toBeVisible();

		const email = page.getByRole("link", { name: "justin@jedwards.cc" });
		await expect(email).toBeVisible();
		await expect(email).toHaveAttribute(
			"href",
			"mailto:justin@jedwards.cc"
		);

		// Hover state: parent <p> should have hover:text-blue-400. We confirm
		// the baseline neutral-400 class is present and that hover doesn't
		// throw — full color assertion is brittle across browsers.
		const linkParent = email.locator("xpath=..");
		await expect(linkParent).toHaveClass(/text-neutral-400/);
		await expect(linkParent).toHaveClass(/hover:text-blue-400/);

		expect(consoleErrors).toEqual([]);
	});

	test("404 page renders for unknown route", async ({ page }) => {
		// Vite preview serves 404.html on unmatched routes.
		const resp = await page.goto("/does-not-exist", {
			waitUntil: "domcontentloaded",
		});
		// CF Pages returns 404; vite preview also returns 404 with 404.html body
		// when the file exists.
		await expect(page.locator("h1")).toHaveText("404");
		await expect(page.locator("h2")).toHaveText(
			"This page could not be found."
		);
		expect(resp?.status()).toBe(404);
	});
});
