# 07 — Architecture technique

> **Réponse courte à "Tu construis avec quoi ?" : Next.js (React) + TypeScript + Tailwind + Supabase + Claude API. Mais on commence sans code.**

## 1. Philosophie tech

### Trois règles non-négociables
1. **Aucune ligne de code avant 50 matchs réussis à la main.** Le code coûte cher à corriger une fois écrit. La règle de la Phase 0 est sacrée.
2. **Le no-code MVP est un investissement, pas une dette.** On ne le jette pas après — on l'utilise pour valider, puis on migre proprement.
3. **L'IA est un service externe (Claude/OpenAI/ElevenLabs). On n'entraîne rien soi-même avant 6 mois et 500+ utilisateurs actifs.**

### Quatre principes de conception
1. **Server-first** — Next.js Server Components partout où c'est possible (SEO, performance, sécurité)
2. **Database-first** — le schéma Postgres est la vérité, l'app dessus
3. **AI-as-service** — pas de modèles en interne avant le scale
4. **Privacy-by-design** — chiffrement at-rest + in-transit, retention courte, audit logs

---

## 2. Roadmap technique en 5 phases

### Phase 0 — Validation manuelle (Mois 0-2)
**Pas de code.** Du tout.

| Outil | Usage |
|---|---|
| **Notion** | Base de données candidats + recruteurs + matchs |
| **Calendly** | Prise de RDV pour entretiens |
| **Google Forms** | Profilage initial (version proto du Voyage) |
| **Claude / ChatGPT** | Aide à scorer les matchs |
| **WhatsApp / Email** | Communication candidats |
| **Stripe Payment Links** | Premières factures |
| **Loom** | Démos personnalisées |

**Objectif :** 20-50 matchs faits à la main. Tu apprends ce qui marche.

### Phase 1 — MVP no-code (Mois 3-5)
**On code, mais pas vraiment.**

| Couche | Stack | Pourquoi |
|---|---|---|
| **App principale** | Bubble.io | Build visuel rapide, on apprend les flows |
| **Base de données** | Bubble (au début) ou Xano | Évite Postgres jusqu'à la migration |
| **Authentification** | Bubble auth + Stripe Identity | Onboarding ID rapide |
| **IA matching** | OpenAI API + Claude API via Bubble plugins | Pas besoin de back |
| **Stockage fichiers** | Cloudinary / Bubble storage | CVs, photos |
| **Paiements** | Stripe Checkout | Standard |
| **Email** | Resend ou Postmark | Premium, peu cher |
| **Analytics** | PostHog (self-hosted) | Privacy-friendly, RGPD-OK |

**Coût mensuel estimé :** ~150-300 €.

**Limites assumées :**
- Pas de mobile natif
- Animations limitées (acceptable pour Le Voyage v1)
- Performance OK pour < 1000 utilisateurs
- Pas de calcul lourd côté serveur

### Phase 2 — V1 production (Mois 6-9)
**On migre vers du vrai code.** Mais sans réinventer la roue.

```
┌──────────────────────────────────────────────────────┐
│                     FRONTEND                          │
│  Next.js 15 (App Router, RSC) + TypeScript           │
│  + Tailwind + shadcn/ui + Framer Motion              │
│  + Tanstack Query + Zod                              │
└──────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────┐
│                       BACKEND                          │
│  Next.js API Routes + Server Actions                 │
│  + Prisma ORM + Zod validation                       │
└──────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────┐
│                      DATABASE                          │
│  Supabase (Postgres + Auth + Storage + Realtime)     │
│  + Redis (Upstash) pour cache + queue                │
└──────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────┐
│                    SERVICES IA                         │
│  Claude API (Opus 4.7 + Sonnet 4.6)                  │
│  OpenAI embeddings (text-embedding-3)                │
│  ElevenLabs FR (voix narratrice)                     │
│  Whisper API (STT)                                   │
└──────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE                      │
│  Vercel (front + back Edge runtime)                  │
│  Supabase (DB + Auth + Storage en EU)                │
│  Cloudflare (CDN + DDoS + Workers)                   │
│  S3 EU (Scaleway pour vidéos d'entretien)            │
└──────────────────────────────────────────────────────┘
```

### Phase 3 — Scale (Mois 10-18)
**On structure pour grandir.**

Additions :
- **Service IA séparé** : Python (FastAPI) + XGBoost/LightGBM pour le moteur de matching
- **Worker async** : Inngest ou Trigger.dev pour les jobs longs (entretien processing, batch matching)
- **Cache distribué** : Redis Cluster
- **Search engine** : Typesense (pour recherche missions et profils)
- **Mobile** : **React Native (Expo) + Tamagui** — design system partagé web↔mobile à ~70 % du code via tokens unifiés. **Tamagui = la techno qui rend la promesse "même qualité partout" réelle.**
- **WebRTC entretien live** : déploiement LiveKit production (Phase 4 ouvert à tous)
- **Datawarehouse** : BigQuery EU ou Snowflake EU pour analytics + ML training

### Phase 4 — Multi-pays (Mois 18-30)
- i18n complète (français, anglais, espagnol, italien)
- Multi-tenant strict (chaque pays a sa juridiction)
- Edge cache régional (Cloudflare Workers)

### Phase 5 — Platform play (Mois 30+)
- API publique JOB'S ETHIC (profil portable consommable par tiers)
- Webhooks pour ATS partenaires
- Marketplace de modules tiers (assessments spécifiques métier)

---

## 3. Stack technique — détail

### Frontend (Phase 2+)

| Outil | Version | Pourquoi |
|---|---|---|
| **Next.js** | 15+ | RSC, Server Actions, streaming, edge |
| **React** | 19+ | Hooks modernes, concurrent rendering |
| **TypeScript** | 5.5+ (`strict: true`, zero `any`) | Sécurité de type bout-en-bout, contrat qualité top 1 % |
| **Tailwind CSS** | 4+ | Vélocité design, design tokens stricts |
| **shadcn/ui** (Radix primitives) | latest | Composants accessibles (WCAG 2.2 AA natif), customisables, **possédés** |
| **Framer Motion** | 12+ | Animations UI standards, gestures, state transitions (80 % des cas) |
| **Rive** | latest | **Animations magiques** (cartes du Voyage, transitions chapitres, Le Miroir, écran de match) — interactive, 60 fps GPU, plus léger que Lottie |
| **Howler.js** | latest | Audio engine (ambient sounds + micro-feedbacks Voyage) |
| **Tanstack Query** | 5+ | Data fetching client + cache |
| **Zod** | 3+ | Validation runtime + types statiques |
| **Lucide React** | latest | Icônes cohérentes |
| **next-intl** | latest | i18n |
| **Sonner** | latest | Toasts (calme, pas intrusif) |
| **Chromatic** | — | Visual regression sur chaque PR (bloquant CI) |

**Standards de qualité non-négociables :** voir [12-DESIGN-PREMIUM-METHODOLOGIE.md](12-DESIGN-PREMIUM-METHODOLOGIE.md). En résumé : Lighthouse ≥ 95 partout, LCP < 2s, INP < 200ms, 60 fps animations, WCAG 2.2 AA — **tout bloquant en CI**.

### Backend

| Couche | Stack | Pourquoi |
|---|---|---|
| **API** | Next.js Server Actions + API Routes | Co-location front/back, type safety end-to-end |
| **ORM** | Prisma | Type safety, migrations propres |
| **Validation** | Zod + tRPC (optionnel) | Type safety bout-en-bout |
| **Auth** | Supabase Auth + Magic Link / OTP | Standard, sécurisé, RLS Postgres |
| **Storage** | Supabase Storage (small) + S3 EU (large) | Petits fichiers vs gros (vidéos) |
| **Queue** | Inngest ou Trigger.dev | Jobs async, retries, observability |
| **Email** | Resend | API moderne, templates React |
| **SMS** | Twilio EU | Pour OTP candidats sans email |

### Base de données

**Supabase = Postgres managé en EU + Auth + Storage + Realtime.**

Pourquoi Postgres (pas Mongo, pas DynamoDB) :
- Schéma fort = sécurité des données
- Row Level Security (RLS) natif → conformité RGPD facile
- JSON natif quand on en a besoin (le profil profond peut être stocké en JSONB)
- Géographie EU contrôlée
- Open-source, pas de lock-in

**Schéma de données principal (vue simplifiée) :**
```
users (id, email, role, created_at, gdpr_consent_at, ...)
candidates (user_id, deep_profile JSONB, status, ...)
recruiters (user_id, company_siret, transparency_score, ...)
missions (id, recruiter_id, requirements JSONB, status, ...)
matches (id, candidate_id, mission_id, score, explanation, ...)
voyage_sessions (id, user_id, act, chapter, responses JSONB, timestamp)
interviews (id, candidate_id, mission_id, audio_url, transcript, follow_ups JSONB)
contestations (id, score_id, user_id, motif, status, resolution)
audit_logs (id, action, user_id, timestamp, details JSONB)
```

### Services IA & temps réel

| Service | Provider | Backup |
|---|---|---|
| **LLM principal** | Claude Opus 4.7 (1M context) | GPT-5 |
| **LLM rapide** | Claude Sonnet 4.6 | Claude Haiku 4.5 |
| **Embeddings texte** | OpenAI text-embedding-3 | Sentence-transformers self-hosted |
| **Voix synthèse** | ElevenLabs Multilingual v3 (Pro plan, voix FR clonée) | Wavenet Studio (Google) |
| **Speech-to-text** | OpenAI Whisper API | Whisper local (Phase 3+) |
| **WebRTC entretien live (V2+)** | **LiveKit** (open-source, EU-hostable, ChatGPT Voice tourne dessus) | Daily.co (SaaS, MVP plus rapide) |
| **Matching engine** | XGBoost (Python) | LightGBM |
| **Explication SHAP** | SHAP lib Python | LIME |

**Pourquoi LiveKit (vs alternatives) :**
- Open-source, hostable en EU strict (RGPD critique)
- Latence sub-300 ms validée en prod (OpenAI Voice Mode)
- SDK React + React Native officiels et top niveau
- Pricing transparent quand on passe en cloud
- Pas de vendor lock-in

**Politique de rotation :** chaque service a un fallback testé. On ne dépend pas d'un seul provider.

### Infrastructure

| Couche | Provider | Région |
|---|---|---|
| **Front + Back** | Vercel | Paris (Edge) |
| **DB** | Supabase | EU-West (Frankfurt) |
| **Storage gros** | Scaleway Object Storage | Paris |
| **CDN + DDoS** | Cloudflare | Edge mondial |
| **Queue & cron** | Inngest | EU |
| **Monitoring** | Sentry EU + PostHog | EU |
| **Logs** | Logtail EU | EU |
| **Backups** | Supabase auto + S3 EU mirror | EU |

**Toutes les données restent en EU.** C'est non-négociable (RGPD + AI Act + crédibilité).

---

## 4. Architecture des données du profil profond

Le profil profond est stocké en **JSONB Postgres** (flexible mais structuré).

```typescript
type DeepProfile = {
  version: '1.0',
  status: 'naissant' | 'decouvert' | 'mature' | 'vivant',
  acts: {
    decouverte: {
      completed_at: timestamp,
      chapters: {
        rythme:        ChapterData,
        communication: ChapterData,
        autonomie:     ChapterData,
        limites:       ChapterData,
        environnement: ChapterData,
        pression:      ChapterData,
        synthese:      ChapterData,
      }
    },
    mises_en_situation: {
      completed_at: timestamp,
      scenarios: [ScenarioResponse, ...],
    },
    echos: {
      streak: number,
      total_count: number,
      recent: [EchoResponse, ...],
    }
  },
  dimensions: {
    rythme:        { score: 0-100, confidence: 0-1, last_updated: timestamp },
    communication: { ... },
    // ... 30+ dimensions
  },
  coherence: {
    longitudinal_score: 0-100,
    flags: [],
    last_audit: timestamp,
  },
  meta: {
    locale: 'fr',
    consent_at: timestamp,
    portable_export_count: number,
  }
}
```

**Indexation :** colonnes JSONB indexées sur les dimensions principales (Postgres GIN index).

**Versioning :** chaque mise à jour du profil crée une version archivée (audit + droit à rétablir).

**Chiffrement :** colonne JSONB chiffrée at-rest via Supabase encryption layer (AES-256).

---

## 5. Architecture du matching

```
                ┌─────────────────────────────┐
                │  Mission créée par recruteur│
                └──────────────┬──────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────────┐
        │  PHASE 1 : Filtrage hard (SQL)           │
        │  - Skills minimum                        │
        │  - Disponibilité                         │
        │  - Limites incompatibles → exclusion     │
        │  - Localisation / remote                 │
        └──────────────┬───────────────────────────┘
                       │
                       │  ~ 20-200 candidats restants
                       ▼
        ┌──────────────────────────────────────────┐
        │  PHASE 2 : Scoring (Python FastAPI)      │
        │  XGBoost prédit score sur 100            │
        │  pour chaque (candidat, mission)         │
        └──────────────┬───────────────────────────┘
                       │
                       │  ~ 20-200 scores
                       ▼
        ┌──────────────────────────────────────────┐
        │  PHASE 3 : Diversification + top 3       │
        │  - Trie par score                        │
        │  - Garde top 3                           │
        │  - Si scores serrés : diversifie         │
        │    (différents styles complémentaires)   │
        └──────────────┬───────────────────────────┘
                       │
                       │  3 candidats
                       ▼
        ┌──────────────────────────────────────────┐
        │  PHASE 4 : Explication (Claude Opus)     │
        │  Input : score + SHAP values + profil    │
        │  Output : explication langage naturel    │
        │  + zones de tension + recommandation     │
        └──────────────┬───────────────────────────┘
                       │
                       │  3 candidats avec explications
                       ▼
        ┌──────────────────────────────────────────┐
        │  PHASE 5 : Présentation au recruteur     │
        │  + Logging audit                         │
        │  + Notification candidats                │
        └──────────────────────────────────────────┘
```

**Temps cible** : <5 sec total pour 3 candidats produits avec explications.

---

## 6. Architecture de l'entretien IA

### Flux temps réel (synchrone, optionnel V2+)

```
┌──────────────┐    audio stream     ┌──────────────┐
│   Candidat   │  ────────────────▶  │  Whisper API │
│   (browser)  │                     └──────┬───────┘
└──────────────┘                            │
       ▲                                    │ transcript
       │                                    ▼
       │                          ┌──────────────────┐
       │                          │  Logic engine    │
       │                          │  (Next.js API)   │
       │                          └──────┬───────────┘
       │                                 │ context complet
       │                                 ▼
       │                          ┌──────────────────┐
       │                          │  Claude Opus 4.7 │
       │                          │  generate follow │
       │                          └──────┬───────────┘
       │                                 │ follow-up text
       │                                 ▼
       │     audio response       ┌──────────────────┐
       └──────────────────────────│   ElevenLabs FR  │
                                  └──────────────────┘
```

**Latence cible** : <4 sec entre fin de réponse candidat et début audio follow-up.

### Flux asynchrone (V1, recommandé)

Plus simple :
1. Candidat enregistre ses réponses vidéo/audio (browser API)
2. Upload sur S3 EU
3. Job async (Inngest) : transcription Whisper + analyse Claude
4. Génération follow-ups texte (la session suivante reprend avec ces follow-ups)
5. Rapport généré et envoyé au recruteur

**Avantages V1 async :**
- Pas de pression latence
- Plus accessible (candidat peut réfléchir, refaire)
- Moins coûteux
- Moins anxiogène

---

## 7. Sécurité

### Authentification & autorisations
- **Supabase Auth** avec OTP email + magic links (pas de mots de passe)
- **MFA** obligatoire pour les comptes recruteurs et admin
- **Row Level Security (RLS)** Postgres natif : un user ne peut accéder qu'à ses propres données
- **JWT** côté client avec expiration courte (15 min) + refresh token

### Chiffrement
- **En transit** : TLS 1.3 partout
- **At-rest** : Supabase encryption (AES-256) + chiffrement applicatif sur colonnes sensibles (profil profond, transcriptions)
- **Secrets** : Vercel Environment Variables + 1Password Teams pour rotations

### Anti-abus
- **Rate limiting** : Upstash Ratelimit par IP + user (Next.js middleware)
- **Bot detection** : Cloudflare Turnstile sur les formulaires
- **DDoS** : Cloudflare Pro
- **Logs d'audit** complets : qui accède à quoi, quand

### Tests sécurité
- **Audit sécurité** annuel par cabinet externe (ex : YesWeHack, Synacktiv)
- **Bug bounty** dès Mois 12 (HackerOne ou YesWeHack)
- **Pentests** trimestriels sur les surfaces critiques (auth, paiement, accès profil)

---

## 8. Conformité technique (RGPD + AI Act)

### Datalake et droits utilisateur

| Droit | Implémentation technique |
|---|---|
| **Accès** | Bouton "Exporter mon profil" → ZIP (JSON + PDF) en <30 sec |
| **Rectification** | Tout le profil est éditable par l'utilisateur lui-même |
| **Effacement** | Bouton "Supprimer mon compte" → soft delete 30 jours, puis hard delete + logs |
| **Portabilité (Art. 20)** | Format JSON ouvert documenté + PDF lisible humain |
| **Limitation** | Statut "pause" du compte (pas de matching, données préservées) |
| **Opposition** | Opt-out automatique du matching publicitaire (jamais activé par défaut chez nous) |
| **Décision automatisée (Art. 22)** | Toute décision finale passe par un humain — log d'audit |

### Logs d'audit
Toutes les actions critiques sont loggées :
- Création / modification de profil
- Calcul de score (avec features et résultat)
- Envoi de match
- Lecture de profil par un recruteur
- Contestation et résolution

Stockage : Postgres dédié + S3 EU pour archives.

### DPIA (Analyse d'impact)
Un document **DPIA public** est généré dès Phase 2, mis à jour à chaque release majeure. Voir [10-ETHIQUE-RGPD-AI-ACT.md](10-ETHIQUE-RGPD-AI-ACT.md).

---

## 9. Performance & coûts (estimations)

### Performance cible (contrat top 1 %, bloquant en CI)
- **LCP** (Largest Contentful Paint) : < 2 sec en 4G
- **TTI** (Time to Interactive) : < 3 sec
- **INP** (Interaction to Next Paint) : < 200 ms
- **CLS** (Cumulative Layout Shift) : < 0,05
- **API response P95** (hors IA) : < 500 ms
- **Matching P95** : < 5 sec
- **Entretien follow-up P95** : < 4 sec (async) / < 300 ms (live WebRTC)
- **Animations** : 60 fps strict, zéro frame drop
- **Lighthouse** : ≥ 95 sur les 4 catégories (Performance / Accessibility / Best Practices / SEO)

Voir [12-DESIGN-PREMIUM-METHODOLOGIE.md](12-DESIGN-PREMIUM-METHODOLOGIE.md) pour le contrat de qualité complet.

### Coûts mensuels par phase

| Phase | Utilisateurs actifs | Coût infra | Coût IA + voix | Coût total |
|---|---|---|---|---|
| Phase 0 | 0-20 | 50 € (outils) | 30 € | **~80 €** |
| Phase 1 (no-code) | 20-200 | 200 € | 100 € | **~300 €** |
| Phase 2 (V1) | 200-2000 | 600 € (Vercel + Supabase + Chromatic) | 700 € (Claude + Whisper + ElevenLabs Pro) | **~1 300 €** |
| Phase 3 (scale + WebRTC) | 2000-10000 | 1 800 € (+ LiveKit cloud) | 3 200 € | **~5 000 €** |
| Phase 4 (multi-pays) | 10000-50000 | 5 500 € | 12 000 € | **~17 500 €** |

**Investissements one-shot top 1 %** (voir [12-DESIGN-PREMIUM-METHODOLOGIE.md](12-DESIGN-PREMIUM-METHODOLOGIE.md)) :
- Sound designer brief Phase 2 : ~5 000 €
- Studio Rive (animations Voyage) Phase 2 : ~15 000 €
- Audit accessibilité initial : ~3 000 €
- Audits accessibilité trimestriels Phase 3+ : ~3 000 €/trim

**À comparer aux revenus** : avec un revenu moyen par utilisateur actif de 30-60 €/mois, les marges restent saines >75 %.

---

## 10. Équipe tech recommandée

### Phase 0 (Mois 0-2)
- **Toi**, faisant tout. Aucune embauche.

### Phase 1 (Mois 3-5, MVP no-code)
- **Toi** + 1 freelance no-code Bubble expert (3 jours/sem)
- Total : ~3 500 €/mois en freelance

### Phase 2 (Mois 6-9, V1 production)
- **Toi** + 1 **dev fullstack Next.js senior** (CDI ou freelance long terme 5j/sem) — 7 000-9 000 €/mois
- + 1 **Senior Product Designer** (CDI ou freelance long terme 4j/sem, profil partner — voir [12-DESIGN-PREMIUM-METHODOLOGIE.md](12-DESIGN-PREMIUM-METHODOLOGIE.md) section 8) — 6 000-8 000 €/mois
- + **Sound designer** (mission 3 jours Mois 4) — 5 000 € one-shot
- + **Motion designer / Rive artist** (mission 4-6 sem Mois 5) — 15 000 € one-shot
- Total récurrent : ~13 000-17 000 €/mois + ~20 k€ one-shot

**Non-négociable pour viser le top 1 %** : le designer senior ne peut **pas** être un freelance 2j/sem qui livre des écrans Figma. C'est un partner produit qui vit avec le produit, anime les rituels qualité (Polish Friday, design system office hours — voir [12](12-DESIGN-PREMIUM-METHODOLOGIE.md) section 7), et garantit la cohérence dans le temps.

### Phase 3 (Mois 10-18, scale)
- **Toi** + équipe de 4-6 :
  - 1 lead tech fullstack
  - 1 dev frontend
  - 1 dev backend / data engineer
  - 1 ML engineer / data scientist (matching)
  - 1 designer produit senior
  - 1 product manager (peut-être toi à plein temps)
- Total : ~30 000-45 000 €/mois

### Phase 4+ : selon traction

---

## 11. Build vs Buy — décisions clés

| Composant | Build ou Buy ? | Pourquoi |
|---|---|---|
| LLM | **Buy** (Claude/GPT) | Pas de moat à entraîner notre propre LLM, focus sur les données et le profil |
| Voix synthèse | **Buy** (ElevenLabs) | Idem |
| STT | **Buy puis Build** | Whisper API d'abord, self-host Phase 3+ pour coûts et privacy |
| Embeddings | **Buy** (OpenAI) | Idem |
| Matching engine | **Build** | C'est notre moat, sur nos données propriétaires |
| Profil profond UX | **Build** | C'est le produit |
| Auth | **Buy** (Supabase) | Pas de moat |
| DB | **Buy managed** (Supabase / RDS) | Idem |
| ATS intégrations | **Build progressivement** | Selon priorisation client |
| Mobile | **Build** (RN/Expo) | Code partagé avec web |

---

## 12. Risques techniques et parades

| Risque | Probabilité | Impact | Parade |
|---|---|---|---|
| Migration no-code → code lourde | Élevée | Moyen | Migration progressive, pas big-bang |
| Coûts IA explosent à scale | Moyenne | Élevé | Caching agressif + bascule modèles moins chers au bon moment |
| Vendor lock-in Claude | Faible | Moyen | Abstraction provider + tests fallback GPT |
| Vulnérabilité RGPD identifiée | Faible | Critique | Pentests trimestriels + DPO externe |
| Données candidat fuitées | Très faible | Catastrophique | Chiffrement applicatif + bug bounty |
| Service Supabase down | Faible | Élevé | SLA + plan B (Postgres self-hosted prêt) |
| Cluely-class outil devient indétectable totalement | Élevée | Faible (par design) | Notre moat n'est pas la détection — voir [05](05-IA-ENTRETIEN-ANTITRICHE.md) |

---

## 13. Décisions à prendre maintenant

- [ ] **Choix no-code Phase 1** : Bubble (recommandé) vs Webflow + Xano vs Softr — décider sous 2 sem
- [ ] **CTO ou tech lead** : recruter pour Phase 2 ou trouver un co-fondateur tech ?
- [ ] **Provider IA principal** : Claude Opus 4.7 (recommandé pour 1M context) ou GPT-5
- [ ] **Région** : EU strict (recommandé) — vérifier que Vercel + Supabase + Cloudflare proposent une config "EU only"
- [ ] **Open-source** : on publie le profil portable schema ? (recommandé : oui, ça renforce le moat)
- [ ] **Self-hosted vs SaaS pour PostHog** : self-hosted (recommandé pour RGPD strict)

---

## 14. La vérité sur la tech

**La tech seule n'est pas le moat.**
N'importe quel dev Next.js senior peut reproduire le stack ci-dessus en 6 mois.

**Le moat est :**
1. **Le Voyage** (design d'expérience original, voix, scénarios, palette, animations Rive)
2. **La donnée propriétaire** (6+ semaines × N utilisateurs)
3. **L'audit employeur honnête** (qui dépend du brand et de l'écosystème)
4. **L'avance conformité AI Act** (Day-1 vs scramble août 2026)
5. **Le profil portable** (effet réseau candidat)
6. **Le standard de qualité top 1 %** (voir [12-DESIGN-PREMIUM-METHODOLOGIE.md](12-DESIGN-PREMIUM-METHODOLOGIE.md)) — quasiment impossible à rattraper sans 18 mois de discipline

**La tech est l'outil**, pas l'arme. On choisit Next.js + Rive + LiveKit + Tamagui parce que ce sont les outils qui **rendent le top 1 % atteignable**, pas parce qu'ils sont différenciants en soi.

> *"On ne gagne pas le marché en étant les meilleurs en tech. On gagne en ayant compris le problème humain mieux que les autres, et en l'opérant avec une tech solide qui ne casse jamais — et qui se sent magique."*
