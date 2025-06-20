import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
// import { getServerSession } from "next-auth";
// import type { NextRequest } from "next/server";
// import { authOptions } from "./app/api/auth/[...nextauth]/options";
// import { useSession } from "next-auth/react";

// export async function middleware(req: NextRequest) {
//   const session = await useSession();
//   console.log(session)
//   if (session && req.nextUrl.pathname.includes("/auth")) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   } else if (!session && !req.nextUrl.pathname.includes("/auth")) {
//     return NextResponse.redirect(new URL("/auth/options", req.url));
//   } else {
//     return NextResponse.next();
//   }
// }

// export const config = {
//   matcher: ["/tests", "/dashboard", "/auth/:path*", "/profile", "/test/:path*"],
// };

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith("/api/auth") ||
          pathname.includes("/auth") ||
          /^\/[^/]+$/.test(pathname)
        ) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"] };
