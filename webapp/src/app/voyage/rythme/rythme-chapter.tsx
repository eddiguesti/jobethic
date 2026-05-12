"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { SwipeCard, type SwipeChoice } from "@/components/voyage/swipe-card";
import { Button } from "@/components/ui/button";
import { RYTHME_SCENARIOS } from "@/lib/voyage/rythme-scenarios";
import { ArrowLeft, Check, Sparkles } from "lucide-react";

type Phase = "intro" | "playing" | "complete";
type Answer = { scenarioId: string; choice: SwipeChoice };

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

export function RythmeChapter() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  function handleSwipe(choice: SwipeChoice) {
    const scenario = RYTHME_SCENARIOS[step];
    if (!scenario) return;

    const next = [...answers, { scenarioId: scenario.id, choice }];
    setAnswers(next);

    if (step + 1 >= RYTHME_SCENARIOS.length) {
      setPhase("complete");
    } else {
      setStep(step + 1);
    }
  }

  return (
    <div className="min-h-full bg-rythme-50">
      {/* Header */}
      <header className="border-b border-rythme-100/60 bg-rythme-50/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Link
            href="/voyage"
            className="inline-flex items-center gap-1.5 text-sm text-rythme-700 hover:text-rythme-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Le Voyage
          </Link>
          <span className="text-xs font-medium uppercase tracking-wider text-rythme-700">
            🔵 Jour 1 · Le rythme
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {phase === "intro" && (
            <motion.section
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: easeOutCubic }}
              className="mx-auto max-w-xl text-center"
            >
              <div className="mb-6 text-6xl" role="img" aria-label="Le Rythme">
                🔵
              </div>
              <h1 className="font-serif text-3xl leading-tight tracking-tight text-rythme-900 text-balance sm:text-4xl">
                Aujourd&apos;hui : le rythme.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-rythme-900/80 text-pretty">
                On va découvrir comment tu travailles. Pas ce que tu fais —
                comment tu fonctionnes. Prends ton temps.{" "}
                <strong className="text-rythme-900">
                  Il n&apos;y a pas de bonne réponse.
                </strong>
              </p>

              <div className="mt-8 rounded-2xl border border-rythme-200 bg-lumiere-100 p-5 text-left">
                <p className="text-sm font-semibold text-rythme-900">
                  Comment ça marche
                </p>
                <ul className="mt-3 space-y-2 text-sm text-rythme-900/80">
                  <li className="flex gap-2">
                    <span className="text-rythme-500">→</span>
                    <span>
                      6 situations. Pour chacune, 3 choix possibles.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rythme-500">→</span>
                    <span>
                      Glisse la carte (gauche / droite / bas) ou clique. Suis
                      ton instinct, pas ton CV.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rythme-500">→</span>
                    <span>
                      Aucun score n&apos;est affiché. On capture un style, pas
                      une performance.
                    </span>
                  </li>
                </ul>
              </div>

              <Button
                size="lg"
                variant="primary"
                className="mt-8 bg-rythme-700 hover:bg-rythme-900"
                onClick={() => setPhase("playing")}
              >
                Commencer (5 min)
              </Button>
              <p className="mt-4 text-xs text-rythme-900/60">
                Tu peux toujours revenir modifier tes réponses plus tard.
              </p>
            </motion.section>
          )}

          {/* PLAYING */}
          {phase === "playing" && (
            <motion.section
              key="playing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: easeOutCubic }}
            >
              {/* Progress */}
              <div className="mx-auto mb-10 max-w-md">
                <div className="flex items-center justify-between text-xs text-rythme-900/60">
                  <span>
                    Situation {step + 1} sur {RYTHME_SCENARIOS.length}
                  </span>
                  <span>
                    {Math.round(((step + 1) / RYTHME_SCENARIOS.length) * 100)}%
                  </span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-rythme-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((step + 1) / RYTHME_SCENARIOS.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: easeOutCubic }}
                    className="h-full bg-rythme-700"
                  />
                </div>
              </div>

              {/* Card stack — show only current */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: easeOutCubic }}
                >
                  {RYTHME_SCENARIOS[step] && (
                    <SwipeCard
                      scenario={RYTHME_SCENARIOS[step].scenario}
                      context={RYTHME_SCENARIOS[step].context}
                      choices={{
                        left: {
                          label: RYTHME_SCENARIOS[step].choices.left.label,
                          hint: RYTHME_SCENARIOS[step].choices.left.hint,
                        },
                        right: {
                          label: RYTHME_SCENARIOS[step].choices.right.label,
                          hint: RYTHME_SCENARIOS[step].choices.right.hint,
                        },
                        down: {
                          label: RYTHME_SCENARIOS[step].choices.down.label,
                          hint: RYTHME_SCENARIOS[step].choices.down.hint,
                        },
                      }}
                      onSwipe={handleSwipe}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.section>
          )}

          {/* COMPLETE */}
          {phase === "complete" && (
            <motion.section
              key="complete"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutCubic }}
              className="mx-auto max-w-xl text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: easeOutCubic,
                }}
                className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-rythme-700 text-lumiere-100"
              >
                <Sparkles className="h-8 w-8" />
              </motion.div>

              <h1 className="font-serif text-3xl leading-tight tracking-tight text-rythme-900 text-balance sm:text-4xl">
                Premier chapitre terminé.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-rythme-900/80 text-pretty">
                Tu as découvert ton rythme. Demain : la communication 🟢. Ton
                profil prend déjà forme — sans que tu aies eu à le décrire.
              </p>

              <div className="mt-8 rounded-2xl border border-rythme-200 bg-lumiere-100 p-6 text-left">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-comm-600" />
                  <span className="text-sm font-semibold text-neutral-900">
                    1 / 30 cartes d&apos;empreinte débloquées
                  </span>
                </div>
                <p className="mt-3 text-sm text-neutral-600">
                  En Phase 0, on capture tes réponses pour calibrer la
                  méthodologie. Ton profil sera analysé manuellement.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link href="/voyage">
                  <Button size="lg" variant="primary">
                    Retour au Voyage
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="secondary">
                    Accueil
                  </Button>
                </Link>
              </div>

              {/* Debug / future telemetry: show answers in dev */}
              <details className="mx-auto mt-8 max-w-md text-left text-xs text-neutral-500">
                <summary className="cursor-pointer">
                  Tes réponses (transparence Phase 0)
                </summary>
                <pre className="mt-3 overflow-auto rounded-lg bg-neutral-50 p-3">
                  {JSON.stringify(answers, null, 2)}
                </pre>
              </details>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
