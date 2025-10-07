// Message management component
export class MessageManager {
    constructor() {
        this.messages = [];
        this.container = null;
    }

    init() {
        this.container = document.getElementById('messages-container');
        this.loadMessages();
        this.renderMessages();
    }

    addMessage(text) {
        const message = {
            id: Date.now(),
            text: text,
            timestamp: new Date(),
            type: 'user'
        };
        
        this.messages.push(message);
        this.saveMessages();
        this.renderMessages();
        
        // Add a subtle animation
        this.animateNewMessage(message.id);
    }

    clearMessages() {
        this.messages = [];
        this.saveMessages();
        this.renderMessages();
    }

    renderMessages() {
        if (!this.container) return;
        
        if (this.messages.length === 0) {
            this.container.innerHTML = `
                <div class="text-center text-gray-500 py-8">
                    <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <p>Aucun message pour le moment</p>
                    <p class="text-sm">Ajoutez votre premier message ci-dessus</p>
                </div>
            `;
            return;
        }
        
        this.container.innerHTML = this.messages.map(message => this.createMessageElement(message)).join('');
    }

    createMessageElement(message) {
        const timeString = message.timestamp.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return `
            <div class="message-item bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200" data-id="${message.id}">
                <div class="flex justify-between items-start">
                    <p class="text-gray-800 flex-1">${this.escapeHtml(message.text)}</p>
                    <span class="text-xs text-gray-500 ml-2 flex-shrink-0">${timeString}</span>
                </div>
                <div class="flex justify-end mt-2">
                    <button 
                        class="text-xs text-red-500 hover:text-red-700 transition-colors duration-200"
                        onclick="messageManager.deleteMessage(${message.id})"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        `;
    }

    deleteMessage(id) {
        this.messages = this.messages.filter(message => message.id !== id);
        this.saveMessages();
        this.renderMessages();
    }

    animateNewMessage(id) {
        setTimeout(() => {
            const messageElement = this.container.querySelector(`[data-id="${id}"]`);
            if (messageElement) {
                messageElement.style.opacity = '0';
                messageElement.style.transform = 'translateY(-10px)';
                messageElement.style.transition = 'all 0.3s ease';
                
                requestAnimationFrame(() => {
                    messageElement.style.opacity = '1';
                    messageElement.style.transform = 'translateY(0)';
                });
            }
        }, 100);
    }

    saveMessages() {
        localStorage.setItem('app-messages', JSON.stringify(this.messages));
    }

    loadMessages() {
        const saved = localStorage.getItem('app-messages');
        if (saved) {
            try {
                this.messages = JSON.parse(saved).map(msg => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
            } catch (e) {
                console.warn('Erreur lors du chargement des messages:', e);
                this.messages = [];
            }
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getMessages() {
        return [...this.messages];
    }

    getMessageCount() {
        return this.messages.length;
    }
}

// Make MessageManager globally available for onclick handlers
window.messageManager = null;