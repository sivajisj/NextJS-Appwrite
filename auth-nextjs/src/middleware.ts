import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//This is a middleware function
export function middleware(req: NextRequest, res: NextResponse) {
    const path = req.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';
    const token = req.cookies.get('token')?.value || "";

    // Adjusted conditions
    if (isPublicPath && !token) {
        return NextResponse.allow(); // Allow access to public paths without a token
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl)); // Redirect to login if trying to access private path without a token
    }

    // Continue with the request for authenticated users
}
export const config = {
    matcher : [
        "/",
        "/profile",
        "/login",
        "/signup",
        "/verifyemail"
        
    ]
}