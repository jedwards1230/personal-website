// Self-hosted, cookieless analytics: beacons go to the /api/collect Pages
// Function (functions/api/collect.ts). No cookies, storage, or identifiers.
// Skipped entirely when the visitor sends Global Privacy Control or DNT.

type EventType = "pageview" | "email_click";

function send(type: EventType): void {
	const body = JSON.stringify({
		type,
		path: location.pathname,
		referrer: document.referrer,
	});
	const blob = new Blob([body], { type: "application/json" });
	if (navigator.sendBeacon?.("/api/collect", blob)) return;
	fetch("/api/collect", {
		method: "POST",
		body,
		headers: { "Content-Type": "application/json" },
		keepalive: true,
	}).catch(() => {});
}

export function initAnalytics(): void {
	const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
	if (nav.globalPrivacyControl === true || nav.doNotTrack === "1") return;

	send("pageview");
	document.addEventListener("click", e => {
		const link = (e.target as Element | null)?.closest?.(
			'a[href^="mailto:"]'
		);
		if (link) send("email_click");
	});
}
