# DEPLOY — JOB'S ETHIC

> Guide complet de déploiement, du premier push Vercel à la migration finale vers l'infra souveraine française.

---

## 📍 Architecture cible (vue d'ensemble)

```
┌─── Phase 0-1 (Mois 0-5) ──────────────────────────────┐
│                                                       │
│   Vercel (régions cdg1 Paris + fra1 Frankfurt)        │
│       Webapp Next.js — déploiement instantané         │
│                                                       │
│   + Supabase EU (Frankfurt)                           │
│   + Anthropic Claude / OpenAI / ElevenLabs            │
│   + Stripe + Resend                                   │
│                                                       │
│   Coût mensuel : ~50-150 €                           │
└───────────────────────────────────────────────────────┘
                          │
                          │  Migration Mois 6
                          ▼
┌─── Phase 2+ (Mois 6+) ────────────────────────────────┐
│                                                       │
│   Clever Cloud 🇫🇷 (Magny-Cours, France)             │
│       Webapp Next.js — sovereignty FR Day-1           │
│                                                       │
│   + Supabase EU (kept) ou migration Scaleway PG       │
│   + Scaleway Object Storage 🇫🇷 (vidéos entretien)   │
│   + Scaleway Serverless Containers 🇫🇷 (LiveKit)     │
│                                                       │
│   Coût mensuel : ~200-500 € → narrative FR puissante │
└───────────────────────────────────────────────────────┘
```

**Décision actée :** voir [`plan/07-ARCHITECTURE-TECH.md`](plan/07-ARCHITECTURE-TECH.md) pour le détail.

---

## 🚀 Étape 1 — Premier déploiement Vercel (Phase 0-1)

### 1.1 Création du projet Vercel

1. Va sur [vercel.com](https://vercel.com) et connecte-toi avec GitHub
2. Click **Add New** → **Project**
3. Importe le repo `eddiguesti/jobethic`
4. **⚠️ CRUCIAL** dans la config d'import :
   - **Root Directory** : `webapp` (clic sur "Edit" à droite)
   - **Framework Preset** : Next.js (auto-détecté)
   - **Build Command** : `next build` (auto)
   - **Output Directory** : `.next` (auto)
   - **Install Command** : `pnpm install` (auto)
5. **Environment Variables** : laisser vide pour la première deploy (l'app fonctionne sans en Phase 0)
6. Click **Deploy**

Sous 1-2 min, tu as une URL `jobethic-<hash>.vercel.app`.

### 1.2 Configuration des régions EU

Le fichier [`webapp/vercel.json`](webapp/vercel.json) est déjà commit avec :

```json
{
  "regions": ["cdg1", "fra1"]
}
```

→ Toutes les fonctions serverless tournent à Paris + Frankfurt. **Aucune donnée ne transite par les US.**

### 1.3 Headers de sécurité

`vercel.json` ajoute automatiquement :
- `X-Frame-Options: DENY` (anti-clickjacking)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security` (HSTS)
- `Permissions-Policy` (camera/micro restreints à `self` sur `/voyage/*`)

### 1.4 Domaine custom

Une fois l'app live :
1. Vercel project → **Settings** → **Domains**
2. Ajoute `jobethic.fr` (à acheter sur Gandi.net ou OVH si pas encore)
3. Configure les DNS chez ton registrar :
   - **A record** : `@` → `76.76.21.21`
   - **CNAME record** : `www` → `cname.vercel-dns.com`
4. Vercel génère automatiquement un certificat SSL Let's Encrypt
5. Update `NEXT_PUBLIC_SITE_URL` dans Vercel Env Vars : `https://jobethic.fr`

### 1.5 DPA Vercel (RGPD)

⚠️ **À faire avant de mettre des données utilisateur en production :**
1. Vercel Settings → **Billing** → **Data Processing Agreement**
2. Télécharger le DPA standard
3. Signer électroniquement (gratuit)
4. Conserver une copie pour ta DPIA publique

→ Sans ça, tu n'es pas conforme RGPD pour stocker quoi que ce soit côté users.

---

## 🔐 Étape 2 — Variables d'environnement (quand on en aura besoin)

Le fichier [`webapp/.env.example`](webapp/.env.example) documente toutes les variables.

**Phase 0-1 (aucune variable obligatoire)** : l'app tourne sans Supabase ni IA, c'est statique + localStorage.

**Phase 2 (Mois 6) — à ajouter dans Vercel Env Vars** :
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY` (embeddings + Whisper STT)
- `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`
- `INSEE_CONSUMER_KEY`, `INSEE_CONSUMER_SECRET`

**Phase 3 (Mois 12)** :
- `SCALEWAY_*` (object storage)
- `INNGEST_*` (queues)
- `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`

**Phase 4 (Mois 18, entretien IA live)** :
- `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`

⚠️ **Toujours scoper chaque variable** : `Production`, `Preview`, `Development` séparément dans Vercel.

---

## 📦 Étape 3 — Workflow dev → preview → prod

Avec le repo connecté à Vercel :

| Action git | Conséquence Vercel |
|---|---|
| `git push origin main` | Deploy production automatique |
| `git push origin feature/xyz` | Deploy preview avec URL unique |
| Pull Request ouverte | Preview deploy attaché au PR, commentaire auto |

**Préview deploys** servent à :
- Tester une feature avant merge
- Partager avec quelqu'un pour feedback (`jobethic-feature-xyz.vercel.app`)
- Vérifier que Lighthouse passe ≥95 avant prod

### Branches recommandées
- `main` → production (jobethic.fr)
- `dev` → preview permanent (dev.jobethic.fr) pour montrer aux beta-testeurs
- `feature/*` → previews éphémères

---

## 🇫🇷 Étape 4 — Migration vers Clever Cloud (Mois 6+)

### 4.1 Pourquoi migrer
- Sovereignty 100 % FR (datacenters Magny-Cours)
- Brand narrative renforcée pour les ventes B2B
- Communication PR : *"Made in France, hébergé en France"*
- Pricing prévisible à scale

### 4.2 Création du projet Clever
1. Compte sur [clever-cloud.com](https://www.clever-cloud.com)
2. **Add an application** → **Node.js** (Clever détecte Next.js)
3. Connecter le repo GitHub
4. **Configuration** :
   - Instance : XS (1 vCPU / 1 GB RAM) — à scaler ensuite
   - Region : `par` (Paris, Magny-Cours)
   - Build command : `cd webapp && pnpm install && pnpm build`
   - Start command : `cd webapp && pnpm start`
   - Node version : 22
5. **Environment variables** : recopier depuis Vercel
6. Deploy

### 4.3 Test parallèle
- Garder Vercel en production
- Clever en parallèle pendant 2-3 semaines
- Comparer performance (Lighthouse, latence)
- Vérifier que toutes les features marchent (Stripe webhooks, etc.)

### 4.4 Cutover DNS
1. Update `jobethic.fr` DNS pour pointer sur Clever
2. Garder Vercel actif 1 semaine en backup
3. Annoncer la migration sur LinkedIn (PR opportunity)

### 4.5 Décommissionnement Vercel
- Conserver le compte pour `staging.jobethic.fr` (utile pour previews)
- Ou décommissionner complètement et utiliser les previews Clever

---

## 🎥 Étape 5 — LiveKit self-host sur Scaleway (Phase 4, Mois 12-18)

### 5.1 Architecture
Quand on ship l'entretien IA live (WebRTC, sub-300ms) :

```
Browser candidat ──WebRTC──▶ Scaleway Serverless Container
                                    │
                                    ├── LiveKit server (open source)
                                    └── Whisper STT + Claude Opus 4.7
                                          │
                                          ▼
                          Webapp Next.js (Clever Cloud)
                          ▼ enregistrement vidéo (30j max)
                          Scaleway Object Storage 🇫🇷
```

### 5.2 Setup Scaleway
1. Compte sur [console.scaleway.com](https://console.scaleway.com)
2. **Project** → JOB'S ETHIC
3. **Serverless Containers** → **Create namespace** → région `fr-par`
4. Container LiveKit :
   - Image : `livekit/livekit-server:latest`
   - Port : 7880 (TCP) + UDP range
   - Memory : 2 GB
   - CPU : 1 vCPU
   - Auto-scale : 1-5 instances selon charge
5. **Object Storage** → Bucket `jobethic-interviews` région `fr-par`
6. **IAM** → générer API key/secret pour upload depuis webapp

### 5.3 Configuration Webapp
Ajouter dans Vercel/Clever env vars :
```
LIVEKIT_URL=wss://livekit.jobethic.fr
LIVEKIT_API_KEY=<from Scaleway>
LIVEKIT_API_SECRET=<from Scaleway>
SCALEWAY_BUCKET_NAME=jobethic-interviews
SCALEWAY_REGION=fr-par
```

### 5.4 Latence cible
- Sub-50ms entre user FR et serveur Paris
- Sub-300ms total tour de boucle (transcription + LLM + TTS)
- Mesure : Sentry Performance + LiveKit Cloud Analytics

---

## 🧪 Étape 6 — Vérification pré-déploiement (à chaque release prod)

Checklist avant merge sur `main` :

```bash
cd webapp

# 1. TypeScript clean
pnpm typecheck

# 2. ESLint clean
pnpm lint

# 3. Build production passe
pnpm build

# 4. Test Lighthouse en local (cible : ≥95 sur 4 catégories)
pnpm dev
# Dans Chrome DevTools → Lighthouse → Performance, A11y, Best Practices, SEO

# 5. Bundle size sous contrôle
# First load JS doit rester < 200 kB gzip
```

→ Si l'un échoue : on ne push pas. Le contrat de qualité top 1% est non négociable.

---

## 🚨 Troubleshooting

### 404 NOT_FOUND sur Vercel après deploy
→ **Cause :** Root Directory pas configuré. Settings → General → Root Directory = `webapp` → Redeploy.

### Build échoue avec "Cannot find module"
→ **Cause :** Cache stale. Settings → Caches → Clear build cache → Redeploy.

### Routes dynamiques `/voyage/[chapter]` en 404
→ **Cause :** `generateStaticParams` pas exécuté. Vérifier que le build log mentionne `/voyage/rythme`, `/voyage/communication`, etc.

### Fonts Inter / Source Serif lentes au premier load
→ **Cause :** Network EU mal cached. Vérifier `display: swap` dans `layout.tsx` (déjà set).

### LCP > 2s (Phase 2+)
→ **Causes possibles :**
- Images sans `next/image` → migrer
- Police custom → utiliser `next/font` (déjà fait)
- Bundle JS trop gros → vérifier `next-bundle-analyzer`

---

## 💰 Coûts estimés

### Phase 0-1 (Mois 0-5)
| Service | Coût |
|---|---|
| Vercel Hobby | 0 € (free tier) |
| Supabase Free (Mois 3+) | 0 € (free tier 500 MB DB) |
| Domain Gandi `jobethic.fr` | 12 €/an |
| ElevenLabs Starter (Mois 4+) | 22 €/mo |
| **Total Phase 0-1** | **~30 €/mo + 12 €/an** |

### Phase 2 (Mois 6-9)
| Service | Coût |
|---|---|
| Clever Cloud XS + Scale | 50-100 €/mo |
| Supabase Pro | 25 €/mo |
| Anthropic Claude | 50-200 €/mo (selon usage) |
| OpenAI (embeddings + Whisper) | 30-80 €/mo |
| ElevenLabs Pro | 99 €/mo |
| Stripe (fees only) | 1.4 % + 0.25 € par transaction |
| Resend | 20 €/mo |
| Sentry Team | 26 €/mo |
| **Total Phase 2** | **~300-550 €/mo** |

### Phase 4 (Mois 18+, entretien IA live)
| Service | Coût additionnel |
|---|---|
| Scaleway Containers (LiveKit) | 80-200 €/mo |
| Scaleway Object Storage | 5-30 €/mo (selon volume vidéo) |
| **Total Phase 4** | **~+100-230 €/mo** |

---

## 📚 Références

- [Plan technique complet](plan/07-ARCHITECTURE-TECH.md)
- [Plan conformité RGPD + AI Act](plan/10-ETHIQUE-RGPD-AI-ACT.md)
- [Plan KPIs & roadmap](plan/11-KPI-ROADMAP.md)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Clever Cloud](https://developers.clever-cloud.com)
- [Documentation Scaleway](https://www.scaleway.com/en/docs/)
- [Documentation LiveKit](https://docs.livekit.io)
