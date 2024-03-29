import { NextRequest, NextResponse } from "next/server";

import { checkAuthenticated } from "./lib/session.server";

/* export const config = {
	matcher: ["/admin/:path*"],
}; */

export async function middleware(req: NextRequest) {
	const authenticated = await checkAuthenticated();

	if (req.nextUrl.pathname.includes("login")) {
		if (authenticated) {
			return NextResponse.redirect(new URL("/admin", req.nextUrl));
		}
	}

	if (req.nextUrl.pathname.includes("logout")) {
		if (!authenticated) {
			return NextResponse.redirect(new URL("/login", req.nextUrl));
		}
	}

	if (req.nextUrl.pathname.includes("admin")) {
		if (!authenticated) {
			return NextResponse.redirect(new URL("/login", req.nextUrl));
		}
	}
	return NextResponse.next();
}
