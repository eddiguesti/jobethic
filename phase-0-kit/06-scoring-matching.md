# 06 — Méthode de scoring manuelle (assistée par Claude)

> En Phase 0, le scoring est **fait à la main**, assisté par Claude/ChatGPT.
> L'objectif : calibrer la méthode avant de la coder. Voir [`plan/06-MATCHING-EQUILIBRE.md`](../plan/06-MATCHING-EQUILIBRE.md) pour le détail.

---

## La formule (à appliquer manuellement)

**Score d'équilibre sur 100** :

| Dimension | Poids | Source |
|---|---|---|
| Compétences techniques | 25 | Form freelance Q9-Q11 + Form recruteur Q16-Q18 |
| Compatibilité comportementale | 30 | Form freelance Q14-Q24 + Form recruteur Q20-Q28 |
| Compatibilité environnementale | 20 | Form freelance Q28-Q31 + Form recruteur Q29-Q34 |
| Compatibilité humaine | 15 | Form freelance Q18-Q21 + Form recruteur Q25-Q28 |
| Disponibilité & budget | 10 | Form freelance Q11-Q12 + Form recruteur Q14-Q15 |

**Règle d'or :** 70-85 = bon match. **On ne cherche pas 100.**

---

## Workflow concret (à faire dans Notion)

### Étape 1 — Filtrage hard (élimination)

Avant tout scoring, j'élimine si :
- Compétences requises manquantes (au moins 4/5 doivent matcher)
- Disponibilité incompatible
- Budget hors zone (>30 % d'écart)
- Limites freelance violées par environnement recruteur (ex: weekend obligatoire vs "pas de weekend")
- Localisation incompatible (présentiel obligatoire en autre ville)

→ Sortie : 3-15 candidats potentiels.

### Étape 2 — Scoring assisté Claude

Pour chaque candidat shortlisté, j'envoie ce prompt à Claude (Opus 4.7) :

```
Tu es un expert en matching freelance-recruteur. Analyse la compatibilité
entre ce freelance et cette mission. Donne un score sur 100 décomposé par
les 5 dimensions ci-dessous, plus une explication structurée.

DIMENSIONS (poids) :
1. Compétences techniques (25)
2. Compatibilité comportementale (30) — rythme, communication, autonomie
3. Compatibilité environnementale (20) — limites vs réalité recruteur
4. Compatibilité humaine (15) — style de travail
5. Disponibilité & budget (10) — logistique

PROFIL FREELANCE :
[colle les réponses du Form freelance]

PROFIL RECRUTEUR :
[colle les réponses du Form recruteur]

OUTPUT ATTENDU (format structuré) :
## Score : XX/100

### Décomposition
- Compétences techniques : XX/25 — [1 phrase d'explication]
- Compatibilité comportementale : XX/30 — [1 phrase]
- Compatibilité environnementale : XX/20 — [1 phrase]
- Compatibilité humaine : XX/15 — [1 phrase]
- Disponibilité & budget : XX/10 — [1 phrase]

### Top 3 forces du match
- [...]

### Top 2 zones de tension
- [...]

### Recommandation contextuelle
[2-3 phrases : pour quel type de mission, quelles conditions de réussite]

Sois honnête. Si c'est un mauvais match (<60), dis-le clairement.
```

### Étape 3 — Vérification humaine (toi)

**Tu lis le rapport Claude et tu décides :**
- Est-ce que la décomposition correspond à ton intuition ?
- Est-ce que des éléments importants ont été ratés ?
- Le score te semble-t-il juste ?

→ Si oui : on garde tel quel.
→ Si non : tu ajustes manuellement avec ton intuition. Tu notes dans Notion **pourquoi** tu as ajusté (ces notes sont OR pur pour calibrer l'algorithme Phase 2).

### Étape 4 — Top 3 sélection

Parmi tous les candidats scorés :
- Tri par score
- Garde les 3 meilleurs
- **Si scores serrés** (< 5 pts d'écart) : diversifie — garde des profils complémentaires plutôt que tous similaires

### Étape 5 — Rapport au recruteur

Voir [07-template-rapport-match.md](07-template-rapport-match.md).

---

## Exemple de scoring (cas réel à anonymiser)

**Freelance Émilie L. :**
- Rythme : marathon calme
- Communication : écrite directe
- Autonomie : encadrée au début, indépendante après
- Limites : pas de weekend
- Environnement : scale-up structuré
- Pression : tolérance 4/10
- TJM 450 €/j, dispo 4j/sem immédiate

**Recruteur TaroteHQ (cofondateur 12 personnes) :**
- Phase : Seed, croissance rapide
- Management : participatif
- Pression actuelle : 7/10
- Feedback : hebdo structuré
- Style : Slack-first
- Budget : 3 500 €/mois, démarrage immédiat
- Mode : full remote
- Cherche : office manager freelance ops

**Score calculé par Claude (vérifié humain) :**
- Compétences : 24/25 (Notion, Slack, Asana — match parfait)
- Comportemental : 26/30 (rythme aligné, mais sa tolérance pression 4 vs son env 7 = tension)
- Environnemental : 12/20 (full remote OK, mais env plus urgent qu'elle ne préfère)
- Humain : 12/15 (communication alignée écrit-direct ↔ Slack-first)
- Dispo/budget : 4/10 (dispo immédiate OK, budget 3 500€/mois × 4j = ~ 875€/j — au-dessus de ses 450€/j = ratio favorable)
- **Total : 78/100** ✅

**Tensions à signaler :**
- Niveau de pression : à ajuster ensemble lors du démarrage
- Sa préférence pour le feedback hebdo doit être mise en place

**Recommandation :**
> Très bon match pour une mission 3-6 mois en cadre structuré. À démarrer avec
> un point d'alignement explicite sur le niveau de pression et un rituel feedback
> hebdo. À éviter pour un sprint intense de 4 semaines en continu.

---

## Trackage des matchs (apprentissage)

Chaque match proposé, on note dans Notion :
- Score calculé
- Recruteur a contacté ce profil ? (oui/non)
- Recruteur a engagé ce profil ? (oui/non)
- Mission terminée OK ? (à J+30, J+60, J+90, J+180)

**Après 20-30 matchs**, on aura :
- Quels patterns prédisent les bons matchs
- Quels seuils de score sont réellement significatifs
- Quels signaux dans les forms sont les plus prédictifs

→ C'est la donnée d'entraînement pour Phase 2 (XGBoost).

---

## Temps moyen par match en Phase 0

- Lecture form freelance : 5 min
- Lecture form recruteur : 5 min
- Prompt Claude + analyse : 5 min
- Vérification humaine : 5 min
- Rédaction rapport : 10 min
- **Total : ~30 min par profil proposé**

Pour proposer 3 profils par mission = ~90 min/mission.

**Objectif** : 2-3 missions/semaine soit ~3-4h/sem en scoring. Tenable.
