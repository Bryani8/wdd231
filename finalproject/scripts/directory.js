document.addEventListener("DOMContentLoaded", async () => {
    const gridContainer = document.querySelector('#directory-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.querySelector('#sound-modal');
    const modalTitle = document.querySelector('#modal-title');
    const modalBody = document.querySelector('#modal-body');
    const closeModalBtn = document.querySelector('#close-modal');

    if (!gridContainer) return;

    try {
        const response = await fetch('./data/data.json');
        if (!response.ok) throw new Error('Failed to load sound directory.');

        const sounds = await response.json();

        const renderSounds = (items) => {
            if (items.length === 0) {
                gridContainer.innerHTML = '<p>No ambient sounds found for this category.</p>';
                return;
            }

            gridContainer.innerHTML = items.map(sound => `
                <div class="sound-directory-card" data-id="${sound.id}">
                    <img src="${sound.imageUrl}" alt="${sound.name}" width="100" height="70" loading="lazy">
                    <div class="sound-directory-info">
                        <h3>${sound.name}</h3>
                        <p class="meta"><strong>Category:</strong> ${sound.category} &bull; ${sound.duration}</p>
                        <p class="desc">${sound.description}</p>
                        <audio controls src="${sound.audioUrl}" style="width: 100%; height: 32px; margin-top: 0.5rem;"></audio>
                        <button class="details-btn" data-id="${sound.id}" style="margin-top: 0.5rem; padding: 0.25rem 0.5rem; cursor: pointer;">View Details</button>
                    </div>
                </div>
            `).join('');

            // Attach event listeners to detail buttons for modal activation
            document.querySelectorAll('.details-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const soundId = btn.dataset.id;
                    const sound = sounds.find(s => s.id === soundId);
                    if (sound && modal) {
                        modalTitle.textContent = sound.name;
                        modalBody.innerHTML = `
                            <p><strong>Category:</strong> ${sound.category}</p>
                            <p><strong>Duration:</strong> ${sound.duration}</p>
                            <p>${sound.description}</p>
                            <button id="fav-btn" style="margin-top: 1rem; padding: 0.5rem 1rem; cursor: pointer;">
                                ${localStorage.getItem('ecosound_favorite') === sound.id ? 'Favorited ★' : 'Mark as Favorite ☆'}
                            </button>
                        `;
                        modal.showModal();

                        // LocalStorage integration for favorite sound tracking
                        const favBtn = document.querySelector('#fav-btn');
                        if (favBtn) {
                            favBtn.addEventListener('click', () => {
                                localStorage.setItem('ecosound_favorite', sound.id);
                                favBtn.textContent = 'Favorited ★';
                            });
                        }
                    }
                });
            });
        };

        // Modal close event handling
        if (closeModalBtn && modal) {
            closeModalBtn.addEventListener('click', () => {
                modal.close();
            });
            modal.addEventListener('click', (e) => {
                const rect = modal.getBoundingClientRect();
                if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
                    modal.close();
                }
            });
        }

        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');

        if (categoryParam) {
            const filtered = sounds.filter(s => s.category.toLowerCase() === categoryParam.toLowerCase());
            renderSounds(filtered);
            filterButtons.forEach(btn => {
                if (btn.dataset.filter.toLowerCase() === categoryParam.toLowerCase()) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        } else {
            renderSounds(sounds);
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.dataset.filter;
                if (filterValue === 'all') {
                    renderSounds(sounds);
                } else {
                    const filtered = sounds.filter(s => s.category.toLowerCase() === filterValue.toLowerCase());
                    renderSounds(filtered);
                }
            });
        });

    } catch (error) {
        console.error(error);
        gridContainer.innerHTML = '<p style="color: red;">Failed to load sound directory. Please try again later.</p>';
    }
});