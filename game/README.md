# JOB'S ETHIC — Le Jeu (Godot 4.4)

> **Proto Sims-of-the-self pour Le Salon (chapitre Rythme).**
> Vue top-down, joueur déplaçable en WASD / flèches, 4 objets interactifs
> qui déclenchent les scénarios du Voyage côté Next.js via postMessage.

---

## 🎯 Ce que fait ce projet

- **Une pièce jouable** : Le Salon (`scenes/salon.tscn`), 960×540 px, vue top-down
- **Joueur** (`scenes/player.tscn`) : `CharacterBody2D` qui se déplace, avec une zone d'interaction circulaire
- **4 objets interactifs** (`scripts/interactive_object.gd`) : phone, calendar, window, door — chacun lie un `chapter_slug` et une liste de `scenario_ids`
- **Pont JavaScript** (`scripts/js_bridge.gd`, autoload `JsBridge`) : `JavaScriptBridge.eval(...)` + `window.parent.postMessage(...)` quand on est en export Web
- **Visuels** : carrés colorés en placeholder (pas d'illustrations). Phase 2 = remplacer par sprites Kenney puis illustrations custom.

---

## 📥 Setup (premier ouverture)

### 1. Télécharger Godot 4.4 stable
[godotengine.org/download](https://godotengine.org/download) → version Standard (pas .NET sauf si tu veux C#)

Ou via winget (Windows) :
```powershell
winget install GodotEngine.GodotEngine
```

### 2. Ouvrir le projet
- Lancer `Godot_v4.4-stable_win64.exe`
- Project Manager → **Import**
- Choisir `JobEthic/game/project.godot`
- Cliquer **Import & Edit**

### 3. Tester en éditeur
- Appuyer sur **F5** ou ▶ en haut à droite
- La fenêtre du salon s'ouvre, tu peux bouger le carré bleu (joueur) avec WASD
- Approche-toi d'un carré coloré → appuie sur **E** → console log de l'interaction

### 4. Installer les templates d'export Web
Pour l'export HTML5, Godot a besoin des templates :
- Menu **Editor → Manage Export Templates → Download and Install**
- Téléchargement automatique (~700 MB), à faire une seule fois par version Godot

---

## 📦 Exporter vers HTML5 (à faire après chaque modification du jeu)

### Option A — Via l'éditeur (recommandé)
1. **Project → Export…**
2. Le preset "Web" est déjà configuré (`export_presets.cfg`)
3. Vérifie que le **chemin de sortie** pointe vers `../webapp/public/godot/index.html`
4. Clique **Export Project** (release ou debug, peu importe pour le proto)
5. Confirme l'overwrite si demandé

L'export crée dans `webapp/public/godot/` :
```
index.html
index.js
index.pck
index.wasm
index.audio.position.worklet.js
index.audio.worklet.js
index.icon.png
... (autres fichiers techniques)
```

### Option B — Via CLI (avancé, non recommandé première fois)
```bash
# Depuis le dossier game/
godot --headless --export-release "Web" ../webapp/public/godot/index.html
```

### Vérifier le résultat en local
```bash
cd webapp
pnpm dev
# Va sur http://localhost:3000/voyage/jeu
```

Tu devrais voir le jeu chargé dans une iframe.

---

## 🔗 Comment ça communique avec Next.js

```
┌─────────────────────────────────────────┐
│ Next.js — page /voyage/jeu             │
│ (game-client.tsx)                       │
│  ┌─────────────────────────────────┐    │
│  │  <iframe src="/godot/...">       │    │
│  │  ┌────────────────────────────┐  │    │
│  │  │  Godot HTML5 export        │  │    │
│  │  │  Player + Salon + Objects  │  │    │
│  │  └────────────────────────────┘  │    │
│  └─────────────────────────────────┘    │
│                ▲                         │
│      postMessage("jobethic.interaction")│
└────────────────┼─────────────────────────┘
                 │
            quand le joueur appuie sur E
            ou clique sur un objet :
            JsBridge.send_interaction(...)
```

Format du message :
```json
{
  "type": "jobethic.interaction",
  "objectId": "phone",
  "chapterSlug": "rythme",
  "scenarioIds": ["dimanche-soir", "interruption"],
  "at": 1735000000
}
```

Next.js reçoit le message, ouvre le `<ScenarioOverlay>` React au-dessus de l'iframe, sauvegarde les réponses en localStorage comme pour le reste du Voyage.

---

## 🎨 Sprites et assets (Phase 1 → 2)

### Phase 1 (actuel) — placeholders carrés colorés
Aucun asset nécessaire. Le jeu fonctionne avec `ColorRect` partout.

### Phase 1.5 — assets gratuits Kenney.nl (CC0)
Quand tu veux donner un coup de réalisme rapide :
1. Télécharger [kenney.nl/assets/top-down-tanks-redux](https://kenney.nl/assets/top-down-tanks-redux) ou [kenney.nl/assets/tiny-town](https://kenney.nl/assets/tiny-town)
2. Décompresser dans `game/assets/kenney/`
3. Dans chaque scène, remplacer les `ColorRect` par des `Sprite2D` qui chargent le PNG

### Phase 2 — illustrations custom
Briefing studio Rive ou illustrateur freelance pour custom sprites.
Budget : ~15 k€ pour les 7 pièces.

---

## 🐛 Dépannage

### "Cannot open project" en première ouverture
- Vérifier que tu utilises **Godot 4.4 stable** (pas 4.3 ou 4.5)
- Le `config_version=5` dans project.godot exige 4.4+

### Export Web grisé
- Templates d'export pas installés → Editor → Manage Export Templates → Download

### Iframe vide ou erreur COOP/COEP dans la console
- Vérifier que `webapp/vercel.json` contient bien le bloc `/godot/(.*)` avec :
  - `Cross-Origin-Embedder-Policy: require-corp`
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Resource-Policy: same-origin`
- Ces headers sont nécessaires pour les threads Godot (SharedArrayBuffer)

### Le postMessage n'arrive pas dans Next.js
- Vérifier la console du navigateur (F12) — JS errors ?
- Vérifier que l'event listener est bien actif dans `game-client.tsx`
- Tester avec `window.addEventListener('message', e => console.log(e.data))`

### Le joueur ne bouge pas
- Les inputs sont définis dans `project.godot` : WASD ou flèches
- Vérifier que l'iframe a le focus (cliquer dedans d'abord)

---

## 🛣️ Roadmap jeu (Phase 1 → 4)

### Phase 1 — proto actuel
- ✅ 1 pièce (salon) avec 4 objets
- ✅ Joueur déplaçable
- ✅ Pont JS vers Next.js
- ✅ Intégration scénarios Rythme

### Phase 1.5 — extensions immédiates
- [ ] 6 autres pièces (chambre, bureau, cuisine, salle de pause, jardin, entrée)
- [ ] Transition entre pièces (porte cliquable → nouvelle scène)
- [ ] Sprite player avec animation marche 4-directions (Kenney free)
- [ ] Sons d'ambiance + footsteps (Pixabay CC0)

### Phase 2 — qualité Phase 2
- [ ] Illustrations custom des pièces (commission)
- [ ] Sound design (commission Hidden Volume, Studio Akwa)
- [ ] Animations sprite character premium (Rive ou Aseprite)
- [ ] Mini-games (drag clock hands, sort cards, etc.) au-delà des scénarios

### Phase 4 — entretien IA embedded
- [ ] Quand le joueur arrive à la porte du salon avec tous les objets joués
- [ ] Cinematic → fade → ouverture sur l'entretien IA webcam (LiveKit)
- [ ] Retour au jeu après l'entretien avec le portrait final

---

## 📝 Notes pour les agents IA qui modifient ce projet

1. **Toujours valider** avec `godot --headless --quit-after 2 --path game/` avant de commit
2. **Ne pas commit** `.godot/` (cache) ni `webapp/public/godot/` (export)
3. **Scènes** (`.tscn`) sont **text-based** mais le format est fragile — modifier de préférence depuis l'éditeur
4. **Scripts** (`.gd`) sont sûrs à modifier en texte
5. **L'autoload `JsBridge`** est globalement accessible (`JsBridge.send_interaction(...)`)
6. **Le pont JS** ne fait rien en éditeur — il log seulement. Le `JavaScriptBridge.eval` ne s'exécute qu'en export Web.

---

## 🏠 Lien avec le reste du projet

- **Plan** : voir [`../plan/04-PROFIL-PROFOND.md`](../plan/04-PROFIL-PROFOND.md) (Le Voyage)
- **Architecture tech** : voir [`../plan/07-ARCHITECTURE-TECH.md`](../plan/07-ARCHITECTURE-TECH.md)
- **Standard qualité top 1%** : voir [`../plan/12-DESIGN-PREMIUM-METHODOLOGIE.md`](../plan/12-DESIGN-PREMIUM-METHODOLOGIE.md)
- **Routes Next.js** :
  - `/voyage` — la maison top-down (SVG, abstrait)
  - `/voyage/rythme` — version "blueprint" (SVG, sans Godot)
  - `/voyage/jeu` — version "jeu" (Godot iframe)
