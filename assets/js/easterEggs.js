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
    initArkaEasterEgg();
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
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(135deg, rgba(26, 11, 46, 0.98), rgba(45, 21, 72, 0.98));
        border: 2px solid rgba(167, 132, 205, 0.5);
        border-radius: 20px;
        padding: 40px;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 0 100px rgba(167, 132, 205, 0.4);
        animation: scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;

    modal.innerHTML = `
        <div style="font-size: 60px; margin-bottom: 20px;">🎮</div>
        <h2 style="color: #a78bfa; font-size: 28px; margin: 0 0 20px 0;">Konami Code Activé !</h2>
        <p style="color: rgba(255, 255, 255, 0.9); font-size: 18px; line-height: 1.6; margin: 0;">
            Tu vas être redirigé vers le portfolio de mon ami...<br>
            <span style="color: #a78bfa; font-weight: bold;">Mais soyons honnêtes</span>, 
            le mien est clairement meilleur ! 😎<br><br>
            <span style="font-size: 14px; color: rgba(255, 255, 255, 0.6);">
                (Je suis juste un meilleur dev 🚀)
            </span>
        </p>
        <div style="margin-top: 30px; font-size: 14px; color: rgba(255, 255, 255, 0.5);">
            Redirection dans <span id="countdown" style="color: #a78bfa; font-weight: bold;">5</span>...
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Countdown and redirect
    let count = 5;
    const countdownEl = modal.querySelector('#countdown');
    const interval = setInterval(() => {
        count--;
        countdownEl.textContent = count;
        if (count === 0) {
            clearInterval(interval);
            window.location.href = 'https://arka-ui.github.io/portfolio/';
        }
    }, 1000);

    console.log('🎮 Konami Code Activated! Redirecting to a friend\'s portfolio...');
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

function initArkaEasterEgg() {
    const secretCode = 'arka';
    let input = '';

    document.addEventListener('keydown', (e) => {
        input += e.key.toLowerCase();

        if (input.length > secretCode.length) {
            input = input.substr(input.length - secretCode.length);
        }

        if (input === secretCode) {
            window.location.href = 'https://arka-ui.github.io/portfolio/';
        }
    });
}
