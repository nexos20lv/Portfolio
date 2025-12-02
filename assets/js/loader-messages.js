/**
 * Loader with random funny messages
 */

const loaderMessages = [
    "Chargement du portfolio le plus stylé... 🚀",
    "Compilation du code parfait... 💻",
    "Téléchargement de plus de RAM... 🔧",
    "Activation du mode développeur... ⚡",
    "Préparation de l'expérience ultime... ✨",
    "Chargement des compétences... 📚",
    "Démarrage des particules interactives... 🎨",
    "Optimisation du carrousel 3D... 🎡",
    "Installation du talent... 😎",
    "Chargement de la créativité... 🎯",
    "Initialisation du génie... 🧠",
    "Activation des super-pouvoirs... 💪",
    "Préparation du café... ☕",
    "Chargement des projets incroyables... 🌟",
    "Démarrage de la magie... ✨",
    "Compilation du style... 👔",
    "Chargement de l'excellence... 🏆",
    "Initialisation de Discord... 💬",
    "Activation du Konami Code... 🎮",
    "Préparation du spectacle... 🎭"
];

let loaderInterval;

// Select random message
function setRandomLoaderMessage() {
    const loaderText = document.getElementById('loader-text');
    if (loaderText) {
        const randomMessage = loaderMessages[Math.floor(Math.random() * loaderMessages.length)];
        loaderText.textContent = randomMessage;
    }
}

// Start immediately
setRandomLoaderMessage();
loaderInterval = setInterval(setRandomLoaderMessage, 2000);

// Stop when page is loaded
window.addEventListener('load', () => {
    if (loaderInterval) {
        clearInterval(loaderInterval);
    }
});
