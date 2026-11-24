/**
 * Self-hosted analytics collector (Cloudflare Pages Function).
 *
 * Receives `{ type, path, referrer }` beacons from src/analytics.ts, derives a
 * few coarse dimensions (country, device class, bot flag, referrer host) and
 * forwards one OTLP/HTTP JSON log record to the homelab ingest endpoint. The
 * visitor's IP and full User-Agent are never forwarded or stored.
 *
 * With OTLP_INGEST_URL or OTLP_INGEST_TOKEN unset (e.g. preview deployments)
 * the function accepts the beacon and does nothing.
 */

export interface Env {
	OTLP_INGEST_URL?: string;
	OTLP_INGEST_TOKEN?: string;
}

export const EVENT_TYPES = ["pageview", "email_click"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export interface CollectEvent {
	type: EventType;
	path: string;
	referrer: string;
}

export type DeviceClass = "mobile" | "tablet" | "desktop";

export interface EventContext {
	referrerHost: string;
	country: string;
	device: DeviceClass;
	bot: boolean;
}

export const MAX_BODY_BYTES = 4096;
const MAX_PATH_LENGTH = 512;
const MAX_REFERRER_LENGTH = 2048;
const SITE_HOST = "jedwards.cc";
const USER_AGENT = "jedwards-site-collector/1.0";

/** Parse and validate a beacon body. Returns null when it is not acceptable. */
export function parseEvent(raw: string): CollectEvent | null {
	if (raw.length > MAX_BODY_BYTES) return null;
	let data: unknown;
	try {
		data = JSON.parse(raw);
	} catch {
		return null;
	}
	if (typeof data !== "object" || data === null || Array.isArray(data)) {
		return null;
	}
	const { type, path, referrer } = data as Record<string, unknown>;
	if (!EVENT_TYPES.includes(type as EventType)) return null;
	if (
		typeof path !== "string" ||
		!path.startsWith("/") ||
		path.length > MAX_PATH_LENGTH
	) {
		return null;
	}
	if (
		referrer !== undefined &&
		(typeof referrer !== "string" || referrer.length > MAX_REFERRER_LENGTH)
	) {
		return null;
	}
	return { type: type as EventType, path, referrer: referrer ?? "" };
}

const BOT_RE =
	/bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|monitor|curl|wget|python|go-http|java\/|axios|node-fetch|scrapy|httpclient|facebookexternalhit|embedly|quora link|whatsapp|discord|telegram/i;
const TABLET_RE = /ipad|tablet|kindle|silk|playbook|(android(?!.*mobile))/i;
const MOBILE_RE = /mobi|iphone|ipod|android|blackberry|opera mini|iemobile/i;

/** Classify a User-Agent into a coarse device class and bot flag. */
export function classifyUserAgent(ua: string | null | undefined): {
	device: DeviceClass;
	bot: boolean;
} {
	const s = ua ?? "";
	const bot = s.trim() === "" || BOT_RE.test(s);
	let device: DeviceClass = "desktop";
	if (TABLET_RE.test(s)) device = "tablet";
	else if (MOBILE_RE.test(s)) device = "mobile";
	return { device, bot };
}

/**
 * Hostname of the referrer, or "" when missing, unparseable, not http(s), or
 * the site itself (internal navigation is not a referral).
 */
export function referrerHost(referrer: string, siteHost = SITE_HOST): string {
	if (!referrer) return "";
	let url: URL;
	try {
		url = new URL(referrer);
	} catch {
		return "";
	}
	if (url.protocol !== "http:" && url.protocol !== "https:") return "";
	const host = url.hostname.toLowerCase();
	if (host === siteHost || host === `www.${siteHost}`) return "";
	return host;
}

const str = (key: string, value: string) => ({
	key,
	value: { stringValue: value },
});

/** Build the OTLP/HTTP JSON logs payload for one event. Pure; unit tested. */
export function buildOtlpPayload(
	event: CollectEvent,
	ctx: EventContext,
	nowMs: number
) {
	return {
		resourceLogs: [
			{
				resource: {
					attributes: [
						str("service.name", "jedwards-site"),
						str("service.namespace", "web"),
					],
				},
				scopeLogs: [
					{
						scope: {
							name: "jedwards-site-collector",
							version: "1.0",
						},
						logRecords: [
							{
								timeUnixNano: (
									BigInt(Math.trunc(nowMs)) * 1_000_000n
								).toString(),
								severityText: "INFO",
								body: { stringValue: event.type },
								attributes: [
									str("event.name", event.type),
									str("url.path", event.path),
									str("referrer.host", ctx.referrerHost),
									str("geo.country", ctx.country),
									str("device.class", ctx.device),
									{
										key: "bot",
										value: { boolValue: ctx.bot },
									},
								],
							},
						],
					},
				],
			},
		],
	};
}

export const onRequestPost: PagesFunction<Env> = async context => {
	const { request, env } = context;

	const declared = Number(request.headers.get("content-length") ?? "0");
	if (declared > MAX_BODY_BYTES) {
		return new Response("payload too large", { status: 413 });
	}
	const raw = await request.text();
	if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
		return new Response("payload too large", { status: 413 });
	}
	const event = parseEvent(raw);
	if (!event) return new Response("bad request", { status: 400 });

	if (!env.OTLP_INGEST_URL || !env.OTLP_INGEST_TOKEN) {
		return new Response(null, { status: 204 });
	}

	const { device, bot } = classifyUserAgent(
		request.headers.get("user-agent")
	);
	const country = request.cf?.country;
	const payload = buildOtlpPayload(
		event,
		{
			referrerHost: referrerHost(event.referrer),
			country: typeof country === "string" ? country : "",
			device,
			bot,
		},
		Date.now()
	);

	context.waitUntil(
		fetch(env.OTLP_INGEST_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${env.OTLP_INGEST_TOKEN}`,
				"User-Agent": USER_AGENT,
			},
			body: JSON.stringify(payload),
		})
			.then(res => {
				if (!res.ok)
					console.error(`otlp ingest responded ${res.status}`);
			})
			.catch((err: unknown) => {
				console.error("otlp ingest failed", err);
			})
	);

	return new Response(null, { status: 204 });
};

export const onRequest: PagesFunction<Env> = async () =>
	new Response("method not allowed", {
		status: 405,
		headers: { Allow: "POST" },
	});
