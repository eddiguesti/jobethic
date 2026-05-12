import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CHAPTERS } from "@/lib/chapters";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Le Voyage — Découvre qui tu es professionnellement",
  description:
    "Un voyage de 6 semaines, 5 min par jour, pour découvrir comment tu travailles vraiment. Pas un test. Une expérience.",
};

const colorBgMap: Record<string, string> = {
  rythme: "bg-rythme-50",
  comm: "bg-comm-50",
  autonomie: "bg-autonomie-50",
  limites: "bg-limites-50",
  environnement: "bg-environnement-50",
  pression: "bg-pression-50",
  lumiere: "bg-lumiere-100",
};

const colorTextMap: Record<string, string> = {
  rythme: "text-rythme-900",
  comm: "text-comm-900",
  autonomie: "text-autonomie-900",
  limites: "text-limites-900",
  environnement: "text-environnement-900",
  pression: "text-pression-900",
  lumiere: "text-neutral-900",
};

const colorRingMap: Record<string, string> = {
  rythme: "ring-rythme-200",
  comm: "ring-comm-200",
  autonomie: "ring-autonomie-200",
  limites: "ring-limites-200",
  environnement: "ring-environnement-200",
  pression: "ring-pression-200",
  lumiere: "ring-neutral-200",
};

export default function VoyagePage() {
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
            Pas un test. Un voyage. Chaque jour, une thématique. Chaque thématique,
            une couleur. Prends ton temps — il n&apos;y a pas de mauvaise réponse.
          </p>
        </div>

        {/* Chapter cards */}
        <div className="mt-16 space-y-4">
          {CHAPTERS.map((chapter) => {
            const bg = colorBgMap[chapter.color] ?? "bg-neutral-50";
            const text = colorTextMap[chapter.color] ?? "text-neutral-900";
            const ring = colorRingMap[chapter.color] ?? "ring-neutral-200";
            const isActive = chapter.slug === "rythme";
            const isLocked = !isActive;

            return (
              <div
                key={chapter.slug}
                className={`group relative overflow-hidden rounded-2xl ${bg} p-6 ring-1 ${ring} transition-all sm:p-8 ${
                  isActive
                    ? "hover:-translate-y-0.5 hover:shadow-md"
                    : "opacity-50"
                }`}
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
                        <span className={`text-xs font-medium ${text} opacity-60`}>
                          Jour {chapter.day}
                        </span>
                        {isLocked && (
                          <span className="text-xs font-medium text-neutral-400">
                            · Bientôt
                          </span>
                        )}
                      </div>
                      <h2
                        className={`mt-1 font-serif text-2xl font-semibold ${text}`}
                      >
                        {chapter.name}
                      </h2>
                      <p className={`mt-1 text-sm ${text} opacity-80`}>
                        {chapter.tagline}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <Link href={`/voyage/${chapter.slug}`}>
                      <Button size="md" variant="primary" className="group/btn">
                        Commencer
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Honesty note */}
        <p className="mx-auto mt-12 max-w-xl text-center text-sm text-neutral-500">
          🚧 <strong className="text-neutral-700">Phase 0 en cours.</strong>{" "}
          Seul Le Rythme est jouable pour l&apos;instant. Les 6 autres chapitres
          arrivent au fil des semaines.
        </p>
      </main>
    </div>
  );
}
