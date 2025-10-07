# Maison Essences - Boutique de Parfums

Site e-commerce de parfums d'exception développé en **JavaScript Vanilla** et **Tailwind CSS**.

## 🌟 Fonctionnalités

- 🏠 **Page d'accueil** avec sélection de best-sellers
- 🛍️ **Boutique** avec recherche et filtres par famille olfactive
- 📦 **Détails produit** avec notes olfactives complètes
- 🛒 **Panier** avec gestion des quantités
- 👤 **Compte utilisateur** avec profil et commandes
- 💾 **Persistance** du panier via localStorage
- 🎨 **Design moderne** avec Tailwind CSS
- 📱 **Responsive** pour tous les écrans

## 🚀 Démarrage rapide

### Option 1: Serveur HTTP Python
```bash
python3 -m http.server 8000
```

Puis ouvrez [http://localhost:8000](http://localhost:8000)

### Option 2: Live Server (VS Code)
Installez l'extension "Live Server" et cliquez sur "Go Live"

### Option 3: Ouvrir directement
Ouvrez simplement `index.html` dans votre navigateur

## 📁 Structure du projet

```
.
├── index.html          # Page d'accueil
├── boutique.html       # Page boutique avec filtres
├── produit.html        # Page détail produit
├── panier.html         # Page panier
├── compte.html         # Page compte utilisateur
├── main.js             # Logique JavaScript et données
├── package.json        # Configuration du projet
└── README.md           # Documentation
```

## 🎨 Technologies

- **HTML5** - Structure sémantique
- **JavaScript Vanilla** - Logique pure sans framework
- **Tailwind CSS** - Framework CSS utilitaire (via CDN)
- **LocalStorage** - Persistance des données du panier

## 📦 Produits

L'application contient 4 parfums de démonstration :
- **Ambre Noir** - Oriental (Best-seller)
- **Rose Velours** - Floral (Nouveau)
- **Bois Mystique** - Boisé
- **Citrus Lumineux** - Agrumes

## 🛠️ Personnalisation

### Modifier les produits
Éditez le tableau `products` dans `main.js`

### Modifier les couleurs
Changez la configuration Tailwind dans chaque fichier HTML :
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'ink': '#1a1a1a',
        'ivory': '#faf8f5',
        'gold': '#d4af37'
      }
    }
  }
}
```

### Ajouter une nouvelle page
1. Créez un fichier HTML en vous basant sur les pages existantes
2. Incluez `main.js` avant la fermeture de `</body>`
3. Ajoutez le lien dans le header/footer

## 📝 Fonctionnalités JavaScript

- Gestion du panier (ajout, suppression, modification de quantité)
- Filtrage et recherche de produits
- Notifications toast
- Persistance des données
- Navigation dynamique

## 🎯 Avantages de cette approche

✅ **Aucune dépendance** - Fonctionne directement dans le navigateur  
✅ **Performance** - Chargement ultra-rapide  
✅ **Simplicité** - Code facile à comprendre et maintenir  
✅ **SEO-friendly** - HTML statique indexable  
✅ **Portable** - Peut être hébergé n'importe où  

## 📄 Licence

MIT