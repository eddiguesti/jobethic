/**
 * Les 7 chapitres du Voyage — la signature de JOB'S ETHIC.
 * Voir plan/04-PROFIL-PROFOND.md
 */

export const CHAPTERS = [
  {
    slug: "rythme",
    day: 1,
    emoji: "🔵",
    name: "Le rythme",
    tagline: "Comment tu fonctionnes — pas ce que tu fais.",
    color: "rythme",
    description:
      "Vitesse, sprint vs marathon, pics d'énergie, tolérance à l'interruption.",
  },
  {
    slug: "communication",
    day: 2,
    emoji: "🟢",
    name: "La communication",
    tagline: "Direct ou diplomate, écrit ou oral, sync ou async.",
    color: "comm",
    description:
      "Style, canal préféré, fréquence de feedback, gestion du conflit.",
  },
  {
    slug: "autonomie",
    day: 3,
    emoji: "🟡",
    name: "L'autonomie",
    tagline: "Encadré, indépendant, ou collaboratif.",
    color: "autonomie",
    description:
      "Niveau d'autonomie, besoin de contexte, mode de décision.",
  },
  {
    slug: "limites",
    day: 4,
    emoji: "🟣",
    name: "Tes limites",
    tagline: "Ce que tu ne veux pas. C'est aussi important que ce que tu veux.",
    color: "limites",
    description:
      "Horaires non-négociables, missions refusées, comportements rédhibitoires.",
  },
  {
    slug: "environnement",
    day: 5,
    emoji: "🟠",
    name: "L'environnement",
    tagline: "Où tu fonctionnes vraiment bien.",
    color: "environnement",
    description:
      "Type de structure, taille d'équipe, présentiel vs remote, industries.",
  },
  {
    slug: "pression",
    day: 6,
    emoji: "🔴",
    name: "La pression",
    tagline: "Stress positif, neutre, ou à fuir.",
    color: "pression",
    description: "Tolérance, type de stress, réaction sous urgence.",
  },
  {
    slug: "synthese",
    day: 7,
    emoji: "⚪",
    name: "Ton portrait",
    tagline: "Voici qui tu es professionnellement.",
    color: "lumiere",
    description:
      "3 forces, 3 préférences fortes, 3 limites — ton portrait synthétique.",
  },
] as const;

export type ChapterSlug = (typeof CHAPTERS)[number]["slug"];
export type Chapter = (typeof CHAPTERS)[number];

export function getChapter(slug: ChapterSlug): Chapter {
  const chapter = CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) throw new Error(`Chapter not found: ${slug}`);
  return chapter;
}
