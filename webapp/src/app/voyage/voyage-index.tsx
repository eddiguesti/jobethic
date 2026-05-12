"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Lock, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHAPTERS } from "@/lib/chapters";
import { getColorTokens } from "@/lib/voyage/chapter-colors";
import { useVoyageProgress } from "@/lib/voyage/use-voyage-progress";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

const SWIPE_CHAPTERS = CHAPTERS.filter((c) => c.slug !== "synthese");

export function VoyageIndex() {
  const { progress, hydrated, resetAll } = useVoyageProgress();

  const completedCount = SWIPE_CHAPTERS.filter(
    (c) => progress[c.slug]?.completed,
  ).length;
  const percent = Math.round((completedCount / SWIPE_CHAPTERS.length) * 100);
  const allCompleted = completedCount === SWIPE_CHAPTERS.length;

  return (
    <div className="min-h-full">
      {/* Minimal header */}
      <header className="border-b border-neutral-200/60 bg-lumiere-100">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-neutral-900"
            />
            <span>JOB&apos;S ETHIC</span>
          </Link>
          <span className="text-xs text-neutral-500">
            Le Voyage · Acte 1 · Découverte
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {/* Intro */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Acte 1 · 7 jours · 5 min par jour
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-neutral-900 text-balance sm:text-5xl">
            La Découverte
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600 text-pretty">
            Pas un test. Un voyage. Chaque jour, une thématique. Chaque
            thématique, une couleur. Prends ton temps — il n&apos;y a pas de
            mauvaise réponse.
          </p>
        </div>

        {/* Progress bar */}
        {hydrated && completedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOutCubic }}
            className="mx-auto mt-12 max-w-md rounded-2xl border border-neutral-200 bg-lumiere-100 p-5"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-neutral-900">
                Ta progression
              </span>
              <span className="text-neutral-500">
                {completedCount} / {SWIPE_CHAPTERS.length} chapitres
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8, ease: easeOutCubic }}
                className="h-full bg-gradient-to-r from-rythme-500 via-limites-500 to-environnement-500"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
              <span>{percent}% du Voyage</span>
              <button
                onClick={() => {
                  if (
                    confirm(
                      "Effacer toute ta progression ? Cette action est irréversible.",
                    )
                  ) {
                    resetAll();
                  }
                }}
                className="inline-flex items-center gap-1 hover:text-neutral-700"
              >
                <RotateCcw className="h-3 w-3" />
                Tout effacer
              </button>
            </div>
          </motion.div>
        )}

        {/* Chapter cards */}
        <div className="mt-12 space-y-4">
          {SWIPE_CHAPTERS.map((chapter) => {
            const tokens = getColorTokens(chapter.color);
            const isCompleted = progress[chapter.slug]?.completed ?? false;
            const hasStarted =
              (progress[chapter.slug]?.answers.length ?? 0) > 0 && !isCompleted;

            return (
              <Link
                key={chapter.slug}
                href={`/voyage/${chapter.slug}`}
                className={`group relative block overflow-hidden rounded-2xl ${tokens.bg50} p-6 ring-1 ${tokens.ring200} transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-8`}
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <span
                      className="text-4xl"
                      role="img"
                      aria-label={chapter.name}
                    >
                      {chapter.emoji}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-medium ${tokens.text900_60}`}
                        >
                          Jour {chapter.day}
                        </span>
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-comm-100 px-2 py-0.5 text-xs font-medium text-comm-700">
                            <Check className="h-3 w-3" />
                            Terminé
                          </span>
                        )}
                        {hasStarted && (
                          <span className="rounded-full bg-autonomie-100 px-2 py-0.5 text-xs font-medium text-autonomie-700">
                            En cours
                          </span>
                        )}
                      </div>
                      <h2
                        className={`mt-1 font-serif text-2xl font-semibold ${tokens.text900}`}
                      >
                        {chapter.name}
                      </h2>
                      <p className={`mt-1 text-sm ${tokens.text900_80}`}>
                        {chapter.tagline}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`h-5 w-5 ${tokens.text700} transition-transform group-hover:translate-x-1`} />
                </div>
              </Link>
            );
          })}

          {/* Synthese card — special */}
          <Link
            href="/voyage/synthese"
            className={`group relative block overflow-hidden rounded-2xl border-2 border-dashed border-neutral-300 bg-lumiere-100 p-6 transition-all hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-md sm:p-8 ${allCompleted ? "" : "opacity-70"}`}
          >
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <span className="text-4xl" role="img" aria-label="Ton portrait">
                  ⚪
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-neutral-500">
                      Jour 7
                    </span>
                    {!allCompleted && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700">
                        <Lock className="h-3 w-3" />
                        Verrouillé
                      </span>
                    )}
                    {allCompleted && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-comm-100 px-2 py-0.5 text-xs font-medium text-comm-700">
                        <Check className="h-3 w-3" />
                        Disponible
                      </span>
                    )}
                  </div>
                  <h2 className="mt-1 font-serif text-2xl font-semibold text-neutral-900">
                    Ton portrait
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600">
                    {allCompleted
                      ? "Tu es prêt·e. Voici qui tu es professionnellement."
                      : "Termine les 6 chapitres pour révéler ton portrait."}
                  </p>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-neutral-700 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        {/* CTA back if complete */}
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <Link href="/">
              <Button variant="secondary" size="lg">
                Retour à l&apos;accueil
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Phase 0 honesty note */}
        <p className="mx-auto mt-16 max-w-xl text-center text-sm text-neutral-500">
          🚧 <strong className="text-neutral-700">Phase 0 en cours.</strong>{" "}
          Tes réponses sont stockées localement (RGPD Art. 20). En Phase 1, ton
          profil sera analysé manuellement pour calibrer la méthodologie.
        </p>
      </main>
    </div>
  );
}
