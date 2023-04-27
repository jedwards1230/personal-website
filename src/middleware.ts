import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Countries to block from accessing the app
const BLOCKED_COUNTRIES = ['RU', 'CN', 'DE', 'IE', 'LU'];

export function middleware(request: NextRequest) {
    const country = (request.geo && request.geo.country) || 'US';

    if (!BLOCKED_COUNTRIES.includes(country)) {
        return NextResponse.redirect('/404');
    }

    return NextResponse.next();
}
