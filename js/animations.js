// ===================================
// Animations & Visual Effects
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Scroll Reveal Animation
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .client-logo-item,
        .contact-item,
        .section-title
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in-element');
        fadeInObserver.observe(el);
    });
    
    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    // ===================================
    // Typing Effect for Hero Title (Optional)
    // ===================================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Uncomment to enable typing effect
    /*
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 30);
    }
    */
    
    // ===================================
    // Mouse Follow Effect for CTA Button
    // ===================================
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    }
    
    // ===================================
    // Counter Animation for Stats (if needed)
    // ===================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // ===================================
    // Cursor Trail Effect (Optional)
    // ===================================
    let cursorTrail = [];
    const trailLength = 10;
    
    function createCursorTrail() {
        document.addEventListener('mousemove', function(e) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.cssText = `
                position: fixed;
                width: 5px;
                height: 5px;
                background: var(--color-accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                opacity: 0.6;
                animation: trailFade 0.5s ease-out forwards;
            `;
            
            document.body.appendChild(trail);
            cursorTrail.push(trail);
            
            if (cursorTrail.length > trailLength) {
                const oldTrail = cursorTrail.shift();
                oldTrail.remove();
            }
            
            setTimeout(() => trail.remove(), 500);
        });
    }
    
    // Uncomment to enable cursor trail
    // createCursorTrail();
    
    // Portfolio animations are handled by portfolio-carousel.js
    
    // ===================================
    // Service Card Hover Glow Effect
    // ===================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--glow-x', `${x}px`);
            this.style.setProperty('--glow-y', `${y}px`);
        });
    });

    // ===================================
    // Profile Card Hover Glow Effect
    // ===================================
    const profileCards = document.querySelectorAll('.profile-card');

    profileCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--glow-x', `${x}px`);
            this.style.setProperty('--glow-y', `${y}px`);
        });
    });

    // ===================================
    // Client Logo Floating Animation
    // ===================================
    const clientLogos = document.querySelectorAll('.client-logo-item');
    
    clientLogos.forEach((logo, index) => {
        const delay = index * 0.1;
        logo.style.animationDelay = `${delay}s`;
    });
    
    // ===================================
    // Add Animation Styles
    // ===================================
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        /* Fade In Animation */
        .fade-in-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Trail Fade Animation */
        @keyframes trailFade {
            to {
                opacity: 0;
                transform: scale(0);
            }
        }
        
        /* Floating Animation */
        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        .client-logo-item {
            animation: float 3s ease-in-out infinite;
        }
        
        /* Glow Effect for Service Cards */
        .service-card {
            position: relative;
            overflow: hidden;
        }
        
        .service-card::before {
            content: '';
            position: absolute;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
            left: var(--glow-x, 50%);
            top: var(--glow-y, 50%);
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .service-card:hover::before {
            opacity: 1;
        }
        
        /* CTA Button Ripple Effect */
        .cta-button {
            position: relative;
            overflow: hidden;
        }
        
        .cta-button::before {
            content: '';
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            left: var(--mouse-x, 50%);
            top: var(--mouse-y, 50%);
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .cta-button:hover::before {
            opacity: 1;
        }
        
        /* Smooth Transitions */
        * {
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Loading Animation */
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }
        
        .loading {
            animation: pulse 1.5s ease-in-out infinite;
        }
    `;
    
    document.head.appendChild(animationStyles);
    
    // ===================================
    // Page Load Animation
    // ===================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add loaded class styles
        const loadedStyles = document.createElement('style');
        loadedStyles.textContent = `
            body {
                opacity: 0;
                animation: fadeInBody 0.5s ease forwards;
            }
            
            body.loaded {
                opacity: 1;
            }
            
            @keyframes fadeInBody {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(loadedStyles);
    });
    
    console.log('%c✨ Animations loaded', 'color: #00d4ff; font-weight: bold;');
});
