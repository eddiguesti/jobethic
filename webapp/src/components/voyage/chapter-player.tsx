"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { SwipeCard } from "@/components/voyage/swipe-card";
import { Button } from "@/components/ui/button";
import { getColorTokens } from "@/lib/voyage/chapter-colors";
import type { Chapter, ChapterSlug } from "@/lib/chapters";
import { useVoyageProgress } from "@/lib/voyage/use-voyage-progress";

export interface PlayerScenario {
  id: string;
  context: string;
  scenario: string;
  choices: {
    left: { label: string; hint: string };
    right: { label: string; hint: string };
    down: { label: string; hint: string };
  };
}

interface ChapterPlayerProps {
  chapter: Chapter;
  scenarios: readonly PlayerScenario[];
  /** Optional override for the intro headline. Default uses chapter.tagline. */
  introHeadline?: string;
  /** Optional override for next chapter slug (for "→ Demain :" hint). */
  nextChapterSlug?: ChapterSlug;
  nextChapterEmoji?: string;
  nextChapterName?: string;
}

type Phase = "intro" | "playing" | "complete";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

export function ChapterPlayer({
  chapter,
  scenarios,
  introHeadline,
  nextChapterSlug,
  nextChapterEmoji,
  nextChapterName,
}: ChapterPlayerProps) {
  const tokens = getColorTokens(chapter.color);
  const { saveAnswer, completeChapter } = useVoyageProgress();

  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);

  function handleSwipe(choice: "left" | "right" | "down") {
    const scenario = scenarios[step];
    if (!scenario) return;

    saveAnswer(chapter.slug, scenario.id, choice);

    if (step + 1 >= scenarios.length) {
      completeChapter(chapter.slug);
      setPhase("complete");
    } else {
      setStep(step + 1);
    }
  }

  return (
    <div className={`min-h-full ${tokens.bg50}`}>
      {/* Header */}
      <header className={`border-b ${tokens.border100}/60 ${tokens.bg50}/80 backdrop-blur-md`}>
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Link
            href="/voyage"
            className={`inline-flex items-center gap-1.5 text-sm ${tokens.text700} hover:${tokens.text900}`}
          >
            <ArrowLeft className="h-4 w-4" />
            Le Voyage
          </Link>
          <span
            className={`text-xs font-medium uppercase tracking-wider ${tokens.text700}`}
          >
            {chapter.emoji} Jour {chapter.day} · {chapter.name}
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
              <div className="mb-6 text-6xl" role="img" aria-label={chapter.name}>
                {chapter.emoji}
              </div>
              <h1
                className={`font-serif text-3xl leading-tight tracking-tight ${tokens.text900} text-balance sm:text-4xl`}
              >
                {introHeadline ?? `Aujourd'hui : ${chapter.name.toLowerCase()}.`}
              </h1>
              <p
                className={`mt-5 text-lg leading-relaxed ${tokens.text900_80} text-pretty`}
              >
                {chapter.description}
              </p>

              <div
                className={`mt-8 rounded-2xl border ${tokens.border200} bg-lumiere-100 p-5 text-left`}
              >
                <p className={`text-sm font-semibold ${tokens.text900}`}>
                  Comment ça marche
                </p>
                <ul
                  className={`mt-3 space-y-2 text-sm ${tokens.text900_80}`}
                >
                  <li className="flex gap-2">
                    <span className={tokens.text700}>→</span>
                    <span>
                      {scenarios.length} situations. 3 choix possibles à chaque
                      fois.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className={tokens.text700}>→</span>
                    <span>
                      Glisse la carte (gauche / droite / bas) ou clique. Suis
                      ton instinct, pas ton CV.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className={tokens.text700}>→</span>
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
                className={`mt-8 ${tokens.fill700} ${tokens.hoverFill900}`}
                onClick={() => setPhase("playing")}
              >
                Commencer (5 min)
              </Button>
              <p className={`mt-4 text-xs ${tokens.text900_60}`}>
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
                <div
                  className={`flex items-center justify-between text-xs ${tokens.text900_60}`}
                >
                  <span>
                    Situation {step + 1} sur {scenarios.length}
                  </span>
                  <span>
                    {Math.round(((step + 1) / scenarios.length) * 100)}%
                  </span>
                </div>
                <div
                  className={`mt-2 h-1 w-full overflow-hidden rounded-full ${tokens.bg100}`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((step + 1) / scenarios.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: easeOutCubic }}
                    className={`h-full ${tokens.fill700}`}
                  />
                </div>
              </div>

              {/* Card stack */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: easeOutCubic }}
                >
                  {scenarios[step] && (
                    <SwipeCard
                      scenario={scenarios[step].scenario}
                      context={scenarios[step].context}
                      choices={{
                        left: {
                          label: scenarios[step].choices.left.label,
                          hint: scenarios[step].choices.left.hint,
                        },
                        right: {
                          label: scenarios[step].choices.right.label,
                          hint: scenarios[step].choices.right.hint,
                        },
                        down: {
                          label: scenarios[step].choices.down.label,
                          hint: scenarios[step].choices.down.hint,
                        },
                      }}
                      ringClassName={tokens.ring100}
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
                transition={{ duration: 0.7, delay: 0.1, ease: easeOutCubic }}
                className={`mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full ${tokens.fill700} text-lumiere-100`}
              >
                <Sparkles className="h-8 w-8" />
              </motion.div>

              <h1
                className={`font-serif text-3xl leading-tight tracking-tight ${tokens.text900} text-balance sm:text-4xl`}
              >
                Chapitre terminé.
              </h1>
              <p
                className={`mt-5 text-lg leading-relaxed ${tokens.text900_80} text-pretty`}
              >
                {nextChapterSlug && nextChapterName ? (
                  <>
                    Tu as découvert ton {chapter.name.toLowerCase()}. Demain :{" "}
                    {nextChapterName.toLowerCase()} {nextChapterEmoji}. Ton
                    profil prend déjà forme — sans que tu aies eu à le décrire.
                  </>
                ) : (
                  <>
                    Tu as terminé l&apos;Acte 1 de la Découverte. Voici qui tu
                    es professionnellement.
                  </>
                )}
              </p>

              <div
                className={`mt-8 rounded-2xl border ${tokens.border200} bg-lumiere-100 p-6 text-left`}
              >
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-comm-600" />
                  <span className="text-sm font-semibold text-neutral-900">
                    Carte d&apos;empreinte débloquée : {chapter.name}
                  </span>
                </div>
                <p className="mt-3 text-sm text-neutral-600">
                  En Phase 0, on capture tes réponses pour calibrer la
                  méthodologie. Ton profil sera analysé manuellement.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                {nextChapterSlug ? (
                  <Link href={`/voyage/${nextChapterSlug}`}>
                    <Button size="lg" variant="primary" className={`${tokens.fill700} ${tokens.hoverFill900}`}>
                      Continuer vers {nextChapterEmoji}
                    </Button>
                  </Link>
                ) : (
                  <Link href="/voyage/synthese">
                    <Button size="lg" variant="primary">
                      Voir ton portrait
                    </Button>
                  </Link>
                )}
                <Link href="/voyage">
                  <Button size="lg" variant="secondary">
                    Retour au Voyage
                  </Button>
                </Link>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
