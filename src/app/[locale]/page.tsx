import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { notFound } from "next/navigation";

import { Header } from "@/components/site/Header";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { Purpose } from "@/components/site/Purpose";
import { WhatWeMake } from "@/components/site/WhatWeMake";
import { Stats } from "@/components/site/Stats";
import { Commitments } from "@/components/site/Commitments";
import { About } from "@/components/site/About";
import { Videos } from "@/components/site/Videos";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { Newsletter } from "@/components/site/Newsletter";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { StickyCta } from "@/components/site/StickyCta";
import { CookieBanner } from "@/components/site/CookieBanner";

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const t = await getDictionary(locale as Locale);

  return (
    <>
      <ScrollProgress />
      <a
        href="#purpose"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-surface focus:px-5 focus:py-3 focus:font-bold"
      >
        Skip to content
      </a>

      <Header t={t} locale={locale as Locale} />

      <main>
        <Hero t={t} />
        <TrustStrip t={t} />
        <Purpose t={t} />
        <WhatWeMake t={t} />
        <Stats t={t} />
        <Commitments t={t} />
        <About t={t} />
        <Videos t={t} />
        <Testimonials t={t} />
        <Faq t={t} />
        <Newsletter t={t} />
        <Contact t={t} />
      </main>

      <Footer t={t} locale={locale as Locale} />
      <StickyCta label={t.fab} />
      <CookieBanner t={t} />
    </>
  );
}
