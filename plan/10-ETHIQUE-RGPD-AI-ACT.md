# 10 — Éthique, RGPD & AI Act

> **L'éthique n'est pas un argument marketing. C'est l'architecture du produit.**
> Et accessoirement, **c'est notre avance concurrentielle de 12-18 mois.**

## 1. Pourquoi c'est central (pas un sujet "à régler plus tard")

### Trois raisons stratégiques

**1. L'AI Act devient enforceable le 2 août 2026 (potentiellement reporté à fin 2027/août 2028 par le Digital Omnibus, mais incertain).**

Le recrutement IA est classé **haut-risque (Annex III §4)** : screening, ranking, interview, scoring de candidats. Tout acteur non conforme à cette date risque jusqu'à **€15M ou 3 % du CA mondial** par infraction. **Aucun concurrent FR ne s'est pleinement préparé**. Une mise en conformité de dernière minute = mois de travail, ralentissement des roadmaps, ressources captées.

**Nous, si nous shipons conformes Day-1, on a 12-18 mois d'avance opérationnelle.**

**2. La CNIL fait du recrutement IA une priorité de contrôle 2026.**

Tri algorithmique, durée de conservation, information candidats, analyse d'impact (DPIA). Source : CNIL, [Guide du recrutement](https://www.cnil.fr/fr/le-guide-du-recrutement).

**3. La confiance est notre produit.**

Notre USP n'est pas l'IA. C'est *"l'IA explique, l'humain décide"* — c'est de la **transparence**. Si on dérive sur l'éthique, on perd notre identité de marque.

---

## 2. Cartographie réglementaire

### Quatre textes à connaître

| Texte | Statut | Ce qu'il impose |
|---|---|---|
| **RGPD** (EU 2016/679) | En vigueur depuis 2018 | Consentement, droits utilisateurs, DPO, registre, DPIA |
| **AI Act** (EU 2024/1689) | Enforceable haut-risque août 2026* | Documentation, transparence, supervision humaine, audits biais |
| **Code du travail FR** | En vigueur | L1221-6 et suivants : info candidat, finalité collecte, conservation |
| **CNIL guides** | Recommandations actualisées 2025-2026 | Recrutement, vidéo, données sensibles |

*Le **Digital Omnibus** (proposé fin 2025) pourrait reporter certains aspects en 2027/2028 — surveiller, mais ne pas miser dessus.

### Principes RGPD & AI Act qui nous impactent directement

1. **Base légale claire** pour le traitement (consentement + intérêt légitime selon les cas)
2. **Minimisation des données** (on collecte uniquement ce qui est nécessaire)
3. **Limitation de finalité** (les données pour matching ne servent pas pour autre chose)
4. **Limitation de conservation** (2 ans max post-mission, sauf demande candidat)
5. **Droit à l'information** (le candidat sait précisément ce qui est traité)
6. **Droit d'accès, rectification, effacement, portabilité** (Art. 15-22)
7. **Droit à ne pas faire l'objet d'une décision automatisée** (Art. 22)
8. **Sécurité des données** (chiffrement, audit, breach reporting < 72h)
9. **DPIA obligatoire** pour profilage à grande échelle
10. **Bias audits** (AI Act) — démonstration que le modèle ne discrimine pas
11. **Logs de décision** (AI Act) — traçabilité de chaque décision algorithmique
12. **Information enrichie** (AI Act) — explication accessible des décisions
13. **Supervision humaine effective** (AI Act) — pas de pleine automation
14. **Prohibition reconnaissance d'émotion en milieu pro** (AI Act Art. 5) — **€35M / 7 % CA**

---

## 3. Notre conformité — Day-1

### Engagement n°1 — Transparence radicale du scoring

**Tout score est :**
- **Décomposable** (Art. par Art., toujours visible)
- **Expliqué en langage humain** (pas juste "78 %", mais "78 % parce que…")
- **Auditable** (logs internes accessibles sur demande candidat)
- **Cohérent dans le temps** (mêmes inputs → même score)

**Comment c'est implémenté :**
- Le moteur de matching utilise **XGBoost** (pas un réseau de neurones opaque)
- **SHAP values** pour chaque feature contribuant au score
- **LLM (Claude)** transforme SHAP en explication langage naturel
- Tous les scores sont **archivés** avec leurs features

### Engagement n°2 — Right to contest (Art. 22)

**Tout score peut être contesté** par le candidat ou le recruteur :
- Formulaire structuré en 1 clic
- Délai de réponse **48h ouvrées**
- Examen par un humain de l'équipe
- Si fondé : ajustement + amélioration du modèle
- Si non fondé : explication détaillée, motivée

**Aucune décision finale automatisée.** L'IA propose, l'humain dispose.

### Engagement n°3 — Right to portability (Art. 20)

**Le candidat possède son profil :**
- Bouton "Exporter mon profil" → ZIP (JSON ouvert + PDF lisible humain) en < 60 sec
- **Format JSON public documenté** (schema GitHub, open-source)
- Effacement complet en 1 clic (soft delete 30 jours puis hard delete)
- Pas de "lock-in" caché (les données n'ont pas de format propriétaire)

### Engagement n°4 — Information enrichie

À l'inscription, le candidat voit :
- **Quelles données** sont collectées (liste exhaustive et lisible)
- **Pourquoi** chacune est collectée (finalité par finalité)
- **Combien de temps** elle est conservée
- **Avec qui** elle est partagée (recruteurs après match)
- **Quels sont ses droits**
- **Comment exercer ces droits**

**Tout cela en français correct, pas en jargon juridique.** Un design CGU "lisible humain" + version juridique formelle pour les pros qui veulent.

### Engagement n°5 — DPIA publique

Une **Analyse d'Impact sur la Protection des Données** complète est :
- Réalisée avant lancement
- Mise à jour à chaque release majeure
- **Publiée sur notre site** (en partie) pour transparence
- Communiquée à la CNIL si demandé

### Engagement n°6 — Audit de biais trimestriel

Tous les 3 mois :
- Test automatisé de biais sur le modèle de matching
- Mesure des **écarts de scoring** entre groupes démographiques perçus
- Si écart > seuil → audit humain et ajustement
- **Rapport publié annuellement** (transparency report)

### Engagement n°7 — Anti-features explicites

Nous **NE FAISONS PAS** :
- ❌ Reconnaissance d'émotion (interdit AI Act, art. 5)
- ❌ Inférence de genre / origine / orientation depuis vidéo
- ❌ Décision automatique de rejet
- ❌ Scoring de personnalité boîte noire
- ❌ Stockage indéfini des vidéos d'entretien (30 jours max)
- ❌ Vente de données à des tiers
- ❌ Profilage publicitaire
- ❌ Filtres sur critères sensibles, même indirectement

### Engagement n°8 — Supervision humaine effective

Aucune décision **finale** à conséquence significative n'est prise par l'IA seule :
- **Matching** : proposé par IA, validé/contesté par humain
- **Score** : calculé par IA, expliqué + contestable
- **Anomalies anti-triche** : détectées par signaux, **révisées par humain** avant impact
- **Refus** : jamais automatique pour cause IA seule
- **Vérification provenance** : signal + révision humaine

---

## 4. Le profil profond — conformité

### Ce qu'on collecte et pourquoi
Toutes les questions du Voyage passent ce filtre :

| Critère | Acceptable ? |
|---|---|
| Qui révèle directement une caractéristique sensible (origine, religion, orientation, opinion politique, santé) | ❌ **Non** |
| Qui pourrait révéler indirectement | ⚠️ **Audit** par psychologue + juriste |
| Qui est strictement nécessaire au matching | ✅ Oui |
| Qui est demandé pour curiosité ou "richesse" du profil | ❌ Non — on simplifie |

### Anonymisation partielle (Day-1)

Côté recruteur, le profil n'expose pas :
- Nom de famille complet (juste initiale)
- Adresse précise (juste ville/région)
- Photo (optionnelle, candidat décide)
- Date de naissance (juste tranche d'âge si nécessaire et déclarée)
- Origine ethnique perçue (jamais)
- Genre (juste pronoms si déclaré)

**Le contact direct** (vrai nom, téléphone, email) n'est partagé qu'après **double consentement** post-match.

### Données spéciales (sensibles)
Nous ne traitons **AUCUNE** des données spéciales de l'Art. 9 RGPD :
- Origine raciale ou ethnique
- Opinions politiques
- Convictions religieuses
- Appartenance syndicale
- Données génétiques ou biométriques
- Données santé
- Vie sexuelle ou orientation

**Sauf** la voix dans l'entretien IA (donnée biométrique à risque) — qui est :
- Recueillie sur **consentement explicite**
- Traitée uniquement pour la transcription
- **Pas utilisée** pour identifier la personne
- Supprimée 30 jours après mission

---

## 5. L'entretien IA — conformité spéciale

### Risques spécifiques
- Vidéo + voix = données biométriques
- Analyse comportementale = profilage à risque
- Décision sur la base d'entretien = AI Act haut-risque

### Mesures
1. **Consentement explicite renouvelé** avant chaque entretien
2. **Pas d'analyse "physique"** du candidat (forme, traits, accessoires)
3. **Pas d'analyse d'émotion** (interdit explicite)
4. **Décision finale humaine** systématique
5. **Stockage 30 jours max** post-mission, ou immédiat sur demande candidat
6. **Notification post-entretien** : "Voici ce qui a été analysé, voici ce qui n'a pas été analysé, voici ce qui sera transmis au recruteur"
7. **Possibilité de refaire l'entretien** si le candidat estime que les conditions n'étaient pas réunies (1 fois)

---

## 6. Conservation des données

| Type de donnée | Durée de conservation |
|---|---|
| Compte actif | Durée du compte |
| Compte inactif > 12 mois | Notification, suppression à 24 mois (sauf demande explicite de conservation) |
| Données candidat non retenu (mission terminée sans engagement) | 30 jours après notification au candidat |
| Données candidat refusé (sur sa demande explicite) | Suppression immédiate |
| Profil profond (candidat actif) | Durée du compte + export à tout moment |
| Vidéo / audio d'entretien | 30 jours post-mission ou consentement explicite renouvelé |
| Transcripts d'entretien (texte) | 6 mois ou consentement |
| Logs de matching | 2 ans (obligation traçabilité AI Act) |
| Logs de paiement | 10 ans (obligation fiscale) |
| Données effacées par utilisateur | Hard delete dans les 30 jours |

---

## 7. Gouvernance interne

### Le DPO (Data Protection Officer)
- **Phase 1-2** : DPO externe mutualisé (cabinet juridique FR spécialisé tech, ex : Mathias Avocats, Lerins BCW)
- **Phase 3+** : DPO interne (ou consolidation avec un General Counsel)
- **Coût** : ~500-1 200 €/mois en externe, ~80 k€/an en interne

### Le comité éthique (interne)
À partir de Phase 2, un comité de **5 personnes** se réunit trimestriellement :
- Le DPO
- Un psychologue du travail
- Un juriste (interne ou externe)
- Un représentant utilisateur (alternance candidat / recruteur)
- Un représentant tech

**Mandat :**
- Audit du modèle de matching
- Revue des cas de contestation significatifs
- Validation des nouvelles fonctionnalités sensibles
- Rapport semestriel public

### L'AI Act compliance officer
- Phase 2+ : un membre de l'équipe (peut cumuler avec DPO) est référent AI Act
- Maintient la documentation
- Pilote les audits
- Interlocuteur des régulateurs

---

## 8. Documentation à maintenir (registre)

### Registre RGPD
- Traitements de données (matching, entretien, profilage, paiement)
- Bases légales par traitement
- Catégories de personnes concernées
- Catégories de données
- Destinataires
- Durées de conservation
- Mesures de sécurité

### Registre AI Act (haut-risque)
- Description du système IA (matching)
- Données d'entraînement (sources, biais identifiés)
- Architecture du modèle
- Métriques de performance
- Métriques d'équité
- Documentation utilisateur
- Rapports d'incident

### Procédures
- Procédure de breach (notification < 72h)
- Procédure de réponse aux droits utilisateurs (< 30 jours)
- Procédure de contestation de score (< 48h)
- Procédure d'audit de biais (trimestriel)

---

## 9. Communication éthique au public

### Page "Notre engagement éthique" — sur le site

Structure :
1. **Notre principe** — L'IA explique, l'humain décide.
2. **Vos droits** — accès, contestation, portabilité, effacement
3. **Notre transparence** — DPIA publique, audit de biais publié, registre disponible
4. **Vos données** — ce qu'on collecte, pourquoi, durée
5. **Ce qu'on refuse** — anti-features liste
6. **Notre gouvernance** — comité éthique, DPO
7. **Vos recours** — formulaire de contestation, contact DPO, CNIL

### Rapport annuel transparent
Chaque année, publication d'un **rapport de transparence** :
- Nombre de matchs proposés
- Distribution des scores
- Métriques d'équité par groupe démographique
- Nombre de contestations et résolutions
- Incidents de sécurité
- Évolutions du modèle

**Modèle pour ce rapport :** AI Now Institute, Mozilla Transparency Reports.

---

## 10. Conformité comme arme marketing

### Le narrative
> *"Pendant que tous nos concurrents s'épuisent à se mettre en conformité avant le 2 août 2026, JOB'S ETHIC est nativement conforme depuis le Jour 1.*
>
> *Pour vous, recruteur, ça veut dire : aucun risque juridique, aucun audit qui plombe vos process, aucun retrait soudain de fonctionnalité.*
>
> *Pour vous, candidat, ça veut dire : vos données sont les vôtres, vos droits sont incarnés dans le produit, votre profil est portable. Et l'IA n'a jamais le dernier mot sur votre carrière."*

### Sur la page d'accueil
- **Badge "AI Act ready"** visible
- **Lien direct vers la DPIA publique**
- **Score de transparence employeur** visible avant le match
- **"Contester ce score"** présent sur chaque match

### Communication PR
- Tribune sur "Pourquoi je publie ma DPIA publiquement" (Maddyness, Sifted)
- Participation à des panels CNIL / France Digitale / Numeum sur l'IA éthique
- Partenariat avec **Future of Work Institute**, **Hub France IA**, **Mozilla Foundation FR**

---

## 11. Risques résiduels et plans de réponse

### Risque 1 — Plainte CNIL d'un candidat
**Probabilité :** moyenne (toute startup en récolte une à un moment)
**Impact :** moyen (amende possible, brand)
**Préparation :**
- Documentation à jour
- DPO réactif
- Procédure de réponse < 7 jours
- Réserve budgétaire 50 k€ pour réponse juridique

### Risque 2 — Audit AI Act post-2026
**Probabilité :** haute si visibilité
**Impact :** moyen (si conforme, juste du temps)
**Préparation :**
- Documentation AI Act complète et tenue à jour
- Audit interne semestriel
- Cabinet d'audit prêt à engager

### Risque 3 — Breach de données
**Probabilité :** faible (mesures sécurité)
**Impact :** catastrophique
**Préparation :**
- Procédure breach < 72h
- Cyber-assurance (50-100 k€/an)
- Communication crise prête (template)

### Risque 4 — Bias scandal médiatique
**Probabilité :** faible
**Impact :** élevé (brand)
**Préparation :**
- Audit régulier en avance
- Communication anticipée
- Capacité de réponse rapide (correction du modèle dans la semaine)

---

## 12. Budget conformité

### Phase 1-2 (Mois 0-9)
- DPO externe : ~600 €/mois
- Cabinet juridique (one-shot CGU + DPIA) : ~5 000 €
- Cyber-assurance : ~150 €/mois
- **Total : ~12 000 € sur 9 mois**

### Phase 3 (Mois 10-18)
- DPO externe : ~800 €/mois
- Audit de biais (cabinet externe) : ~3 000 € × 2/an
- Cyber-assurance : ~300 €/mois
- **Total : ~25 000 € sur 9 mois**

### Phase 4 (Mois 18-24)
- DPO interne mi-temps : ~3 000 €/mois
- Audits et certifications : ~15 000 €/an
- Cyber-assurance : ~500 €/mois
- **Total : ~50 000 € sur 12 mois**

---

## 13. Checklist Day-1 (avant lancement V1)

- [ ] DPO nommé (interne ou externe)
- [ ] Registre RGPD complet
- [ ] DPIA réalisée et signée
- [ ] CGU + Politique de confidentialité rédigées (juridique FR) et acceptables pour utilisateur (rédaction "lisible humain")
- [ ] Mentions légales conformes
- [ ] Hébergement EU (Vercel/Supabase/Cloudflare en config EU only)
- [ ] Chiffrement at-rest + in-transit activé partout
- [ ] Logs d'audit actifs
- [ ] Procédure de réponse aux droits (formulaire en place)
- [ ] Procédure de breach prête
- [ ] Cyber-assurance souscrite
- [ ] Formation équipe RGPD (1 demi-journée par membre)
- [ ] Audit sécurité initial (pentest externe)
- [ ] AI Act gap analysis réalisée
- [ ] Documentation AI Act haut-risque amorcée

**Coût estimé checklist : ~25-40 k€ one-shot + ~15 k€/an récurrent.**

---

## 14. Conclusion

L'éthique et la conformité ne sont **ni un fardeau ni un nice-to-have** chez JOB'S ETHIC.

C'est **l'architecture du produit**, **notre brand**, **notre moat concurrentiel** sur la fenêtre AI Act 2026-2027, et **notre garantie de pérennité** dans un marché où les acteurs vont se faire sanctionner.

> *"Nous ne nous mettons pas en conformité. Nous avons construit la conformité dans le produit."*

Cette ligne — répétée partout — est l'un de nos messages les plus puissants en 2026.
