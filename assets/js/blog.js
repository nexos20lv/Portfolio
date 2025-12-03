class Blog {
    constructor() {
        this.container = document.querySelector('.blog-grid');
        this.init();
    }

    async init() {
        if (!this.container) return;

        try {
            const response = await fetch('./assets/data/articles.json');
            const data = await response.json();
            this.render(data);
            this.animate();
        } catch (error) {
            console.error('Error loading articles:', error);
        }
    }

    render(articles) {
        this.container.innerHTML = articles.map(article => {
            const formattedDate = this.formatDate(article.date); // Define formattedDate here
            return `
            <div class="blog-card glass-card">
                <div class="blog-content">
                    <div class="blog-date">
                        <i class="far fa-calendar-alt"></i> ${formattedDate}
                    </div>
                    <h3 class="blog-title">${article.title}</h3>
                    <p class="blog-summary">${article.summary}</p>
                    </div>
                    <!-- <a href="#" class="read-more">
                        Lire l'article <i class="fas fa-arrow-right"></i>
                    </a> -->
                </div>
            </div>
        `;
        }).join('');
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }

    animate() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.blog-card').forEach(card => {
            observer.observe(card);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Blog();
});
