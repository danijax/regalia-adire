import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    });

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
        // Allow access to login page
        if (request.nextUrl.pathname === "/admin/login") {
            // Redirect to dashboard if already logged in
            if (token) {
                return NextResponse.redirect(new URL("/admin", request.url));
            }
            return NextResponse.next();
        }

        // Redirect to login if not authenticated
        if (!token) {
            const loginUrl = new URL("/admin/login", request.url);
            loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
