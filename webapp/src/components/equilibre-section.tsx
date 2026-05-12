"use client";

import { motion } from "framer-motion";
import { Check, AlertTriangle } from "lucide-react";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

const ALIGNMENTS = [
  {
    label: "Rythme",
    candidat: "Marathon, réfléchi",
    recruteur: "Scale-up structuré",
    status: "match" as const,
    detail: "Tu donnes le meilleur sur la durée — alignement fort.",
  },
  {
    label: "Communication",
    candidat: "Écrite, directe",
    recruteur: "Slack-first, async",
    status: "match" as const,
    detail: "Écrit aligné, async respecté.",
  },
  {
    label: "Pression",
    candidat: "Tolérance 4/10",
    recruteur: "Niveau 7/10 actuel",
    status: "tension" as const,
    detail: "À cadrer ensemble dès la première semaine.",
  },
];

export function EquilibreSection() {
  return (
    <section
      id="equilibre"
      className="bg-neutral-50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: easeOutCubic }}
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-wider text-neutral-500">
              L&apos;équilibre · des deux côtés
            </span>
            <h2 className="font-serif text-3xl leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl md:text-5xl">
              On ne profile pas que le candidat.
              <br />
              <span className="text-neutral-500">
                Le recruteur passe le même test.
              </span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-neutral-600 text-pretty">
              La pression réelle. Le style de management vrai. Le turnover des
              12 derniers mois. Tout est sur la table, transparent, vérifié par
              les missions précédentes.
            </p>
            <ul className="mt-6 space-y-3 text-base text-neutral-700">
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-comm-600" />
                <span>
                  <strong className="text-neutral-900">Fin des fausses offres.</strong>{" "}
                  Si l&apos;environnement diverge du déclaré, le score employeur
                  baisse.
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-comm-600" />
                <span>
                  <strong className="text-neutral-900">Score expliqué.</strong>{" "}
                  Chaque % est décomposé, raison par raison, en langage humain.
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-comm-600" />
                <span>
                  <strong className="text-neutral-900">Toujours contestable.</strong>{" "}
                  Conforme AI Act natif. Tu peux toujours faire réviser.
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Right — Score card mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: easeOutCubic }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-lumiere-100 p-6 shadow-lg sm:p-8">
              {/* Header */}
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Score d&apos;équilibre
                  </p>
                  <p className="mt-1 font-serif text-5xl font-semibold text-neutral-900">
                    78<span className="text-neutral-400">%</span>
                  </p>
                </div>
                <span className="rounded-full bg-comm-50 px-2.5 py-1 text-xs font-medium text-comm-700">
                  Bon match
                </span>
              </div>

              {/* Bar */}
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "78%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4, ease: easeOutCubic }}
                  className="h-full bg-gradient-to-r from-rythme-400 to-comm-500"
                />
              </div>

              {/* Decomposition */}
              <div className="mt-6 space-y-3">
                {ALIGNMENTS.map((a, i) => (
                  <motion.div
                    key={a.label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + i * 0.1,
                      ease: easeOutCubic,
                    }}
                    className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-3.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-900">
                        {a.label}
                      </span>
                      {a.status === "match" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-comm-700">
                          <Check className="h-3.5 w-3.5" /> Aligné
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-autonomie-700">
                          <AlertTriangle className="h-3.5 w-3.5" /> Tension
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex gap-2 text-xs text-neutral-600">
                      <span className="rounded-md bg-lumiere-100 px-1.5 py-0.5">
                        {a.candidat}
                      </span>
                      <span className="text-neutral-300">vs</span>
                      <span className="rounded-md bg-lumiere-100 px-1.5 py-0.5">
                        {a.recruteur}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-neutral-500">{a.detail}</p>
                  </motion.div>
                ))}
              </div>

              {/* Action hint */}
              <p className="mt-5 text-xs text-neutral-500">
                Recommandation : très bon match pour une mission 3-6 mois en
                cadre structuré, avec un point hebdo le mardi.
              </p>
            </div>

            {/* Decorative glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-4 -inset-y-8 -z-10 bg-gradient-to-br from-rythme-100 via-transparent to-environnement-100 opacity-40 blur-3xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
