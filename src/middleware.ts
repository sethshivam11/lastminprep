import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (token && req.nextUrl.pathname.includes("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } else if (!token && !req.nextUrl.pathname.includes("/auth")) {
    return NextResponse.redirect(new URL("/auth/options", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/tests", "/dashboard", "/auth/:path*", "/profile", "/test/:path*"],
};
