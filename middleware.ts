import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Netlify / browsers often normalize to `/admin/`; Next strips trailing slashes → redirect loop. Rewrite internally to `/admin`. */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/"]
};
