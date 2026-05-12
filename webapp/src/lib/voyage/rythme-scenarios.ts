/**
 * Le Rythme — Chapitre 1 du Voyage.
 * 6 micro-scénarios pour capturer le style de fonctionnement temporel
 * du candidat. Pas de "bonne réponse" — on capture l'instinct.
 *
 * Voir plan/04-PROFIL-PROFOND.md pour la méthodologie complète.
 */

export interface Scenario {
  id: string;
  context: string;
  scenario: string;
  choices: {
    left: {
      label: string;
      hint: string;
      // Signal capturé (pour scoring V2)
      signal: { dimension: string; value: number };
    };
    right: {
      label: string;
      hint: string;
      signal: { dimension: string; value: number };
    };
    down: {
      label: string;
      hint: string;
      signal: { dimension: string; value: number };
    };
  };
}

export const RYTHME_SCENARIOS: Scenario[] = [
  {
    id: "dimanche-soir",
    context: "Tu reçois ça un dimanche soir, 21h.",
    scenario: "« Salut, urgent : peux-tu finir le slide deck d'ici demain 9h ? »",
    choices: {
      left: {
        label: "Je passe mon tour",
        hint: "Pas le dimanche soir.",
        signal: { dimension: "boundary_strength", value: 1 },
      },
      right: {
        label: "Je m'y mets",
        hint: "L'urgence me motive.",
        signal: { dimension: "urgency_tolerance", value: 1 },
      },
      down: {
        label: "Ça dépend",
        hint: "Je négocie le timing.",
        signal: { dimension: "negotiation", value: 1 },
      },
    },
  },
  {
    id: "matin-energy",
    context: "Tu démarres la journée.",
    scenario: "À quel moment tu fais ton meilleur travail ?",
    choices: {
      left: {
        label: "Tôt le matin",
        hint: "Avant que ça s'agite.",
        signal: { dimension: "energy_peak", value: -1 },
      },
      right: {
        label: "Plutôt l'après-midi",
        hint: "Je monte en puissance.",
        signal: { dimension: "energy_peak", value: 1 },
      },
      down: {
        label: "Variable",
        hint: "Selon mon humeur.",
        signal: { dimension: "energy_consistency", value: -1 },
      },
    },
  },
  {
    id: "sprint-vs-marathon",
    context: "Tu choisis ton format préféré.",
    scenario:
      "Une mission de 6 mois bien cadrée, ou trois sprints de 2 semaines chacun ?",
    choices: {
      left: {
        label: "6 mois cadré",
        hint: "Marathon, je m'installe.",
        signal: { dimension: "marathon_preference", value: 1 },
      },
      right: {
        label: "Sprints courts",
        hint: "Variété, vitesse.",
        signal: { dimension: "marathon_preference", value: -1 },
      },
      down: {
        label: "Les deux",
        hint: "Selon le client.",
        signal: { dimension: "flexibility", value: 1 },
      },
    },
  },
  {
    id: "interruption",
    context: "Tu es en focus profond depuis 90 min.",
    scenario:
      "Ton manager te ping sur Slack : « Petite question rapide ? »",
    choices: {
      left: {
        label: "Je réponds plus tard",
        hint: "Je termine d'abord.",
        signal: { dimension: "interruption_tolerance", value: -1 },
      },
      right: {
        label: "Je réponds tout de suite",
        hint: "Une question rapide, c'est OK.",
        signal: { dimension: "interruption_tolerance", value: 1 },
      },
      down: {
        label: "Je demande combien de temps",
        hint: "Je négocie le moment.",
        signal: { dimension: "negotiation", value: 1 },
      },
    },
  },
  {
    id: "deadline",
    context: "Une deadline arrive dans 3 jours.",
    scenario: "Comment tu organises ton sprint final ?",
    choices: {
      left: {
        label: "Je planifie tout",
        hint: "Liste, calendrier, tampon.",
        signal: { dimension: "planning_style", value: 1 },
      },
      right: {
        label: "Je fonce, j'ajuste",
        hint: "Je vois en marchant.",
        signal: { dimension: "planning_style", value: -1 },
      },
      down: {
        label: "Je demande de l'aide",
        hint: "Pas seul·e si trop lourd.",
        signal: { dimension: "collaboration", value: 1 },
      },
    },
  },
  {
    id: "weekend",
    context: "Vendredi 18h.",
    scenario:
      "Ton client te dit : « Si tu peux gagner un peu d'avance ce weekend, on serait sereins lundi. »",
    choices: {
      left: {
        label: "Non, weekend",
        hint: "Mes limites sont mes limites.",
        signal: { dimension: "boundary_strength", value: 1 },
      },
      right: {
        label: "OK, j'avance",
        hint: "Pour cette fois.",
        signal: { dimension: "boundary_strength", value: -1 },
      },
      down: {
        label: "Je propose un compromis",
        hint: "1h max samedi.",
        signal: { dimension: "negotiation", value: 1 },
      },
    },
  },
];
