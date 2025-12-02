/**
 * 3D Circular Projects Carousel
 * Creates an interactive 3D carousel for project cards
 */

class ProjectsCarousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.carousel = this.container.querySelector('.projects-carousel');
        this.cards = Array.from(this.carousel.querySelectorAll('.project-card'));
        this.currentIndex = 0;
        this.isAnimating = false;

        // Carousel settings
        this.radius = 600; // Distance from center
        this.angleStep = (2 * Math.PI) / this.cards.length;

        this.init();
    }

    init() {
        // Create navigation buttons
        this.createNavigation();

        // Position cards initially
        this.updateCarousel(false);

        // Add swipe support for mobile
        this.addSwipeSupport();

        // Add keyboard navigation
        this.addKeyboardSupport();
    }

    createNavigation() {
        const navContainer = document.createElement('div');
        navContainer.className = 'carousel-navigation';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-nav-btn carousel-prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.addEventListener('click', () => this.prev());

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-nav-btn carousel-next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener('click', () => this.next());

        navContainer.appendChild(prevBtn);
        navContainer.appendChild(nextBtn);
        this.container.appendChild(navContainer);
    }

    updateCarousel(animate = true) {
        if (!animate) {
            this.carousel.style.transition = 'none';
        } else {
            this.carousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        this.cards.forEach((card, index) => {
            const angle = this.angleStep * (index - this.currentIndex);
            const x = Math.sin(angle) * this.radius;
            const z = Math.cos(angle) * this.radius - this.radius;
            const rotateY = -angle * (180 / Math.PI);

            // Apply transform
            card.style.transform = `
                translate3d(${x}px, 0, ${z}px)
                rotateY(${rotateY}deg)
            `;

            // Update opacity and scale based on position
            const distanceFromCenter = Math.abs(index - this.currentIndex);
            const normalizedDistance = distanceFromCenter / (this.cards.length / 2);

            if (index === this.currentIndex) {
                card.classList.add('active');
                card.style.opacity = '1';
                card.style.filter = 'brightness(1.2)';
                card.style.zIndex = '100';
            } else {
                card.classList.remove('active');
                card.style.opacity = Math.max(0.3, 1 - normalizedDistance * 0.7);
                card.style.filter = 'brightness(0.7)';
                card.style.zIndex = String(50 - distanceFromCenter);
            }
        });

        // Re-enable transitions after initial positioning
        if (!animate) {
            setTimeout(() => {
                this.carousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 50);
        }
    }

    next() {
        if (this.isAnimating) return;

        this.isAnimating = true;
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateCarousel();

        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }

    prev() {
        if (this.isAnimating) return;

        this.isAnimating = true;
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.updateCarousel();

        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }

    addSwipeSupport() {
        let startX = 0;
        let startY = 0;
        let isDragging = false;

        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });

        this.carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;

            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;

            // Prevent vertical scroll if horizontal swipe is detected
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                e.preventDefault();
            }
        }, { passive: false });

        this.carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;

            const endX = e.changedTouches[0].clientX;
            const deltaX = endX - startX;

            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.prev();
                } else {
                    this.next();
                }
            }

            isDragging = false;
        });
    }

    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });
    }
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProjectsCarousel('projects');
    });
} else {
    new ProjectsCarousel('projects');
}
