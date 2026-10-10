import { updateFooterInfo, setupNavigation } from './utils.js';

document.addEventListener("DOMContentLoaded", async () => {
    updateFooterInfo();
    setupNavigation();

    try {
        const response = await fetch('./data/data.json');
        if (!response.ok) throw new Error('Failed to load sound data.');
        
        const sounds = await response.json();
        const shuffled = [...sounds].sort(() => 0.5 - Math.random());
        const selectedSounds = shuffled.slice(0, 3);

        const slots = [
            document.querySelector('#random-sound-1'),
            document.querySelector('#random-sound-2'),
            document.querySelector('#random-sound-3')
        ];

        slots.forEach((slot, index) => {
            if (slot && selectedSounds[index]) {
                const sound = selectedSounds[index];
                slot.innerHTML = `
                    <div class="random-sound-card">
                        <img src="${sound.imageUrl}" alt="${sound.name}" width="100" height="70">
                        <div class="sound-info">
                            <strong>${sound.name}</strong>
                            <p class="sound-meta">${sound.category} &bull; ${sound.duration}</p>
                            <p class="sound-desc">${sound.description}</p>
                        </div>
                    </div>
                    <audio controls src="${sound.audioUrl}" style="width: 100%; height: 30px;"></audio>
                `;
            }
        });
    } catch (error) {
        console.error('Error loading random soundscapes:', error);
    }

    const playlistContainer = document.querySelector('#playlist-container');
    if (playlistContainer) {
        fetch('./data/data.json')
            .then(res => res.json())
            .then(sounds => {
                const featured = sounds.slice(0, 2);
                playlistContainer.innerHTML = featured.map(track => `
                    <div class="playlist-item">
                        <span class="playlist-title">${track.name}</span>
                        <span class="playlist-duration">${track.duration}</span>
                    </div>
                `).join('');
            });
    }
});