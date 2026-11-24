import { describe, expect, test } from "bun:test";
import {
	buildOtlpPayload,
	classifyUserAgent,
	parseEvent,
	referrerHost,
} from "../../functions/api/collect";

const CHROME_DESKTOP =
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const IPHONE =
	"Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1";
const ANDROID_PHONE =
	"Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36";
const ANDROID_TABLET =
	"Mozilla/5.0 (Linux; Android 14; SM-X910) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const IPAD =
	"Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const GOOGLEBOT =
	"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

describe("classifyUserAgent", () => {
	test.each([
		[CHROME_DESKTOP, "desktop", false],
		[IPHONE, "mobile", false],
		[ANDROID_PHONE, "mobile", false],
		[ANDROID_TABLET, "tablet", false],
		[IPAD, "tablet", false],
		[GOOGLEBOT, "desktop", true],
		["curl/8.5.0", "desktop", true],
		["Go-http-client/2.0", "desktop", true],
		["Mozilla/5.0 HeadlessChrome/131.0", "desktop", true],
	])("%s → %s bot=%p", (ua, device, bot) => {
		expect(classifyUserAgent(ua)).toEqual({ device, bot } as never);
	});

	test("missing UA is a bot", () => {
		expect(classifyUserAgent(null)).toEqual({
			device: "desktop",
			bot: true,
		});
		expect(classifyUserAgent("")).toEqual({ device: "desktop", bot: true });
	});
});

describe("referrerHost", () => {
	test.each([
		["", ""],
		["not a url", ""],
		["javascript:alert(1)", ""],
		["https://jedwards.cc/", ""],
		["https://www.jedwards.cc/x", ""],
		["https://JEDWARDS.CC/", ""],
		["https://www.google.com/search?q=x", "www.google.com"],
		["http://news.ycombinator.com/item?id=1", "news.ycombinator.com"],
		["https://sub.jedwards.cc/", "sub.jedwards.cc"],
	])("%p → %p", (input, expected) => {
		expect(referrerHost(input)).toBe(expected);
	});
});

describe("parseEvent", () => {
	test("accepts a valid pageview", () => {
		expect(
			parseEvent(
				JSON.stringify({ type: "pageview", path: "/", referrer: "" })
			)
		).toEqual({ type: "pageview", path: "/", referrer: "" });
	});

	test("defaults a missing referrer to empty", () => {
		expect(
			parseEvent(JSON.stringify({ type: "email_click", path: "/" }))
		).toEqual({ type: "email_click", path: "/", referrer: "" });
	});

	test.each([
		["not json"],
		["null"],
		["[]"],
		[JSON.stringify({ type: "purchase", path: "/" })],
		[JSON.stringify({ type: "pageview", path: "relative" })],
		[JSON.stringify({ type: "pageview", path: 1 })],
		[JSON.stringify({ type: "pageview", path: "/" + "a".repeat(600) })],
		[JSON.stringify({ type: "pageview", path: "/", referrer: 5 })],
		[
			JSON.stringify({
				type: "pageview",
				path: "/",
				pad: "x".repeat(5000),
			}),
		],
	])("rejects %#", raw => {
		expect(parseEvent(raw)).toBeNull();
	});
});

describe("buildOtlpPayload", () => {
	test("matches the receiver contract", () => {
		const payload = buildOtlpPayload(
			{ type: "email_click", path: "/", referrer: "https://x.com/" },
			{
				referrerHost: "x.com",
				country: "US",
				device: "mobile",
				bot: false,
			},
			1_732_400_000_123
		);

		expect(payload.resourceLogs).toHaveLength(1);
		const [rl] = payload.resourceLogs;
		expect(rl.resource.attributes).toEqual([
			{ key: "service.name", value: { stringValue: "jedwards-site" } },
			{ key: "service.namespace", value: { stringValue: "web" } },
		]);

		const records = rl.scopeLogs[0].logRecords;
		expect(records).toHaveLength(1);
		expect(records[0]).toEqual({
			timeUnixNano: "1732400000123000000",
			severityText: "INFO",
			body: { stringValue: "email_click" },
			attributes: [
				{ key: "event.name", value: { stringValue: "email_click" } },
				{ key: "url.path", value: { stringValue: "/" } },
				{ key: "referrer.host", value: { stringValue: "x.com" } },
				{ key: "geo.country", value: { stringValue: "US" } },
				{ key: "device.class", value: { stringValue: "mobile" } },
				{ key: "bot", value: { boolValue: false } },
			],
		});
	});

	test("never carries the full referrer URL", () => {
		const json = JSON.stringify(
			buildOtlpPayload(
				{
					type: "pageview",
					path: "/",
					referrer: "https://x.com/secret?token=abc",
				},
				{
					referrerHost: "x.com",
					country: "",
					device: "desktop",
					bot: true,
				},
				0
			)
		);
		expect(json).not.toContain("secret");
	});
});
