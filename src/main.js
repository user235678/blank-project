// Main application entry point
import { ThemeManager } from './components/ThemeManager.js';
import { MessageManager } from './components/MessageManager.js';
import { UIManager } from './components/UIManager.js';
import { Helpers } from './utils/helpers.js';

class App {
    constructor() {
        this.themeManager = new ThemeManager();
        this.messageManager = new MessageManager();
        this.uiManager = new UIManager();
        
        // Make managers globally available
        window.messageManager = this.messageManager;
        window.uiManager = this.uiManager;
        window.helpers = Helpers;
        
        this.init();
    }

    init() {
        console.log('🚀 Application initialisée');
        
        // Initialize all managers
        this.themeManager.init();
        this.messageManager.init();
        this.uiManager.init();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Show welcome message
        this.showWelcomeMessage();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.themeManager.toggleTheme();
            });
        }

        // CTA button
        const ctaButton = document.getElementById('cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                this.handleCTAClick();
            });
        }

        // Message management
        const addMessageBtn = document.getElementById('add-message');
        const clearMessagesBtn = document.getElementById('clear-messages');
        const userInput = document.getElementById('user-input');

        if (addMessageBtn) {
            addMessageBtn.addEventListener('click', () => {
                this.handleAddMessage();
            });
        }

        if (clearMessagesBtn) {
            clearMessagesBtn.addEventListener('click', () => {
                this.handleClearMessages();
            });
        }

        if (userInput) {
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleAddMessage();
                }
            });
        }
    }

    handleCTAClick() {
        this.uiManager.showNotification('Merci de votre intérêt ! 🎉', 'success');
        
        // Scroll to interactive section
        const interactiveSection = document.querySelector('.card');
        if (interactiveSection) {
            interactiveSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    handleAddMessage() {
        const userInput = document.getElementById('user-input');
        const message = userInput.value.trim();
        
        if (message) {
            this.messageManager.addMessage(message);
            userInput.value = '';
            this.uiManager.showNotification('Message ajouté ! ✨', 'info');
        } else {
            this.uiManager.showNotification('Veuillez entrer un message', 'warning');
        }
    }

    handleClearMessages() {
        this.messageManager.clearMessages();
        this.uiManager.showNotification('Messages effacés', 'info');
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.uiManager.showNotification('Bienvenue dans votre nouvelle application ! 🎊', 'success');
        }, 1000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Export for potential external use
export { App };