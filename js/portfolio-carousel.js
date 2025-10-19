// ===================================
// Portfolio Infinite Carousel
// ===================================

class PortfolioCarousel {
    constructor() {
        this.carousel = document.querySelector('.portfolio-carousel');
        this.cards = Array.from(document.querySelectorAll('.portfolio-card'));
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        this.indicatorsContainer = document.querySelector('.carousel-indicators');
        
        this.currentIndex = 0;
        this.cardWidth = 0;
        this.gap = 0;
        this.visibleCards = 0;
        this.totalCards = this.cards.length;
        this.isAnimating = false;
        this.autoplayInterval = null;
        this.autoplayDelay = 4000;
        
        this.init();
    }
    
    init() {
        if (!this.carousel || this.cards.length === 0) return;
        
        // Clone cards for infinite loop
        this.cloneCards();
        
        // Calculate dimensions
        this.calculateDimensions();
        
        // Create indicators
        this.createIndicators();
        
        // Set initial position
        this.updateCarousel(false);
        
        // Event listeners
        this.attachEventListeners();
        
        // Start autoplay
        this.startAutoplay();
        
        console.log('%c🎨 Portfolio Carousel initialized', 'color: #00d4ff; font-weight: bold;');
    }
    
    cloneCards() {
        // Clone ALL cards multiple times for seamless infinite scroll
        const cloneCount = this.totalCards;

        // Clone all cards and prepend (for backward scrolling)
        for (let i = this.totalCards - 1; i >= 0; i--) {
            const clone = this.cards[i].cloneNode(true);
            clone.classList.add('clone', 'clone-before');
            this.carousel.insertBefore(clone, this.carousel.firstChild);
        }

        // Clone all cards and append (for forward scrolling)
        for (let i = 0; i < this.totalCards; i++) {
            const clone = this.cards[i].cloneNode(true);
            clone.classList.add('clone', 'clone-after');
            this.carousel.appendChild(clone);
        }

        // Update cards array to include clones
        this.allCards = Array.from(this.carousel.querySelectorAll('.portfolio-card'));

        // Set initial index to account for prepended clones
        this.currentIndex = cloneCount;
        this.cloneCount = cloneCount;

        console.log('Cloned cards:', {
            totalCards: this.totalCards,
            cloneCount: this.cloneCount,
            allCards: this.allCards.length,
            startIndex: this.currentIndex
        });
    }
    
    calculateDimensions() {
        const card = this.cards[0];
        const style = window.getComputedStyle(this.carousel);

        // Get exact card width
        this.cardWidth = card.offsetWidth;

        // Get gap from CSS (fixed at 20px)
        this.gap = parseInt(style.gap) || 20;

        // Calculate how many cards are visible
        const containerWidth = this.carousel.parentElement.offsetWidth;
        this.visibleCards = Math.floor(containerWidth / (this.cardWidth + this.gap));

        // Ensure at least 1 card is visible
        this.visibleCards = Math.max(1, this.visibleCards);

        console.log('Dimensions:', {
            cardWidth: this.cardWidth,
            gap: this.gap,
            containerWidth: containerWidth,
            visibleCards: this.visibleCards
        });
    }
    
    createIndicators() {
        if (!this.indicatorsContainer) return;
        
        this.indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < this.totalCards; i++) {
            const indicator = document.createElement('button');
            indicator.classList.add('carousel-indicator');
            indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
        
        this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.carousel-indicator'));
        this.updateIndicators();
    }
    
    updateIndicators() {
        if (!this.indicators) return;
        
        const realIndex = this.getRealIndex();
        
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === realIndex);
        });
    }
    
    getRealIndex() {
        // Convert current index to real index (accounting for clones)
        let realIndex = this.currentIndex - this.cloneCount;

        // Normalize to 0 - (totalCards - 1)
        while (realIndex < 0) {
            realIndex += this.totalCards;
        }
        while (realIndex >= this.totalCards) {
            realIndex -= this.totalCards;
        }

        return realIndex;
    }
    
    updateCarousel(animate = true) {
        if (!this.carousel) return;

        // Check if mobile
        const isMobile = window.innerWidth <= 768;
        let offset;

        if (isMobile) {
            // On mobile, center the card
            const containerWidth = this.carousel.parentElement.offsetWidth;
            const cardCenterOffset = (containerWidth - this.cardWidth) / 2;
            offset = -(this.currentIndex * (this.cardWidth + this.gap)) + cardCenterOffset;
        } else {
            // On desktop, use normal offset
            offset = -(this.currentIndex * (this.cardWidth + this.gap));
        }

        if (animate) {
            this.carousel.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            this.carousel.style.transition = 'none';
        }

        this.carousel.style.transform = `translateX(${offset}px)`;

        console.log('Update carousel:', {
            currentIndex: this.currentIndex,
            realIndex: this.getRealIndex(),
            offset: offset,
            animate: animate,
            isMobile: isMobile
        });

        this.updateIndicators();
    }
    
    next() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentIndex++;
        this.updateCarousel(true);
        
        // Check if we need to loop
        setTimeout(() => {
            this.checkLoop();
            this.isAnimating = false;
        }, 500);
        
        this.resetAutoplay();
    }
    
    prev() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentIndex--;
        this.updateCarousel(true);
        
        // Check if we need to loop
        setTimeout(() => {
            this.checkLoop();
            this.isAnimating = false;
        }, 500);
        
        this.resetAutoplay();
    }
    
    checkLoop() {
        // If we've scrolled past the end clones, jump back to real cards
        if (this.currentIndex >= this.cloneCount + this.totalCards) {
            this.currentIndex = this.cloneCount;
            this.updateCarousel(false);
        }

        // If we've scrolled before the beginning clones, jump to end real cards
        if (this.currentIndex < this.cloneCount) {
            this.currentIndex = this.cloneCount + this.totalCards - 1;
            this.updateCarousel(false);
        }
    }
    
    goToSlide(index) {
        if (this.isAnimating) return;

        this.currentIndex = index + this.cloneCount;
        this.updateCarousel(true);
        this.resetAutoplay();
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, this.autoplayDelay);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
    
    attachEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Pause autoplay on hover
        if (this.carousel) {
            this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
            this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
        }

        // Handle "View Project" button clicks
        document.querySelectorAll('.view-project').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const card = btn.closest('.portfolio-card');
                const projectTitle = card.querySelector('.project-title').textContent;
                console.log('View Project clicked:', projectTitle);
                // You can add modal or navigation logic here
                alert(`Opening project: ${projectTitle}`);
            });
        });

        // Prevent carousel navigation when clicking on cards
        document.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });

        // Touch/swipe support
        this.addTouchSupport();

        // Recalculate on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.calculateDimensions();
                this.updateCarousel(false);
            }, 250);
        });
    }
    
    addTouchSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        let hasMoved = false;

        const handleTouchStart = (e) => {
            // Don't start drag if clicking on a button or link
            if (e.target.closest('.view-project') || e.target.closest('.carousel-btn')) {
                return;
            }

            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            currentX = startX;
            isDragging = true;
            hasMoved = false;
            this.stopAutoplay();
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;
            currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;

            // Mark as moved if dragged more than 5px
            if (Math.abs(currentX - startX) > 5) {
                hasMoved = true;
            }
        };

        const handleTouchEnd = () => {
            if (!isDragging) return;
            isDragging = false;

            const diff = startX - currentX;
            const threshold = 50;

            // Only navigate if user actually dragged
            if (hasMoved && Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            } else {
                this.startAutoplay();
            }

            hasMoved = false;
        };

        if (this.carousel) {
            // Touch events
            this.carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
            this.carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
            this.carousel.addEventListener('touchend', handleTouchEnd);

            // Mouse events (for desktop dragging) - disabled to prevent conflicts
            // this.carousel.addEventListener('mousedown', handleTouchStart);
            // this.carousel.addEventListener('mousemove', handleTouchMove);
            // this.carousel.addEventListener('mouseup', handleTouchEnd);
            // this.carousel.addEventListener('mouseleave', handleTouchEnd);
        }
    }
    
    destroy() {
        this.stopAutoplay();
        // Remove event listeners and clean up
        console.log('Carousel destroyed');
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const portfolioCarousel = new PortfolioCarousel();
    
    // Make it globally accessible if needed
    window.portfolioCarousel = portfolioCarousel;
});
