"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScenarioOverlay } from "@/components/voyage-v2/scenario-overlay";
import { HOUSE_ROOMS, ROOM_OBJECTS } from "@/lib/voyage/house-config";
import { SCENARIOS_BY_CHAPTER } from "@/lib/voyage/scenarios";
import {
  useVoyageProgress,
  type SwipeChoice,
} from "@/lib/voyage/use-voyage-progress";
import { getColorTokens } from "@/lib/voyage/chapter-colors";
import type { ChapterSlug } from "@/lib/chapters";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

interface RoomSceneProps {
  slug: ChapterSlug;
}

/**
 * Vue top-down d'une pièce avec objets interactifs cliquables.
 * Style blueprint / architect — géométrique, premium, pas illustré.
 *
 * Le visuel sera enrichi en Phase 2 avec un illustrateur.
 */
export function RoomScene({ slug }: RoomSceneProps) {
  const { progress, saveAnswer, completeChapter } = useVoyageProgress();
  const room = HOUSE_ROOMS.find((r) => r.slug === slug);
  const objects = useMemo(() => ROOM_OBJECTS[slug] ?? [], [slug]);

  const tokens = useMemo(
    () => (room ? getColorTokens(room.color) : getColorTokens("lumiere")),
    [room],
  );

  const [activeObjectId, setActiveObjectId] = useState<string | null>(null);

  // Récupérer les scénarios à jouer quand un objet est ouvert
  const activeScenarios = useMemo(() => {
    if (!activeObjectId) return [];
    const obj = objects.find((o) => o.id === activeObjectId);
    if (!obj) return [];
    const allScenarios = SCENARIOS_BY_CHAPTER[slug] ?? [];
    return obj.scenarioIds
      .map((id) => allScenarios.find((s) => s.id === id))
      .filter((s): s is NonNullable<typeof s> => Boolean(s));
  }, [activeObjectId, objects, slug]);

  // Compter les scénarios répondus dans cette pièce
  const answered = progress[slug]?.answers ?? [];
  const totalScenarios = SCENARIOS_BY_CHAPTER[slug]?.length ?? 0;
  const allAnswered = answered.length >= totalScenarios && totalScenarios > 0;

  function handleAnswer(scenarioId: string, choice: SwipeChoice) {
    saveAnswer(slug, scenarioId, choice);
  }

  function handleCloseOverlay() {
    setActiveObjectId(null);
    // Vérifier si la pièce est entièrement complétée
    const allScenarios = SCENARIOS_BY_CHAPTER[slug] ?? [];
    const updatedAnswers = progress[slug]?.answers ?? [];
    if (
      updatedAnswers.length >= allScenarios.length &&
      allScenarios.length > 0 &&
      !progress[slug]?.completed
    ) {
      completeChapter(slug);
    }
  }

  if (!room) {
    return (
      <div className="flex min-h-full items-center justify-center bg-neutral-50 p-6">
        <p className="text-neutral-500">Pièce introuvable.</p>
      </div>
    );
  }

  // Détecter quels objets ont été "joués" (au moins une réponse)
  const objectStatus = (objectId: string): "untouched" | "partial" | "done" => {
    const obj = objects.find((o) => o.id === objectId);
    if (!obj) return "untouched";
    const answered = obj.scenarioIds.filter((sid) =>
      progress[slug]?.answers.some((a) => a.scenarioId === sid),
    );
    if (answered.length === 0) return "untouched";
    if (answered.length < obj.scenarioIds.length) return "partial";
    return "done";
  };

  return (
    <div className={`min-h-full ${tokens.bg50}`}>
      {/* Top bar */}
      <header
        className={`sticky top-0 z-20 border-b ${tokens.border100}/60 ${tokens.bg50}/80 backdrop-blur-md`}
      >
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
          <Link
            href="/voyage"
            className={`inline-flex items-center gap-1.5 text-sm ${tokens.text700} hover:${tokens.text900}`}
          >
            <ArrowLeft className="h-4 w-4" />
            La Maison
          </Link>
          <span className={`text-xs uppercase tracking-wider ${tokens.text700}`}>
            {room.roomEmoji} {room.roomName}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 sm:py-14">
        {/* Intro / title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutCubic }}
          className="mx-auto max-w-xl text-center"
        >
          <p className={`text-xs font-semibold uppercase tracking-wider ${tokens.text900_60}`}>
            Jour {HOUSE_ROOMS.findIndex((r) => r.slug === slug) + 1} · La Maison
          </p>
          <h1
            className={`mt-3 font-serif text-3xl leading-tight tracking-tight ${tokens.text900} text-balance sm:text-4xl`}
          >
            {room.roomName}
          </h1>
          <p className={`mt-3 italic ${tokens.text900_80}`}>{room.tagline}</p>
          <p className={`mt-2 text-sm ${tokens.text900_60}`}>
            Clique sur les objets pour interagir. {answered.length}/
            {totalScenarios} situations explorées.
          </p>
        </motion.div>

        {/* The room itself — top-down SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOutCubic }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <div
            className={`relative aspect-[16/11] overflow-hidden rounded-3xl border-2 ${tokens.border200} bg-lumiere-100 shadow-md`}
          >
            {/* Floor pattern */}
            <svg
              viewBox="0 0 100 70"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label={`Plan de ${room.roomName}`}
            >
              {/* Floor grid */}
              <defs>
                <pattern
                  id={`floor-${slug}`}
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.15"
                    className={tokens.text900_60}
                    opacity="0.2"
                  />
                </pattern>
              </defs>
              <rect width="100" height="70" fill={`url(#floor-${slug})`} />

              {/* Furniture suggestions (decorative non-interactive) */}
              {slug === "rythme" && (
                <>
                  {/* Couch */}
                  <rect
                    x="10"
                    y="50"
                    width="22"
                    height="10"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.4"
                    className={tokens.text700}
                    opacity="0.5"
                  />
                  <text
                    x="21"
                    y="56"
                    textAnchor="middle"
                    fontSize="2"
                    className={`fill-current ${tokens.text900_60}`}
                  >
                    canapé
                  </text>

                  {/* Coffee table */}
                  <rect
                    x="14"
                    y="40"
                    width="14"
                    height="6"
                    rx="0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.4"
                    className={tokens.text700}
                    opacity="0.5"
                  />

                  {/* TV/Window outline */}
                  <rect
                    x="68"
                    y="8"
                    width="20"
                    height="14"
                    rx="0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.4"
                    className={tokens.text700}
                    opacity="0.5"
                  />
                  <text
                    x="78"
                    y="16"
                    textAnchor="middle"
                    fontSize="2"
                    className={`fill-current ${tokens.text900_60}`}
                  >
                    fenêtre
                  </text>
                </>
              )}

              {/* Interactive objects */}
              {objects.map((obj, i) => {
                const status = objectStatus(obj.id);
                return (
                  <motion.g
                    key={obj.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + i * 0.1,
                      ease: easeOutCubic,
                    }}
                    onClick={() => setActiveObjectId(obj.id)}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                  >
                    {/* Pulse ring for untouched objects */}
                    {status === "untouched" && (
                      <motion.circle
                        cx={obj.x * 0.7}
                        cy={obj.y * 0.7}
                        r="4"
                        className={`${tokens.text500} fill-current`}
                        opacity="0.3"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    {/* Object emoji */}
                    <text
                      x={obj.x * 0.7}
                      y={obj.y * 0.7 + 1.2}
                      textAnchor="middle"
                      fontSize="5"
                      className="select-none"
                      style={{
                        filter:
                          status === "done"
                            ? "grayscale(0.5) opacity(0.6)"
                            : "none",
                      }}
                    >
                      {obj.emoji}
                    </text>
                    {/* Done check */}
                    {status === "done" && (
                      <circle
                        cx={obj.x * 0.7 + 2.5}
                        cy={obj.y * 0.7 - 2}
                        r="1.2"
                        className="fill-comm-500"
                      />
                    )}
                  </motion.g>
                );
              })}
            </svg>
          </div>
        </motion.div>

        {/* Objects legend */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: easeOutCubic }}
          className="mx-auto mt-8 grid max-w-2xl gap-2 sm:grid-cols-2"
        >
          {objects.map((obj) => {
            const status = objectStatus(obj.id);
            return (
              <button
                key={obj.id}
                onClick={() => setActiveObjectId(obj.id)}
                className={`flex items-center gap-3 rounded-xl border ${tokens.border100} bg-lumiere-100 p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  status === "done" ? "opacity-60" : ""
                }`}
              >
                <span className="text-2xl" role="img" aria-label={obj.label}>
                  {obj.emoji}
                </span>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${tokens.text900}`}
                  >
                    {obj.label}
                  </p>
                  <p className={`text-xs ${tokens.text900_60}`}>{obj.hint}</p>
                </div>
                {status === "done" && (
                  <Check className="h-4 w-4 text-comm-600" />
                )}
                {status === "partial" && (
                  <span className="text-xs font-medium text-autonomie-700">
                    En cours
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Empty state when no objects defined yet (fallback chapters) */}
        {objects.length === 0 && (
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-dashed border-neutral-300 bg-lumiere-100 p-6 text-center">
            <p className="text-sm text-neutral-600">
              🚧 Cette pièce n&apos;est pas encore aménagée en mode immersif.
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              Reviens prochainement, ou joue la version proto rapide.
            </p>
          </div>
        )}

        {/* Complete state */}
        {allAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutCubic }}
            className="mx-auto mt-12 max-w-xl rounded-2xl border border-comm-200 bg-comm-50 p-6 text-center"
          >
            <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-comm-600 text-lumiere-100">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-2xl leading-tight tracking-tight text-comm-900">
              Tu as exploré toute la pièce.
            </h2>
            <p className="mt-2 text-sm text-comm-900/80">
              Carte d&apos;empreinte débloquée : {room.roomName}. Tu peux
              retourner à la Maison ou explorer la pièce suivante.
            </p>
            <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
              <Link href="/voyage">
                <Button size="md" variant="primary">
                  Retour à la Maison
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </main>

      {/* Scenario overlay */}
      <AnimatePresence>
        {activeObjectId && activeScenarios.length > 0 && (
          <ScenarioOverlay
            scenarios={activeScenarios}
            ringClassName={tokens.ring200}
            onAnswer={handleAnswer}
            onClose={handleCloseOverlay}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
