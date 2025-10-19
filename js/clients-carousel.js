// ===================================
// Clients Carousel - Infinite Scroll
// ===================================

class ClientsCarousel {
    constructor() {
        this.carousel = document.querySelector('.clients-carousel');
        this.wrapper = document.querySelector('.clients-carousel-wrapper');

        if (!this.carousel || !this.wrapper) return;

        this.init();
    }

    init() {
        // Clone all items to create infinite scroll effect
        const items = Array.from(this.carousel.querySelectorAll('.client-logo-item'));
        const originalCount = items.length;

        // Clone items once to create seamless infinite loop
        items.forEach(item => {
            const clone = item.cloneNode(true);
            this.carousel.appendChild(clone);
        });

        // Wait for images to load, then calculate and set animation
        setTimeout(() => {
            this.setupAnimation();
        }, 100);
    }

    setupAnimation() {
        // Get the width of one set of original items
        const items = Array.from(this.carousel.querySelectorAll('.client-logo-item'));
        const originalCount = items.length / 2; // Half are clones

        let totalWidth = 0;
        for (let i = 0; i < originalCount; i++) {
            const item = items[i];
            const style = window.getComputedStyle(item);
            const width = item.offsetWidth;
            const marginRight = parseFloat(style.marginRight) || 0;
            const gap = 32; // var(--spacing-lg) = 2rem = 32px
            totalWidth += width + gap;
        }

        // Set CSS variable for animation distance
        this.carousel.style.setProperty('--scroll-distance', `-${totalWidth}px`);

        console.log('%c🎯 Clients Carousel initialized', 'color: #00d4ff; font-weight: bold;');
        console.log(`%cOriginal items: ${originalCount}, Total scroll distance: ${totalWidth}px`, 'color: #00d4ff;');
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const clientsCarousel = new ClientsCarousel();
    
    // Make it globally accessible if needed
    window.clientsCarousel = clientsCarousel;
});

