/**
 * Easter Eggs Script
 * 
 * Includes:
 * 1. Konami Code (Up, Up, Down, Down, Left, Right, Left, Right, B, A) -> Rotates the page
 * 2. Console Message -> Hidden message for developers
 * 3. Logo Click -> 5 rapid clicks on the logo triggers a confetti effect (or simple alert for now)
 */

document.addEventListener('DOMContentLoaded', () => {
    initKonamiCode();
    initConsoleMessage();
    initLogoClick();
});

function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let cursor = 0;

    document.addEventListener('keydown', (e) => {
        cursor = (e.key === konamiCode[cursor]) ? cursor + 1 : 0;

        if (cursor === konamiCode.length) {
            activateKonamiEffect();
            cursor = 0;
        }
    });
}

function activateKonamiEffect() {
    document.body.style.transition = 'transform 2s ease-in-out';
    document.body.style.transform = 'rotate(360deg)';

    setTimeout(() => {
        document.body.style.transform = 'none';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 2000);
    }, 2000);

    console.log('🎮 Konami Code Activated! You are a true gamer!');
}

function initConsoleMessage() {
    const style = 'background: #2b2b2b; color: #bada55; padding: 6px; font-size: 14px; border-radius: 4px;';
    console.log('%c👋 Hey there! Looking at the code? Nice to meet you! 🚀', style);
    console.log('%cFeel free to reach out if you have any questions or just want to say hi!', 'color: #aaa; font-style: italic;');
}

function initLogoClick() {
    const logo = document.querySelector('.navList li:first-child a');
    if (!logo) return;

    let clickCount = 0;
    let clickTimer;

    logo.addEventListener('click', (e) => {
        // Don't prevent default immediately to allow navigation, 
        // but for the easter egg we might want to prevent it if triggered.
        // For now, let's just track clicks.

        clickCount++;

        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 1000); // Reset after 1 second of inactivity

        if (clickCount === 5) {
            e.preventDefault(); // Stop navigation on the 5th click
            activateLogoEffect();
            clickCount = 0;
        }
    });
}

function activateLogoEffect() {
    alert('🎉 You found a secret! 5 clicks on the logo!');
    // You could add more complex animations here later
}
