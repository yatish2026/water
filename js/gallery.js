/* Gallery JS: handles dummy uploads, rendering, modal preview and localStorage persistence */

const GALLERY_KEY = 'watercare_gallery_images';

function readStoredImages() {
    try {
        const raw = localStorage.getItem(GALLERY_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveStoredImages(arr) {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(arr));
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';
    const images = readStoredImages();

    if (images.length === 0) {
        // render default placeholders (use emojis as before)
        const placeholders = [
            { title: 'Survey Week Photo', desc: 'Water facilities inspection on campus', emoji: '📸' },
            { title: 'Awareness Drive', desc: 'Students participating in cleanliness campaign', emoji: '📷' },
            { title: 'Training Session', desc: 'Expert speaking on water safety', emoji: '📹' },
            { title: 'Community Event', desc: 'Volunteers working together', emoji: '🎥' },
            { title: 'Data Presentation', desc: 'Statistical analysis of water facilities', emoji: '📊' },
            { title: 'Project Exhibition', desc: 'Final showcase of the WaterCare project', emoji: '🏆' },
        ];

        placeholders.forEach(p => {
            const item = createGalleryItem({ src: null, title: p.title, desc: p.desc, emoji: p.emoji });
            grid.appendChild(item);
        });
        return;
    }

    images.forEach(img => {
        const item = createGalleryItem(img);
        grid.appendChild(item);
    });
}

function createGalleryItem(data) {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'gallery-image';

    if (data.src) {
        const img = document.createElement('img');
        img.src = data.src;
        img.alt = data.title || 'Gallery image';
        imgWrap.appendChild(img);
        img.addEventListener('click', () => openPreview(data));
    } else {
        imgWrap.textContent = data.emoji || '📷';
    }

    const h3 = document.createElement('h3');
    h3.textContent = data.title || 'Untitled';

    const p = document.createElement('p');
    p.textContent = data.desc || '';

    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.justifyContent = 'space-between';
    actions.style.alignItems = 'center';
    actions.style.padding = '0.6rem 1rem';

    const left = document.createElement('div');
    left.appendChild(h3);
    left.appendChild(p);

    const right = document.createElement('div');

    if (data.src) {
        const delBtn = document.createElement('button');
        delBtn.className = 'submit-button';
        delBtn.style.padding = '0.4rem 0.6rem';
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => deleteImage(data.id));
        right.appendChild(delBtn);
    }

    item.appendChild(imgWrap);
    item.appendChild(actions);
    actions.appendChild(left);
    actions.appendChild(right);

    return item;
}

function openPreview(data) {
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;
    const body = modal.querySelector('.modal-body');
    body.innerHTML = '';
    const img = document.createElement('img');
    img.src = data.src;
    img.alt = data.title || 'Preview';
    body.appendChild(img);
    const caption = document.createElement('p');
    caption.textContent = data.title || '';
    body.appendChild(caption);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePreview() {
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function deleteImage(id) {
    let images = readStoredImages();
    images = images.filter(i => i.id !== id);
    saveStoredImages(images);
    renderGallery();
}

function handleFileSelect(files) {
    const arr = Array.from(files);
    const stored = readStoredImages();

    let count = 0;
    arr.forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const obj = {
                id: Date.now().toString() + Math.random().toString(36).slice(2,8),
                src: e.target.result,
                title: file.name,
                desc: 'Uploaded image'
            };
            stored.unshift(obj);
            saveStoredImages(stored);
            renderGallery();
        };
        reader.readAsDataURL(file);
        count++;
    });
    if (count === 0) alert('Please select image files to upload.');
}

function clearGallery() {
    if (!confirm('Clear all uploaded demo images? This will not remove placeholder items.')) return;
    localStorage.removeItem(GALLERY_KEY);
    renderGallery();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();

    const input = document.getElementById('gallery-upload');
    if (input) {
        input.addEventListener('change', (e) => {
            handleFileSelect(e.target.files);
            // reset input to allow same file re-selection
            e.target.value = '';
        });
    }

    const clearBtn = document.getElementById('clear-gallery');
    if (clearBtn) clearBtn.addEventListener('click', clearGallery);

    // modal handlers
    const modal = document.createElement('div');
    modal.id = 'gallery-modal';
    modal.className = 'modal gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" id="gallery-close">&times;</span>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener('click', (evt) => {
        if (evt.target === modal) closePreview();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePreview();
    });

    const closeBtn = document.getElementById('gallery-close');
    if (closeBtn) closeBtn.addEventListener('click', closePreview);
});

// Export for debugging
window.WaterCareGallery = {
    renderGallery,
    clearGallery
};
