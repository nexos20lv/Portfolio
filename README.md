# Portfolio - Pierre Bouteman

Bienvenue sur le dépôt de mon **portfolio personnel** — un site web moderne, responsive et interactif pour présenter mes projets, mes compétences et mon expérience en tant que développeur.

## ✨ Fonctionnalités

- **🎨 Design Moderne** : Un thème **Violet** premium avec des effets de glassmorphism, des lueurs néon et des animations fluides.
- **📱 Entièrement Responsive** : Optimisé pour tous les appareils, des grands écrans de bureau aux téléphones mobiles.
- **⚡ Statut en Temps Réel** : Intégration de l'**API Lanyard** (via WebSocket) pour afficher mon statut Discord en temps réel, mes activités et ma musique Spotify.
- **🔄 Carrousel Infini** : Un carrousel à défilement infini fluide pour présenter mes compétences techniques.
- **🛠️ Stack Technique** : Construit avec **HTML5**, **CSS3** et **Vanilla JavaScript** pur pour des performances et un contrôle optimaux.

## 🚀 Démo en Direct

👉 [Voir le Portfolio](https://nexos20lv.github.io/Portfolio/)

---

## 🛠️ Technologies Utilisées

### Front-End
- **HTML5** : Structure sémantique.
- **CSS3** : Variables personnalisées, Flexbox/Grid, Animations, Glassmorphism.
- **JavaScript (ES6+)** : Manipulation du DOM, gestion WebSocket (Lanyard), logique du carrousel.
- **FontAwesome** : Icônes vectorielles évolutives.

### APIs & Intégrations
- **API Lanyard** : Connexion à Discord pour récupérer les données de présence (En ligne/Hors ligne, Jeux, Spotify).

---

## 📂 Structure du Projet

```bash
portfolio/
├── assets/
│   ├── css/
│   │   ├── main.css        # Styles principaux et variables
│   │   ├── responsive.css  # Media queries pour mobile/tablette
│   │   ├── animations.css  # Animations keyframes
│   │   └── ...
│   ├── js/
│   │   ├── lanyard.js      # Statut Discord & logique WebSocket
│   │   ├── infiniteCarousel.js # Logique du carrousel de compétences
│   │   └── ...
│   └── img/                # Images, icônes et assets de fond
└── index.html              # Point d'entrée principal
```

## 🔧 Installation & Utilisation

1.  **Cloner le dépôt** :
    ```bash
    git clone https://github.com/votre-username/portfolio.git
    cd portfolio
    ```

2.  **Lancer localement** :
    Ouvrez simplement `index.html` dans votre navigateur web préféré. Aucune étape de build ou de serveur n'est requise !

    *Optionnel : Utilisez une extension de serveur live (comme Live Server dans VS Code) pour une meilleure expérience de développement.*

## 🎨 Personnalisation

- **Couleurs** : Le thème est contrôlé par des variables CSS dans `assets/css/main.css`. Changez `--accent-color` ou `--text-color` pour changer facilement de thème.
- **Lanyard** : Mettez à jour `lanyardId` dans `assets/js/lanyard.js` avec votre propre ID utilisateur Discord pour afficher votre statut.

---

## 📫 Contact

N'hésitez pas à me contacter !
- **Email** : [pierre.bouteman@icloud.com](mailto:pierre.bouteman@icloud.com)
- **Discord** : Vérifiez le widget sur le site !

---

> Conçu et développé par **Pierre Bouteman** avec ❤️.
