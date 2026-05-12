"use client";

import { motion } from "framer-motion";
import { Shield, Clock, RefreshCw, Eye } from "lucide-react";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

const GUARANTEES = [
  {
    icon: Clock,
    title: "15 premiers jours",
    body: "Remboursement 100 % si la mission s'arrête pour cause de mismatch documenté.",
  },
  {
    icon: RefreshCw,
    title: "30 premiers jours",
    body: "Remboursement 50 % + nous vous trouvons 3 nouveaux profils sans frais supplémentaires.",
  },
  {
    icon: Eye,
    title: "Transparence permanente",
    body: "Vous voyez le score de transparence employeur, vous voyez vos statistiques, vous voyez tout.",
  },
  {
    icon: Shield,
    title: "Médiation incluse",
    body: "En cas de désaccord pendant la mission, on facilite la résolution. Pas vous, pas seul·e.",
  },
];

export function RecruteursGuarantee() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Nos garanties · pour que vous ne preniez aucun risque
          </span>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl md:text-5xl">
            On porte le risque.
            <br />
            <span className="text-neutral-500">Pas vous.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {GUARANTEES.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: easeOutCubic,
                }}
                className="rounded-2xl border border-neutral-200 bg-lumiere-100 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-comm-100 text-comm-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {g.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-neutral-600">
                      {g.body}
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
