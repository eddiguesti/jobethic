"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHAPTERS } from "@/lib/chapters";
import { useVoyageProgress } from "@/lib/voyage/use-voyage-progress";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

const SWIPE_CHAPTERS = CHAPTERS.filter((c) => c.slug !== "synthese");

export function SyntheseClient() {
  const { progress, hydrated } = useVoyageProgress();

  // Count completed chapters
  const completedCount = SWIPE_CHAPTERS.filter(
    (c) => progress[c.slug]?.completed,
  ).length;

  const allCompleted = completedCount === SWIPE_CHAPTERS.length;
  const percent = Math.round((completedCount / SWIPE_CHAPTERS.length) * 100);

  return (
    <div className="min-h-full bg-gradient-to-br from-rythme-50 via-lumiere-100 to-environnement-50">
      {/* Header */}
      <header className="border-b border-neutral-200/60 bg-lumiere-100/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Link
            href="/voyage"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-700 hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Le Voyage
          </Link>
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-700">
            ⚪ Jour 7 · Synthèse
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {!hydrated ? (
          <div className="mx-auto max-w-xl text-center text-neutral-500">
            Chargement de ton portrait…
          </div>
        ) : !allCompleted ? (
          // ─── Not all chapters completed ───
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutCubic }}
            className="mx-auto max-w-xl text-center"
          >
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-neutral-200 text-neutral-500">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="font-serif text-3xl leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl">
              Ton portrait t&apos;attend.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-600 text-pretty">
              Tu as complété{" "}
              <strong className="text-neutral-900">
                {completedCount} chapitre{completedCount > 1 ? "s" : ""}
              </strong>{" "}
              sur 6. Termine l&apos;Acte 1 pour révéler qui tu es
              professionnellement.
            </p>

            {/* Progress bar */}
            <div className="mx-auto mt-8 max-w-md">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Progression</span>
                <span>{percent}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8, ease: easeOutCubic }}
                  className="h-full bg-gradient-to-r from-rythme-500 to-environnement-500"
                />
              </div>
            </div>

            {/* Missing chapters */}
            <div className="mt-8 space-y-2">
              {SWIPE_CHAPTERS.filter((c) => !progress[c.slug]?.completed).map(
                (chapter) => (
                  <Link
                    key={chapter.slug}
                    href={`/voyage/${chapter.slug}`}
                    className="flex items-center justify-between rounded-xl border border-neutral-200 bg-lumiere-100 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img">
                        {chapter.emoji}
                      </span>
                      <div className="text-left">
                        <p className="text-sm font-medium text-neutral-900">
                          {chapter.name}
                        </p>
                        <p className="text-xs text-neutral-500">
                          Jour {chapter.day}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-neutral-500">À faire →</span>
                  </Link>
                ),
              )}
            </div>
          </motion.section>
        ) : (
          // ─── All chapters completed — reveal portrait ───
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: easeOutCubic }}
          >
            {/* Hero reveal */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: easeOutCubic }}
              className="mx-auto mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rythme-500 to-environnement-500 text-lumiere-100 shadow-lg"
            >
              <Sparkles className="h-10 w-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: easeOutCubic }}
              className="text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Acte 1 — Découverte terminée
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-neutral-900 text-balance sm:text-5xl">
                Voici qui tu es professionnellement.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-neutral-600 text-pretty">
                30 cartes d&apos;empreinte débloquées. Voici ton portrait
                synthétique — il évoluera avec l&apos;Acte 2 (Mises en
                situation) et l&apos;Acte 3 (Échos quotidiens).
              </p>
            </motion.div>

            {/* Portrait grid — 7 chapter cards */}
            <div className="mt-16 grid gap-4 sm:grid-cols-2">
              {SWIPE_CHAPTERS.map((chapter, i) => {
                const answers = progress[chapter.slug]?.answers ?? [];
                return (
                  <motion.div
                    key={chapter.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.7 + i * 0.08,
                      ease: easeOutCubic,
                    }}
                    className="rounded-2xl border border-neutral-200 bg-lumiere-100 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" role="img">
                        {chapter.emoji}
                      </span>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                          Carte {chapter.day}
                        </p>
                        <h3 className="text-base font-semibold text-neutral-900">
                          {chapter.name}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-neutral-600">
                      {answers.length} réponse{answers.length > 1 ? "s" : ""}{" "}
                      capturée{answers.length > 1 ? "s" : ""}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Honesty note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-12 rounded-2xl border border-neutral-200 bg-lumiere-100 p-6"
            >
              <p className="text-sm text-neutral-700">
                <strong className="text-neutral-900">🚧 Phase 0.</strong> Tes
                réponses sont stockées en local sur ton navigateur (RGPD Art. 20).
                En Phase 1, ton portrait sera analysé manuellement par notre
                équipe pour calibrer la méthodologie. Tu peux toujours les
                exporter ou les effacer.
              </p>
            </motion.div>

            {/* Actions */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/voyage">
                <Button size="lg" variant="primary">
                  Retour au Voyage
                </Button>
              </Link>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  const data = JSON.stringify(progress, null, 2);
                  const blob = new Blob([data], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `jobethic-portrait-${Date.now()}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <Download className="h-4 w-4" />
                Exporter mon portrait (JSON)
              </Button>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}
