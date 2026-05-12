"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { SwipeCard, type SwipeChoice } from "@/components/voyage/swipe-card";
import type { PlayerScenario } from "@/components/voyage/chapter-player";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

interface ScenarioOverlayProps {
  /** Liste des scénarios à enchaîner. */
  scenarios: PlayerScenario[];
  /** Couleur d'accent (Tailwind class), pour le ring de la carte. */
  ringClassName?: string;
  /** Appelé pour chaque réponse. */
  onAnswer: (scenarioId: string, choice: SwipeChoice) => void;
  /** Appelé quand toutes les cartes sont jouées ou que l'utilisateur ferme. */
  onClose: () => void;
}

/**
 * Overlay plein écran qui joue une mini-séquence de scénarios.
 * Utilisé quand on clique sur un objet interactif dans une pièce.
 */
export function ScenarioOverlay({
  scenarios,
  ringClassName = "ring-rythme-200",
  onAnswer,
  onClose,
}: ScenarioOverlayProps) {
  const [step, setStep] = useState(0);

  // Échappement clavier
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleSwipe(choice: SwipeChoice) {
    const scenario = scenarios[step];
    if (!scenario) return;
    onAnswer(scenario.id, choice);

    // Vibration tactile (mobile)
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(15);
    }

    if (step + 1 >= scenarios.length) {
      // Petit délai pour laisser l'animation de sortie respirer
      setTimeout(() => onClose(), 320);
    } else {
      setStep(step + 1);
    }
  }

  const current = scenarios[step];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: easeOutCubic }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-lumiere-100/10 text-lumiere-100 backdrop-blur-md transition-colors hover:bg-lumiere-100/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lumiere-100/50"
        aria-label="Fermer"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Step counter (small) */}
      <p className="absolute left-1/2 top-6 -translate-x-1/2 text-xs uppercase tracking-wider text-lumiere-100/60">
        Situation {step + 1} sur {scenarios.length}
      </p>

      {/* Card area */}
      <div className="w-full max-w-md px-6">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: easeOutCubic }}
            >
              <SwipeCard
                scenario={current.scenario}
                context={current.context}
                choices={{
                  left: current.choices.left,
                  right: current.choices.right,
                  down: current.choices.down,
                }}
                ringClassName={ringClassName}
                onSwipe={handleSwipe}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
