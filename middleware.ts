import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const toInternal: Record<string, string> = {
  "/услуги": "/uslugi",
  "/проекти": "/proekti",
  "/за-нас": "/za-nas",
  "/контакти": "/kontakti",
  "/поверителност": "/poveritelnost",
  "/бисквитки": "/biskvitki",
};

const toPublic: Record<string, string> = {
  "/uslugi": "/услуги",
  "/proekti": "/проекти",
  "/za-nas": "/за-нас",
  "/kontakti": "/контакти",
  "/poveritelnost": "/поверителност",
  "/biskvitki": "/бисквитки",
};

export function middleware(request: NextRequest) {
  let pathname = request.nextUrl.pathname;

  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    return NextResponse.next();
  }

  const publicPath = toPublic[pathname];
  if (publicPath) {
    const url = request.nextUrl.clone();
    url.pathname = publicPath;
    return NextResponse.redirect(url);
  }

  const internalPath = toInternal[pathname];
  if (internalPath) {
    const url = request.nextUrl.clone();
    url.pathname = internalPath;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand|.*\\..*).*)"],
};
