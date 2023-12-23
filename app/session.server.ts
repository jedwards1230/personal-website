import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { invariant } from "./utils";

invariant(
	process.env.ADMIN_PASSWORD,
	"Missing ADMIN_PASSWORD environment variable"
);
invariant(
	process.env.SESSION_SECRET,
	"Missing SESSION_SECRET environment variable"
);

// Initialize session storage
const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "_session",
		// add your secure cookie options here
		secure: true,
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		secrets: [process.env.SESSION_SECRET],
		maxAge: 60 * 60 * 24 * 30, // 30 days
	},
});

export async function createAdminSession(password: string, redirectTo: string) {
	// Check if the password matches the environment variable
	if (password !== process.env.ADMIN_PASSWORD) {
		throw new Error("Invalid password");
	}

	let session = await sessionStorage.getSession();
	session.set("admin", true);

	return redirect(redirectTo, {
		headers: {
			"Set-Cookie": await sessionStorage.commitSession(session),
		},
	});
}

export async function isAuthenticated(request: Request) {
	const session = await sessionStorage.getSession(
		request.headers.get("Cookie")
	);
	const isAdmin = session.get("admin");
	return isAdmin === true;
}

export async function requireAdminSession(request: Request) {
	const session = await sessionStorage.getSession(
		request.headers.get("Cookie")
	);
	const isAdmin = session.get("admin");
	if (isAdmin !== true) {
		throw redirect("/login");
	}
}

export async function logoutAdminSession(request: Request) {
	const session = await sessionStorage.getSession(
		request.headers.get("Cookie")
	);
	return redirect("/", {
		headers: {
			"Set-Cookie": await sessionStorage.destroySession(session),
		},
	});
}
