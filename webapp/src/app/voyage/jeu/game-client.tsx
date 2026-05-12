"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { ScenarioOverlay } from "@/components/voyage-v2/scenario-overlay";
import { SCENARIOS_BY_CHAPTER } from "@/lib/voyage/scenarios";
import {
  useVoyageProgress,
  type SwipeChoice,
} from "@/lib/voyage/use-voyage-progress";
import type { ChapterSlug } from "@/lib/chapters";

const GODOT_BUILD_URL = "/godot/index.html";

interface InteractionPayload {
  type: "jobethic.interaction";
  objectId: string;
  chapterSlug: ChapterSlug;
  scenarioIds: string[];
  at: number;
}

interface ProgressPayload {
  type: "jobethic.progress";
  event: string;
  data: Record<string, unknown>;
}

type GodotPayload = InteractionPayload | ProgressPayload;

function isInteraction(p: GodotPayload): p is InteractionPayload {
  return p.type === "jobethic.interaction";
}

export function GameClient() {
  const { saveAnswer, completeChapter } = useVoyageProgress();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeInteraction, setActiveInteraction] =
    useState<InteractionPayload | null>(null);
  const [iframeMissing, setIframeMissing] = useState(false);

  // Listen to postMessage from the Godot iframe
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const data = event.data as GodotPayload | unknown;
      if (
        typeof data !== "object" ||
        data === null ||
        !("type" in data) ||
        typeof (data as { type: unknown }).type !== "string"
      )
        return;

      const payload = data as GodotPayload;
      if (!payload.type.startsWith("jobethic.")) return;

      if (isInteraction(payload)) {
        setActiveInteraction(payload);
      } else {
        // progress events (game_loaded, room_entered, room_exited, etc.)
        console.log("[Godot ↔ Next] progress:", payload);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Detect if Godot build exists by HEAD request (best-effort)
  useEffect(() => {
    fetch(GODOT_BUILD_URL, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) setIframeMissing(true);
      })
      .catch(() => setIframeMissing(true));
  }, []);

  const handleAnswer = useCallback(
    (scenarioId: string, choice: SwipeChoice) => {
      if (!activeInteraction) return;
      saveAnswer(activeInteraction.chapterSlug, scenarioId, choice);
    },
    [activeInteraction, saveAnswer],
  );

  const handleClose = useCallback(() => {
    if (activeInteraction) {
      // Check if all scenarios for the chapter are now answered
      const allScenarios =
        SCENARIOS_BY_CHAPTER[activeInteraction.chapterSlug] ?? [];
      // We can't perfectly know without re-reading progress; just signal complete
      // when the chapter has all scenarios answered. The hook will no-op if not yet.
      if (allScenarios.length > 0) {
        completeChapter(activeInteraction.chapterSlug);
      }
    }
    setActiveInteraction(null);
  }, [activeInteraction, completeChapter]);

  const activeScenarios = activeInteraction
    ? (SCENARIOS_BY_CHAPTER[activeInteraction.chapterSlug] ?? [])
        .filter((s) => activeInteraction.scenarioIds.includes(s.id))
    : [];

  return (
    <div className="min-h-full bg-neutral-950 text-lumiere-100">
      {/* Top bar */}
      <header className="border-b border-neutral-800/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            href="/voyage"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-lumiere-100"
          >
            <ArrowLeft className="h-4 w-4" />
            La Maison
          </Link>
          <span className="text-xs uppercase tracking-wider text-neutral-400">
            Le Salon · vue jeu
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {iframeMissing ? (
          // Build not yet exported — instructions
          <div className="mx-auto max-w-2xl rounded-3xl border border-autonomie-700 bg-autonomie-900/40 p-8 text-center">
            <AlertCircle className="mx-auto mb-4 h-10 w-10 text-autonomie-300" />
            <h1 className="font-serif text-2xl leading-tight tracking-tight text-lumiere-100">
              Le jeu n&apos;est pas encore exporté.
            </h1>
            <p className="mt-4 text-sm text-neutral-300">
              Le projet Godot vit dans <code className="rounded bg-neutral-800 px-1.5 py-0.5">/game</code>{" "}
              à la racine du repo. Ouvre-le dans Godot 4.4+, va dans{" "}
              <strong>Project → Export → Web → Export Project</strong>, et
              choisis comme destination{" "}
              <code className="rounded bg-neutral-800 px-1.5 py-0.5">
                webapp/public/godot/index.html
              </code>
              .
            </p>
            <p className="mt-3 text-xs text-neutral-500">
              Une fois exporté, commit + push. Vercel redéploiera et cette page
              affichera le jeu.
            </p>
            <div className="mt-6">
              <Link
                href="/voyage"
                className="inline-flex items-center gap-1.5 rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-800"
              >
                Retour à la Maison
              </Link>
            </div>
            <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-left text-xs text-neutral-400">
              <p className="font-semibold text-neutral-300">
                Instructions complètes :
              </p>
              <p className="mt-1">
                Voir <code>game/README.md</code> dans le repo pour le détail
                (téléchargement Godot, export templates, premier export, etc.).
              </p>
            </div>
          </div>
        ) : (
          // Game iframe
          <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl">
            <iframe
              ref={iframeRef}
              src={GODOT_BUILD_URL}
              title="Le Salon — JOB'S ETHIC"
              className="h-full w-full"
              allow="cross-origin-isolated"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        )}

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-neutral-500">
          🎮 <strong className="text-neutral-300">WASD ou flèches</strong> pour
          bouger ·{" "}
          <strong className="text-neutral-300">E ou clic</strong> pour
          interagir · {" "}
          <strong className="text-neutral-300">Échap</strong> pour fermer un
          scénario
        </p>

        <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-neutral-600">
          🚧 Phase 0 · proto Godot 4.4 · sprites placeholder (carrés colorés) ·
          remplacés par illustrations Phase 2
        </p>
      </main>

      {/* Scenario overlay triggered by Godot postMessage */}
      <AnimatePresence>
        {activeInteraction && activeScenarios.length > 0 && (
          <ScenarioOverlay
            scenarios={activeScenarios}
            ringClassName="ring-rythme-200"
            onAnswer={handleAnswer}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
