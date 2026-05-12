"use client";

import { motion } from "framer-motion";
import { Pencil, Search, Users, Handshake } from "lucide-react";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

const STEPS = [
  {
    n: "1",
    icon: Pencil,
    title: "Profilage employeur (15-20 min)",
    body: "Vous nous décrivez la réalité du terrain — pas la fiche de poste idéale. Pression réelle, style de management, environnement, turnover. C'est ce qui fait que les missions durent.",
    duration: "15-20 min",
  },
  {
    n: "2",
    icon: Search,
    title: "Matching d'équilibre",
    body: "Notre algorithme croise votre profil avec les profils profonds des freelances disponibles. On garde uniquement les 3 meilleurs matchs réels.",
    duration: "Sous 48h",
  },
  {
    n: "3",
    icon: Users,
    title: "3 profils + explication",
    body: "Vous recevez 3 profils avec un score d'équilibre, les forces du match, les zones de tension à connaître, et une recommandation contextuelle.",
    duration: "10 min de lecture",
  },
  {
    n: "4",
    icon: Handshake,
    title: "Vous choisissez. Mission lancée.",
    body: "Chat ouvert avec les profils retenus. Vous décidez en autonomie. Garantie remplacement 30 jours si la collaboration s'arrête anticipativement.",
    duration: "Démarrage immédiat",
  },
];

export function RecruteursFlow() {
  return (
    <section id="flow" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Comment ça marche · 4 étapes
          </span>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl md:text-5xl">
            De votre besoin réel
            <br />
            <span className="text-neutral-500">à la mission lancée.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: easeOutCubic,
                }}
                className="group relative rounded-2xl border border-neutral-200 bg-lumiere-100 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-lumiere-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-3xl text-neutral-300">
                    {step.n}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {step.body}
                </p>
                <p className="mt-4 text-xs font-medium text-neutral-500">
                  ⏱ {step.duration}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
