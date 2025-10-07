#!/bin/bash

echo "🚀 Démarrage de l'application moderne JavaScript + Tailwind CSS"
echo "=============================================================="

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Construire le CSS Tailwind
echo "🎨 Construction du CSS Tailwind..."
node build-css.js

# Démarrer le serveur de développement
echo "🌐 Démarrage du serveur de développement..."
echo "📍 L'application sera disponible sur: http://localhost:3000"
echo ""

npm run dev