import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    if (token && req.nextUrl.pathname.includes("/auth")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else if (!token && !req.nextUrl.pathname.includes("/auth")) {
      return NextResponse.redirect(new URL("/auth/options", req.url));
    } else {
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        if (pathname.startsWith("/api/auth") || pathname.includes("/auth")) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public/).*)"],
};
