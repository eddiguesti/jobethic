"use client";

import { motion } from "framer-motion";
import { CHAPTERS } from "@/lib/chapters";

const colorClasses: Record<string, { bg: string; ring: string; text: string }> = {
  rythme: {
    bg: "bg-rythme-50",
    ring: "ring-rythme-200",
    text: "text-rythme-900",
  },
  comm: { bg: "bg-comm-50", ring: "ring-comm-200", text: "text-comm-900" },
  autonomie: {
    bg: "bg-autonomie-50",
    ring: "ring-autonomie-200",
    text: "text-autonomie-900",
  },
  limites: {
    bg: "bg-limites-50",
    ring: "ring-limites-200",
    text: "text-limites-900",
  },
  environnement: {
    bg: "bg-environnement-50",
    ring: "ring-environnement-200",
    text: "text-environnement-900",
  },
  pression: {
    bg: "bg-pression-50",
    ring: "ring-pression-200",
    text: "text-pression-900",
  },
  lumiere: {
    bg: "bg-lumiere-100",
    ring: "ring-neutral-200",
    text: "text-neutral-900",
  },
};

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

export function VoyagePreview() {
  return (
    <section id="voyage" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Le Voyage · 5 min par jour · 6 semaines
          </span>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl md:text-5xl">
            Pas un test psychométrique.
            <br />
            <span className="text-neutral-500">Un voyage de découverte.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600 text-pretty">
            Inspiré de Petit Bambou pour la méditation. Chaque jour, un thème.
            Chaque thème, une couleur. Tu construis qui tu es professionnellement
            — sans avoir l&apos;impression de passer un examen.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHAPTERS.map((chapter, i) => {
            const colors = colorClasses[chapter.color];
            const isSynthese = chapter.slug === "synthese";

            return (
              <motion.article
                key={chapter.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: easeOutCubic,
                }}
                className={`group relative overflow-hidden rounded-2xl ${colors?.bg ?? "bg-neutral-50"} p-6 ring-1 ${colors?.ring ?? "ring-neutral-200"} transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  isSynthese ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="text-3xl"
                    role="img"
                    aria-label={chapter.name}
                  >
                    {chapter.emoji}
                  </span>
                  <span className={`text-xs font-medium ${colors?.text ?? "text-neutral-700"} opacity-70`}>
                    Jour {chapter.day}
                  </span>
                </div>

                <h3
                  className={`mt-4 text-xl font-semibold ${colors?.text ?? "text-neutral-900"}`}
                >
                  {chapter.name}
                </h3>

                <p
                  className={`mt-2 text-sm leading-relaxed ${colors?.text ?? "text-neutral-700"} opacity-80`}
                >
                  {chapter.tagline}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
