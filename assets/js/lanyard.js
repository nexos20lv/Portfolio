const lanyardId = "1288079115248992297";
const apiBase = "https://api.lanyard.rest/v1";
const wsUrl = "wss://api.lanyard.rest/socket";

// DOM Elements
const card = document.getElementById("lanyard-card");
const avatar = document.getElementById("lanyard-avatar");
const statusIndicator = document.getElementById("lanyard-status-indicator");
const username = document.getElementById("lanyard-username");
const statusText = document.getElementById("lanyard-status-text");

const activityContainer = document.getElementById("lanyard-activity");
const activityImg = document.getElementById("lanyard-activity-img");
const activityName = document.getElementById("lanyard-activity-name");
const activityState = document.getElementById("lanyard-activity-state");
const activityDetails = document.getElementById("lanyard-activity-details-text");

const closeBtn = document.getElementById("lanyard-close");
const toggleBtn = document.getElementById("lanyard-toggle");

let isHidden = false;

// Minimize by default on mobile
if (window.innerWidth <= 768) {
    isHidden = true;
    if (card) card.style.display = "none";
    if (toggleBtn) toggleBtn.style.display = "flex";
}

if (closeBtn && toggleBtn && card) {
    closeBtn.addEventListener("click", () => {
        card.style.display = "none";
        toggleBtn.style.display = "flex";
        isHidden = true;
    });

    toggleBtn.addEventListener("click", () => {
        card.style.display = "flex";
        toggleBtn.style.display = "none";
        isHidden = false;
    });

    // Open Discord Profile on Card Click
    card.addEventListener("click", (e) => {
        // Prevent opening if clicking the close button
        if (e.target.closest(".lanyard-close-btn")) return;

        window.open(`https://discord.com/users/${lanyardId}`, "_blank");
    });

    // Add cursor pointer to card to indicate clickability
    card.style.cursor = "pointer";
}

function updateLanyard(data) {
    if (!card) return;

    // Ensure card is visible if not manually hidden
    if (!isHidden) {
        card.style.display = "flex";
        if (toggleBtn) toggleBtn.style.display = "none";
    } else {
        card.style.display = "none";
        if (toggleBtn) toggleBtn.style.display = "flex";
    }

    // User Info
    const user = data.discord_user;
    if (user) {
        avatar.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        username.textContent = user.username;
    }

    // Status Color & Text
    let statusColor = "#747f8d";
    let statusLabel = "Hors ligne";

    switch (data.discord_status) {
        case "online":
            statusColor = "#43b581";
            statusLabel = "En ligne";
            break;
        case "idle":
            statusColor = "#faa61a";
            statusLabel = "Inactif";
            break;
        case "dnd":
            statusColor = "#f04747";
            statusLabel = "Ne pas déranger";
            break;
        case "offline":
            statusColor = "#747f8d";
            statusLabel = "Hors ligne";
            break;
    }

    statusIndicator.style.backgroundColor = statusColor;
    statusText.textContent = statusLabel;

    // Activity Handling
    if (!data.activities && !data.listening_to_spotify) {
        activityContainer.style.display = "none";
        return;
    }

    // Prioritize Spotify - Check both the direct object and activities array
    let spotifyData = data.spotify;

    if (!spotifyData && data.activities) {
        const spotifyActivity = data.activities.find(a => a.id === "spotify:1" || a.name === "Spotify");
        if (spotifyActivity) {
            spotifyData = {
                album_art_url: spotifyActivity.assets ? `https://i.scdn.co/image/${spotifyActivity.assets.large_image.replace("spotify:", "")}` : "./assets/img/logo.png",
                artist: spotifyActivity.state,
                song: spotifyActivity.details
            };
        }
    }

    if (spotifyData) {
        activityContainer.style.display = "flex";
        activityImg.src = spotifyData.album_art_url;
        activityName.textContent = "Spotify";
        activityState.textContent = spotifyData.artist || ""; // Artist
        activityDetails.textContent = spotifyData.song || ""; // Song
        return;
    }

    // If not Spotify, check other activities
    const otherActivities = data.activities.filter(a => a.type !== 4);
    const customStatus = data.activities.find(a => a.type === 4);

    // Show custom status text if available and no other status text set yet
    if (customStatus && customStatus.state) {
        statusText.textContent = customStatus.state;
    }

    if (otherActivities.length > 0) {
        const activity = otherActivities[0];
        activityContainer.style.display = "flex";

        activityName.textContent = activity.name;
        activityState.textContent = activity.state || "";
        activityDetails.textContent = activity.details || "";

        // Image handling for games/apps
        if (activity.assets && activity.assets.large_image) {
            let imageUrl = activity.assets.large_image;
            if (imageUrl.startsWith("mp:lanyard")) {
                imageUrl = `https://media.discordapp.net/${imageUrl.replace("mp:", "")}`;
            } else {
                imageUrl = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
            }
            activityImg.src = imageUrl;
        } else {
            activityImg.src = "./assets/img/logo.png";
        }
    } else {
        activityContainer.style.display = "none";
    }
}

// WebSocket Connection
let heartbeatInterval;

function connectWebSocket() {
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
        console.log("Lanyard WebSocket connected");
        // Initialize with Subscribe
        ws.send(JSON.stringify({
            op: 2,
            d: {
                subscribe_to_id: lanyardId
            }
        }));
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const { op, t, d } = message;

        if (op === 1) {
            // Hello message, start heartbeat
            heartbeatInterval = setInterval(() => {
                ws.send(JSON.stringify({ op: 3 }));
            }, d.heartbeat_interval);
        } else if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
            updateLanyard(d);
        }
    };

    ws.onclose = () => {
        console.log("Lanyard WebSocket closed, reconnecting...");
        clearInterval(heartbeatInterval);
        setTimeout(connectWebSocket, 5000);
    };

    ws.onerror = (error) => {
        console.error("Lanyard WebSocket error:", error);
        ws.close();
    };
}

// Start connection
connectWebSocket();
