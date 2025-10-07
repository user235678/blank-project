// Product Data
const products = [
    { 
        slug: "ambre-noir", 
        name: "Ambre Noir", 
        brand: "Maison Essences", 
        price: 89, 
        badge: "Best-seller", 
        family: "Oriental",
        description: "Une fragrance orientale envoûtante qui mêle l'ambre précieux aux notes boisées. Un parfum mystérieux et captivant.",
        notes: {
            top: "Bergamote, Mandarine",
            heart: "Ambre, Rose",
            base: "Bois de santal, Vanille, Musc"
        },
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop"
    },
    { 
        slug: "rose-velours", 
        name: "Rose Velours", 
        brand: "Maison Essences", 
        price: 79, 
        badge: "Nouveau", 
        family: "Floral",
        description: "Un hommage délicat à la rose centifolia. Notes veloutées et sensuelles pour une élégance intemporelle.",
        notes: {
            top: "Poire, Litchi",
            heart: "Rose centifolia, Pivoine",
            base: "Patchouli, Mousse de chêne"
        },
        image: "https://images.unsplash.com/photo-1588405748879-acb4aeb40d1b?q=80&w=800&auto=format&fit=crop"
    },
    { 
        slug: "bois-mystique", 
        name: "Bois Mystique", 
        brand: "Maison Essences", 
        price: 99, 
        badge: null, 
        family: "Boisé",
        description: "Un voyage olfactif au cœur de la forêt. Notes boisées profondes et mystérieuses.",
        notes: {
            top: "Cardamome, Poivre rose",
            heart: "Cèdre, Vétiver",
            base: "Oud, Ambre gris"
        },
        image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800&auto=format&fit=crop"
    },
    { 
        slug: "citrus-lumineux", 
        name: "Citrus Lumineux", 
        brand: "Maison Essences", 
        price: 69, 
        badge: null, 
        family: "Agrumes",
        description: "Une explosion de fraîcheur agrumée. Vivifiant et lumineux, parfait pour la journée.",
        notes: {
            top: "Citron, Pamplemousse, Orange sanguine",
            heart: "Thé vert, Jasmin",
            base: "Bois de cèdre blanc, Musc blanc"
        },
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
    }
];

// Cart Management
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productSlug, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.slug === productSlug);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        const product = products.find(p => p.slug === productSlug);
        if (product) {
            cart.push({
                slug: product.slug,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
    }
    
    saveCart(cart);
    return cart;
}

function removeFromCart(productSlug) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.slug !== productSlug);
    saveCart(updatedCart);
    return updatedCart;
}

function updateCartQuantity(productSlug, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.slug === productSlug);
    if (item) {
        if (quantity <= 0) {
            return removeFromCart(productSlug);
        }
        item.quantity = quantity;
        saveCart(cart);
    }
    return cart;
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function updateCartCount() {
    const count = getCartItemCount();
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => {
        if (count > 0) {
            el.textContent = count;
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

// Product Card Component
function createProductCard(product) {
    const badgeClass = product.badge === 'Nouveau' 
        ? 'bg-ink text-ivory' 
        : 'bg-gold text-white';
    
    const badgeHtml = product.badge 
        ? `<span class="absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass}">${product.badge}</span>`
        : '';
    
    const imageHtml = product.image
        ? `<img src="${product.image}" alt="${product.name}" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]">`
        : `<div class="flex h-full w-full items-center justify-center text-ink/30">Image</div>`;
    
    return `
        <a href="produit.html?slug=${product.slug}" class="group block overflow-hidden rounded-lg border border-black/5 bg-white hover:shadow-lg transition-shadow">
            <div class="relative aspect-[4/5] w-full bg-ivory">
                ${imageHtml}
                ${badgeHtml}
            </div>
            <div class="flex items-start justify-between gap-4 p-4">
                <div>
                    <p class="text-sm text-ink/60">${product.brand}</p>
                    <h3 class="font-medium">${product.name}</h3>
                </div>
                <p class="shrink-0 font-semibold">${product.price.toFixed(2)} €</p>
            </div>
        </a>
    `;
}

// Get product by slug
function getProductBySlug(slug) {
    return products.find(p => p.slug === slug);
}

// URL params helper
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Show toast notification
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-ink text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);