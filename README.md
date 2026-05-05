# HDI Compagnie – Site Vitrine

Site vitrine professionnel pour **HDI COMPAGNIE**, spécialiste en installation d'équipements thermiques et de climatisation à Villeurbanne / Lyon.

---

## Arborescence du projet

```
hdi-compagnie/
├── index.html             ← Page d'accueil
├── particuliers.html      ← Services particuliers
├── professionnels.html    ← Services professionnels
├── solutions.html         ← Catalogue des solutions
├── qui-sommes-nous.html   ← Présentation de la société
├── blog.html              ← Liste des articles
├── blog-article.html      ← Template article (chargement dynamique)
├── contact.html           ← Formulaire de contact
├── mentions-legales.html  ← Mentions légales + RGPD
├── css/
│   └── style.css          ← Feuille de styles globale
└── js/
    ├── layout.js          ← Navigation et footer partagés
    └── main.js            ← Interactions (menu, formulaire, animations)
```

---

## Lancer en local

### Option 1 – Extension VS Code Live Server
1. Ouvrir le dossier dans VS Code
2. Installer l'extension **Live Server** (Ritwick Dey)
3. Clic droit sur `index.html` → **Open with Live Server**
4. Le site s'ouvre sur `http://127.0.0.1:5500`

### Option 2 – Python
```bash
cd hdi-compagnie
python3 -m http.server 8080
```
Puis ouvrir `http://localhost:8080`

### Option 3 – Node.js
```bash
cd hdi-compagnie
npx serve .
```

> ⚠️ Ne pas ouvrir les fichiers HTML directement depuis le Finder/explorateur (protocole `file://`). Utiliser toujours un serveur local pour que les scripts `layout.js` fonctionnent correctement.

---

## Déployer sur Netlify

### Méthode 1 – Drag & Drop (la plus rapide)
1. Se connecter sur [app.netlify.com](https://app.netlify.com)
2. Aller dans **Sites** → **Add new site** → **Deploy manually**
3. **Glisser-déposer le dossier `hdi-compagnie/` entier**
4. Le site est en ligne immédiatement sur une URL Netlify (ex: `random-name.netlify.app`)

### Méthode 2 – Via GitHub
1. Créer un dépôt GitHub, y pousser le contenu du dossier `hdi-compagnie/`
2. Sur Netlify : **Add new site** → **Import an existing project** → **GitHub**
3. Sélectionner le dépôt
4. Paramètres de build : aucun (site statique pur)
   - **Build command :** laisser vide
   - **Publish directory :** `.` (racine)
5. Cliquer **Deploy**

### Ajouter un nom de domaine personnalisé
1. Dans Netlify : **Domain settings** → **Add custom domain**
2. Saisir `hdi-compagnie.fr` (ou votre domaine)
3. Configurer les DNS chez votre registrar pour pointer vers les serveurs Netlify
4. Le SSL est activé automatiquement (Let's Encrypt)

---

## Déployer sur Vercel

```bash
npm i -g vercel
cd hdi-compagnie
vercel
```
Suivre les instructions. Vercel détecte automatiquement un projet statique.

---

## Personnalisation rapide

Les informations société sont centralisées dans `js/layout.js` pour le header et le footer, et dans `contact.html` / `mentions-legales.html` pour les pages légales.

---

## Notes légales

- Le formulaire de contact est actuellement **front-end uniquement**. Pour traiter les envois, utiliser Netlify Forms, Formspree ou un backend dédié.
- Le fichier `mentions-legales.html` contient les informations juridiques complètes incluant les mentions RGPD.

---

*Site créé en HTML/CSS/JS pur – aucune dépendance externe requise (hors Google Fonts).*
