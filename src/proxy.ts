import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

const PUBLIC_FILE = /\.[^/]+$/;

const COUNTRY_LOCALES: Record<string, Locale> = {
  AL: "sq",
  AO: "pt",
  AR: "es",
  AT: "de",
  BO: "es",
  BR: "pt",
  CH: "de",
  CL: "es",
  CO: "es",
  CR: "es",
  CU: "es",
  CV: "pt",
  DE: "de",
  DO: "es",
  EC: "es",
  ES: "es",
  FR: "fr",
  GQ: "es",
  GT: "es",
  GW: "pt",
  HN: "es",
  IT: "it",
  LI: "de",
  MC: "fr",
  MX: "es",
  MZ: "pt",
  NI: "es",
  PA: "es",
  PE: "es",
  PR: "es",
  PT: "pt",
  PY: "es",
  SM: "it",
  ST: "pt",
  SV: "es",
  TL: "pt",
  UY: "es",
  VA: "it",
  VE: "es",
  XK: "sq",
};

function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) {
    return cookie as Locale;
  }

  const header = request.headers.get("accept-language") ?? "";
  const wanted = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.split("-")[0].toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  const match = wanted.find((item) =>
    (locales as readonly string[]).includes(item.tag),
  );
  if (match) return match.tag as Locale;

  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  if (country && COUNTRY_LOCALES[country]) return COUNTRY_LOCALES[country];

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.set(
    "Vary",
    "Accept-Language, Cookie, X-Vercel-IP-Country",
  );
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
