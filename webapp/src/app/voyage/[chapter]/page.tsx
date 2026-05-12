import { notFound } from "next/navigation";
import { ChapterPlayer } from "@/components/voyage/chapter-player";
import { RoomScene } from "@/components/voyage-v2/room-scene";
import { CHAPTERS, getChapter, type ChapterSlug } from "@/lib/chapters";
import { SCENARIOS_BY_CHAPTER } from "@/lib/voyage/scenarios";
import { ROOM_OBJECTS } from "@/lib/voyage/house-config";

const PLAYABLE_SLUGS: ChapterSlug[] = [
  "rythme",
  "communication",
  "autonomie",
  "limites",
  "environnement",
  "pression",
];

/** Pièces déjà reconstruites en mode immersif (avec objets). */
const IMMERSIVE_ROOMS: ChapterSlug[] = ["rythme"];

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

  const typedSlug = slug as ChapterSlug;
  const chapter = getChapter(typedSlug);

  // Mode immersif (pièce reconstruite avec objets interactifs)
  if (IMMERSIVE_ROOMS.includes(typedSlug) && ROOM_OBJECTS[typedSlug]) {
    return <RoomScene slug={typedSlug} />;
  }

  // Mode fallback : ChapterPlayer classique
  const scenarios = SCENARIOS_BY_CHAPTER[typedSlug];
  const currentIndex = CHAPTERS.findIndex((c) => c.slug === typedSlug);
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
