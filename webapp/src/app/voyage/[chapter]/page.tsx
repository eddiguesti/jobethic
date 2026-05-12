import { notFound } from "next/navigation";
import { ChapterPlayer } from "@/components/voyage/chapter-player";
import { CHAPTERS, getChapter, type ChapterSlug } from "@/lib/chapters";
import { SCENARIOS_BY_CHAPTER } from "@/lib/voyage/scenarios";

const PLAYABLE_SLUGS: ChapterSlug[] = [
  "rythme",
  "communication",
  "autonomie",
  "limites",
  "environnement",
  "pression",
];

interface RouteParams {
  chapter: string;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  return PLAYABLE_SLUGS.map((chapter) => ({ chapter }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { chapter: slug } = await params;
  if (!PLAYABLE_SLUGS.includes(slug as ChapterSlug)) return {};
  const chapter = getChapter(slug as ChapterSlug);
  return {
    title: `${chapter.name} · Jour ${chapter.day} · Le Voyage`,
    description: chapter.tagline,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { chapter: slug } = await params;
  if (!PLAYABLE_SLUGS.includes(slug as ChapterSlug)) notFound();

  const chapter = getChapter(slug as ChapterSlug);
  const scenarios = SCENARIOS_BY_CHAPTER[chapter.slug];

  // Next chapter for continuity hint
  const currentIndex = CHAPTERS.findIndex((c) => c.slug === chapter.slug);
  const nextChapter =
    currentIndex < CHAPTERS.length - 1 ? CHAPTERS[currentIndex + 1] : undefined;

  return (
    <ChapterPlayer
      chapter={chapter}
      scenarios={scenarios}
      nextChapterSlug={nextChapter?.slug}
      nextChapterEmoji={nextChapter?.emoji}
      nextChapterName={nextChapter?.name}
    />
  );
}
