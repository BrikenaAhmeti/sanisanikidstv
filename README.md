# SaniSaniKidsTV — website

Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS v4 · locale-routed i18n in 7 languages.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Scripts: `dev`, `build`, `start`, `lint`, `typecheck`.

## Structure

```
src/proxy.ts                   locale detection + redirect (cookie → Accept-Language → en)
src/app/[locale]/layout.tsx    <html>, fonts, metadata, JSON-LD, providers
src/app/[locale]/page.tsx      the landing page — composes the sections
src/app/api/contact/route.ts   contact form endpoint (validation + honeypot)
src/app/api/newsletter/route.ts newsletter endpoint (proxies NEWSLETTER_ENDPOINT)
src/app/globals.css            Tailwind v4 theme: brand tokens, dark theme, keyframes
src/i18n/                      locales, dictionaries, server-side dictionary loader
src/components/site/           section + UI components
src/components/providers/      theme bootstrap script, legal dialog context
src/lib/site.ts                nav, social links, env-backed site config
```

## i18n

- Locales: `en de fr es it pt sq` (`src/i18n/config.ts`).
- Every page lives under `/[locale]`. `src/proxy.ts` redirects `/` using the
  `NEXT_LOCALE` cookie, then `Accept-Language`, then `en`.
- `getDictionary(locale)` merges the locale file over English, so a missing key
  always falls back instead of rendering blank.
- English (`src/i18n/dictionaries/en.ts`) is the type source: add a key there
  first and TypeScript will accept it in the other files.
- Pages are statically generated per locale via `generateStaticParams`.

## Theming

Brand tokens are CSS variables in `globals.css`, exposed to Tailwind through
`@theme inline` — so `bg-surface`, `text-muted`, `border-line`, `text-tang-deep`
etc. are real utilities. Dark mode is the `data-theme="dark"` attribute on
`<html>`, set before paint by `ThemeScript` and toggled by `ThemeToggle`.

## Before launch

- Fill `.env.local`: site URL, social URLs, contact email.
- Review the legal pages, testimonials, and stats date before publishing.
- Configure `NEWSLETTER_ENDPOINT` and `CONTACT_ENDPOINT` in the hosting environment.
- Have the machine-assisted translations reviewed by native speakers.
- Optimise `public/assets/sani-character-waving.gif` (3.6 MB) — a muted, looping
  `<video>` (webm/mp4) or animated WebP will cut it by an order of magnitude.
