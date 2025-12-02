/**
 * Skill Bars Animation on Scroll
 */

function animateSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated-in')) {
                entry.target.classList.add('animated-in');

                // Animate the skill level bar
                const skillLevel = entry.target.querySelector('.skill-level');
                if (skillLevel) {
                    const level = skillLevel.dataset.level;
                    skillLevel.style.setProperty('--skill-width', `${level}%`);
                    skillLevel.style.width = `${level}%`;
                }
            }
        });
    }, {
        threshold: 0.3
    });

    skillCards.forEach(card => observer.observe(card));
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateSkillBars);
} else {
    animateSkillBars();
}
