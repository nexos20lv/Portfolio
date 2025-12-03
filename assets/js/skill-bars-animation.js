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
                const skillTitle = entry.target.querySelector('h3');

                if (skillLevel && skillTitle) {
                    const level = parseInt(skillLevel.dataset.level);

                    // Add percentage text if not exists
                    if (!entry.target.querySelector('.skill-percentage')) {
                        const header = document.createElement('div');
                        header.className = 'skill-header';

                        // Move title into header
                        skillTitle.parentNode.insertBefore(header, skillTitle);
                        header.appendChild(skillTitle);

                        const percentage = document.createElement('span');
                        percentage.className = 'skill-percentage';
                        percentage.textContent = `${level}%`;
                        header.appendChild(percentage);
                    }

                    // Calculate color based on percentage
                    let color;
                    if (level < 50) {
                        color = 'linear-gradient(90deg, #ff6b6b, #ff8787)'; // Red-ish
                    } else if (level < 80) {
                        color = 'linear-gradient(90deg, #fcc419, #ffe066)'; // Yellow/Orange
                    } else {
                        color = 'linear-gradient(90deg, #51cf66, #69db7c)'; // Green
                    }

                    skillLevel.style.setProperty('--skill-width', `${level}%`);
                    skillLevel.style.setProperty('--skill-color', color);
                    skillLevel.style.width = `${level}%`;
                }
            }
        });
    }, {
        threshold: 0.3
    });

    // Sort cards by level descending
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        const sortedCards = Array.from(skillCards).sort((a, b) => {
            const levelA = parseInt(a.querySelector('.skill-level').dataset.level || 0);
            const levelB = parseInt(b.querySelector('.skill-level').dataset.level || 0);
            return levelB - levelA;
        });

        sortedCards.forEach(card => skillsGrid.appendChild(card));
    }

    skillCards.forEach(card => observer.observe(card));
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateSkillBars);
} else {
    animateSkillBars();
}
