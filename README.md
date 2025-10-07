# Application Moderne JavaScript + Tailwind CSS

Une application web moderne construite avec JavaScript vanilla et Tailwind CSS, sans framework lourd.

## 🚀 Fonctionnalités

- **Interface moderne** : Design responsive avec Tailwind CSS
- **JavaScript modulaire** : Architecture en composants réutilisables
- **Gestion des thèmes** : Basculement entre mode clair et sombre
- **Système de notifications** : Notifications toast élégantes
- **Gestion des messages** : Ajout, suppression et persistance des messages
- **Animations fluides** : Transitions et animations CSS/JS
- **Stockage local** : Persistance des données dans le navigateur

## 🛠️ Technologies

- **JavaScript ES6+** : Modules, classes, async/await
- **Tailwind CSS** : Framework CSS utility-first
- **Vite** : Build tool moderne et rapide
- **PostCSS** : Traitement CSS avec autoprefixer

## 📦 Installation

1. **Installer les dépendances** :
```bash
npm install
```

2. **Construire le CSS Tailwind** :
```bash
npm run css:build
```

3. **Démarrer le serveur de développement** :
```bash
npm run dev
```

4. **Ouvrir dans le navigateur** :
L'application sera disponible sur `http://localhost:3000`

## 🏗️ Structure du projet

```
src/
├── components/          # Composants JavaScript modulaires
│   ├── ThemeManager.js  # Gestion des thèmes clair/sombre
│   ├── MessageManager.js # Gestion des messages
│   └── UIManager.js     # Gestion de l'interface utilisateur
├── utils/               # Fonctions utilitaires
│   └── helpers.js       # Helpers génériques
├── styles/              # Styles CSS
│   └── input.css        # Fichier CSS principal avec Tailwind
└── main.js              # Point d'entrée de l'application
```

## 🎨 Personnalisation

### Couleurs
Les couleurs peuvent être personnalisées dans `tailwind.config.js` :

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

### Styles personnalisés
Ajoutez vos styles personnalisés dans `src/styles/input.css` :

```css
@layer components {
  .btn-custom {
    @apply bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded;
  }
}
```

## 🔧 Scripts disponibles

- `npm run dev` : Démarre le serveur de développement Vite
- `npm run build` : Construit l'application pour la production
- `npm run preview` : Prévisualise la build de production
- `npm run css:build` : Construit le CSS Tailwind en mode watch

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte à tous les écrans :
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px  
- **Desktop** : > 1024px

## 🌙 Mode sombre

Le mode sombre est automatiquement détecté selon les préférences système et peut être basculé manuellement. Les préférences sont sauvegardées dans le localStorage.

## 💾 Persistance des données

- **Thème** : Sauvegardé dans localStorage
- **Messages** : Sauvegardés dans localStorage
- **Préférences** : Persistance automatique

## 🚀 Déploiement

1. **Build de production** :
```bash
npm run build
```

2. **Les fichiers de production** seront dans le dossier `dist/`

3. **Déployez** le contenu du dossier `dist/` sur votre serveur web

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

Construit avec ❤️ en JavaScript et Tailwind CSS