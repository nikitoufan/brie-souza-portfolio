async function loadGallery() {
    const grid = document.getElementById('gallery-grid');

    try {
        const response = await fetch('data/artworks.json');
        const artworks = await response.json();

        artworks.forEach(artwork => {
            const card = document.createElement('div');
            card.className = 'artwork';
            card.innerHTML = `
                <img src="${artwork.image}" alt="${artwork.title}">
                <p>${artwork.title}, ${artwork.year}</p>
            `;

            // Open lightbox when an artwork is clicked
            card.addEventListener('click', () => {
                openLightbox(artwork);
            });

            grid.appendChild(card);
        });

    } catch (error) {
        grid.innerHTML = '<p>Could not load the gallery right now.</p>';
        console.error('Error loading artworks:', error);
    }
}

function openLightbox(artwork) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    lightboxImg.src = artwork.image;
    lightboxImg.alt = artwork.title;
    caption.textContent = `${artwork.title}, ${artwork.year} - ${artwork.technique}`;

    lightbox.classList.remove('hidden');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
}

// Close when the X is clicked
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

// Close when click outside of the image (dark background)
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id == 'lightbox') {
        closeLightbox();
    }
});

// Close when key Esc is pressed
document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        closeLightbox();
    }
});

loadGallery();