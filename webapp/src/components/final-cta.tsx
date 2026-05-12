"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-neutral-900 py-24 text-lumiere-100 sm:py-32">
      {/* Decorative gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[400px]"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[400px] w-[800px] rounded-full bg-gradient-to-r from-rythme-900 via-limites-900 to-environnement-900 opacity-30 blur-3xl" />
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
          className="font-serif text-3xl leading-tight tracking-tight text-balance sm:text-4xl md:text-5xl"
        >
          Aujourd&apos;hui on postule.
          <br />
          <span className="text-neutral-400">Demain le travail vient à toi.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOutCubic }}
          className="mt-5 text-lg leading-relaxed text-neutral-300 text-pretty"
        >
          On démarre par les freelances ops &amp; les PME 5-50 en France. Si tu
          es l&apos;un des deux, on veut te parler.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOutCubic }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="/voyage">
            <Button
              size="xl"
              className="bg-lumiere-100 text-neutral-900 hover:bg-neutral-100"
            >
              Commencer Le Voyage
            </Button>
          </Link>
          <Link href="/recruteurs">
            <Button
              size="xl"
              variant="secondary"
              className="border-neutral-700 bg-transparent text-lumiere-100 hover:border-neutral-600 hover:bg-neutral-800"
            >
              Je recrute
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
