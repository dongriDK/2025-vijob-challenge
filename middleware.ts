import { NextRequest, NextResponse } from "next/server";
import { fallbackLng, Locales } from "@/util/localization/settings";

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith(`/${fallbackLng}/`) ||
    pathname === `/${fallbackLng}`
  ) {
    // /en/about -> /about
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${fallbackLng}`,
          pathname === `/${fallbackLng}` ? "/" : ""
        ),
        req.url
      )
    );
  }

  const pathnameIsMissingLocale = Locales.every((locale) => {
    return !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`;
  });

  if (pathnameIsMissingLocale) {
    // default locale 설정
    // /about -> /en/about
    return NextResponse.rewrite(new URL(`/${fallbackLng}${pathname}`, req.url));
  }
};

export const config = {
  // Do not run the middleware on the following paths
  matcher: [
    "/((?!api|_next/static|_next/image|manifest.json|assets|favicon.ico|graphql).*)",
  ],
};
