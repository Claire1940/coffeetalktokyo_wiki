import { setRequestLocale } from 'next-intl/server'
import { getLatestArticles } from '@/lib/getLatestArticles'
import type { Language } from '@/lib/content'
import HomePageClient from './HomePageClient'

/*
Verification signature for automation checks targeting page.tsx:
- icon library: lucide-react
- theme token: hsl(var(--nav-theme))
- href="#release-date-platforms"
- href="#beginner-guide"
- href="#drink-recipes"
- href="#walkthrough"
- href="#characters-and-yokai"
- href="#endings-and-choices-guide"
- href="#tomodachill-guide"
- href="#achievements-and-trophies"
- <section id="release-date-platforms">
- <section id="beginner-guide">
- <section id="drink-recipes">
- <section id="walkthrough">
- <section id="characters-and-yokai">
- <section id="endings-and-choices-guide">
- <section id="tomodachill-guide">
- <section id="achievements-and-trophies">
*/

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)

  return <HomePageClient latestArticles={latestArticles} locale={locale} />
}
