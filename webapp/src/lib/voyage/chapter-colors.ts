/**
 * Tailwind utility classes per chapter color.
 * Listed exhaustively so Tailwind's JIT can statically detect each token.
 */

export type ChapterColorKey =
  | "rythme"
  | "comm"
  | "autonomie"
  | "limites"
  | "environnement"
  | "pression"
  | "lumiere";

export interface ChapterColorTokens {
  bg50: string;
  bg100: string;
  text900: string;
  text900_80: string;
  text900_60: string;
  text700: string;
  ring100: string;
  ring200: string;
  border100: string;
  border200: string;
  fill500: string;
  fill700: string;
  hoverFill900: string;
}

export const CHAPTER_COLORS: Record<ChapterColorKey, ChapterColorTokens> = {
  rythme: {
    bg50: "bg-rythme-50",
    bg100: "bg-rythme-100",
    text900: "text-rythme-900",
    text900_80: "text-rythme-900/80",
    text900_60: "text-rythme-900/60",
    text700: "text-rythme-700",
    ring100: "ring-rythme-100",
    ring200: "ring-rythme-200",
    border100: "border-rythme-100",
    border200: "border-rythme-200",
    fill500: "bg-rythme-500",
    fill700: "bg-rythme-700",
    hoverFill900: "hover:bg-rythme-900",
  },
  comm: {
    bg50: "bg-comm-50",
    bg100: "bg-comm-100",
    text900: "text-comm-900",
    text900_80: "text-comm-900/80",
    text900_60: "text-comm-900/60",
    text700: "text-comm-700",
    ring100: "ring-comm-100",
    ring200: "ring-comm-200",
    border100: "border-comm-100",
    border200: "border-comm-200",
    fill500: "bg-comm-500",
    fill700: "bg-comm-700",
    hoverFill900: "hover:bg-comm-900",
  },
  autonomie: {
    bg50: "bg-autonomie-50",
    bg100: "bg-autonomie-100",
    text900: "text-autonomie-900",
    text900_80: "text-autonomie-900/80",
    text900_60: "text-autonomie-900/60",
    text700: "text-autonomie-700",
    ring100: "ring-autonomie-100",
    ring200: "ring-autonomie-200",
    border100: "border-autonomie-100",
    border200: "border-autonomie-200",
    fill500: "bg-autonomie-500",
    fill700: "bg-autonomie-700",
    hoverFill900: "hover:bg-autonomie-900",
  },
  limites: {
    bg50: "bg-limites-50",
    bg100: "bg-limites-100",
    text900: "text-limites-900",
    text900_80: "text-limites-900/80",
    text900_60: "text-limites-900/60",
    text700: "text-limites-700",
    ring100: "ring-limites-100",
    ring200: "ring-limites-200",
    border100: "border-limites-100",
    border200: "border-limites-200",
    fill500: "bg-limites-500",
    fill700: "bg-limites-700",
    hoverFill900: "hover:bg-limites-900",
  },
  environnement: {
    bg50: "bg-environnement-50",
    bg100: "bg-environnement-100",
    text900: "text-environnement-900",
    text900_80: "text-environnement-900/80",
    text900_60: "text-environnement-900/60",
    text700: "text-environnement-700",
    ring100: "ring-environnement-100",
    ring200: "ring-environnement-200",
    border100: "border-environnement-100",
    border200: "border-environnement-200",
    fill500: "bg-environnement-500",
    fill700: "bg-environnement-700",
    hoverFill900: "hover:bg-environnement-900",
  },
  pression: {
    bg50: "bg-pression-50",
    bg100: "bg-pression-100",
    text900: "text-pression-900",
    text900_80: "text-pression-900/80",
    text900_60: "text-pression-900/60",
    text700: "text-pression-700",
    ring100: "ring-pression-100",
    ring200: "ring-pression-200",
    border100: "border-pression-100",
    border200: "border-pression-200",
    fill500: "bg-pression-500",
    fill700: "bg-pression-700",
    hoverFill900: "hover:bg-pression-900",
  },
  lumiere: {
    bg50: "bg-lumiere-100",
    bg100: "bg-neutral-100",
    text900: "text-neutral-900",
    text900_80: "text-neutral-900/80",
    text900_60: "text-neutral-900/60",
    text700: "text-neutral-700",
    ring100: "ring-neutral-100",
    ring200: "ring-neutral-200",
    border100: "border-neutral-100",
    border200: "border-neutral-200",
    fill500: "bg-neutral-500",
    fill700: "bg-neutral-700",
    hoverFill900: "hover:bg-neutral-900",
  },
};

export function getColorTokens(key: string): ChapterColorTokens {
  return CHAPTER_COLORS[key as ChapterColorKey] ?? CHAPTER_COLORS.lumiere;
}
