/**
 * Interactive floating particles effect for background
 * Particles react to mouse movement with repulsion and attraction
 */

let mouseX = 0;
let mouseY = 0;
let particles = [];

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Particle class
class Particle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = size;
        this.element = null;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update() {
        // Calculate distance from mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
            // Repulsion effect
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 3;
            this.y -= Math.sin(angle) * force * 3;
        } else {
            // Return to base position
            this.x += (this.baseX - this.x) * 0.05;
            this.y += (this.baseY - this.y) * 0.05;
        }

        // Gentle floating animation
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;

        // Update DOM element
        if (this.element) {
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
        }
    }
}

// Create particles
function createParticles() {
    const background = document.querySelector('.background');
    if (!background) return;

    // Check if particles already exist
    if (document.querySelector('.particles-container')) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    `;

    // Create 50 particles
    for (let i = 0; i < 50; i++) {
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        const particle = new Particle(x, y, size);

        const particleElement = document.createElement('div');
        particleElement.className = 'particle';
        particleElement.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(167, 132, 205, ${Math.random() * 0.6 + 0.3});
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            box-shadow: 0 0 ${size * 3}px rgba(167, 132, 205, 0.6);
            transition: all 0.1s ease-out;
        `;

        particle.element = particleElement;
        particles.push(particle);
        particlesContainer.appendChild(particleElement);
    }

    background.appendChild(particlesContainer);

    // Animation loop
    function animate() {
        particles.forEach(particle => particle.update());
        requestAnimationFrame(animate);
    }
    animate();
}

// Initialize particles when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createParticles);
} else {
    createParticles();
}

// Handle window resize
window.addEventListener('resize', () => {
    particles.forEach(particle => {
        particle.baseX = Math.random() * window.innerWidth;
        particle.baseY = Math.random() * window.innerHeight;
    });
});
