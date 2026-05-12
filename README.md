# JOB'S ETHIC

> *On ne cherche plus un job. On trouve la bonne collaboration.*

JOB'S ETHIC est un **moteur d'équilibre professionnel** pour le marché français : on remplace le CV par un **profil profond longitudinal** (Le Voyage, 5 min/jour × 6 semaines), on profile aussi sérieusement le **recruteur**, et notre IA explique la compatibilité — jamais ne décide à la place de l'humain.

**Standard d'exécution :** top 1 % des apps mondiales (Linear / Arc / Stripe / Petit Bambou level). Voir [`plan/12-DESIGN-PREMIUM-METHODOLOGIE.md`](plan/12-DESIGN-PREMIUM-METHODOLOGIE.md).

---

## 📁 Structure du repo

```
JobEthic/
├── plan/                                    Plan complet (12 fichiers MD)
│   ├── 00-README.md                         Index navigable
│   ├── 01-VISION.md
│   ├── 02-MARCHE-CONCURRENCE.md
│   ├── 03-PRODUIT-CORE.md
│   ├── 04-PROFIL-PROFOND.md                 Le Voyage (gamification)
│   ├── 05-IA-ENTRETIEN-ANTITRICHE.md
│   ├── 06-MATCHING-EQUILIBRE.md
│   ├── 07-ARCHITECTURE-TECH.md
│   ├── 08-GTM-LANCEMENT.md
│   ├── 09-BUSINESS-MODEL.md
│   ├── 10-ETHIQUE-RGPD-AI-ACT.md
│   ├── 11-KPI-ROADMAP.md
│   └── 12-DESIGN-PREMIUM-METHODOLOGIE.md    Contrat qualité top 1 %
│
├── webapp/                                  Application Next.js 16 + React 19
│   ├── src/
│   │   └── app/                             App Router
│   ├── public/
│   └── package.json
│
└── *.odt / *.docx                           Documents source originaux (FR)
```

---

## 🛠 Stack technique

| Couche | Techno |
|---|---|
| Frontend | Next.js 16 (App Router, RSC) + React 19 + TypeScript strict |
| Style | Tailwind CSS v4 + shadcn/ui |
| Animations | Framer Motion 12 + Rive (magie visuelle) |
| Audio | Howler.js + ElevenLabs (voix narratrice) |
| DB | Supabase (Postgres + Auth + Storage en EU) |
| IA | Claude Opus 4.7 (1M context) + Whisper + ElevenLabs |
| Live (entretien V2) | LiveKit (WebRTC, sub-300ms) |
| Mobile (Phase 3) | React Native (Expo) + Tamagui |
| Hosting | Vercel EU + Cloudflare |

**Tout en EU strict.** AI Act + RGPD natif.

---

## 🚀 Démarrer en local

```bash
cd webapp
pnpm install
pnpm dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

---

## 📜 Engagements

- **L'IA explique, l'humain décide** — jamais de décision finale automatisée
- **Le candidat possède son profil** — RGPD Art. 20 weaponisé
- **L'employeur est profilé aussi** — équilibre, pas matching unilatéral
- **WCAG 2.2 AA** dès le Day-1
- **Aucune reconnaissance d'émotion** — interdit par l'AI Act
- **Lighthouse ≥ 95** sur toutes les surfaces publiques (bloquant en CI)

---

## 📍 Status

🚧 **Phase 0 — Validation manuelle (Mois 0-2)**
Les premiers matchs se font à la main. Le code est en construction en parallèle pour avoir des fondations propres. Voir [`plan/08-GTM-LANCEMENT.md`](plan/08-GTM-LANCEMENT.md).

---

© 2026 JOB'S ETHIC — Tous droits réservés.
