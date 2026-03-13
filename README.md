# MesReçus 🧾

**Application web progressive (PWA) pour photographier et stocker ses reçus de repas — déduction en frais réels aux impôts.**

Fonctionne sur mobile (iOS/Android) comme une app native. Stockage des photos sur votre **disque USB Freebox** via l'API officielle Freebox OS.

---

## Fonctionnalités

- 📸 **Capture photo** directement depuis la caméra du téléphone
- 💾 **Stockage local** (localStorage) — fonctionne hors-ligne
- 📦 **Synchronisation Freebox** — photos sauvegardées sur votre disque USB via l'API Freebox OS
- 📊 **Suivi par année et par mois** avec totaux automatiques
- ⬇ **Export CSV** compatible Excel pour la déclaration fiscale
- 🔒 **Données privées** — aucun serveur tiers, tout reste chez vous
- 📱 **PWA installable** — ajout à l'écran d'accueil iOS/Android

---

## Déploiement sur GitHub Pages

### 1. Forker / cloner ce dépôt

```bash
git clone https://github.com/VOTRE_USER/mesrecus.git
cd mesrecus
```

### 2. Activer GitHub Pages

Dans les **Settings** du dépôt → **Pages** → Source : `main` branch, dossier `/ (root)`.

Votre app sera disponible sur `https://VOTRE_USER.github.io/mesrecus/`

### 3. Configurer la Freebox

> ⚠️ La première connexion doit se faire **sur votre réseau Freebox (wifi)**.

1. Sur `mafreebox.freebox.fr` → Paramètres → Gestion des accès → **Accès à distance** → Activer
2. Notez votre adresse distante : `https://xxxxxxxx.fbxos.fr`
3. Ouvrez l'app sur votre téléphone (en wifi Freebox)
4. Cliquez **📦 Freebox NAS** → entrez l'adresse → validez sur la télécommande Freebox
5. ✅ Connexion établie — fonctionne ensuite depuis partout (4G, autre réseau)

---

## Structure des fichiers

```
mesrecus/
├── index.html        # Application principale
├── manifest.json     # Manifest PWA
├── sw.js             # Service Worker (cache offline)
├── icons/
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-180.png  # Apple Touch Icon
│   ├── icon-192.png  # Android
│   └── icon-512.png  # Android large
└── README.md
```

---

## Utilisation fiscale

Les reçus de repas sont déductibles en frais réels si :
- Le repas est pris hors du domicile pour raison professionnelle
- Le montant dépasse le forfait repas de l'administration fiscale (~5 €)
- Vous conservez les justificatifs (photos des reçus)

L'export CSV fournit la liste complète avec dates, lieux, montants et motifs — directement utilisable pour votre déclaration ou votre comptable.

---

## Confidentialité

- Aucune donnée n'est envoyée à un serveur tiers
- Les reçus sont stockés localement dans le navigateur
- La synchronisation Freebox utilise uniquement l'**API officielle Freebox OS** (communication chiffrée HTTPS, directement vers votre box)
- Le token d'authentification Freebox est stocké localement dans le navigateur

---

## Licence

MIT — libre d'utilisation et de modification.
