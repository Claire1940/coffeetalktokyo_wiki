"use client";

import { useMemo, useState, Suspense, lazy } from "react";
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  CalendarDays,
  Compass,
  CupSoda,
  Route,
  Users,
  GitBranch,
  Hash,
  Trophy,
  Check,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

export default function HomePageClient({ latestArticles, locale }: HomePageClientProps) {
  const HERO_IMAGE_ABSOLUTE_URL = "https://coffeetalktokyo.wiki/images/hero.webp";
  const t = useMessages() as any;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://coffeetalktokyo.wiki";
  const heroImage = `${siteUrl}/images/hero.webp`;
  const mobileBannerAd = getPreferredMobileBannerSelection();
  const [endingsExpanded, setEndingsExpanded] = useState<number | null>(0);

  const achievementsByCategory = useMemo(() => {
    const grouped = new Map<string, any[]>();
    for (const item of t.modules.coffeeTalkTokyoAchievementsAndTrophies.items) {
      const current = grouped.get(item.category) || [];
      current.push(item);
      grouped.set(item.category, current);
    }
    return Array.from(grouped.entries());
  }, [t.modules.coffeeTalkTokyoAchievementsAndTrophies.items]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Coffee Talk Tokyo Wiki",
        description:
          "Coffee Talk Tokyo Wiki covering recipes, characters, endings, Tomodachill clues, and platform guides.",
        image: {
          "@type": "ImageObject",
          url: heroImage || HERO_IMAGE_ABSOLUTE_URL,
          width: 1920,
          height: 1080,
          caption: "Coffee Talk Tokyo - Late-Night Tokyo Cafe",
        },
      },
      {
        "@type": "VideoObject",
        name: "Coffee Talk Tokyo - Official Launch Trailer",
        description: "Official Coffee Talk Tokyo launch trailer.",
        uploadDate: "2026-05-21",
        thumbnailUrl: heroImage || HERO_IMAGE_ABSOLUTE_URL,
        embedUrl: "https://www.youtube.com/embed/yT9jTs5uZ_I",
        url: "https://www.youtube.com/watch?v=yT9jTs5uZ_I",
      },
    ],
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x300"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300}
        />
      </aside>

      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x600"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600}
        />
      </aside>

      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">{t.hero.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <a
                href="https://chorusworldwide.com/coffee-talk-tokyo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href="https://store.steampowered.com/app/3161220/Coffee_Talk_Tokyo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 border border-border hover:bg-white/10 rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={[t.hero.stats.stat1, t.hero.stats.stat2, t.hero.stats.stat3, t.hero.stats.stat4]} />
          </Suspense>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="yT9jTs5uZ_I"
              title="Coffee Talk Tokyo - Official Launch Trailer"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">{t.tools.titleHighlight}</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">{t.tools.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            <a
              href="#release-date-platforms"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("release-date-platforms");
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <CalendarDays className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[0].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[0].description}</p>
            </a>

            <a
              href="#beginner-guide"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("beginner-guide");
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <Compass className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[1].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[1].description}</p>
            </a>

            <a
              href="#drink-recipes"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("drink-recipes");
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <CupSoda className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[2].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[2].description}</p>
            </a>

            <a
              href="#walkthrough"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("walkthrough");
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <Route className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[3].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[3].description}</p>
            </a>

            <a
              href="#characters-and-yokai"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("characters-and-yokai");
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[4].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[4].description}</p>
            </a>

            <a
              href="#endings-and-choices-guide"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("endings-and-choices-guide");
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <GitBranch className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[5].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[5].description}</p>
            </a>

            <a
              href="#tomodachill-guide"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("tomodachill-guide");
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <Hash className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[6].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[6].description}</p>
            </a>

            <a
              href="#achievements-and-trophies"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("achievements-and-trophies");
              }}
              className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
            >
              <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <Trophy className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[7].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[7].description}</p>
            </a>
          </div>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      <section id="release-date-platforms" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.coffeeTalkTokyoReleaseDatePlatforms.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.coffeeTalkTokyoReleaseDatePlatforms.intro}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-white/5">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead className="bg-[hsl(var(--nav-theme)/0.12)]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Platform</th>
                  <th className="px-4 py-3 font-semibold">System</th>
                  <th className="px-4 py-3 font-semibold">Release Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Demo</th>
                  <th className="px-4 py-3 font-semibold">Editions</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.coffeeTalkTokyoReleaseDatePlatforms.items.map((item: any, index: number) => (
                  <tr key={index} className="border-t border-border/70 align-top">
                    <td className="px-4 py-3 font-medium text-[hsl(var(--nav-theme-light))]">{item.platform}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.system}</td>
                    <td className="px-4 py-3">{item.release_date}</td>
                    <td className="px-4 py-3">{item.status}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.demo}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.editions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.coffeeTalkTokyoBeginnerGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.coffeeTalkTokyoBeginnerGuide.intro}
            </p>
          </div>

          <div className="space-y-3 md:space-y-4">
            {t.modules.coffeeTalkTokyoBeginnerGuide.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">{step.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{step.action}</p>
                  <p className="text-sm md:text-base text-muted-foreground mt-2">{step.why_it_matters}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="drink-recipes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.coffeeTalkTokyoDrinkRecipes.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.coffeeTalkTokyoDrinkRecipes.intro}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-white/5">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-[hsl(var(--nav-theme)/0.12)]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Drink</th>
                  <th className="px-4 py-3 font-semibold">Temp</th>
                  <th className="px-4 py-3 font-semibold">Base</th>
                  <th className="px-4 py-3 font-semibold">Primary</th>
                  <th className="px-4 py-3 font-semibold">Secondary</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.coffeeTalkTokyoDrinkRecipes.items.map((item: any, index: number) => (
                  <tr key={index} className="border-t border-border/70 align-top">
                    <td className="px-4 py-3 text-muted-foreground">{item.category}</td>
                    <td className="px-4 py-3 font-medium text-[hsl(var(--nav-theme-light))]">{item.drink}</td>
                    <td className="px-4 py-3">{item.temperature}</td>
                    <td className="px-4 py-3">{item.base}</td>
                    <td className="px-4 py-3">{item.primary}</td>
                    <td className="px-4 py-3">{item.secondary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      <section id="walkthrough" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.coffeeTalkTokyoWalkthrough.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.coffeeTalkTokyoWalkthrough.intro}
            </p>
          </div>

          <div className="space-y-4">
            {t.modules.coffeeTalkTokyoWalkthrough.steps.map((step: any, index: number) => (
              <div key={index} className="p-5 md:p-6 bg-white/5 border border-border rounded-xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs border bg-[hsl(var(--nav-theme)/0.1)] border-[hsl(var(--nav-theme)/0.35)] text-[hsl(var(--nav-theme-light))]">
                    {step.days}
                  </span>
                  <p className="font-semibold">{step.route_focus}</p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  {step.recommended_drinks.map((drink: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <span>{drink}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground">{step.milestone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="characters-and-yokai" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.coffeeTalkTokyoCharactersAndYokai.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.coffeeTalkTokyoCharactersAndYokai.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.coffeeTalkTokyoCharactersAndYokai.items.map((item: any, index: number) => (
              <div key={index} className="p-5 bg-white/5 border border-border rounded-xl">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="font-bold text-[hsl(var(--nav-theme-light))]">{item.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.1)] text-muted-foreground">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm mb-2">{item.role}</p>
                <p className="text-sm text-muted-foreground mb-2">{item.story_focus}</p>
                <p className="text-sm text-muted-foreground">{item.route_note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="endings-and-choices-guide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.coffeeTalkTokyoEndingsAndChoicesGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.coffeeTalkTokyoEndingsAndChoicesGuide.intro}
            </p>
          </div>

          <div className="space-y-2">
            {t.modules.coffeeTalkTokyoEndingsAndChoicesGuide.items.map((item: any, index: number) => (
              <div key={index} className="border border-border rounded-xl overflow-hidden bg-white/5">
                <button
                  onClick={() => setEndingsExpanded(endingsExpanded === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold">{item.heading}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${endingsExpanded === index ? "rotate-180" : ""}`}
                  />
                </button>
                {endingsExpanded === index && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground space-y-2">
                    <p>{item.summary}</p>
                    <ul className="space-y-2">
                      {item.details.map((detail: string, detailIndex: number) => (
                        <li key={detailIndex} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tomodachill-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.coffeeTalkTokyoTomodachillGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.coffeeTalkTokyoTomodachillGuide.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.coffeeTalkTokyoTomodachillGuide.items.map((item: any, index: number) => (
              <div key={index} className="p-5 bg-white/5 border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Hash className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="font-semibold">{item.name}</h3>
                </div>
                <p className="text-xs mb-2 text-[hsl(var(--nav-theme-light))]">{item.type}</p>
                <p className="text-sm text-muted-foreground mb-2">{item.what_it_does}</p>
                <p className="text-sm text-muted-foreground">{item.player_tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements-and-trophies" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.coffeeTalkTokyoAchievementsAndTrophies.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.coffeeTalkTokyoAchievementsAndTrophies.intro}
            </p>
          </div>

          <div className="space-y-5">
            {achievementsByCategory.map(([category, items]: any) => (
              <div key={category} className="p-5 bg-white/5 border border-border rounded-xl">
                <h3 className="text-lg font-semibold mb-3 text-[hsl(var(--nav-theme-light))]">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {items.map((item: any, index: number) => (
                    <div key={index} className="p-3 rounded-lg border border-border/70 bg-background/40">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.goal}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">{t.footer.title}</h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/servers/toge-productions-311022193737990148"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/coffeetalk_game"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://steamcommunity.com/app/3161220/discussions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://store.steampowered.com/app/3161220/Coffee_Talk_Tokyo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="https://www.youtube.com/watch?v=yT9jTs5uZ_I"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition-colors"
            >
              Watch Coffee Talk Tokyo Trailer
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
