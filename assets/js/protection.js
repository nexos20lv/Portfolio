/**
 * Protection script
 * Allows normal user interaction (copy/paste, right click)
 * but attempts to block/detect DevTools.
 * Includes IP-based admin bypass.
 */

(function () {
    const currentYear = new Date().getFullYear();
    const ALLOWED_IP = '2.11.247.57'; // REMPLACEZ CECI PAR VOTRE IP

    // Check Admin IP
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            // Log IP to help user find it
            console.log(`%c🔒 Detected IP: ${data.ip}`, "color: #888; font-size: 10px;");

            if (data.ip === ALLOWED_IP) {
                window.__PB_ADMIN__ = true;
                console.log("%c🛡️ Admin access granted - Security disabled", "color: #00ff00; font-size: 14px; font-weight: bold;");

                // Remove the custom context menu if it exists
                const menu = document.getElementById('custom-context-menu');
                if (menu) menu.remove();
            }
        })
        .catch(err => console.error('Failed to check IP', err));

    // Console Warning
    console.log("%c⛔ STOP !", "color: #ff0000; font-size: 50px; font-weight: bold;");
    console.log("%c🚨 Attention !", "color: #ff6b00; font-size: 30px; font-weight: bold;");
    console.log(
        `%c⚠️ Ce site est protégé par le droit d'auteur.\n\n© ${currentYear} Pierre Bouteman - Tous droits réservés.\n\nSi vous souhaitez utiliser ce code, contactez-moi :\n📧 pierre.bouteman@icloud.com`,
        "color: #ffffff; font-size: 14px; line-height: 1.5;"
    );

    // Block DevTools shortcuts
    document.addEventListener("keydown", function (e) {
        if (window.__PB_ADMIN__) return; // Bypass for admin

        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }

        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
    });

    // Custom Context Menu
    const createContextMenu = () => {
        const menu = document.createElement('div');
        menu.id = 'custom-context-menu';
        menu.style.zIndex = '200000'; // Ensure it's above navbar
        menu.innerHTML = `
            <div class="ctx-menu-item" id="ctx-copy">
                <i class="fas fa-copy"></i> Copier
            </div>
            <div class="ctx-menu-item" id="ctx-paste">
                <i class="fas fa-paste"></i> Coller
            </div>
            <div class="ctx-menu-item" id="ctx-reload">
                <i class="fas fa-rotate-right"></i> Recharger
            </div>
            <div class="ctx-menu-separator"></div>
            <div class="ctx-menu-footer">
                © ${currentYear} Pierre Bouteman
            </div>
        `;
        document.body.appendChild(menu);

        // Actions
        document.getElementById('ctx-copy').addEventListener('click', () => {
            document.execCommand('copy');
            menu.style.display = 'none';
        });

        document.getElementById('ctx-paste').addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
                    const start = document.activeElement.selectionStart;
                    const end = document.activeElement.selectionEnd;
                    const val = document.activeElement.value;
                    document.activeElement.value = val.slice(0, start) + text + val.slice(end);
                    document.activeElement.selectionStart = document.activeElement.selectionEnd = start + text.length;
                }
            } catch (err) {
                console.error('Failed to read clipboard', err);
            }
            menu.style.display = 'none';
        });

        document.getElementById('ctx-reload').addEventListener('click', () => {
            location.reload();
        });

        return menu;
    };

    const contextMenu = createContextMenu();

    // Handle Right Click
    document.addEventListener("contextmenu", function (e) {
        if (window.__PB_ADMIN__) return; // Bypass for admin (allow native menu)

        e.preventDefault();

        const menu = document.getElementById('custom-context-menu');
        const copyBtn = document.getElementById('ctx-copy');
        const pasteBtn = document.getElementById('ctx-paste');

        // Enable/Disable Copy based on selection
        if (window.getSelection().toString().length > 0) {
            copyBtn.classList.remove('disabled');
        } else {
            copyBtn.classList.add('disabled');
        }

        // Enable/Disable Paste based on active element
        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
            pasteBtn.classList.remove('disabled');
        } else {
            pasteBtn.classList.add('disabled');
        }

        // Position
        let x = e.clientX;
        let y = e.clientY;

        // Boundary check
        if (x + 200 > window.innerWidth) x = window.innerWidth - 200;
        if (y + menu.offsetHeight > window.innerHeight) y = window.innerHeight - menu.offsetHeight;

        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
        menu.style.display = 'flex';
    });

    // Close menu on click elsewhere
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('custom-context-menu');
        if (menu && !menu.contains(e.target)) {
            menu.style.display = 'none';
        }
    });

    // DevTools Detection (Window resize method + Debugger)
    let devtoolsOpen = false;
    const threshold = 160;

    const checkDevTools = () => {
        if (window.__PB_ADMIN__) return; // Bypass for admin

        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                // Aggressive clearing
                try {
                    document.body.innerHTML = '';
                    window.location.reload();
                } catch (e) { }
            }
        } else {
            devtoolsOpen = false;
        }
    };

    setInterval(checkDevTools, 500);

    // Debugger loop to annoy inspection
    setInterval(() => {
        if (window.__PB_ADMIN__) return; // Bypass for admin
        debugger;
    }, 100);

    // Copyright Watermark
    const addWatermark = () => {
        const watermark = document.createElement("div");
        watermark.id = "copyright-watermark";
        watermark.innerHTML = `<div style="position:fixed;bottom:10px;right:10px;background:rgba(167,132,205,0.1);color:rgba(227,209,245,0.5);padding:8px 15px;border-radius:8px;font-size:12px;font-family:'Outfit',sans-serif;z-index:999998;pointer-events:none;backdrop-filter:blur(5px);border:1px solid rgba(227,209,245,0.2)">© ${currentYear} Pierre Bouteman</div>`;

        if (!document.getElementById("copyright-watermark")) {
            document.body.appendChild(watermark);
        }
    };

    // Set global security flag immediately
    window.__PB_SECURITY__ = true;

    window.addEventListener("load", function () {
        addWatermark();
    });

    // Re-add watermark if removed
    setInterval(() => {
        if (!document.getElementById("copyright-watermark")) {
            addWatermark();
        }
    }, 2000);

})();
