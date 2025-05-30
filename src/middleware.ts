import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    
    // Get the pathname of the request
    const path = request.nextUrl.pathname;

    // check authentication from authToken and next-auth.sesssion-token
    const authToken = request.cookies.get("authToken")?.value;
    const sessionToken = request.cookies.get("__Secure-next-auth.session-token")?.value || request.cookies.get("next-auth.session-token")?.value;

    // User is authenticated if either token exists
    const isAuthenticated = Boolean(authToken || sessionToken);

    // Define public paths that don't require authentication
    const publicPaths = ["/login", "/about", "/faq", "/api/auth/error"];
    const isPublicPath = publicPaths.includes(path) || path.startsWith("/product") || path.startsWith("/api/auth") || path === "/";

    // Check if user is trying to access a protected router without authentication
    if (!isPublicPath && !isAuthenticated) {
        // Create the url for the login page with a redirect parameter
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", path);

        // Redirect the user to the login page
        return NextResponse.redirect(loginUrl);
    }

    // Redirect already authenticated user away from login/register pages
    if (
        isPublicPath &&
        isAuthenticated &&
        path === "/login"
    ) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // For demonstration purposes, log authentication status
    console.log(
        `Access granted to ${path}, auth status: ${
          isAuthenticated ? "authenticated" : "public route"
        }`
    );

    // Continue with the request if the route is public or user is authenticated
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)", "/cart/:path*", "/dashboard/:path*", "/profile/:path*"],
}