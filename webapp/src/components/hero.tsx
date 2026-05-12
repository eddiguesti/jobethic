"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 sm:pt-28 sm:pb-40">
      {/* Background — gradient subtil des 7 couleurs du Voyage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px] overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[600px] w-[1200px] rounded-full bg-gradient-to-tr from-rythme-100 via-limites-50 to-environnement-100 opacity-30 blur-3xl" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOutCubic }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-lumiere-100 px-3 py-1 text-xs text-neutral-700 shadow-sm"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-comm-500" />
            <span>
              En construction · Phase 0 · Premiers matchs ouverts en France
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOutCubic }}
            className="font-serif text-4xl leading-[1.05] tracking-tight text-neutral-900 text-balance sm:text-5xl md:text-6xl lg:text-7xl"
          >
            On ne cherche plus un job.
            <br />
            <span className="bg-gradient-to-br from-rythme-700 via-limites-700 to-environnement-700 bg-clip-text text-transparent">
              On trouve la bonne collaboration.
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: easeOutCubic }}
            className="mt-7 max-w-2xl mx-auto text-lg leading-relaxed text-neutral-600 text-pretty sm:text-xl"
          >
            JOB&apos;S ETHIC remplace le CV par un{" "}
            <span className="font-medium text-neutral-900">profil profond</span>
            {" "}construit en 6 semaines, profile aussi l&apos;employeur, et
            calcule un score d&apos;équilibre toujours expliqué. L&apos;IA
            révèle — l&apos;humain décide.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: easeOutCubic }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/voyage">
              <Button size="lg" variant="primary" className="group">
                Commencer Le Voyage
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/recruteurs">
              <Button size="lg" variant="secondary">
                Je recrute · 3 profils en 48h
              </Button>
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 text-xs text-neutral-500"
          >
            5 min/jour · Sans engagement · Ton profil t&apos;appartient
            (RGPD Art. 20)
          </motion.p>
        </motion.div>

        {/* 7 chapter dots — visual signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: easeOutCubic }}
          className="mt-20 flex justify-center"
        >
          <div className="flex items-center gap-3">
            {[
              { color: "bg-rythme-500", label: "Rythme" },
              { color: "bg-comm-500", label: "Communication" },
              { color: "bg-autonomie-500", label: "Autonomie" },
              { color: "bg-limites-500", label: "Limites" },
              { color: "bg-environnement-500", label: "Environnement" },
              { color: "bg-pression-500", label: "Pression" },
              { color: "bg-neutral-300", label: "Synthèse" },
            ].map((dot, i) => (
              <motion.div
                key={dot.label}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.85 + i * 0.06,
                  ease: easeOutCubic,
                }}
                className="group relative"
              >
                <div
                  className={`h-2.5 w-2.5 rounded-full ${dot.color}`}
                  aria-label={`Chapitre ${dot.label}`}
                />
                <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-medium text-lumiere-100 opacity-0 transition-opacity group-hover:opacity-100">
                  {dot.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
