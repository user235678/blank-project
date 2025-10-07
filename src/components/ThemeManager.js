// Theme management component
export class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themeToggle = null;
    }

    init() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.loadSavedTheme();
        this.applyTheme();
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Detect system preference
            this.currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
    }

    applyTheme() {
        const root = document.documentElement;
        
        if (this.currentTheme === 'dark') {
            root.classList.add('dark');
            this.updateThemeIcon('sun');
        } else {
            root.classList.remove('dark');
            this.updateThemeIcon('moon');
        }
        
        // Save theme preference
        localStorage.setItem('theme', this.currentTheme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        
        // Add a subtle animation
        document.body.style.transition = 'background-color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    updateThemeIcon(iconType) {
        if (!this.themeToggle) return;
        
        const svg = this.themeToggle.querySelector('svg');
        if (!svg) return;
        
        if (iconType === 'sun') {
            svg.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            `;
        } else {
            svg.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            `;
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}