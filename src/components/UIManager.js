// UI management component
export class UIManager {
    constructor() {
        this.notificationContainer = null;
        this.notificationId = 0;
    }

    init() {
        this.createNotificationContainer();
        this.setupGlobalStyles();
    }

    createNotificationContainer() {
        // Create notification container if it doesn't exist
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'fixed top-4 right-4 z-50 space-y-2';
            document.body.appendChild(container);
            this.notificationContainer = container;
        } else {
            this.notificationContainer = document.getElementById('notification-container');
        }
    }

    showNotification(message, type = 'info', duration = 3000) {
        if (!this.notificationContainer) return;

        const notification = this.createNotificationElement(message, type);
        this.notificationContainer.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.classList.remove('opacity-0', 'translate-x-full');
            notification.classList.add('opacity-100', 'translate-x-0');
        });

        // Auto remove
        setTimeout(() => {
            this.removeNotification(notification);
        }, duration);
    }

    createNotificationElement(message, type) {
        const id = ++this.notificationId;
        const notification = document.createElement('div');
        notification.className = `
            notification bg-white rounded-lg shadow-lg border-l-4 p-4 max-w-sm transform transition-all duration-300 ease-in-out
            opacity-0 translate-x-full
            ${this.getNotificationTypeClasses(type)}
        `;
        
        notification.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    ${this.getNotificationIcon(type)}
                </div>
                <div class="ml-3 flex-1">
                    <p class="text-sm font-medium text-gray-900">${message}</p>
                </div>
                <div class="ml-4 flex-shrink-0">
                    <button 
                        class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
                        onclick="uiManager.removeNotification(this.parentElement.parentElement.parentElement)"
                    >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        return notification;
    }

    getNotificationTypeClasses(type) {
        const typeClasses = {
            success: 'border-green-400 bg-green-50',
            error: 'border-red-400 bg-red-50',
            warning: 'border-yellow-400 bg-yellow-50',
            info: 'border-blue-400 bg-blue-50'
        };
        return typeClasses[type] || typeClasses.info;
    }

    getNotificationIcon(type) {
        const icons = {
            success: `
                <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            `,
            error: `
                <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            `,
            warning: `
                <svg class="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
            `,
            info: `
                <svg class="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `
        };
        return icons[type] || icons.info;
    }

    removeNotification(notification) {
        if (!notification) return;
        
        notification.classList.remove('opacity-100', 'translate-x-0');
        notification.classList.add('opacity-0', 'translate-x-full');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    setupGlobalStyles() {
        // Add some global utility styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                backdrop-filter: blur(10px);
            }
            
            .message-item {
                animation: slideIn 0.3s ease-out;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .btn-primary:active {
                transform: translateY(1px);
            }
            
            .btn-secondary:active {
                transform: translateY(1px);
            }
        `;
        document.head.appendChild(style);
    }

    showModal(title, content, actions = []) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        overlay.id = 'modal-overlay';
        
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-95 opacity-0';
        modal.innerHTML = `
            <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">${title}</h3>
                <div class="text-gray-600 mb-6">${content}</div>
                <div class="flex justify-end space-x-3">
                    ${actions.map(action => `
                        <button 
                            class="px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${action.class || 'btn-secondary'}"
                            onclick="${action.onclick || 'uiManager.closeModal()'}"
                        >
                            ${action.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Animate in
        requestAnimationFrame(() => {
            modal.classList.remove('scale-95', 'opacity-0');
            modal.classList.add('scale-100', 'opacity-100');
        });
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            const modal = overlay.querySelector('div');
            modal.classList.remove('scale-100', 'opacity-100');
            modal.classList.add('scale-95', 'opacity-0');
            
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        }
    }
}

// Make UIManager globally available
window.uiManager = null;