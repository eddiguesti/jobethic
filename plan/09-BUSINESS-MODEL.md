# 09 — Business model

> **Principe :** revenus diversifiés mais **simples**. Premium par défaut. Pas de monétisation des données.

## 1. Les 3 piliers de revenus

```
                  REVENU JOB'S ETHIC
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼─────┐    ┌─────▼─────┐    ┌────▼─────┐
   │  FRAIS   │    │ ABONNEMENT│    │COMMISSION│
   │  DE MISE │    │ RECRUTEUR │    │   SUR    │
   │ EN REL.  │    │ PREMIUM   │    │ MISSION  │
   └──────────┘    └───────────┘    └──────────┘
   199 € fixe      49-199 €/mois     5-10 % HT
   par mission     selon plan        sur la mission
                                     (côté recruteur)
```

### Pourquoi 3 sources, pas 1
- **Frais de mise en relation** = ancrage psychologique (le recruteur a payé, il a investi)
- **Abonnement** = MRR prévisible, fidélisation, accès récurrent
- **Commission** = aligned incentive (on gagne quand la mission marche)

---

## 2. Pricing par cible

### Côté recruteur (PME / startup)

| Plan | Prix | Pour qui | Inclut |
|---|---|---|---|
| **Test** | **199 €** par mise en relation | 1ère mission seulement | 3 profils en 48h, audit employeur, support |
| **Standard** | **79 €/mois** | PME 5-50 salariés | 3 missions/mois en simultané, audit illimité, dashboard |
| **Pro** | **199 €/mois** | PME 50-200 salariés | 10 missions/mois, profil employeur multi-équipes, API ATS |
| **Entreprise** | **sur devis** (≥ 599 €/mois) | 200+ salariés | Multi-équipes illimité, intégrations custom, account manager dédié |

### Commission sur la mission (côté recruteur uniquement, jamais côté freelance)

| Type | Taux | Sur |
|---|---|---|
| Mission freelance ponctuelle | **8 %** HT | Sur le montant total facturé par le freelance |
| Mission freelance récurrente (>3 mois) | **5 %** HT | À partir du 4ème mois — fidélisation récompensée |
| Mission abandonnée < 30 jours | **remboursement 50 %** | Garantie satisfait/remplacé |

**Règle d'or :** **on ne prélève JAMAIS de commission au freelance.** Notre modèle est aligné avec le freelance, on ne grignote pas son tarif.

### Côté freelance

| Plan | Prix | Inclut |
|---|---|---|
| **Gratuit** (toujours) | **0 €/mois** | Profil profond complet, recevoir des missions, chat, contestation |
| **Premium freelance** | **9,90 €/mois** (optionnel) | Visibilité prioritaire, statistiques détaillées, export PDF premium, badge "Top profil" |

**Le freelance ne paye jamais pour être trouvé.** Le freelance optionnellement paye pour être **mieux** trouvé.

---

## 3. Pourquoi ce pricing

### Le 199 € test
- **Ancrage premium** : 199 € filtre les recruteurs sérieux
- **Coût d'opportunité justifié** : 1-2 jours de tri économisés = 500-1000 € équivalent salaire CEO
- **Friction acceptable** : assez bas pour tester, assez haut pour engager
- **Marge saine** : sur 199 € on a ~150 € de marge brute après IA + paiement

### Le 79 €/mois Standard
- **Prix d'entrée commun** : équivalent à un abonnement SaaS B2B léger
- **Inférieur à Welcome to the Jungle** (€150-300/mois pour les fonctions ATS)
- **Inférieur à AssessFirst SMB** (~€250-700/mois)
- **Supérieur à Malt** (gratuit mais peu de valeur)
- **Objectif** : 70 % des recruteurs choisissent ce plan

### Le 199 €/mois Pro
- **Cible** : startups Series A+ qui font 5-10 recrutements/an
- **Marge** : si 1 mission/mois aboutit, l'abonnement est déjà rentabilisé pour eux
- **Comparaison** : équivalent à 2-3h d'un cabinet RH

### La commission 8 %
- **Inférieure** à Malt freelance side (10 % + 5 % client)
- **Aligned incentive** : on gagne si la mission marche
- **Cap optionnel** à 800 €/mois sur missions longues pour ne pas devenir injuste

---

## 4. Unit economics

### Mission moyenne — hypothèses
- Mission VA/ops freelance moyenne : **3 mois × 3 000 €/mois HT = 9 000 €** de facturation freelance
- Commission JOB'S ETHIC : 8 % les 3 premiers mois + 5 % au-delà = **~720 €** + frais de mise en relation 199 € = **~920 €** par mission
- Coût acquisition recruteur (Phase 1) : **150-300 €** (outbound humain)
- Coût acquisition freelance : **50-100 €** (organic + LinkedIn)
- **Coût IA + infra par mission** : ~5-10 €

### LTV par recruteur (cible)
- Premier match payant : 199 € + ~720 € = **~920 €**
- 2ème mission (statistiquement 30 % des cas) : ~720 € (commission seule)
- Abonnement (50 % des recruteurs y passent) : 79 € × 18 mois moyen = **~1 400 €**
- **LTV moyen recruteur (mix) : ~1 800-2 500 €**

### LTV par freelance (cible)
- Premium 25 % conversion × 9,90 €/mois × 24 mois = **~60 €**
- Pas de commission directe au freelance
- **LTV moyen freelance : ~50-100 €** (faible mais le freelance est notre **levier de qualité**, pas notre source de revenu)

### CAC blended (cible Phase 2)
- CAC recruteur : ~250 € (Phase 2)
- **LTV/CAC recruteur : ~8x** (très sain pour B2B)

### Marges
- **Marge brute** par mission : ~85 % (après coûts IA + paiement Stripe)
- **Marge contributive** (après CAC) : ~70 %
- **Marge nette** à scale Phase 3 : 25-35 % (équipe + opex)

---

## 5. Projections financières

### Scénario réaliste (median)

| Mois | Missions actives | MRR récurrent | One-shot | Revenu total mois |
|---|---|---|---|---|
| Mois 3 | 25 | 800 € | 3 000 € (15×199 €) | **3 800 €** |
| Mois 6 | 60 | 3 500 € | 8 000 € | **11 500 €** |
| Mois 12 | 180 | 14 000 € | 20 000 € | **34 000 €** |
| Mois 18 | 350 | 32 000 € | 35 000 € | **67 000 €** |
| Mois 24 | 600 | 60 000 € | 55 000 € | **115 000 €** |

**Année 1 cumulé : ~150-200 k€**
**Année 2 cumulé : ~700-900 k€**
**Année 3 cumulé : ~2-3 M€** (scenario réaliste, sans levée massive)

### Scénario ambitieux (avec levée Mois 9-12)

| Mois | MRR | Revenu mois | Cum revenue |
|---|---|---|---|
| Mois 24 | 150 k€ | 250 k€ | 3 M€ |
| Mois 36 | 400 k€ | 650 k€ | 9 M€ |

---

## 6. Le modèle de revenus alternatifs (Phase 3+)

### Source 4 — Données agrégées (Phase 3+)
**Vente de rapports anonymisés** :
- *"État du recrutement freelance ops en France 2027"*
- *"Top 10 des compatibilités équipes / freelances"*
- *"Tendances de mobilité par région"*

**Pricing** : 1 200-5 000 € le rapport one-shot.
**Volume** : ~10-30 rapports/an = 50-100 k€/an de revenu auxiliaire.
**Risque éthique** : seulement données **anonymisées et agrégées**. Jamais d'identification individuelle.

### Source 5 — API publique (Phase 4+)
**Tarification d'accès à l'API** pour :
- ATS partenaires qui consomment les profils JOB'S ETHIC
- Cabinets RH qui veulent enrichir leurs propres process
- Universités / écoles qui veulent un assessment éthique pour leurs étudiants

**Pricing** : 990-9 900 €/mois selon volume.

### Source 6 — Marketplace de modules tiers (Phase 5+)
**Modules complémentaires** :
- Test compétences techniques (CoderPad-like) intégré
- Test de langue (à l'image de iTalki)
- Coaching premium par humain
- Vérification background (à la Veremark)

**Modèle** : commission 20-30 % sur les revenus tiers.

---

## 7. Ce qu'on ne fera JAMAIS

| ❌ Source de revenu refusée | Pourquoi |
|---|---|
| **Vente des données candidats** (même anonymisées sans consentement explicite) | Trahison du pilier 5 |
| **Promotion sponsorisée** d'un profil par-dessus le score réel | Trahison du matching |
| **Publicité ciblée intrusive** dans l'app | Anti-thèse du brand |
| **Affichage publicitaire de tiers** | Idem |
| **Commission cachée au candidat** | Casser l'alignement |
| **Boost payant** style Tinder ("vous ne plaisez pas, payez pour être vu") | Modèle toxique |
| **Test psychométrique premium** vendu à l'entreprise sans accord candidat | RGPD |
| **Vendre l'app à un GAFAM** sans clause de protection des données utilisateurs | Trahison |

---

## 8. Stratégie de pricing dans le temps

### Phase 0-1 (Mois 0-5)
- **Frais test 199 € uniquement** (pas d'abonnement encore)
- Commission optionnelle 5-10 % négociée au cas par cas
- Objectif : preuve de valeur

### Phase 2 (Mois 6-9)
- **Frais test 199 €** + **abonnement Standard 79 €/mois** + commission 8 %
- Promo lancement : -50 % sur 3 premiers mois pour les 100 premiers recruteurs

### Phase 3 (Mois 10-18)
- Plein pricing
- Test du plan Pro 199 €/mois
- Premium freelance 9,90 €/mois

### Phase 4 (Mois 18-24)
- Pricing **dynamique** par mission selon urgence et rareté du profil (style Uber, sans dérive)
- Test du plan Entreprise

### Pricing dynamique — détail (Phase 4+)
- Mission urgente (<7 jours) : +30 % sur commission
- Profil rare (compétences pointues) : +20 % sur commission
- Mission longue (>12 mois) : -25 % sur commission
- Mission récurrente avec même freelance : -50 % à partir du 4ème mois

**Affichage transparent** : le recruteur voit toujours le calcul. Pas d'effet "tarif fluctuant inconnu".

---

## 9. Politique de remboursement

### Garantie satisfait ou remplacé
- Si la mission s'arrête dans les **30 premiers jours** pour cause de mauvais match (audit JOB'S ETHIC), remboursement de **50 %** des frais + **proposition de 3 nouveaux profils**.
- Si dans les **15 premiers jours** : remboursement **100 %**.

### Garantie freelance
- Si le freelance vit un environnement très différent de celui annoncé par le recruteur (audit JOB'S ETHIC), il peut **rompre la mission sans conséquence** + le recruteur perd 100 % de transparence employeur.

### Ces garanties sont fortes mais possibles parce que :
- Le matching est meilleur, donc le taux d'échec est faible (anticipé < 15 %)
- L'audit côté JOB'S ETHIC qualifie objectivement la responsabilité
- Le coût d'un remboursement (~200 €) est très faible vs la valeur brand d'une promesse tenue

---

## 10. Pricing communication

### Sur la page d'accueil

```
                  PME / STARTUPS
                  ─────────────

        TEST 1ÈRE MISSION
        199 €
        ─────────────
        3 profils en 48h
        Audit employeur inclus
        Garantie remplacement 30j
        Pas d'engagement

        [DÉMARRER]


        STANDARD
        79 €/mois
        ─────────────
        Tout du Test
        + 3 missions simultanées
        + Dashboard équipe
        + Stats matching


        PRO
        199 €/mois
        ─────────────
        Tout du Standard
        + 10 missions simultanées
        + Multi-équipes
        + API ATS basique
        + Support prioritaire


                  FREELANCES
                  ───────────

        GRATUIT
        0 €/mois — toujours
        ─────────────
        Profil profond complet
        Missions adaptées
        Chat illimité
        Profil portable

        [REJOINDRE]
```

### Le messaging

- **« Vous payez quand on réussit. »**
- **« Pas de coût caché. Pas de commission au freelance. »**
- **« 199 € pour ne plus perdre 1 200 € de votre temps. »**
- **« Pour le freelance, c'est gratuit. Toujours. »**

---

## 11. Modèle financial — pre-seed pitch

### Hypothèses (conservateur, intègre l'investissement qualité top 1 %)
- Phase 1 (Mois 0-5) : revenus 5 k€ cumulés, dépenses ~25 k€ → **-20 k€**
- Phase 2 (Mois 6-9) : revenus 30 k€ cumulés, dépenses ~130 k€ (incl. ~25 k€ one-shot design/Rive/sound + Senior Designer CDI démarré) → **-100 k€**
- Phase 3 (Mois 10-18) : revenus 350 k€ cumulés, dépenses ~700 k€ (équipe complète + audits) → **-350 k€**
- Phase 4 (Mois 18-24) : revenus 800 k€ cumulés, dépenses ~1,3 M€ → **-500 k€**

**Total burn 24 mois : ~970 k€**
**Levée pre-seed cible : 1 - 1,2 M€ → ~24 mois de runway**

> **Augmentation vs plan initial : +250 k€ sur 24 mois pour financer le standard top 1 %.**
> C'est ~25 % du burn — l'investissement qualité qui justifie un pricing premium, un NPS > 60, et la différenciation durable. Sans cet investissement, on tombe au niveau "bonne app", on perd la promesse, et on n'est pas re-fondable en Seed.

### Détail Phase 2 (investissement top 1 %)

| Item | Coût | Type |
|---|---|---|
| Sound designer brief (3 jours) | 5 000 € | One-shot |
| Studio Rive (animations Voyage Acte 1) | 15 000 € | One-shot |
| ElevenLabs Pro (voix narratrice) | 100 €/mois | Récurrent |
| Audit accessibilité initial | 3 000 € | One-shot |
| Chromatic (visual regression) | 150 €/mois | Récurrent |
| Senior Product Designer (Mois 6+, 4j/sem FL) | 7 000 €/mois | Récurrent |
| **One-shot Phase 2 total** | **~25 k€** | |
| **Récurrent ajouté** | **~7 250 €/mois** | |

### Détail Phase 3 (investissement qualité maintenu)

| Item | Coût |
|---|---|
| Senior Designer CDI (passé en CDI Mois 12) | ~7 500 €/mois |
| Motion designer extensions (Acte 2 + 3) | 8 000 € one-shot Mois 13 |
| Sound updates (Acte 3 Échos) | 2 000 € one-shot Mois 14 |
| Audits accessibilité trimestriels | 3 000 € × 3 = 9 000 € |
| User testing mensuel | 600 € × 9 = 5 400 € |
| Frontend engineer senior (CDI Mois 12+) | ~7 500 €/mois |
| **Total Phase 3** | **~25 k€ one-shot + récurrents** |

### Métriques à présenter (Mois 6, pour pre-seed)
- ARR run-rate : 60-150 k€
- Active customers : 30-50 PME, 100+ freelances
- Retention recruteur 6 mois : > 70 %
- LTV/CAC : > 3x
- Mission duration vs marché : > 1,5x (la preuve)

---

## 12. Décisions à prendre maintenant

- [ ] **Modèle de paiement** : Stripe (recommandé) vs Stancer (FR), GoCardless pour SEPA
- [ ] **Politique factures** : facturation freelance via JOB'S ETHIC (recommandé pour transparence) ou facturation directe avec commission séparée
- [ ] **Pricing exact des plans** : valider en B2B testing (200 € test plutôt que 199 ? 99 €/mois plutôt que 79 ?)
- [ ] **Garantie 30 jours** : 50 % ou 100 % de remboursement ? (recommandé : tiered 100 % à 15j, 50 % à 30j)
- [ ] **Commission freelance** : confirmer 8 % puis 5 % (vs 10 % flat ou 6 % flat) — tester
- [ ] **Free trial recruteur ?** Pas recommandé Phase 1-2 (filtre serieux), à reconsidérer Phase 3
