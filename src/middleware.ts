import { NextRequest, NextResponse } from "next/server";

/* export const config = {
	matcher: ["/admin/:path*"],
}; */

export async function middleware(req: NextRequest) {
	const authenticated = req.cookies.get("admin")?.value === "true";

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
