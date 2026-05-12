"use client";

import { motion } from "framer-motion";
import { Shield, Brain, Scale, Download } from "lucide-react";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

const COMMITMENTS = [
  {
    icon: Brain,
    title: "L'IA explique. L'humain décide.",
    body: "Aucune décision finale n'est prise par un algorithme. Chaque score est expliqué, chaque match est révisable.",
  },
  {
    icon: Download,
    title: "Ton profil t'appartient.",
    body: "RGPD Art. 20 weaponisé. Tu télécharges ton profil quand tu veux, tu le partages, tu l'emportes ailleurs.",
  },
  {
    icon: Scale,
    title: "Conforme AI Act dès Day-1.",
    body: "Scoring contestable, audit de biais trimestriel publié, supervision humaine garantie. 12 mois d'avance.",
  },
  {
    icon: Shield,
    title: "Hébergé en Union Européenne.",
    body: "Toutes les données restent en UE. Pas de reconnaissance d'émotion (interdit par l'AI Act). WCAG 2.2 AA.",
  },
];

export function EthiqueSection() {
  return (
    <section id="ethique" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Éthique · l&apos;architecture, pas le slogan
          </span>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl md:text-5xl">
            Pendant que les autres se mettent en conformité,
            <br />
            <span className="text-neutral-500">nous l&apos;avons construite.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {COMMITMENTS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: easeOutCubic,
                }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-lumiere-100 p-6 transition-all hover:border-neutral-300 hover:shadow-md sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-lumiere-100 transition-transform group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-neutral-600">
                      {c.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
