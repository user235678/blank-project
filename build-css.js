#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎨 Construction du CSS Tailwind...');

try {
    // Ensure dist directory exists
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    // Build Tailwind CSS
    execSync('npx tailwindcss -i ./src/styles/input.css -o ./dist/output.css --minify', {
        stdio: 'inherit',
        cwd: __dirname
    });

    console.log('✅ CSS Tailwind construit avec succès !');
    console.log('📁 Fichier généré : dist/output.css');
    
} catch (error) {
    console.error('❌ Erreur lors de la construction du CSS:', error.message);
    process.exit(1);
}