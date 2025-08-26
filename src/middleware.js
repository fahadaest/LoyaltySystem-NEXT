import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get('host') || '';

    // Skip if localhost or main domain
    if (hostname.includes('localhost') || hostname === 'loyaltysystem.tech') {
        return NextResponse.next();
    }

    // Extract subdomain
    const subdomain = hostname.split('.')[0];

    // Skip if no subdomain or www
    if (!subdomain || subdomain === 'www') {
        return NextResponse.next();
    }

    // Add subdomain to headers so your app can access it
    const response = NextResponse.next();
    response.headers.set('x-subdomain', subdomain);

    return response;
}

export const config = {
    matcher: [
        '/((?!api/|_next/|_static/|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};