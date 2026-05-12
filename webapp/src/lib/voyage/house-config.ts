/**
 * Configuration de la "Maison du Voyage" — Sims-of-the-self.
 *
 * Chaque pièce correspond à un chapitre du profil profond.
 * Chaque pièce contient des objets interactifs qui déclenchent
 * des scenarios ou mini-games.
 *
 * Le visuel est volontairement "blueprint" — top-down, géométrique,
 * sans illustration humaine. Phase 2 = passage à un studio illustrateur.
 */

import type { ChapterSlug } from "@/lib/chapters";

export interface RoomRect {
  /** Position et taille dans la grille de la maison (unités: pourcents). */
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RoomConfig {
  slug: ChapterSlug;
  /** Nom court affiché sur la map (ex: "Le Salon"). */
  roomName: string;
  /** Description en 1 ligne pour le hover. */
  tagline: string;
  /** Emoji de chambre (placeholder en attendant illustrator). */
  roomEmoji: string;
  /** Couleur du chapitre (clé de la palette). */
  color: string;
  /** Bounding box de la pièce sur la map. */
  rect: RoomRect;
}

/**
 * La maison — 7 pièces + front door (entrée) + back door (jardin).
 *
 * Grille 100x100, top-down:
 *
 *   ┌─────────────────────────────────────┐
 *   │       JARDIN (Environnement)        │
 *   ├──────────────┬──────────────────────┤
 *   │  CHAMBRE     │   BUREAU             │
 *   │  (Limites)   │   (Autonomie)        │
 *   ├──────────────┴──────────────────────┤
 *   │  CUISINE     │   SALLE DE PAUSE     │
 *   │  (Comm)      │   (Pression)         │
 *   ├──────────────┴──────────────────────┤
 *   │       LE SALON (Rythme)             │
 *   ├─────────────────────────────────────┤
 *   │           [ENTRÉE]                   │
 *   └─────────────────────────────────────┘
 *
 *   Au final : SYNTHÈSE (front door = portrait)
 *              ENTRETIEN (door optionnelle)
 */

export const HOUSE_ROOMS: RoomConfig[] = [
  {
    slug: "environnement",
    roomName: "Le Jardin",
    tagline: "Où tu te sens à ta place.",
    roomEmoji: "🌿",
    color: "environnement",
    rect: { x: 6, y: 6, w: 88, h: 16 },
  },
  {
    slug: "limites",
    roomName: "La Chambre",
    tagline: "Ce que tu protèges.",
    roomEmoji: "🛏",
    color: "limites",
    rect: { x: 6, y: 25, w: 42, h: 18 },
  },
  {
    slug: "autonomie",
    roomName: "Le Bureau",
    tagline: "Quand tu décides seul·e.",
    roomEmoji: "💼",
    color: "autonomie",
    rect: { x: 52, y: 25, w: 42, h: 18 },
  },
  {
    slug: "communication",
    roomName: "La Cuisine",
    tagline: "Là où l'on se parle.",
    roomEmoji: "☕",
    color: "comm",
    rect: { x: 6, y: 46, w: 42, h: 18 },
  },
  {
    slug: "pression",
    roomName: "La Salle de Pause",
    tagline: "Quand tu reprends ton souffle.",
    roomEmoji: "💨",
    color: "pression",
    rect: { x: 52, y: 46, w: 42, h: 18 },
  },
  {
    slug: "rythme",
    roomName: "Le Salon",
    tagline: "Ton tempo intérieur.",
    roomEmoji: "🛋",
    color: "rythme",
    rect: { x: 6, y: 67, w: 88, h: 18 },
  },
];

/**
 * Pièces "spéciales" — front door + back door.
 */
export const HOUSE_DOORS = {
  synthese: {
    label: "Sortir avec ton portrait",
    href: "/voyage/synthese",
    color: "lumiere" as const,
  },
  entretien: {
    label: "Entretien IA (optionnel)",
    href: "/voyage/entretien",
    color: "rythme" as const,
  },
};

// ────────────────────────────────────────────────────────
// Objets interactifs par pièce
// ────────────────────────────────────────────────────────

export interface InteractiveObject {
  id: string;
  label: string;
  /** Emoji placeholder (Phase 2 = illustration). */
  emoji: string;
  /** Position dans la pièce (pourcents relatifs au room rect). */
  x: number;
  y: number;
  /** IDs des scénarios à jouer quand on clique sur cet objet. */
  scenarioIds: string[];
  /** Description courte au hover. */
  hint: string;
}

/**
 * Mapping des objets interactifs par pièce.
 *
 * Pour le Salon (Rythme), 4 objets couvrent les 6 scénarios.
 * Pour les autres pièces (pas encore reconstruites), on garde une seule entrée
 * qui ouvre le ChapterPlayer classique (mode fallback).
 */
export const ROOM_OBJECTS: Partial<Record<ChapterSlug, InteractiveObject[]>> = {
  rythme: [
    {
      id: "phone",
      label: "Ton téléphone",
      emoji: "📱",
      x: 20,
      y: 60,
      scenarioIds: ["dimanche-soir", "interruption"],
      hint: "Une notif clignote sur l'écran.",
    },
    {
      id: "calendar",
      label: "Le calendrier",
      emoji: "📅",
      x: 50,
      y: 35,
      scenarioIds: ["deadline-method", "sprint-vs-marathon"],
      hint: "Une deadline approche.",
    },
    {
      id: "window",
      label: "La fenêtre",
      emoji: "🌅",
      x: 80,
      y: 25,
      scenarioIds: ["energy-peak"],
      hint: "La lumière change selon l'heure.",
    },
    {
      id: "door",
      label: "La porte",
      emoji: "🚪",
      x: 75,
      y: 75,
      scenarioIds: ["weekend-push"],
      hint: "Quelqu'un attend dehors.",
    },
  ],
};
