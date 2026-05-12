# 05 — IA Entretien & Anti-triche

> **Principe fondateur :** on ne **gagne pas** la course à la détection. On la **rend inutile**.
> Cluely, l'oreillette IA, ChatGPT live — tous échouent face à un **profil profond longitudinal** et des **follow-ups adversariaux**.

## 1. État de l'art en mai 2026 (résumé)

### Le problème
- ~35 % des candidats trichent en entretien IA (vs 15 % mi-2025)
- **Cluely** : overlay GPU invisible à toute détection screen-share classique
- **Interview Coder** : assistant LLM contextuel
- **Oreillettes IA** : whisper.cpp + GPT-4 local audio → quasi-impossible à détecter sans contrôle hardware
- **GPTZero, Copyleaks** sur le texte : 20-30 % de faux positifs — **bombe juridique RGPD**

### Ce qui marche (mais à 70-90 %, jamais 100 %)
- Sapia.ai : modèle texte 94,5 % ROC-AUC — uniquement chat, pas vidéo
- Fabric, Truely, Talview "Stop Cluely" : stack multi-signaux 80-85 %
- HackerRank Proctor : 93 % sur code, contexte limité

### Notre lecture stratégique
La détection technique sera **commodifiée d'ici 18 mois** et **juridiquement risquée** sous l'AI Act. **Investir dans la détection comme moat = perdant.**

Notre moat = **conception qui rend la triche pointless** :
1. Profil profond longitudinal sur 6+ semaines (impossible à truquer)
2. Le Miroir : entretien qui valide le profil (impossible sans connaître le profil)
3. Follow-ups adversariaux générés en live (cassent le contexte LLM)
4. Vérification de provenance (les faits sont vérifiables)
5. Cohérence longitudinale (signaux statistiques, pas verdict)

---

## 2. L'Entretien JOB'S ETHIC — structure

### Vue d'ensemble

```
╔═══════════════════════════════════════════════════════════╗
║                  L'ENTRETIEN — 20 MIN                     ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  PHASE 1 — ÉCHAUFFEMENT          3 min   (hors-évaluation)║
║  PHASE 2 — MISES EN SITUATION    10 min  (4-5 scénarios)  ║
║  PHASE 3 — LE MIROIR             5 min   (sur profil)     ║
║  PHASE 4 — QUESTION OUVERTE      2 min   (candidat parle) ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

L'entretien est **vidéo + audio**, asynchrone par défaut, synchrone possible (option premium).
Il n'a **lieu qu'après le profil profond** est suffisamment mûr (J+22 minimum).

---

### Phase 1 — Échauffement (3 min, hors-évaluation)

#### Objectif
- Mettre le candidat à l'aise
- Capturer une **baseline** : cadence de parole naturelle, vocabulaire spontané, prosodie
- Cette baseline sert plus tard pour la détection de cohérence — pas la disqualification

#### Format
2-3 questions très simples, **prévenues comme non-évaluées** :
- *"Présente-toi en quelques mots — ton parcours, ce qui t'amène ici."*
- *"Qu'est-ce qui t'a plu dans ton dernier projet ?"*

#### Ce qu'on capture (signaux baseline)
- Cadence (mots/min)
- Pauses naturelles
- Diversité lexicale
- Articulation, accent (jamais utilisé comme critère de jugement — uniquement baseline)
- Comportement webcam (regard, position, calme/agitation)

#### Ce qu'on NE capture pas
- ❌ Émotion (interdit AI Act)
- ❌ Apparence (taille, traits, couleur de peau, etc.)
- ❌ Environnement domestique (l'IA est instruite de ne **pas** considérer le décor)

---

### Phase 2 — Mises en Situation (10 min, 4-5 scénarios)

#### Objectif
- Évaluer la **manière de répondre**, pas la "bonne réponse"
- Casser le confort des LLM via **scénarios spécifiques au profil du candidat**
- Capturer le **style** au-delà des mots

#### Format
4-5 scénarios construits dynamiquement à partir :
- du **profil profond** du candidat
- du **type de mission** ciblée
- du **profil employeur** côté demande

**Chaque scénario** :
1. L'IA lit/présente le scénario (15-30 sec)
2. Le candidat répond à voix haute (1-2 min)
3. L'IA pose **2-3 follow-ups générés en live** à partir de la réponse précédente (1 min chacun)

#### Exemple concret
**Scénario :** *"Le client te demande de rajouter une fonctionnalité en cours de mission, sans budget supplémentaire. Comment réagis-tu ?"*

**Réponse candidat** *(simulée)* : *"Je négocierais en expliquant l'impact sur les délais."*

**Follow-up 1 (généré en live)** : *"Tu viens de dire « j'expliquerais l'impact ». Concrètement, par quoi tu commences — par les délais ou par la valeur ?"*

**Réponse candidat** : *"Probablement par les délais."*

**Follow-up 2 (généré en live)** : *"Le client te répond : « Je m'en fous des délais, fais-le. » Tu réponds quoi ?"*

**Pourquoi c'est anti-Cluely** :
- Les follow-ups ne sont **pas dans un corpus de questions standard**
- Ils dépendent du **mot exact** que le candidat vient de prononcer
- Ils dépendent du **profil profond préalable** (le candidat doit rester cohérent)
- Le LLM live n'a **pas le contexte** des 6 semaines de profil

#### Génération des follow-ups
- **Modèle IA** : Claude Opus 4.7 (ou GPT-5) avec instructions structurées
- **Contexte fourni à l'IA** : profil profond du candidat + réponse précédente + objectif d'évaluation
- **Latence** : <3 sec pour rester naturel
- **Garde-fous** :
  - Pas plus de 3 follow-ups par scénario (épuisement)
  - Pas de follow-ups qui touchent à un critère sensible
  - Toujours formulés comme des **questions de curiosité**, jamais des pièges

---

### Phase 3 — Le Miroir (5 min)

#### Objectif
Le coup de grâce contre la triche par LLM.

L'IA présente au candidat **3-4 affirmations issues de son propre profil profond** et lui demande :
- de **réagir**
- d'**expliquer**
- de **nuancer**
- éventuellement de **contester**

#### Exemple concret
*"D'après ton profil, tu as indiqué préférer des missions structurées avec un cadre clair. Mais tu as aussi décrit, dans une mise en situation, que tu prenais souvent l'initiative sans attendre validation. Comment tu réconcilies les deux ?"*

#### Pourquoi c'est anti-triche
- Le LLM ne connaît **pas** les 6 semaines de profil profond du candidat
- Cluely + oreillette **échouent** à donner une réponse cohérente
- Un candidat sans tricherie **comprendra immédiatement** sa propre nuance et expliquera

#### Mécanique
- 3-4 affirmations tirées **dynamiquement** du profil profond
- L'IA cherche les **paradoxes apparents** ou les **zones de tension** du profil
- L'évaluation porte sur la **cohérence + l'auto-connaissance**, pas la "performance"
- Toute mauvaise interprétation initiale du profil par l'IA peut être **contestée** par le candidat — et c'est un signal positif

---

### Phase 4 — Question ouverte (2 min)

#### Objectif
Le candidat reprend l'initiative. **Il pose la question.**

#### Format
*"Maintenant, c'est à toi. Pose une question à laquelle tu aimerais une vraie réponse — à propos du métier, de cette mission, de l'équipe, de toi. C'est ta question."*

#### Pourquoi c'est important
- Capture la **curiosité réelle**
- Capture la **maturité professionnelle**
- Capture l'**alignement valeurs/projet**
- Renverse la dynamique recruteur-candidat (cohérent avec notre positionnement)

---

## 3. La défense en profondeur anti-triche — 5 couches

```
                  ┌──────────────────────────────────┐
                  │  Décision finale = HUMAINE       │ ◀── jamais IA seule
                  └──────────────────────────────────┘
                                 ▲
                                 │
                                 │  ← Score agrégé "intégrité signalée"
                                 │
        ┌────────────────────────┴────────────────────────┐
        │                                                 │
   ┌────▼─────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
   │ Couche 1 │  │ Couche 2 │  │ Couche 3 │  │ Couche 4 │  │ Couche 5 │
   │          │  │          │  │          │  │          │  │          │
   │ DESIGN   │  │PROVENANCE│  │ COHÉRENCE│  │TECHNIQUE │  │ HUMAIN   │
   │ -resist. │  │  des     │  │ longi-   │  │ légère   │  │ révision │
   │ Le Miroir│  │  faits   │  │ tudinale │  │ (signal) │  │          │
   │ Follow-up│  │  CV      │  │          │  │          │  │          │
   │ adversarl│  │          │  │          │  │          │  │          │
   └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘
```

### Couche 1 — Conception (le moat)
- **Profil profond longitudinal** sur 6+ semaines
- **Le Miroir** dans l'entretien
- **Follow-ups adversariaux** générés en live

**Détection requise : aucune.** La triche est rendue inutile.

### Couche 2 — Provenance des faits
On vérifie ce qui est **vérifiable** dans le CV/profil :
- Identité (Stripe Identity ou Onfido, 1 fois Day-1)
- Employeurs (API INSEE SIRENE pour entreprises FR + LinkedIn cross-ref optionnel)
- Diplômes (réseau Diplomes.fr ou attestation employeur)
- Certifications (badges Credly, Coursera, Pix, etc.)
- Missions précédentes JOB'S ETHIC (auto-vérifié dans la plateforme)
- Numéro SIRET freelance (API INSEE)

**Ce qu'on fait des fausses déclarations détectées :**
- 1ère erreur : notification candidat, possibilité de corriger
- Récidive : suspension du compte
- Fraude avérée : ban définitif et signalement (si grave)

### Couche 3 — Cohérence longitudinale
Sur le profil profond (Acte 1 + Acte 2 + Échos), on calcule un **score de cohérence longitudinale** :
- Les réponses sont-elles cohérentes dans le temps ?
- Les choix de scénarios sont-ils cohérents avec les déclarations ?
- Y a-t-il des "pics de perfection" suspects ?

**Indicateur :** "Cohérence : élevée / standard / variable / suspecte"

**Ce qu'on en fait :**
- Aucune disqualification automatique
- Un score "variable" déclenche un follow-up plus poussé en entretien
- Un score "suspect" déclenche une **révision humaine** avant tout match prioritaire

### Couche 4 — Signaux techniques légers
**Important** : ces signaux sont **supportifs**, jamais base de décision.

Pendant l'entretien :
- **Latence de réponse** : pause >4 sec systématique = signal (Cluely round-trip)
- **Focus de fenêtre** : tab-switching détecté = signal
- **Pas de copier-coller** dans les zones de texte
- **Cohérence audio/vidéo** : lèvres alignées au son ?
- **Détection multi-voix** : autre voix faible captée ?
- **Pattern de cadence** : la cadence change drastiquement entre Phase 1 (baseline) et Phase 2 ?

**Tous ces signaux** alimentent un score "Indicateurs techniques" affiché au recruteur **avec son contexte** — jamais comme un verdict.

Exemple affichage recruteur :
> ⚠️ *Indicateurs techniques à vérifier : la cadence de parole a changé significativement entre les phases. Possibles causes : nervosité, utilisation d'un outil d'assistance, problème technique. Recommandation : posez une question de confirmation lors du call humain.*

### Couche 5 — Révision humaine
**Toute alerte significative** déclenche :
- Notification au candidat (transparence)
- Mise en file pour révision humaine sous 48h
- Le candidat peut **demander un nouvel entretien** dans des conditions différentes
- Aucun rejet **automatique** sur la base des signaux techniques

**C'est cette ligne qui nous met en conformité AI Act native.**

---

## 4. Ce qu'on ne fait JAMAIS

| ❌ Pratique | Pourquoi on refuse |
|---|---|
| Détection d'émotion en temps réel | **Interdit par l'AI Act** (€35M / 7 % CA, prohibition art. 5) |
| Analyse "physique" du candidat | Discrimination + RGPD |
| Décision automatique de rejet | Contraire à GDPR Art. 22 + AI Act |
| Notification "vous avez triché" sans révision humaine | Faux positifs ruinent une carrière |
| GPTZero ou détecteur stylométrique seul comme verdict | 20-30 % faux positifs, surtout non-natifs |
| Eye-tracking continu (gaze interno) | Disproportionné, intrusif |
| Stockage indéfini de l'enregistrement vidéo | RGPD : 30 jours max après mission ou consentement explicite renouvelé |
| Scoring de "personnalité" boîte noire | Anti-thèse de notre pilier 4 |

---

## 5. L'IA technique sous le capot

### Modèles utilisés

| Tâche | Modèle | Pourquoi |
|---|---|---|
| Génération de follow-ups | Claude Opus 4.7 (1M context) | Long contexte = profil profond complet en input |
| Reformulation fiche de poste / mission | Claude Sonnet 4.6 | Bon rapport qualité/coût |
| Voix narratrice (Acte 1 du Voyage) | ElevenLabs FR ou Wavenet Studio | Qualité premium FR |
| Speech-to-text entretien | Whisper Large v4 | Open-source, on-premise possible |
| Détection latence/cadence | Modèle interne entraîné | Custom, transparent |
| Score d'équilibre (matching) | Modèle interne (XGBoost + LLM explication) | Auditable, explicable |

### Architecture des prompts (extrait)
```
[Système]
Tu es l'IA entretien de JOB'S ETHIC. Tu poses des follow-ups adversariaux
à partir du profil profond du candidat et de sa réponse précédente.
Règles :
- Ne JAMAIS toucher à un critère sensible (genre, origine, etc.)
- Ne JAMAIS poser une question de "piège" déloyale
- Toujours formuler comme une curiosité, jamais un test
- Maximum 3 follow-ups par scénario
- Toujours respectueux, professionnel, en français correct

[Contexte profil]
{ profil_profond_json }

[Scénario en cours]
{ scenario_text }

[Dernière réponse candidat]
{ candidate_response_transcript }

[Output attendu]
1 question de follow-up courte (1-2 phrases max), naturelle, adversariale,
qui pousse le candidat à expliciter sa logique sans le mettre en difficulté.
```

### Réponse en live (latence cible)
- STT (Whisper) : <1 sec après fin de réponse
- LLM follow-up : <2 sec (streaming dès le 1er token)
- TTS narration : <1 sec (ElevenLabs streaming)
- **Total : <4 sec ressenti** entre fin de réponse candidat et début du follow-up

---

## 6. Le coût (estimation)

### Coûts unitaires entretien (V1 backed by Claude)
- Whisper STT : ~0,006 $/min × 20 min = **0,12 $**
- Claude Opus 4.7 follow-ups (20 min de contexte avec profil) : ~0,30-0,80 $
- ElevenLabs TTS narration : ~0,05 $
- Stockage vidéo 30 jours (S3 + encryption) : ~0,01 $
- **Total par entretien : ~0,50 $**

### Coûts unitaires profil profond complet
- Acte 1 + Acte 2 : pas d'IA temps réel (juste UI + logique)
- Voice narration pré-générée et cachée : ~0,10 $/utilisateur sur 6 semaines
- Score & explication : 0,05 $ par recalcul
- **Total par utilisateur : <1 $** pour le profil complet sur 1 an

### Conclusion
Avec un pricing freelance ~3-5 €/mois et un pricing recruteur 79-199 €/mois, **les marges IA sont saines** (<5 % du coût client typique).

---

## 7. Tests à passer avant lancement

### Tests internes
- [ ] 10 candidats fictifs trichent avec Cluely → détection cohérente déclenchée ?
- [ ] 10 candidats honnêtes avec accents/français non-natif → **aucun faux positif** ?
- [ ] 5 personnes handicapées (motrices, neuro) → expérience accessible ?
- [ ] 20 candidats refont l'entretien 1 mois plus tard → **consistance du profil > 80 %** ?

### Tests éthiques
- [ ] Audit de biais par un cabinet externe (Adel.io, ImpactAI, ou équivalent FR)
- [ ] Test inter-rater agreement entre 3 psychologues sur les outputs
- [ ] Test RGPD avec CNIL info-line (pas de validation officielle, mais signal)

### Tests utilisateurs
- [ ] 30 freelances vivent un entretien — NPS > 50
- [ ] 10 recruteurs reçoivent un rapport entretien — clarté > 8/10
- [ ] Le score est-il **vraiment** compréhensible sans formation ?

---

## 8. Roadmap entretien IA

### Phase 1 — Tests sans IA (Mois 1-3)
- Entretiens **menés à la main** par toi pour les 20 premiers matchs
- Apprends ce qui marche, ce qui ne marche pas
- Construis le script et la liste de scénarios

### Phase 2 — IA chat texte (Mois 4-6)
- Entretien **chat texte** asynchrone d'abord (moins risqué techniquement)
- Tests follow-ups adversariaux
- Mesure de prédictivité (le score d'entretien prédit-il la durée de mission ?)

### Phase 3 — IA vidéo asynchrone (Mois 7-9)
- Vidéo asynchrone (HireVue-style mais avec adversarial follow-ups + Le Miroir)
- Stack technique complet
- Premier audit de biais

### Phase 4 — IA vidéo synchrone (Mois 10-12)
- Entretien live (premium, optionnel)
- Latence <4 sec
- Beta privée puis open

### Phase 5 — Anti-triche niveau 2 (Mois 13-18)
- Stack technique multi-signaux raffiné
- Vérification provenance étendue
- Publication d'un livre blanc "Le moat anti-triche par conception"

---

## 9. Décisions à prendre maintenant

- [ ] **Synchrone ou asynchrone d'abord ?** Reco : **asynchrone** (plus inclusif, moins coûteux, moins anxiogène)
- [ ] **Vidéo obligatoire ou audio uniquement ?** Reco : **audio par défaut, vidéo optionnelle** (inclusif, moins anxiogène, RGPD-friendly)
- [ ] **Durée cible :** 20 min (recommandé) vs 30 min
- [ ] **Stockage des enregistrements :** 30 jours par défaut, jamais plus sans consentement explicite renouvelé
- [ ] **Provider IA principal :** Claude Opus 4.7 (1M context) — alignement avec capacités profil profond long
- [ ] **Tiers d'audit de biais :** à choisir parmi Adel.io / ImpactAI / Sopra Steria AI Ethics

---

## 10. Le message marketing

> *"Notre IA n'est pas un détecteur de triche. Elle est conçue pour que la triche ne serve à rien.*
>
> *Tu ne joues pas un rôle pendant 6 semaines.*
> *Tu ne réponds pas à des questions standards qu'un LLM connaît par cœur.*
> *Tu n'expliques pas un profil profond que seul toi as construit.*
>
> *Nous n'avons pas besoin de te traquer. Nous t'avons écouté. »*

C'est la promesse anti-triche qui retourne le discours du marché : on n'achète pas une **protection** contre la triche — on achète une **conception** qui la rend stérile.
