// Incrémenter cette version à chaque déploiement pour forcer la mise à jour du cache
const CACHE_VERSION = 'v2.0';
const CACHE_NAME = `portfolio-${CACHE_VERSION}`;

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './assets/css/main.css',
    './assets/css/background.css',
    './assets/css/animations.css',
    './assets/css/responsive.css',
    './assets/css/carousel-responsive.css',
    './assets/css/modals.css',
    './assets/css/modal-links.css',
    './assets/css/social-links.css',
    './assets/css/loader.css',
    './assets/js/animations.js',
    './assets/js/particles.js',
    './assets/js/skills-stats.js',
    './assets/js/skill-bars-animation.js',
    './assets/js/infiniteCarousel.js',
    './assets/js/projects-carousel.js',
    './assets/js/modals.js',
    './assets/js/grainHeight.js',
    './assets/js/loader-messages.js',
    './assets/js/loader.js',
    './assets/js/hash-reset.js',
    './assets/js/lanyard.js',
    './assets/js/easterEggs.js',
    './assets/js/i18n.js',
    './assets/js/parallax.js',
    './assets/js/nav-scroll.js',
    './assets/img/logo.png',
    './assets/img/mii.png'
];

// Installation du service worker
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installation', CACHE_NAME);
    // Force le service worker à s'activer immédiatement
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Mise en cache des assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Stratégie Network First : Toujours chercher sur le réseau en premier
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Si la requête réseau réussit, mettre à jour le cache
                if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                }
                return response;
            })
            .catch(() => {
                // Si le réseau échoue, utiliser le cache (mode hors ligne)
                return caches.match(event.request)
                    .then((response) => {
                        if (response) {
                            console.log('[ServiceWorker] Récupération depuis le cache:', event.request.url);
                            return response;
                        }
                        // Si pas de cache non plus, retourner une erreur
                        return new Response('Contenu non disponible hors ligne', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activation', CACHE_NAME);
    // Prendre le contrôle immédiatement
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[ServiceWorker] Suppression de l\'ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});
