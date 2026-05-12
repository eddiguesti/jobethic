# 03 — Produit core

## 1. Les 5 piliers produit

```
                    JOB'S ETHIC
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   1. PROFIL         2. ÉQUILIBRE     3. ENTRETIEN
      PROFOND          (audit            IA + ANTI-
   (Le Voyage)         employeur)         TRICHE
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
        4. SCORE                5. PROFIL
        EXPLICABLE              PORTABLE
        & CONTESTABLE           (candidat owns)
```

Ces 5 piliers sont **indissociables**. Retirer un pilier = devenir un concurrent banal.

| Pilier | Sans nous, le marché fait quoi ? | Ce qu'on apporte |
|---|---|---|
| 1. Profil profond longitudinal | Tests psychométriques 30-45 min one-shot | Voyage 5 min/jour x 6 semaines, gamifié calme |
| 2. Audit employeur équilibré | Fiche de poste embellie | Le recruteur passe le même profilage |
| 3. Entretien IA anti-triche | Détection à 60-80 % ou rien | Design + follow-ups adversariaux + provenance |
| 4. Score explicable & contestable | Boîte noire ou score opaque | Score décomposé, raison par raison, contestable |
| 5. Profil portable | Données coincées dans la plateforme | RGPD Art. 20 weaponisé — le profil appartient au candidat |

---

## 2. Pilier 1 — Le Profil Profond (vue d'ensemble)

**Détail complet → [04-PROFIL-PROFOND.md](04-PROFIL-PROFOND.md)**

### Principe
Le profil n'est pas un test, c'est un **voyage de découverte de soi** construit sur 6 semaines.

### Architecture en 3 actes

**Acte 1 — La Découverte (jours 1-7)**
Style Petit Bambou. Voix narratrice apaisante, micro-sessions 5 min, thématiques colorées :
- 🔵 Rythme (rapide / réfléchi)
- 🟢 Communication (directe / diplomate)
- 🟣 Limites (ce que je ne veux pas)
- 🟡 Autonomie (encadré / indépendant)
- 🟠 Environnement (stable / chaos)
- 🔴 Pression (j'aime / je fuis)

**Acte 2 — Les Mises en Situation (jours 8-21)**
Style Vervoe / simulations. Scénarios réalistes ramifiés. Tu n'as pas une "bonne réponse" — tu construis ton style en choisissant.
- *"Un client te demande une révision majeure le vendredi soir, urgent. Que fais-tu ?"*
- *"Ton manager te critique en réunion. Tu réponds comment ?"*
- *"On te propose une mission 30 % au-dessus de ton tarif mais en environnement chaotique. Tu acceptes ?"*

**Acte 3 — Les Échos (jours 22+, en continu)**
Style Duolingo (mais calme, FR-tone). Un "Écho" par jour, 2 min : une question, un mini-scénario, ou un retour sur les missions précédentes. Streaks doux. Le profil mature, vieillit bien et reste vivant.

### Pourquoi c'est un moat
- **Impossible à truquer** : tu ne joues pas un rôle pendant 6 semaines de micro-sessions
- **Switching cost** : le profil mûrit, le candidat ne veut pas recommencer à zéro
- **Compounding** : chaque utilisateur rend notre matching meilleur (donnée propriétaire)
- **Différenciation immédiate** : effet WOW dès la première session

---

## 3. Pilier 2 — L'Équilibre (audit employeur)

**Détail complet → [06-MATCHING-EQUILIBRE.md](06-MATCHING-EQUILIBRE.md)**

### Principe
Le recruteur **doit** passer un profilage de la même profondeur que le candidat. Pas négociable.

### Ce que le recruteur dit (au-delà de la fiche de poste)
- **Pression réelle** sur l'équipe en ce moment (0-10, illustrée par questions concrètes)
- **Style de management** réel (directif / participatif / autonomie totale / micro-management)
- **Environnement** : startup chaos / scale-up structuré / corporate process / hybride
- **Rythme de travail** : standard / urgent récurrent / pics intenses / variable
- **Horaires réels** (pas affichés) et tolérance week-end / soir
- **Communication** : Slack en continu / réunions structurées / async total
- **Niveau d'exigence** : qualité maximum / vitesse / équilibre
- **Conflits récents** ou tensions équipe (oui/non avec contexte si oui)
- **Turnover des 12 derniers mois**

### Mécanique d'honnêteté
- Score de **transparence employeur** visible
- **Vérification croisée** avec les retours des missions précédentes sur la plateforme
- Les employeurs trop éloignés du réel observé voient leur transparency score baisser → **moins de matchs prioritaires**

### Pourquoi c'est un moat
- **Aucun concurrent FR** ne fait ça
- C'est notre **arme marketing** ("la seule plateforme qui audite aussi l'employeur")
- C'est ce qui fait **durer les matchs 2x plus longtemps**

---

## 4. Pilier 3 — Entretien IA + Anti-triche

**Détail complet → [05-IA-ENTRETIEN-ANTITRICHE.md](05-IA-ENTRETIEN-ANTITRICHE.md)**

### Principe
On ne fait pas la course à la détection (perdable). On rend la triche **inutile**.

### L'entretien JOB'S ETHIC en 4 phases

1. **Échauffement (3 min)** — Questions de mise en condition, hors-évaluation. Le candidat parle, on capture sa cadence naturelle de parole.
2. **Mises en situation (10 min)** — 4-5 scénarios métiers issus du profil profond du candidat. **Pas génériques**. Les follow-ups sont générés en live à partir des réponses précédentes.
3. **Le Miroir (5 min)** — On présente au candidat une partie de son profil profond et on lui demande de réagir, expliquer, nuancer. Impossible à faker via LLM (il faut connaître les nuances du profil construit sur 6 semaines).
4. **Question ouverte (2 min)** — Le candidat pose **sa** question, à l'IA. Le contenu et la manière de poser sont signaux comportementaux.

### Défense en profondeur anti-triche (5 couches)

1. **Couche conception** — Follow-ups adversariaux + Le Miroir (impossible sans profil)
2. **Couche provenance** — Vérification LinkedIn + INSEE SIRENE + Credly + ID
3. **Couche cohérence longitudinale** — Comparaison avec 6 semaines de profil profond
4. **Couche technique légère** — Latence de réponse, focus de fenêtre, audio anomalies (signaux supportifs, jamais décision)
5. **Couche humaine** — Toute alerte est révisée par un humain avant impact sur le score

**Aucune décision** automatique de disqualification. Le score est ajusté, l'humain tranche.

---

## 5. Pilier 4 — Score explicable & contestable

**Détail complet → [06-MATCHING-EQUILIBRE.md](06-MATCHING-EQUILIBRE.md) + [10-ETHIQUE-RGPD-AI-ACT.md](10-ETHIQUE-RGPD-AI-ACT.md)**

### Principe
Tout score est :
- **Décomposable** (on voit chaque dimension qui contribue, avec son poids)
- **Expliqué en langage humain** ("vous matchez à 78 % parce que votre rythme calme aligne avec le style de management participatif de cette équipe, mais attention : l'environnement est plus urgent que ce que vous préférez")
- **Contestable** par les deux parties dans un délai de 30 jours
- **Auditable** trimestriellement pour les biais

### Composition du score d'équilibre (100 points)

| Dimension | Poids | Vient de |
|---|---|---|
| Compétences techniques | 25 | CV + tests + portfolio |
| Compatibilité comportementale | 30 | Profil profond candidat × profil recruteur |
| Compatibilité environnementale | 20 | Limites candidat × environnement réel recruteur |
| Compatibilité humaine | 15 | Communication, autonomie, style |
| Disponibilité & budget | 10 | Logistique |

**Règle d'or :** un bon match = 70-85 %. **On ne cherche pas 100 %.** Et chaque % manquant est expliqué.

### La fonctionnalité "Pourquoi ?"
Sur chaque profil proposé, un bouton "Pourquoi ?" affiche :
- **3 raisons fortes** du match (en clair, pas en jargon)
- **2 zones de tension** à connaître
- **Recommandations** d'usage ("idéal pour missions courtes, à éviter sur missions longues stable")

### La fonctionnalité "Simulation de collaboration"
Au-delà du score, une **projection** :
- Délais estimés sur la mission
- Probabilité de seconde mission entre les deux
- Risques organisationnels typiques pour ce couple
- Conditions de réussite optimales

---

## 6. Pilier 5 — Profil portable

### Principe (RGPD Art. 20 weaponisé)
Le candidat **possède** son profil. Il peut :
- Le **télécharger** en JSON + PDF lisible
- Le **partager** par lien public (avec URL anonymisée)
- Le **donner** à un recruteur en dehors de la plateforme
- L'**effacer** complètement à tout moment
- Le **réutiliser** sur d'autres plateformes (API publique JOB'S ETHIC)

### Pourquoi c'est un moat
- **Switching cost asymétrique** : le candidat ne quitte pas une plateforme, il quitterait **un patrimoine**
- **Effet réseau candidat** : "tout le monde a son profil JOB'S ETHIC" → les entreprises arrivent
- **Réglementaire** : 100 % conforme RGPD natif → audit-proof
- **Brand** : on est *les seuls* à le faire honnêtement → narrative puissante

### La fonctionnalité "Portefeuille pro"
Le candidat voit son profil comme un **portefeuille évolutif** :
- Historique des missions (vérifiées par les clients)
- Évolution du profil profond dans le temps
- Badges de confiance acquis
- Recommandations qualitatives (pas étoiles)
- Compatibilités potentielles avec des types de missions

---

## 7. Périmètre fonctionnel — MVP V1 (3 mois)

### Pour le candidat / freelance
- [ ] Inscription + vérification identité (Stripe Identity / Onfido)
- [ ] Onboarding "Le Voyage" — Acte 1 complet (7 jours, Découverte)
- [ ] Démarrage Acte 2 (Mises en situation) sur 3-5 scénarios pilotes
- [ ] Profil profond visible et explicable au candidat
- [ ] Recherche de missions compatibles
- [ ] Système d'acceptation / refus de propositions
- [ ] Chat avec recruteur après match
- [ ] Tableau de bord "Mon Profil"

### Pour le recruteur (PME / startup)
- [ ] Inscription + vérification SIRENE (API INSEE)
- [ ] Onboarding "Profil Employeur" — 15-20 min de profilage honnête
- [ ] Création de mission/poste avec questions guidées
- [ ] Réception de **3 profils** matchés + explication
- [ ] Bouton "Pourquoi ce match ?"
- [ ] Bouton "Risques à connaître"
- [ ] Chat avec candidat
- [ ] Feedback structuré après mission

### Couches transverses
- [ ] Score d'équilibre + explication
- [ ] Contestation de score (formulaire + révision humaine)
- [ ] Profil portable (export PDF + JSON)
- [ ] Système anti-triche niveau 1 (provenance + cohérence basique)
- [ ] Reporting RGPD / AI Act (logs accessibles utilisateur)

### Hors-MVP (V2+)
- ❌ Entretien IA vidéo complet (V2)
- ❌ Acte 3 — Les Échos quotidiens (V2)
- ❌ Audit de biais automatisé en continu (V2)
- ❌ API publique pour profil portable consommé ailleurs (V3)
- ❌ Marketplace CDI/CDD (V3)
- ❌ Simulation de collaboration avancée (V2)

---

## 8. Parcours utilisateur — flux principaux

### Flux freelance — première utilisation
1. Inscription (email + vérif ID) — 2 min
2. *"Bienvenue. Avant tout, on va apprendre à mieux te connaître. Pas un test, un voyage."* — 30 sec
3. Acte 1 Jour 1 : "Ton rythme" — 5 min, thème bleu, voix narratrice
4. *"À demain, même heure si tu veux. Ton profil prendra forme."* — 30 sec
5. À J+1, push notification : "Aujourd'hui : Ta communication 🟢" — 5 min
6. À J+7 : *"Découverte terminée. Tu vas maintenant entrer dans les Mises en Situation. Tu commences à voir qui tu es professionnellement."*
7. Acte 2 (J+8 à J+21) : scénarios, 5 min/jour
8. À J+22 : *"Ton profil est suffisamment mûr pour te proposer des missions. Voici les 3 premières qui te ressemblent."*

### Flux recruteur PME — première utilisation
1. Inscription + vérification SIRENE — 2 min
2. *"Pour vous proposer des profils compatibles, on a besoin de comprendre votre environnement réel — pas votre fiche de poste idéale."* — 30 sec
3. Profilage employeur (15-20 min) : pression réelle, style management, rythme, conflits récents, etc.
4. Création de la première mission avec assistance IA pour reformuler le besoin
5. Sous 24h (V1) ou 5 min (V2 quand assez de freelances) : **3 profils** + explications
6. Le recruteur clique sur chaque profil, lit le "Pourquoi ?", regarde les "Risques"
7. Il contacte 1-2 freelances, le chat s'ouvre
8. Mission lancée — feedback structuré à la fin

### Temps objectif
- **Freelance** : 5 min/jour, valeur immédiate dès jour 1
- **Recruteur** : 20 min initialement, puis **10 min par recrutement** ensuite (vs 2-10 jours marché)

---

## 9. Les principes UX fondateurs

### 1. Pas de scroll infini
On affiche **3 profils**. Pas 30, pas 300. La promesse "3, 1, 10 minutes" doit être tenable.

### 2. Tout est expliqué
Aucun chiffre sans explication adjacente. Aucun score sans son "pourquoi".

### 3. Le respect comme défaut
- Pas de rejet, pas d'**email "vous n'êtes pas retenu"**
- Toute action a une notification claire
- Les délais sont annoncés, tenus, et le candidat est notifié en cas de retard

### 4. Calme et premium (pas gamifié-bruyant)
Pas de pop-ups, pas de "TADAAAA!", pas de confettis. Le ton est *Petit Bambou*, pas *Duolingo*.

### 5. Mobile-first **et** desktop-good
Les freelances utilisent leur smartphone. Les recruteurs utilisent leur desktop. **Les deux doivent être premium.**

### 6. Tout est en français correct
Pas de franglais marketing. Pas d'"Oups!". Pas de jargon RH. La langue est aussi un signe de respect.

### 7. L'utilisateur a toujours le contrôle
- Tout réglage est modifiable
- Toute donnée est exportable/effaçable
- Toute décision est contestable

---

## 10. Les anti-features (ce qu'on refuse de faire, même si on nous le demande)

| Anti-feature | Pourquoi on refuse |
|---|---|
| Test psychométrique 30 min one-shot | Anti-thèse du profil longitudinal |
| Détection d'émotion en webcam | **Interdit par l'AI Act** (€35M / 7 % CA) |
| Filtres recruteur par "tranche d'âge" ou similaire | Discrimination automatisée |
| Scoring opaque non-explicable | Anti-thèse du pilier 4 |
| Notation publique style étoiles toxiques | Génère des comportements toxiques, biais |
| Vente des données candidats à des tiers | Trahison du pilier 5 |
| Décision automatique de rejet | Anti-thèse de "l'IA n'est pas un juge" |
| Promesse d'embauche instantanée | Juridiquement sensible en France |
| Volume sur la qualité | "3 profils" est notre promesse, pas 30 |
| Gamification points/badges/leaderboard | Bruit, infantilisant, biaise le profil |

---

## 11. Le test du "est-ce qu'on est encore JOB'S ETHIC ?"

À chaque grande décision produit, on se pose ces 5 questions :

1. **Est-ce que ça remplace le CV — ou ça l'optimise ?** (Si optimise, on est devenus banals.)
2. **Est-ce que l'IA explique — ou ça décide ?** (Si décide, on perd l'éthique et la conformité.)
3. **Est-ce que le candidat possède sa donnée — ou on la possède ?** (Si "on", on perd le moat.)
4. **Est-ce qu'on profile aussi le recruteur — ou seulement le candidat ?** (Si seulement, on est AssessFirst.)
5. **Est-ce que la triche est rendue inutile — ou on la chasse ?** (Si on la chasse, on perd la guerre.)

**5 oui** → on est encore JOB'S ETHIC.
**Un seul non** → on est en train de devenir un concurrent de moins.
