/**
 * Scénarios par chapitre du Voyage — Acte 1.
 * 6 micro-scénarios par chapitre, format swipe (left / right / down).
 *
 * Phase 0 : ces scénarios sont des protos à calibrer avec les premiers
 * utilisateurs. Voir plan/04-PROFIL-PROFOND.md pour la méthodologie.
 */

import type { ChapterSlug } from "@/lib/chapters";
import type { PlayerScenario } from "@/components/voyage/chapter-player";

// ────────────────────────────────────────────────────────────
// 🔵 RYTHME
// ────────────────────────────────────────────────────────────

const RYTHME: PlayerScenario[] = [
  {
    id: "dimanche-soir",
    context: "Tu reçois ça un dimanche soir, 21h.",
    scenario:
      "« Salut, urgent : peux-tu finir le slide deck d'ici demain 9h ? »",
    choices: {
      left: { label: "Je passe", hint: "Pas le dimanche soir." },
      right: { label: "Je m'y mets", hint: "L'urgence me motive." },
      down: { label: "Ça dépend", hint: "Je négocie le timing." },
    },
  },
  {
    id: "energy-peak",
    context: "Tu démarres la journée.",
    scenario: "À quel moment tu fais ton meilleur travail ?",
    choices: {
      left: { label: "Tôt le matin", hint: "Avant que ça s'agite." },
      right: { label: "L'après-midi", hint: "Je monte en puissance." },
      down: { label: "Variable", hint: "Selon mon humeur." },
    },
  },
  {
    id: "sprint-vs-marathon",
    context: "Tu choisis ton format préféré.",
    scenario:
      "Une mission de 6 mois bien cadrée, ou trois sprints de 2 semaines ?",
    choices: {
      left: { label: "6 mois cadré", hint: "Marathon, je m'installe." },
      right: { label: "Sprints courts", hint: "Variété, vitesse." },
      down: { label: "Les deux", hint: "Selon le client." },
    },
  },
  {
    id: "interruption",
    context: "Tu es en focus profond depuis 90 min.",
    scenario: "Ton manager te ping : « Petite question rapide ? »",
    choices: {
      left: { label: "Je finis d'abord", hint: "Pas d'interruption." },
      right: { label: "Je réponds", hint: "Une question rapide, OK." },
      down: { label: "Je demande combien de temps", hint: "Je négocie." },
    },
  },
  {
    id: "deadline-method",
    context: "Une deadline arrive dans 3 jours.",
    scenario: "Comment tu organises ton sprint final ?",
    choices: {
      left: { label: "Je planifie tout", hint: "Liste, calendrier, tampon." },
      right: { label: "Je fonce", hint: "Je vois en marchant." },
      down: { label: "Je demande de l'aide", hint: "Pas seul·e si lourd." },
    },
  },
  {
    id: "weekend-push",
    context: "Vendredi 18h.",
    scenario:
      "« Si tu peux gagner un peu d'avance ce weekend, on serait sereins. »",
    choices: {
      left: { label: "Non, weekend", hint: "Limites sacrées." },
      right: { label: "OK, j'avance", hint: "Pour cette fois." },
      down: { label: "Un compromis", hint: "1h max samedi." },
    },
  },
];

// ────────────────────────────────────────────────────────────
// 🟢 COMMUNICATION
// ────────────────────────────────────────────────────────────

const COMMUNICATION: PlayerScenario[] = [
  {
    id: "feedback-negatif",
    context: "Ton client te dit en visio :",
    scenario:
      "« Honnêtement, le livrable n'est pas du tout ce que j'attendais. »",
    choices: {
      left: {
        label: "J'écoute, je réponds plus tard",
        hint: "Je laisse infuser.",
      },
      right: {
        label: "Je réponds direct",
        hint: "On en parle maintenant.",
      },
      down: {
        label: "Je demande quoi exactement",
        hint: "Je creuse la critique.",
      },
    },
  },
  {
    id: "slack-vs-call",
    context: "Tu as une question complexe pour ton manager.",
    scenario: "Tu fais comment ?",
    choices: {
      left: { label: "Message Slack détaillé", hint: "Écrit, async." },
      right: { label: "Call de 15 min", hint: "Oral, sync." },
      down: { label: "Loom vidéo", hint: "Async + visuel." },
    },
  },
  {
    id: "désaccord-équipe",
    context: "Réunion d'équipe.",
    scenario:
      "Ton manager propose un truc qui te paraît mauvais. Tu fais quoi ?",
    choices: {
      left: { label: "Je dis non, direct", hint: "Je désapprouve en public." },
      right: { label: "Je note, j'en parle après", hint: "En privé, calmement." },
      down: { label: "Je laisse couler", hint: "Pas mon combat." },
    },
  },
  {
    id: "feedback-frequence",
    context: "Tu démarres une mission.",
    scenario: "Quelle fréquence de feedback tu attends idéalement ?",
    choices: {
      left: { label: "Hebdo structuré", hint: "Un point fixe / semaine." },
      right: { label: "Continu Slack", hint: "Au fil de l'eau." },
      down: { label: "Sur demande", hint: "Quand j'en ai besoin." },
    },
  },
  {
    id: "client-relou",
    context: "Un client envoie un message agressif à 23h.",
    scenario: "Tu fais quoi le lendemain matin ?",
    choices: {
      left: { label: "Je recadre poliment", hint: "Je pose la limite." },
      right: { label: "Je passe à autre chose", hint: "On en parle pas." },
      down: { label: "J'attends d'avoir les faits", hint: "Je ne réagis pas à chaud." },
    },
  },
  {
    id: "erreur-publique",
    context: "Tu as fait une erreur visible par toute l'équipe.",
    scenario: "Comment tu la communiques ?",
    choices: {
      left: { label: "Je l'annonce publiquement", hint: "Transparence totale." },
      right: { label: "Je préviens mon manager seul", hint: "En privé d'abord." },
      down: { label: "Je corrige en silence", hint: "Si personne ne voit, OK." },
    },
  },
];

// ────────────────────────────────────────────────────────────
// 🟡 AUTONOMIE
// ────────────────────────────────────────────────────────────

const AUTONOMIE: PlayerScenario[] = [
  {
    id: "premier-jour",
    context: "Premier jour d'une nouvelle mission.",
    scenario: "Tu as besoin de quoi pour bien démarrer ?",
    choices: {
      left: { label: "Briefing 2h+", hint: "Tout le contexte." },
      right: { label: "Brief 30 min", hint: "Les grandes lignes." },
      down: { label: "Je creuse seul·e", hint: "Doc partagée, je trouve." },
    },
  },
  {
    id: "blocage-tech",
    context: "Tu as un blocage technique sérieux.",
    scenario: "Tu fais quoi ?",
    choices: {
      left: { label: "Je demande immédiatement", hint: "Pas de temps perdu." },
      right: { label: "30 min puis je demande", hint: "Je tente d'abord." },
      down: { label: "Je trouve la solution seul·e", hint: "J'aime le challenge." },
    },
  },
  {
    id: "décision-flou",
    context: "Une décision floue à prendre, ton manager n'est pas là.",
    scenario: "Tu fais comment ?",
    choices: {
      left: { label: "J'attends son retour", hint: "Pas ma décision." },
      right: { label: "Je décide, je préviens", hint: "Mieux vaut avancer." },
      down: { label: "Je consulte l'équipe", hint: "On décide ensemble." },
    },
  },
  {
    id: "manager-absent",
    context: "Ton manager est absent 2 semaines.",
    scenario: "Pour toi c'est :",
    choices: {
      left: { label: "Inconfortable", hint: "J'aime le cadre quotidien." },
      right: { label: "Top, plus d'autonomie", hint: "Je m'épanouis seul·e." },
      down: { label: "Indifférent", hint: "Je m'adapte." },
    },
  },
  {
    id: "process-flou",
    context: "L'équipe n'a pas de process clair pour ce que tu dois faire.",
    scenario: "Tu fais quoi ?",
    choices: {
      left: { label: "Je demande qu'on en crée un", hint: "Process avant action." },
      right: { label: "Je crée le mien", hint: "J'agis, je documente." },
      down: { label: "J'avance sans process", hint: "Je vois en chemin." },
    },
  },
  {
    id: "validation",
    context: "Tu as fait un livrable important.",
    scenario: "Tu fais quoi avant de l'envoyer ?",
    choices: {
      left: { label: "Validation manager", hint: "Toujours, par sécurité." },
      right: { label: "J'envoie direct", hint: "Je suis confiant·e." },
      down: { label: "Relecture pair", hint: "Un·e collègue d'abord." },
    },
  },
];

// ────────────────────────────────────────────────────────────
// 🟣 LIMITES (ce que tu refuses)
// ────────────────────────────────────────────────────────────

const LIMITES: PlayerScenario[] = [
  {
    id: "horaires-tardifs",
    context: "Ta réalité du soir.",
    scenario: "Travailler après 20h, c'est :",
    choices: {
      left: { label: "Non, jamais", hint: "Limite sacrée." },
      right: { label: "Acceptable", hint: "Ponctuellement OK." },
      down: { label: "Selon urgence", hint: "Je négocie." },
    },
  },
  {
    id: "weekend",
    context: "Un client te propose une mission 7j/7.",
    scenario: "Tu réponds :",
    choices: {
      left: { label: "Hors de question", hint: "Weekend non négociable." },
      right: { label: "OK temporairement", hint: "1-2 weekends OK." },
      down: { label: "Je propose 6j/7", hint: "Compromis." },
    },
  },
  {
    id: "client-toxique",
    context: "Le client est passif-agressif depuis 3 semaines.",
    scenario: "Tu fais quoi ?",
    choices: {
      left: { label: "Je quitte la mission", hint: "Limite franchie." },
      right: { label: "Je recadre puis je décide", hint: "Une chance." },
      down: { label: "J'endure pour finir", hint: "Le contrat avant." },
    },
  },
  {
    id: "scope-creep",
    context: "Le scope a doublé sans rediscussion budget.",
    scenario: "Ta réaction :",
    choices: {
      left: { label: "Je stoppe et je renégocie", hint: "Pas de scope creep." },
      right: { label: "Je continue + facture extra", hint: "Je rattrape au passage." },
      down: { label: "Je termine et j'en parle après", hint: "Conflit évité." },
    },
  },
  {
    id: "mission-éthique",
    context: "Une mission paie très bien mais tu n'es pas alignée sur les valeurs.",
    scenario: "Tu fais quoi ?",
    choices: {
      left: { label: "Je refuse", hint: "Valeurs avant argent." },
      right: { label: "J'accepte, c'est temporaire", hint: "Pragmatique." },
      down: { label: "Je négocie le cadrage", hint: "Je vois si je peux composer." },
    },
  },
  {
    id: "comportement-rédhibitoire",
    context: "Qu'est-ce qui te fait quitter un client immédiatement ?",
    scenario: "Le plus rédhibitoire :",
    choices: {
      left: { label: "Manque de respect", hint: "Ton agressif, mépris." },
      right: { label: "Non-paiement", hint: "Argent en retard." },
      down: { label: "Scope flou + changements", hint: "Désorganisation." },
    },
  },
];

// ────────────────────────────────────────────────────────────
// 🟠 ENVIRONNEMENT
// ────────────────────────────────────────────────────────────

const ENVIRONNEMENT: PlayerScenario[] = [
  {
    id: "type-structure",
    context: "Tu choisis ton type de boîte idéale.",
    scenario: "Où tu performes le mieux ?",
    choices: {
      left: { label: "Startup chaos", hint: "Hyper-croissance, tout bouge." },
      right: { label: "Scale-up structurée", hint: "Process, équipe stable." },
      down: { label: "PME établie", hint: "Rythme posé, calme." },
    },
  },
  {
    id: "taille-équipe",
    context: "Taille d'équipe préférée.",
    scenario: "Tu te sens le mieux dans :",
    choices: {
      left: { label: "Petite équipe (1-5)", hint: "Intime, agile." },
      right: { label: "Moyenne (10-20)", hint: "Humaine, structurée." },
      down: { label: "Plus large (30+)", hint: "Spécialisation." },
    },
  },
  {
    id: "remote-presentiel",
    context: "Tu vis mieux quand :",
    scenario: "Mode de travail idéal :",
    choices: {
      left: { label: "Full remote", hint: "Liberté totale." },
      right: { label: "Hybride 1-2j", hint: "Mix sain." },
      down: { label: "Présentiel régulier", hint: "Cadre + lien social." },
    },
  },
  {
    id: "industrie",
    context: "Tu choisis ton secteur.",
    scenario: "Plus aligné avec tes envies :",
    choices: {
      left: { label: "Tech / SaaS", hint: "Produit numérique." },
      right: { label: "Impact / éthique", hint: "Sens > tech." },
      down: { label: "Variable", hint: "Selon le projet." },
    },
  },
  {
    id: "outils",
    context: "L'équipe utilise un outil que tu connais pas.",
    scenario: "Ta réaction :",
    choices: {
      left: { label: "Je m'adapte", hint: "Je l'apprends." },
      right: { label: "Je propose mon stack", hint: "Je connais mieux." },
      down: { label: "Je négocie un mix", hint: "On combine." },
    },
  },
  {
    id: "phase-entreprise",
    context: "L'entreprise est :",
    scenario: "Phase qui te correspond le plus :",
    choices: {
      left: { label: "Pré-PMF (chaos)", hint: "Tout à construire." },
      right: { label: "Croissance rapide", hint: "Scaling, structuration." },
      down: { label: "Mature stable", hint: "Process, raffinement." },
    },
  },
];

// ────────────────────────────────────────────────────────────
// 🔴 PRESSION
// ────────────────────────────────────────────────────────────

const PRESSION: PlayerScenario[] = [
  {
    id: "rapport-stress",
    context: "Le stress et toi.",
    scenario: "Quand la pression monte :",
    choices: {
      left: { label: "Ça me booste", hint: "Je donne mon meilleur." },
      right: { label: "Je gère", hint: "Neutre, je m'adapte." },
      down: { label: "Je préfère éviter", hint: "Je travaille mieux calme." },
    },
  },
  {
    id: "urgence-multiples",
    context: "Tu reçois 4 demandes urgentes simultanées.",
    scenario: "Ta réaction première :",
    choices: {
      left: { label: "Je priorise et je fonce", hint: "Tableau de priorités." },
      right: { label: "Je demande quoi est vraiment urgent", hint: "Je négocie l'urgence." },
      down: { label: "Je me bloque, j'ai besoin d'aide", hint: "Surcharge." },
    },
  },
  {
    id: "crise-équipe",
    context: "Un membre clé de l'équipe vient de démissionner sur-le-champ.",
    scenario: "Tu :",
    choices: {
      left: { label: "Je prends sur moi temporairement", hint: "Soutien équipe." },
      right: { label: "Je refuse de prendre sa charge", hint: "Ce n'est pas mon job." },
      down: { label: "Je négocie un cadrage", hint: "Temporaire et payé." },
    },
  },
  {
    id: "deadline-impossible",
    context: "Une deadline est manifestement impossible.",
    scenario: "Tu fais quoi ?",
    choices: {
      left: { label: "Je dis non, je propose une autre date", hint: "Réalisme." },
      right: { label: "Je tente, je verrai", hint: "Optimisme." },
      down: { label: "Je négocie scope ou délai", hint: "Compromis." },
    },
  },
  {
    id: "client-panique",
    context: "Le client panique au téléphone.",
    scenario: "Ton mode :",
    choices: {
      left: { label: "Je reste calme, je structure", hint: "Sang-froid." },
      right: { label: "Je l'apaise d'abord", hint: "Empathie avant solutions." },
      down: { label: "Je le rappelle plus tard", hint: "Je ne réagis pas à chaud." },
    },
  },
  {
    id: "pression-niveau",
    context: "Sur 10, ton niveau idéal en mission régulière.",
    scenario: "Tu acceptes :",
    choices: {
      left: { label: "Calme (2-3)", hint: "Pression basse." },
      right: { label: "Moyen (4-6)", hint: "Stimulant mais sain." },
      down: { label: "Intense (7-9)", hint: "Adrénaline." },
    },
  },
];

// ────────────────────────────────────────────────────────────
// EXPORT MAP
// ────────────────────────────────────────────────────────────

export const SCENARIOS_BY_CHAPTER: Record<ChapterSlug, PlayerScenario[]> = {
  rythme: RYTHME,
  communication: COMMUNICATION,
  autonomie: AUTONOMIE,
  limites: LIMITES,
  environnement: ENVIRONNEMENT,
  pression: PRESSION,
  synthese: [], // pas de swipe — page spéciale
};
