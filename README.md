# Portfolio - Pierre Bouteman

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-success?style=for-the-badge&logo=github)](https://nexos20lv.github.io/Portfolio/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained-Yes-green?style=for-the-badge)](https://github.com/nexos20lv/Portfolio/graphs/commit-activity)

Bienvenue sur le dépôt de mon **portfolio personnel** — un site web moderne, responsive et interactif pour présenter mes projets, mes compétences et mon expérience en tant que développeur.

## ✨ Fonctionnalités

- **🎨 Design Moderne** : Un thème **Violet** premium avec des effets de glassmorphism, des lueurs néon et des animations fluides.
- **📱 Entièrement Responsive** : Optimisé pour tous les appareils, des grands écrans de bureau aux téléphones mobiles.
- **⚡ Statut en Temps Réel** : Intégration de l'**API Lanyard** (via WebSocket) pour afficher mon statut Discord en temps réel, mes activités et ma musique Spotify.
- **🎡 Carrousel 3D de Projets** : Un carrousel circulaire en 3D immersif pour naviguer parmi mes projets avec des effets visuels premium.
- **🔄 Carrousel Infini** : Un carrousel à défilement infini fluide pour présenter mes compétences techniques.
- **🌐 Multilingue** : Support de 10 langues (Français, Anglais, Espagnol, Allemand, Italien, Portugais, Russe, Chinois, Arabe) avec détection automatique.
- **🎮 Easter Eggs** : Fonctionnalités cachées amusantes incluant le code Konami, un message console secret et un jeu Tron caché.
- **🛠️ Stack Technique** : Construit avec **HTML5**, **CSS3** et **Vanilla JavaScript** pur pour des performances et un contrôle optimaux.
- **⚡ Service Worker** : Cache intelligent pour une expérience hors ligne fluide et des temps de chargement ultra-rapides.

## 🚀 Démo en Direct

👉 [Voir le Portfolio](https://nexos20lv.github.io/Portfolio/)

---

## 🛠️ Technologies Utilisées

### Front-End

- **HTML5** : Structure sémantique.
- **CSS3** : Variables personnalisées, Flexbox/Grid, Animations, Glassmorphism.
- **JavaScript (ES6+)** : Manipulation du DOM, gestion WebSocket (Lanyard), logique du carrousel.
- **FontAwesome** : Icônes vectorielles évolutives.
# Portfolio - Pierre Bouteman

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-success?style=for-the-badge&logo=github)](https://nexos20lv.github.io/Portfolio/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

Site vitrine personnel développé en **HTML5**, **CSS3** et **Vanilla JS**.

## Résumé des changements récents

- Améliorations de performance : `loading="lazy"` / `decoding="async"` sur les images décoratives, `preload` du logo.
- SEO : ajout de `rel="canonical"` et d'un script `application/ld+json` (Person & WebSite).
- Accessibilité / i18n : menu de langue rendu navigable au clavier (Enter / Espace), menu items focusables.

## Structure rapide

- `index.html` — entrée principale
- `assets/css/` — styles
- `assets/js/` — scripts (i18n, carrousel, lanyard, etc.)
- `assets/lang/` — fichiers de traduction JSON

## Tester localement

1. Cloner le dépôt :

```bash
git clone https://github.com/nexos20lv/Portfolio.git
cd Portfolio
```

2. Lancer un serveur HTTP simple (recommandé pour tester Service Worker et chemins relatifs) :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

#

Le bouton du header utilise l'attribut `download` pour forcer le téléchargement.

## Suggestions / prochaines actions rapides

- Générer des variantes WebP des images principales et utiliser `<picture>` pour servir WebP quand possible.
- Lancer un audit Lighthouse et appliquer les recommandations (CSS inutilisé, temps de chargement, optimisation LCP).
- Ajouter meta tags Open Graph détaillés par projet si vous publiez des pages individuelles de projet.

## Contact

- Email : pierre.bouteman@icloud.com

---

Conçu et développé par **Pierre Bouteman**.
