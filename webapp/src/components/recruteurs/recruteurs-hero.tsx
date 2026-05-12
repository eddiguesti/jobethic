"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

export function RecruteursHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      {/* Subtle gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[500px] w-[1100px] rounded-full bg-gradient-to-tr from-comm-100 via-lumiere-100 to-rythme-100 opacity-40 blur-3xl" />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOutCubic }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-lumiere-100 px-3 py-1 text-xs text-neutral-700 shadow-sm"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-comm-500" />
            <span>Pour les PME 5-50 sans RH interne · France</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOutCubic }}
            className="font-serif text-4xl leading-[1.05] tracking-tight text-neutral-900 text-balance sm:text-5xl md:text-6xl"
          >
            3 profils.
            <br />
            <span className="text-neutral-500">1 choix.</span>{" "}
            <span className="bg-gradient-to-br from-rythme-700 to-comm-700 bg-clip-text text-transparent">
              10 minutes.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: easeOutCubic }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-neutral-600 text-pretty sm:text-xl"
          >
            Vous ne triez plus 100 CV. Vous recevez{" "}
            <span className="font-medium text-neutral-900">
              3 freelances déjà compatibles
            </span>
            , avec une explication claire et les zones de tension à connaître.
            Et nos missions{" "}
            <span className="font-medium text-neutral-900">durent 2× plus longtemps</span>{" "}
            que la moyenne du marché.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: easeOutCubic }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="#pricing">
              <Button size="lg" variant="primary" className="group">
                Démarrer le test (199 €)
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="#flow">
              <Button size="lg" variant="secondary">
                Voir comment ça marche
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 text-xs text-neutral-500"
          >
            Garantie remplacement 30 jours · Pas d&apos;engagement · 3 profils
            ou rien (jamais 30)
          </motion.p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: easeOutCubic }}
          className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3"
        >
          <div className="bg-lumiere-100 p-6 text-center sm:p-8">
            <p className="font-serif text-4xl font-semibold text-neutral-900">
              48h
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              Pour recevoir vos 3 profils
            </p>
          </div>
          <div className="bg-lumiere-100 p-6 text-center sm:p-8">
            <p className="font-serif text-4xl font-semibold text-neutral-900">
              2×
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              Plus longues, vos collaborations
            </p>
          </div>
          <div className="bg-lumiere-100 p-6 text-center sm:p-8">
            <p className="font-serif text-4xl font-semibold text-neutral-900">
              0 €
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              Si vous n&apos;engagez aucun profil
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
