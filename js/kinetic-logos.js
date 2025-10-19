// ===================================
// Kinetic Logo Effect for Trusted By Section
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    const clientLogoItems = document.querySelectorAll('.client-logo-item');

    clientLogoItems.forEach(item => {
        let isHovering = false;
        let currentX = 0;
        let currentY = 0;
        let velocityX = 0;
        let velocityY = 0;
        let animationFrameId = null;

        // Kinetic movement on mouse move - affects the BOX, not the logo
        item.addEventListener('mouseenter', function() {
            isHovering = true;
            // Cancel any ongoing bounce animation
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            // Stop floating animation
            this.style.animation = 'none';
            // Disable transition for smooth real-time movement
            this.style.transition = 'border-color 0.3s ease';
        });

        item.addEventListener('mousemove', function(e) {
            if (!isHovering) return;

            const rect = this.getBoundingClientRect();

            // Get mouse position relative to the center of the box
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate offset from center
            const deltaX = (mouseX - centerX) / centerX;
            const deltaY = (mouseY - centerY) / centerY;

            // Apply movement to the BOX (max 25px in any direction)
            const targetX = deltaX * 25;
            const targetY = deltaY * 25;

            // Smooth interpolation for more fluid movement
            currentX += (targetX - currentX) * 0.15;
            currentY += (targetY - currentY) * 0.15;

            // Apply transform to the BOX
            this.style.transform = `translate(${currentX}px, ${currentY}px)`;
        });

        // "No-gravity" floating back effect when mouse leaves
        item.addEventListener('mouseleave', function() {
            isHovering = false;

            // Very gentle initial velocity - like releasing in zero gravity
            velocityX = -currentX * 0.08;
            velocityY = -currentY * 0.08;

            // Start animation loop for float-back
            animateBounceBack(this);
        });

        // Float-back animation - simulates zero gravity drift
        function animateBounceBack(element) {
            const airResistance = 0.94; // Very light resistance - floaty feeling
            const magneticPull = 0.03; // Very weak pull to center - gentle drift
            const threshold = 0.01;

            function animate() {
                if (isHovering) {
                    // Stop animation if mouse re-enters
                    animationFrameId = null;
                    return;
                }

                // Calculate distance from center
                const distance = Math.sqrt(currentX * currentX + currentY * currentY);

                // Gentle magnetic pull towards center - gets stronger as it gets closer
                // This creates a natural deceleration curve
                const pullMultiplier = Math.max(0.5, distance / 25);
                const springForceX = -currentX * magneticPull * pullMultiplier;
                const springForceY = -currentY * magneticPull * pullMultiplier;

                // Apply gentle pull to velocity
                velocityX += springForceX;
                velocityY += springForceY;

                // Apply very light air resistance
                velocityX *= airResistance;
                velocityY *= airResistance;

                // Update position based on velocity
                currentX += velocityX;
                currentY += velocityY;

                // Gentle ease-in when very close to center
                if (distance < 1.5) {
                    const easeAmount = 0.92;
                    currentX *= easeAmount;
                    currentY *= easeAmount;
                    velocityX *= easeAmount;
                    velocityY *= easeAmount;
                }

                // Apply transform
                element.style.transform = `translate(${currentX}px, ${currentY}px)`;

                // Continue animation if still moving
                if (Math.abs(velocityX) > threshold ||
                    Math.abs(velocityY) > threshold ||
                    Math.abs(currentX) > threshold ||
                    Math.abs(currentY) > threshold) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    // Final reset to exact position
                    currentX = 0;
                    currentY = 0;
                    velocityX = 0;
                    velocityY = 0;
                    element.style.transform = 'translate(0, 0)';
                    animationFrameId = null;

                    // Re-enable floating animation
                    const randomDelay = Math.random() * 2;
                    const randomDuration = 4 + Math.random() * 2;
                    element.style.animation = `logoFloat ${randomDuration}s ease-in-out ${randomDelay}s infinite`;
                }
            }

            animate();
        }

        // Add subtle floating animation when not hovering
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 2;

        item.style.animation = `logoFloat ${randomDuration}s ease-in-out ${randomDelay}s infinite`;
    });

    // Add CSS animation for floating effect on the BOX
    const style = document.createElement('style');
    style.textContent = `
        @keyframes logoFloat {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(2px, -2px);
            }
            50% {
                transform: translate(-2px, 2px);
            }
            75% {
                transform: translate(2px, 2px);
            }
        }

        .client-logo-item:hover {
            animation: none !important;
        }
    `;
    document.head.appendChild(style);

    console.log('%c✨ Kinetic logos initialized', 'color: #00d4ff; font-weight: bold;');
});
