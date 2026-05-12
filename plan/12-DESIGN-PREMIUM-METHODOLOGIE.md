# 12 — Design premium & méthodologie top 1 %

> **C'est le fichier le plus important du pack après [01-VISION.md](01-VISION.md).**
> Il définit le **contrat de qualité** non négociable qui sépare une bonne app d'une app du top 1 %.

## 1. La barre — ce que veut dire "top 1 %"

### Les références (les apps qu'on regarde)

| App | Ce qu'elle nous apprend |
|---|---|
| **Linear** | Latence sub-100 ms, animations 60 fps, design system maniaque |
| **Arc Browser** | Audace visuelle, motion design émotionnel |
| **Superhuman** | Sensation de vitesse, polish des micro-interactions |
| **Things 3** | Élégance silencieuse, sound design discret mais présent |
| **Petit Bambou** | Voix narratrice, ambiance sonore, tempo calme |
| **Stripe** | Typo + documentation + qualité technique invisible |
| **Cron / Notion Calendar** | Densité d'information ET élégance |
| **Duolingo** | Mascotte vivante, retours visuels satisfaisants (mais ton trop bruyant pour nous) |
| **Pitch.com** | Réactivité parfaite, transitions inspirées des présentations Apple |
| **Cleo (UK)** | Voix conversationnelle, micro-animations savoureuses |

### La règle des 3 secondes

> *"En 3 secondes, l'utilisateur doit sentir que **ça change tout**."*

Test concret : un freelance ouvre l'app pour la première fois. À la fin du logo (1 s), la transition (1 s), et la première phrase de la voix off (1 s), il doit avoir un **frisson positif**. Sinon, on a raté.

Cette règle s'applique à :
- L'écran d'accueil
- Le premier jour du Voyage
- La première proposition de match (côté recruteur)
- Le premier scan d'un profil profond (côté recruteur)

---

## 2. Le contrat de qualité (non négociable)

Ces métriques sont **bloquantes en CI**. Si une PR les casse, elle ne merge pas.

### Performance web

| Métrique | Seuil | Bloquant ? |
|---|---|---|
| **LCP** (Largest Contentful Paint) sur 4G | < 2 sec | ✅ |
| **TTI** (Time to Interactive) sur 4G | < 3 sec | ✅ |
| **INP** (Interaction to Next Paint) | < 200 ms | ✅ |
| **CLS** (Cumulative Layout Shift) | < 0,05 | ✅ |
| **Lighthouse Performance** | ≥ 95 | ✅ |
| **Lighthouse Accessibility** | ≥ 95 | ✅ |
| **Lighthouse Best Practices** | ≥ 95 | ✅ |
| **Lighthouse SEO** | ≥ 95 | ✅ |
| **Bundle JS first load** | < 200 kB gzip | ✅ |
| **Animations** | 60 fps (zéro frame drop) | ✅ |

### Performance mobile (React Native)

| Métrique | Seuil | Bloquant ? |
|---|---|---|
| **Cold start** | < 2 sec | ✅ |
| **List scroll FPS** | 60 fps | ✅ |
| **Memory footprint** | < 200 MB peak | ✅ |
| **APK / IPA size** | < 30 MB | ✅ |

### Qualité de code

- ❌ Zéro `any` en TypeScript (`noImplicitAny: true`, `strict: true`)
- ❌ Zéro `@ts-ignore` ou `@ts-expect-error` sans commentaire détaillé
- ✅ End-to-end type safety (Zod validation + Prisma + tRPC ou Server Actions typées)
- ✅ ESLint strict + Prettier
- ✅ Tests visuels (Chromatic) sur chaque PR
- ✅ Tests unitaires Vitest sur la logique métier (matching, scoring)
- ✅ Tests E2E Playwright sur les flows critiques

### Accessibilité

- ✅ **WCAG 2.2 AA minimum** sur tous les écrans publics
- ✅ Navigation clavier 100 %
- ✅ Screen reader testé (NVDA, VoiceOver)
- ✅ Contraste ≥ 4,5:1 (texte normal), ≥ 3:1 (texte large)
- ✅ Sous-titres sur la voix off (Le Voyage)
- ✅ `prefers-reduced-motion` respecté
- ✅ `prefers-color-scheme` respecté
- ✅ Pas d'animation flash > 3 Hz (protection épileptie)
- ✅ Cibles tactiles ≥ 44×44 px

**Note stratégique :** WCAG 2.2 AA n'est pas juste éthique — c'est **exigé par l'AI Act** pour les systèmes haut-risque accessibles au public + c'est **un argument de vente** sur les comptes corporate (CSE-friendly).

---

## 3. Le design system

### Typographie

**Décision recommandée :**
- **Body & UI** : [Inter](https://rsms.me/inter/) (gratuit, ouvert, parfait pour le web premium FR/EN)
- **Titres & moments éditoriaux** : [Source Serif 4](https://github.com/adobe-fonts/source-serif) (gratuit, premium feel, donne le côté "voyage de découverte")
- **Mono** : [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (pour les snippets techniques)

**Alternative plus audacieuse (Phase 3+ si budget) :**
- **Body** : Söhne (Klim Type Foundry) — 1 200 €/an, signature Stripe / The New York Times
- **Headlines** : PP Editorial New (Pangram Pangram) — 350 € one-shot

### Échelle typographique
```
xs    : 12 px (legal, captions)
sm    : 14 px (secondary)
base  : 16 px (body)
lg    : 18 px (lead)
xl    : 20 px
2xl   : 24 px
3xl   : 30 px
4xl   : 36 px (page titles)
5xl   : 48 px (hero)
6xl   : 60 px (Le Voyage hero moments)
```

**Line-height** :
- Body : 1.6
- Titres : 1.1-1.2
- Lead : 1.4

**Letter-spacing** :
- Body : 0
- Caps / labels : 0.05em
- Hero : -0.02em (légèrement serré, premium)

### Palette de couleurs

#### Les 7 couleurs thématiques du Voyage (sacrées)

| Couleur | Hex | Usage |
|---|---|---|
| 🔵 Bleu rythme | `#3B82F6` (base) | Chapitre 1 — Le rythme |
| 🟢 Vert communication | `#10B981` (base) | Chapitre 2 — La communication |
| 🟡 Jaune ambre autonomie | `#F59E0B` (base) | Chapitre 3 — L'autonomie |
| 🟣 Violet limites | `#8B5CF6` (base) | Chapitre 4 — Les limites |
| 🟠 Orange environnement | `#F97316` (base) | Chapitre 5 — L'environnement |
| 🔴 Rouge pression | `#EF4444` (base) | Chapitre 6 — La pression |
| ⚪ Blanc lumière | `#FAFAFA` (base) | Chapitre 7 — La synthèse |

Chaque couleur a **5 nuances** (50, 100, 300, 500, 700, 900) pour les variations UI.

#### Neutres premium

```
Neutre 50  : #FAFAF9  (background light)
Neutre 100 : #F4F4F2
Neutre 300 : #D1D1CE
Neutre 500 : #71716E
Neutre 700 : #404040
Neutre 900 : #1A1A1A  (text dark)
```

**Pas de gris froid (#FFFFFF / #000000 pur).** Les neutres ont une **teinte chaude légère** — ça fait toute la différence en premium feel (Stripe, Linear, Apple le font).

#### Sémantique

```
Succès      : #10B981 (vert)
Attention   : #F59E0B (jaune-orange)
Tension     : #EF4444 (rouge)
Information : #3B82F6 (bleu)
```

### Espacement (4 px grid strict)

```
0.5 : 2 px   (rare)
1   : 4 px
2   : 8 px
3   : 12 px
4   : 16 px
6   : 24 px
8   : 32 px
12  : 48 px
16  : 64 px
24  : 96 px
```

Jamais d'espace en dehors de cette grille. Tailwind v4 force naturellement ça.

### Rayons (border-radius)

```
xs : 4 px   (inputs petits)
sm : 6 px   (boutons compacts)
md : 8 px   (boutons standard)
lg : 12 px  (cards)
xl : 16 px  (modals, cards premium)
2xl: 24 px  (Le Voyage cards)
full : 9999 px  (avatars, pills)
```

### Ombres (3 niveaux maximum)

```
sm  : 0 1px 2px rgba(0,0,0,0.04)
md  : 0 4px 12px rgba(0,0,0,0.08)
lg  : 0 12px 32px rgba(0,0,0,0.12)
```

**Pas d'ombres dramatiques.** Le premium feel vient de la subtilité.

### Iconographie

- **Lucide React** (par défaut, gratuit, cohérent, 1 000+ icônes)
- **Trait :** 1.5 px à 24 px de taille
- **Icônes custom** uniquement si vraiment nécessaire (Le Voyage : icônes des 7 chapitres custom recommandées)

---

## 4. Motion language — comment ça bouge

### Principes (sacrés)

1. **Physique** : tout mouvement obéit à une physique (masse, inertie, friction). Pas de linéaire.
2. **Intentionnel** : chaque animation a une **raison fonctionnelle** (orienter l'attention, indiquer un état, récompenser une action). **Pas de décoration gratuite.**
3. **Restreint** : moins, c'est plus. 60 % des sites animent trop. On vise 40 % du standard du marché.
4. **Cohérent** : même easing, même durée pour des actions similaires.
5. **Performant** : 60 fps obligatoire. Si ça ne tient pas, on simplifie.
6. **Respectueux** : `prefers-reduced-motion` désactive les animations non-essentielles.

### Easings standards

| Easing | Cubic-bezier | Usage |
|---|---|---|
| `ease-out-cubic` | `cubic-bezier(0.33, 1, 0.68, 1)` | Entrées (apparitions) |
| `ease-in-cubic` | `cubic-bezier(0.32, 0, 0.67, 0)` | Sorties (disparitions) |
| `ease-in-out-cubic` | `cubic-bezier(0.65, 0, 0.35, 1)` | Transitions d'état |
| `spring (Framer)` | `{ type: "spring", stiffness: 300, damping: 30 }` | Interactions (drag, swipe) |

### Durées standards

| Type | Durée |
|---|---|
| Micro-feedbacks (hover, tap) | 100-150 ms |
| Transitions UI standards | 200-300 ms |
| Apparitions de panneau / modal | 300-400 ms |
| Transitions de page / chapitre | 400-600 ms |
| **Maximum jamais dépassé** | **600 ms** |

Au-delà de 600 ms, l'utilisateur attend. C'est inacceptable.

### Outils

| Outil | Usage | Quand |
|---|---|---|
| **Framer Motion 12** | Transitions UI standards, state changes, gestures | 80 % des animations |
| **Rive** | Illustrations animées interactives, **cartes du Voyage**, transitions de chapitre, Le Miroir | Les moments "wow" |
| **Lottie** | Si fichier After Effects fourni par illustrateur, sinon Rive prioritaire | Cas particuliers |
| **CSS transitions** | Hovers simples, micro-interactions | 100 % des boutons / liens |

### Pourquoi Rive plutôt que Lottie

**Rive (recommandé prioritaire) :**
- ✅ Animations **interactives** (réagissent au curseur, au scroll, au swipe)
- ✅ Plus léger (~30 % vs Lottie en moyenne)
- ✅ State machines natives (les cartes du Voyage ont des états : non-débloquée → débloquée → consultée)
- ✅ Rendu GPU natif → 60 fps garanti
- ✅ Éditeur Rive gratuit, écosystème Pellet (NA) + bons illustrateurs FR sur Behance

**Lottie :**
- Sortie d'After Effects (workflow classique illustrateurs traditionnels)
- Plus lourd, pas interactif

**Conclusion :** brief Rive pour Le Voyage. Le studio à briefer doit savoir Rive (pas seulement After Effects).

### Les moments "Rive" obligatoires (Phase 2 V1)

1. **Logo intro** (1,5 sec, à l'ouverture de l'app)
2. **Cartes du Voyage** qui se révèlent (30 cartes × 30 animations uniques)
3. **Transitions entre chapitres** (couleur de l'écran qui change avec une animation thématique)
4. **L'écran de fin de chapitre** (la synthèse qui apparaît)
5. **Le Miroir** (entretien IA Phase 3) — animation cinématique
6. **L'animation de match** (côté recruteur : les 3 profils qui apparaissent en cascade)
7. **L'écran "score d'équilibre"** (le score qui se construit avec ses composants)

**Budget brief Rive :** ~12-18 k€ pour l'ensemble (un illustrateur/motion designer FL senior, 4-6 semaines).

---

## 5. Sound language — comment ça sonne

### Pourquoi le son est crucial

Le son est **le canal premium le plus négligé** des apps SaaS. C'est exactement pour ça qu'il fait la différence.

- **Petit Bambou** sans son = méditation banale
- **Headspace** sans son = app vide
- **Linear** sans le "swoosh" subtil = perte de personnalité

**Pour JOB'S ETHIC, le son est partie intégrante du Voyage.**

### Les 3 couches sonores

#### Couche 1 — Ambiance (Acte 1 Découverte)
- **1 piste ambiente par chapitre** (7 pistes)
- Couleur sonore alignée avec la couleur visuelle (rythme = piano calme, communication = cordes douces, etc.)
- Durée : 5-7 min en boucle subtile
- Volume : **< -18 LUFS** (très doux, jamais envahissant)
- Format : Ogg Vorbis 96 kbps (premium mais léger)

#### Couche 2 — Micro-feedbacks
- **Tap** (interaction validée) : 80 ms, doux
- **Swipe** (Acte 2) : whoosh court, < 150 ms
- **Carte débloquée** : un son satisfaisant, < 400 ms (style "ding cristallin" de Things 3)
- **Transition entre chapitres** : 600 ms, signature du Voyage
- **Erreur / annulation** : son neutre, jamais agressif

Total : **5-6 sons custom**. Pas plus.

#### Couche 3 — Voix narratrice (Acte 1 + Le Miroir)
- **ElevenLabs Multilingual v3** ou voix française clonée (Phase 2+)
- Style : féminine, chaleureuse, calme, intelligence sensible (référence : Cécile Coulon ou Laure Adler dans le ton, pas dans la voix)
- Alternative : voix neutre IA premium **non-genrée** (recommandée pour inclusivité)
- **Toujours sous-titrée** (accessibilité + utilisation silencieuse)
- **Toujours désactivable** (préférence utilisateur)

### Brief sound designer

**Profil :** sound designer freelance FR avec un portfolio d'apps premium (chercher sur **Soundcloud**, **Behance**, **Hidden Volume FR**, **Studio Akwa**, **Loop4**)

**Durée brief :** 3 jours de mission
**Livrables :**
- 7 ambient tracks (chapitres du Voyage)
- 5-6 sons micro-feedback
- 1 son signature (logo audio JOB'S ETHIC, 2-3 sec)

**Budget :** 4 000 - 6 000 € total

---

## 6. Accessibilité = AI Act + RGPD asset

L'accessibilité n'est pas un coût — c'est **stratégique** :

| Bénéfice | Pourquoi |
|---|---|
| **WCAG 2.2 AA** | Obligation prochaine (Acte européen sur l'accessibilité 2025 + AI Act) |
| **Anti-discrimination** | Auditable, démontrable en cas de plainte CNIL |
| **Plus grand marché** | 15 % de la population a un handicap (visuel, moteur, cognitif) |
| **Cluely-handicap-defense** | Sans accessibilité, on tombe sur Mobley v. Workday (procès Pymetrics) |
| **CSE-friendly** | Argument de vente B2B |

### Implémentation pragmatique

- **Radix UI primitives** sous shadcn/ui — accessibilité native, ARIA correct par défaut
- **eslint-plugin-jsx-a11y** strict
- **Tests Lighthouse automatique** en CI
- **Audit manuel trimestriel** (cabinet externe : Tanaguru, Access42 — ~3 k€)
- **Page "Notre engagement accessibilité"** sur le site

---

## 7. Les rituels qualité (la méthodologie)

### Rituel 1 — Polish Friday (hebdomadaire, 2h)
Tous les vendredis 15h-17h, **toute l'équipe produit** :
- Revue des 5 plus gros gaps de polish de la semaine
- Correction immédiate de 3 d'entre eux
- 1 démo de "ce qui se sent premium maintenant"

**Pourquoi :** une équipe qui ne polish pas chaque semaine **dérive vers le médiocre** en 6 mois sans s'en rendre compte.

### Rituel 2 — Design system office hours (hebdomadaire, 1h)
Tous les mercredis 11h-12h, **designer + tech lead** :
- Toute nouvelle composante UI proposée passe par ce filtre
- Vérification cohérence avec le system
- Mise à jour de la doc (Storybook)

### Rituel 3 — Performance budget review (mensuel, 2h)
Premier lundi du mois, **équipe tech** :
- Revue des métriques Web Vitals
- Identification des régressions
- Plan de correction sous 2 semaines

### Rituel 4 — Audit design system (trimestriel, 1 jour)
- Composants ajoutés sans process → harmonisation
- Couleurs / espacements / typo : drift à corriger
- Storybook à jour

### Rituel 5 — Audit accessibilité (trimestriel, 2 jours)
- Test screen reader
- Test navigation clavier complète
- Audit visuel (contrastes, tailles)
- Test utilisateur avec personne en situation de handicap

### Rituel 6 — Visual regression sur chaque PR
- Chromatic exécute des snapshots
- Tout changement visuel non-intentionnel = rejet automatique
- Coût : ~150 €/mois Chromatic Starter

### Rituel 7 — User testing mensuel (1 jour, à partir Mois 6)
- 5 utilisateurs (3 freelances + 2 recruteurs)
- Tâches structurées
- Quantitatif (SUS score) + qualitatif (verbatim)
- Synthèse partagée à toute l'équipe

---

## 8. L'équipe qualité (top 1 % hiring)

### Senior Product Designer (CDI Mois 6 — non négociable pour top 1 %)

**Profil idéal :**
- 7-10 ans d'expérience, dont 3+ en startup SaaS premium
- Portfolio : produit utilisé par des humains, pas juste de jolis dribbble
- Maîtrise Figma + Rive + Framer + design tokens
- Sens du système (pas juste de l'écran)
- Capable d'animer en motion (pas juste statique)
- Sensibilité FR (culture, typographie, ton)

**Où chercher :**
- Anciens de **Datadog**, **Algolia**, **Doctolib**, **PayFit**, **Qonto**, **Aircall**, **Pennylane**
- Communautés : **Designers FR Discord**, **France Design Week**, **Maze community**
- Recrutement : **Klint** (FR-spec design), **Wuhao**, **Hexa**

**Package :**
- 70-100 k€ + equity (0,3-0,7 %)
- Ou freelance long terme 4 jours/sem : 6 000 - 8 000 €/mois

### Sound Designer (mission, Mois 4)
3 jours de mission, voir section 5.

### Motion Designer / Rive Artist (mission, Mois 5)
4-6 semaines de mission Rive, voir section 4.

### Frontend Engineer Senior (CDI Mois 7)
- 5+ ans Next.js / React
- Portfolio : a shippé une app premium en production
- Obsession latence + accessibilité
- Profil : ex-Doctolib / Vercel / Linear / Front / Datadog
- Package : 75-95 k€ + equity

---

## 9. Le framework "ship vs polish" — comment décider

### Règle des 4 surfaces

| Surface | Niveau de polish requis |
|---|---|
| **Surface publique** (homepage, Le Voyage Acte 1, entretien IA, score affiché au recruteur) | **Top 1 %**, sans compromis |
| **Surface engagement** (dashboard candidat, dashboard recruteur, chat) | **Premium**, polish réguliére |
| **Surface utilitaire** (paramètres, factures, exports) | **Pragmatique**, fonctionnel propre |
| **Surface admin / interne** | **Fonctionnel**, pas de polish |

### Allocation de temps en sprint
- **30 % du temps** réservé au polish (bug visuels, micro-interactions, transitions)
- **40 % features nouvelles**
- **20 % dette technique**
- **10 % bugs critiques**

Si on dérive vers 5 % de polish pendant 2 sprints consécutifs, **alerte rouge** — on stoppe les features pour 1 sprint complet de polish.

### Critères "bug vs gap"

- **Bug** = quelque chose qui ne marche pas comme prévu → ship la correction
- **Gap de polish** = quelque chose qui marche mais ne sent pas premium → traité en Polish Friday
- **Régression de polish** = quelque chose qui était premium et l'est moins → bug, ship la correction

---

## 10. Ce qu'on ne compromet JAMAIS

| Sujet | Standard |
|---|---|
| **Type safety** | `strict: true`, jamais `any` |
| **Performance budget** | Bloquant en CI |
| **Accessibilité WCAG 2.2 AA** | Bloquant en CI |
| **Framerate animations** | 60 fps, jamais moins |
| **Typographie & spacing** | Tailwind v4 strict |
| **Cohérence sonore** | Audit trimestriel |
| **Voix narratrice** | Premium uniquement (ElevenLabs Pro min) |
| **EU-only hosting** | Toujours (RGPD + AI Act + brand) |
| **Design system token** | Pas de hex en dur dans le code |

---

## 11. Les premières décisions (à prendre Mois 1-2)

### Décision 1 — Typographie
☐ **Inter + Source Serif 4** (recommandé Phase 1-2, gratuit)
☐ Söhne + PP Editorial New (Phase 3+, ~2 000 €/an)

### Décision 2 — Motion : Rive ou Lottie ?
☐ **Rive** (recommandé, interactif, GPU-natif, écosystème jeune mais mûr)
☐ Lottie (workflow After Effects classique, moins interactif)

### Décision 3 — Mobile cross-platform
☐ **React Native + Tamagui** (recommandé, design system partagé web↔mobile)
☐ React Native + StyleSheet (plus simple, moins de partage)
☐ Native iOS (Swift) + Android (Kotlin) — top polish mais 2× le coût, à reconsidérer si on lève bien

### Décision 4 — WebRTC pour entretien live
☐ **LiveKit** (open-source, EU-hostable, ChatGPT Voice tourne dessus)
☐ Daily.co (SaaS, MVP plus rapide, pricing OK)

### Décision 5 — Sound designer
☐ **Brief Mois 4** (recommandé, en parallèle du build Voyage Acte 1)
☐ Brief Mois 6+ (économise 4 000 € MAIS le Voyage sera silencieux jusque là)

### Décision 6 — Designer senior
☐ **CDI dès Mois 6** (recommandé top 1 %)
☐ Freelance long terme 4j/sem (compromis acceptable)
☐ Freelance 2j/sem (insuffisant pour top 1 %)

---

## 12. Budget qualité (incrémental vs plan initial)

### Investissement Phase 2 (Mois 6-9)

| Item | Coût | Récurrent / one-shot |
|---|---|---|
| Sound designer brief | 5 000 € | One-shot |
| Studio Rive (animations Voyage) | 15 000 € | One-shot |
| Voix narratrice (ElevenLabs Pro + tests) | 200 € | One-shot |
| Audit accessibilité initial | 3 000 € | One-shot |
| Chromatic visual testing | 1 800 € | Annuel (~150 €/mois) |
| **Total Phase 2 one-shot** | **~25 k€** | |
| Designer senior CDI (à partir Mois 6) | 7 500 €/mois | Récurrent |

### Investissement Phase 3 (Mois 10-18)

| Item | Coût |
|---|---|
| Audits accessibilité trimestriels | 3 000 € × 3 = 9 000 € |
| Motion designer (extensions Acte 2 + 3) | 8 000 € |
| Sound updates (Acte 3 Échos) | 2 000 € |
| User testing mensuel (à partir Mois 6) | 600 € × 9 = 5 400 € |
| **Total Phase 3** | **~25 k€ + récurrents** |

### Justification de cet investissement

À comparer aux ~150-200 k€ de **revenus année 1** projetés :
- 50 k€ d'investissement qualité Phase 2-3
- C'est ~10-15 % des revenus
- C'est ce qui distingue le top 1 % du top 10 %
- C'est ce qui justifie un pricing premium (199 € test, 79-199 €/mois)
- C'est ce qui rend le **NPS > 60** atteignable

**Sans cet investissement, on est une bonne app. Avec, on est mémorable.**

---

## 13. La promesse à se faire (et à graver)

> **On ne shippe pas ce qu'on ne ferait pas voir à nos parents le jour du lancement.**
>
> **On ne lance pas une feature qu'on serait gêné de démo à un investisseur de Linear ou Stripe.**
>
> **Chaque écran qu'un utilisateur voit pour la première fois lui doit un frisson — pas une indifférence.**

C'est le contrat. Tout le reste découle de là.

---

## 14. Mesurer la qualité (les KPIs de polish)

| KPI | Cible Mois 12 | Mesure |
|---|---|---|
| Lighthouse Performance | ≥ 95 | CI automatique |
| Lighthouse Accessibility | ≥ 95 | CI automatique |
| Web Vitals (p75) LCP | < 2 sec | Vercel Analytics |
| INP p75 | < 200 ms | Vercel Analytics |
| Visual regression rejets (PRs) | < 5 % | Chromatic |
| SUS Score (System Usability Scale) | ≥ 80 | User testing mensuel |
| NPS premium feel "Quelle est la qualité perçue ?" | ≥ 60 | Survey trimestriel |
| Animation frame drops | 0 par session | Sentry performance |
| Plaintes accessibilité | 0 | Support |
| Audit accessibilité trimestriel | 100 % WCAG AA | Cabinet externe |

---

## 15. Conclusion

Le **top 1 %** n'est ni un langage ni une stack — c'est une **discipline quotidienne** soutenue par les bons outils.

Notre discipline :
- **Rive** pour la magie visuelle
- **ElevenLabs + sound design** pour l'oreille
- **Performance budget contractuel** pour la rapidité
- **WCAG 2.2 AA** pour l'inclusion
- **Designer senior partner** pour la cohérence
- **Polish Friday hebdo** pour ne pas dériver

Si on tient cette ligne pendant 18 mois, on n'aura pas seulement une app du top 1 %. On aura **changé ce qu'est une app de recrutement**.

> *"La qualité, c'est ce qui reste quand on a oublié les autres détails."*
