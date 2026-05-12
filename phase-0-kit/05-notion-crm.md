# 05 — CRM Notion (spec à dupliquer)

> Spec d'un Notion workspace pour gérer les freelances, recruteurs et matchs en Phase 0.
> Crée ces 5 bases dans Notion ([notion.so](https://www.notion.so)) en suivant ce schéma.

---

## Base 1 — Freelances

**Type :** Database (Table view)

**Propriétés :**

| Champ | Type | Options |
|---|---|---|
| Nom | Title | — |
| Email | Email | — |
| Profil LinkedIn | URL | — |
| Téléphone | Phone | — |
| Métier | Select | VA / Office Manager / Ops / Customer Success / Autre |
| Localisation | Select | Paris / Lyon / Bordeaux / Toulouse / Nantes / Marseille / Lille / Autre / Remote only |
| Années XP | Number | — |
| TJM | Number | (€) |
| Disponibilité | Select | Immédiate / 2 sem / 1 mois / 2 mois / Plus tard |
| Statut | Select | A contacter / M1 envoyé / M2 envoyé / Call booké / Profil rempli / Disponible / En mission / Décliné |
| Date contact | Date | — |
| Date dernière interaction | Date | — |
| Source | Select | LinkedIn / Recommendation / Slack / Discord / Autre |
| Note qualitative | Text | — |
| Lien form rempli | URL | — |
| Tags | Multi-select | Top profil / Réactif / Premium / À garder |

**Vues à créer :**
- 📋 **À contacter** (filter: Statut = "A contacter")
- 🔥 **Calls cette semaine** (filter: Statut = "Call booké" + date < 7 jours)
- ✅ **Disponibles pour matching** (filter: Statut = "Disponible")
- 🚀 **En mission** (filter: Statut = "En mission")
- 📅 **Suivi hebdo** (groupé par date dernière interaction)

---

## Base 2 — Recruteurs (PME)

**Propriétés :**

| Champ | Type | Options |
|---|---|---|
| Société | Title | — |
| Contact principal | Text | — |
| Email | Email | — |
| Profil LinkedIn (contact) | URL | — |
| SIRET | Text | — |
| Site web | URL | — |
| Effectif | Select | 1-5 / 6-10 / 11-25 / 26-50 / 51-100 / 100+ |
| Industrie | Select | SaaS / E-commerce / Marketing / Conseil / Santé / Autre |
| Phase | Select | Bootstrap / Pre-seed / Seed / Series A / Series B+ |
| Statut | Select | A contacter / M1 envoyé / M2 envoyé / Call booké / Profil rempli / Brief reçu / Matching en cours / Mission active / Décliné |
| Date contact | Date | — |
| Budget mensuel | Number | (€) |
| Urgence démarrage | Date | — |
| Score transparence | Number | 0-100 (calculé manuellement Phase 0) |
| Note qualitative | Text | — |
| Lien form rempli | URL | — |
| Brief mission | URL ou texte | — |

**Vues :**
- 📋 **À contacter**
- 🔥 **Calls cette semaine**
- 💼 **Briefs reçus** (= à matcher)
- 🚀 **Missions actives**
- ⭐ **Top transparence** (filter: Score transparence > 80)

---

## Base 3 — Missions

**Propriétés :**

| Champ | Type | Options |
|---|---|---|
| Titre | Title | — |
| Recruteur | Relation → Base Recruteurs |
| Freelance | Relation → Base Freelances (vide jusqu'à match) |
| Statut | Select | Brief reçu / Matching en cours / 3 profils proposés / Contact ouvert / Engagement / Active / Terminée OK / Rompue anticipativement |
| Date brief | Date | — |
| Date démarrage | Date | — |
| Date fin réelle | Date | — |
| Durée prévue (mois) | Number | — |
| Durée réelle (mois) | Number | (calc) |
| Budget mensuel | Number | (€) |
| Commission JOB'S ETHIC | Number | (€) |
| Frais de mise en relation payés ? | Checkbox | — |
| Score match calculé | Number | 0-100 |
| Note succès | Text | — |
| Renouvellement (2ème mission) ? | Checkbox | — |

**Vues :**
- 🎯 **En matching** (Statut = "Matching en cours" ou "Brief reçu")
- 🚀 **Actives**
- ✅ **Terminées OK**
- 📊 **Reporting** (toutes, vue galerie)

---

## Base 4 — Rapports de match envoyés

**Propriétés :**

| Champ | Type |
|---|---|
| Mission | Relation → Base Missions |
| Date envoi | Date |
| Freelances proposés (3) | Relation → Base Freelances |
| Texte du rapport (markdown) | Text long |
| Recruteur a contacté lequel ? | Relation → Base Freelances |
| Mission engagée ? | Checkbox |
| Feedback recruteur | Text |
| Feedback freelances | Text |

---

## Base 5 — Activity log (apprentissage Phase 0)

**Propriétés :**

| Champ | Type |
|---|---|
| Date | Date |
| Type | Select | Insight / Erreur / Win / Question / Réflexion stratégique |
| Description | Text |
| Apprentissage | Text |
| Action à mener | Text |

**Vue :** chronologique. **Objectif :** capter tout ce qu'on apprend pour calibrer Phase 1.

---

## Dashboard d'accueil

Une page **🏠 JOB'S ETHIC — Dashboard** avec :

```
JOB'S ETHIC — Phase 0

📊 Cette semaine
- Freelances contactés : __
- Freelances qualifiés : __
- Recruteurs contactés : __
- Recruteurs engagés : __
- Calls bookés : __
- Missions actives : __

🎯 KPIs Mois 1 (objectif)
- 20 freelances qualifiés ▒▒▒▒▒░░░░░ __/20
- 10 PME engagées        ▒▒▒░░░░░░░ __/10
- 5 missions lancées     ▒░░░░░░░░░ __/5

📋 À faire aujourd'hui
[checklist]

💡 Apprentissages récents
[liste embed Activity Log]
```

---

## Templates de Notion

**À créer comme blocs réutilisables :**

1. **Brief mission** (page template)
2. **Profil freelance** (page template avec lien vers le Form)
3. **Rapport de match** (page template — voir [07-template-rapport-match.md](07-template-rapport-match.md))

---

## Setup time

- Création workspace + 5 bases : **~2h**
- Customization vues : **~1h**
- Templates + dashboard : **~1h**

**Total : ~4h** pour avoir un CRM complet et propre.

**Alternative plus rapide :** Airtable (interface plus DB-like, mêmes propriétés).

**À envisager Phase 2 :** migration vers Attio ou un CRM dédié quand le volume dépasse 200 contacts.
