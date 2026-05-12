"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Mic, Video, Lock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

type Phase = "intro" | "permissions" | "preview" | "future";

export function EntretienStub() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function requestPermissions() {
    setError(null);
    setPhase("permissions");
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
        audio: true,
      });
      setStream(s);
      setPhase("preview");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Permission refusée.";
      setError(message);
      setPhase("intro");
    }
  }

  function stopStream() {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    setPhase("intro");
  }

  return (
    <div className="min-h-full bg-neutral-950 text-lumiere-100">
      {/* Top bar */}
      <header className="border-b border-neutral-800/60">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
          <Link
            href="/voyage"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-lumiere-100"
            onClick={stopStream}
          >
            <ArrowLeft className="h-4 w-4" />
            La Maison
          </Link>
          <span className="text-xs uppercase tracking-wider text-neutral-400">
            🎥 Entretien IA (optionnel)
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {phase === "intro" && (
            <motion.section
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: easeOutCubic }}
              className="mx-auto max-w-xl text-center"
            >
              <div className="mx-auto mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-rythme-900 text-rythme-200">
                <Video className="h-7 w-7" />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Bonus · totalement optionnel
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
                Une conversation libre avec notre IA.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-neutral-300 text-pretty">
                Pas un entretien d&apos;embauche classique. Une conversation
                sur ton parcours, ce que tu cherches vraiment, et ce qui te
                fait fonctionner. L&apos;IA s&apos;adapte à ce qu&apos;elle a
                appris de toi dans la Maison.
              </p>

              <div className="mt-8 grid gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 text-left text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <Mic className="mt-0.5 h-4 w-4 shrink-0 text-rythme-300" />
                  <span>
                    Tu parles à voix haute, comme dans un vrai entretien — pas
                    de cases à cocher.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Video className="mt-0.5 h-4 w-4 shrink-0 text-rythme-300" />
                  <span>
                    La vidéo est optionnelle (audio seul fonctionne aussi).
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-rythme-300" />
                  <span>
                    Conservation 30 jours max. Aucune analyse d&apos;émotion
                    (interdit par l&apos;AI Act). Tu peux effacer à tout
                    moment.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-autonomie-300" />
                  <span>
                    <strong className="text-lumiere-100">Phase 0 :</strong>{" "}
                    cette fonctionnalité est en construction. Pour
                    l&apos;instant, c&apos;est un proto de permission caméra
                    seulement.
                  </span>
                </div>
              </div>

              {error && (
                <p className="mt-5 rounded-lg border border-pression-700 bg-pression-900/40 px-4 py-2 text-sm text-pression-100">
                  {error}
                </p>
              )}

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  variant="primary"
                  className="bg-lumiere-100 text-neutral-900 hover:bg-neutral-100"
                  onClick={requestPermissions}
                >
                  Activer caméra & micro
                </Button>
                <Link href="/voyage">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="border-neutral-700 bg-transparent text-lumiere-100 hover:border-neutral-600 hover:bg-neutral-800"
                  >
                    Retour à la Maison
                  </Button>
                </Link>
              </div>
            </motion.section>
          )}

          {/* PERMISSIONS (loading) */}
          {phase === "permissions" && (
            <motion.section
              key="permissions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-xl text-center"
            >
              <p className="text-lg text-neutral-300">
                Demande de permissions caméra & micro…
              </p>
              <p className="mt-3 text-sm text-neutral-500">
                Ton navigateur va te demander d&apos;autoriser l&apos;accès.
              </p>
            </motion.section>
          )}

          {/* PREVIEW */}
          {phase === "preview" && stream && (
            <motion.section
              key="preview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: easeOutCubic }}
              className="mx-auto max-w-2xl"
            >
              <p className="mb-6 text-center text-sm text-neutral-400">
                ✅ Permissions accordées. Voici ton aperçu.
              </p>

              <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl">
                <video
                  ref={(el) => {
                    if (el && stream) el.srcObject = stream;
                  }}
                  autoPlay
                  playsInline
                  muted
                  className="w-full"
                />
              </div>

              <div className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-center">
                <p className="font-serif text-2xl leading-tight text-lumiere-100">
                  L&apos;entretien réel arrive en Phase 4.
                </p>
                <p className="mt-3 text-sm text-neutral-400">
                  Le proto s&apos;arrête ici. En Phase 4, l&apos;IA conduira
                  une vraie conversation adaptée à ton profil profond, avec
                  des follow-ups générés en live. Hébergement LiveKit en
                  France (Scaleway Paris).
                </p>
                <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                  <Button
                    size="md"
                    variant="primary"
                    className="bg-lumiere-100 text-neutral-900 hover:bg-neutral-100"
                    onClick={stopStream}
                  >
                    Couper et revenir
                  </Button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
