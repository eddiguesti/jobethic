"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

const PLANS = [
  {
    name: "Test",
    price: "199 €",
    priceDetail: "par mise en relation",
    description: "Pour valider notre approche sur votre première mission.",
    features: [
      "3 profils en 48h",
      "Audit employeur complet inclus",
      "Score d'équilibre expliqué par profil",
      "Garantie remplacement 30 jours",
      "Aucun engagement",
      "Médiation conflit incluse",
    ],
    cta: "Démarrer le test",
    href: "/recruteurs/inscription",
    featured: false,
  },
  {
    name: "Standard",
    price: "79 €",
    priceDetail: "par mois",
    description: "Pour les PME qui recrutent régulièrement.",
    features: [
      "Tout du plan Test",
      "3 missions simultanées",
      "Dashboard équipe",
      "Statistiques matching",
      "Profil employeur évolutif",
      "Support email prioritaire",
      "Commission 8 % puis 5 %",
    ],
    cta: "Démarrer Standard",
    href: "/recruteurs/inscription?plan=standard",
    featured: true,
  },
  {
    name: "Pro",
    price: "199 €",
    priceDetail: "par mois",
    description: "Pour les Series A+ avec plusieurs équipes.",
    features: [
      "Tout du plan Standard",
      "10 missions simultanées",
      "Multi-équipes (5 profils employeur)",
      "API ATS basique",
      "Compte manager dédié",
      "SLA premium 24h",
      "Reporting avancé trimestriel",
    ],
    cta: "Démarrer Pro",
    href: "/recruteurs/inscription?plan=pro",
    featured: false,
  },
];

export function RecruteursPricing() {
  return (
    <section id="pricing" className="bg-neutral-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Pricing · transparent · sans surprise
          </span>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-neutral-900 text-balance sm:text-4xl md:text-5xl">
            Vous payez quand on réussit.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-neutral-600 text-pretty">
            Pas de coût caché. Pas de commission au freelance. Si vous
            n&apos;engagez aucun profil : 0 €.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: easeOutCubic,
              }}
              className={`relative rounded-3xl p-8 ${
                plan.featured
                  ? "bg-neutral-900 text-lumiere-100 shadow-lg ring-2 ring-neutral-900"
                  : "bg-lumiere-100 ring-1 ring-neutral-200"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-comm-500 px-3 py-1 text-xs font-semibold text-lumiere-100">
                  Le plus choisi
                </div>
              )}

              <div>
                <h3
                  className={`text-lg font-semibold ${plan.featured ? "text-lumiere-100" : "text-neutral-900"}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${plan.featured ? "text-neutral-300" : "text-neutral-600"}`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span
                  className={`font-serif text-5xl font-semibold ${plan.featured ? "text-lumiere-100" : "text-neutral-900"}`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${plan.featured ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  {plan.priceDetail}
                </span>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-comm-300" : "text-comm-600"}`}
                    />
                    <span
                      className={
                        plan.featured ? "text-neutral-200" : "text-neutral-700"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="mt-8 block">
                <Button
                  size="lg"
                  variant={plan.featured ? "secondary" : "primary"}
                  className={`w-full ${plan.featured ? "bg-lumiere-100 text-neutral-900 hover:bg-neutral-100" : ""}`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-neutral-500">
          <strong className="text-neutral-700">Pour les freelances :</strong>{" "}
          notre service est <em>toujours</em> gratuit. Aucune commission n&apos;est
          prélevée sur leur tarif.
        </p>
      </div>
    </section>
  );
}
