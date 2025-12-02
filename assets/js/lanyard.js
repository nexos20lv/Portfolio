const DISCORD_USER_ID = '1288079115248992297';
const LANYARD_WS_URL = `wss://api.lanyard.rest/socket`;

let ws;
let heartbeatInterval;

function connectLanyard() {
    console.log('🔌 Connecting to Lanyard...');

    ws = new WebSocket(LANYARD_WS_URL);

    ws.onopen = () => {
        console.log('✅ WebSocket connected');
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('📥 Lanyard message:', data);

        if (data.op === 1) {
            // Hello - send heartbeat
            const heartbeat_interval = data.d.heartbeat_interval;
            heartbeatInterval = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ op: 3 }));
                }
            }, heartbeat_interval);

            // Subscribe to user
            ws.send(JSON.stringify({
                op: 2,
                d: { subscribe_to_id: DISCORD_USER_ID }
            }));
        } else if (data.op === 0) {
            // Event - update UI
            updateLanyardUI(data.d);
        }
    };

    ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('🔄 WebSocket closed, reconnecting...');
        clearInterval(heartbeatInterval);
        setTimeout(connectLanyard, 3000);
    };
}

function updateLanyardUI(data) {
    console.log('🔄 Updating UI with data:', data);

    const avatar = document.getElementById('lanyard-avatar');
    const username = document.getElementById('lanyard-username');
    const statusIndicator = document.getElementById('lanyard-status-indicator');
    const statusText = document.getElementById('lanyard-status-text');
    const activityDiv = document.getElementById('lanyard-activity');
    const activityImg = document.getElementById('lanyard-activity-img');
    const activityName = document.getElementById('lanyard-activity-name');
    const activityDetails = document.getElementById('lanyard-activity-details-text');
    const activityState = document.getElementById('lanyard-activity-state');

    if (!data) {
        console.warn('⚠️ No data received');
        return;
    }

    // Update avatar
    if (avatar && data.discord_user) {
        const avatarUrl = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`;
        avatar.src = avatarUrl;
        console.log('👤 Avatar updated');
    }

    // Update username
    if (username && data.discord_user) {
        username.textContent = data.discord_user.username;
        console.log('✏️ Username:', data.discord_user.username);
    }

    // Update status
    if (statusIndicator && statusText) {
        const status = data.discord_status || 'offline';
        statusIndicator.style.backgroundColor = getStatusColor(status);
        statusText.textContent = getStatusText(status);
        console.log('🟢 Status:', status);
    }

    // Update activity (Spotify)
    if (activityDiv && data.spotify) {
        activityDiv.style.display = 'flex';
        if (activityImg) activityImg.src = data.spotify.album_art_url;
        if (activityName) activityName.textContent = 'Spotify';
        if (activityDetails) activityDetails.textContent = data.spotify.song;
        if (activityState) activityState.textContent = data.spotify.artist;
        console.log('🎵 Spotify:', data.spotify.song);
    } else if (activityDiv) {
        activityDiv.style.display = 'none';
    }
}

function getStatusColor(status) {
    const colors = {
        online: '#43b581',
        idle: '#faa61a',
        dnd: '#f04747',
        offline: '#747f8d'
    };
    return colors[status] || colors.offline;
}

function getStatusText(status) {
    const texts = {
        online: 'En ligne',
        idle: 'Absent',
        dnd: 'Ne pas déranger',
        offline: 'Hors ligne'
    };
    return texts[status] || 'Hors ligne';
}

// Start connection when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', connectLanyard);
} else {
    connectLanyard();
}
