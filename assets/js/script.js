const codeParam = new URLSearchParams(window.location.search).get('code');
const licenseSelect = document.getElementById('license');

if (codeParam && licenseSelect) {
    licenseSelect.value = codeParam;
}

const menuToggle = document.querySelector('.menu-toggle');
const mainNavigation = document.querySelector('.nav-links');

if (menuToggle && mainNavigation) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mainNavigation.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNavigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            mainNavigation.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

const faqSearch = document.getElementById('faq-search');
const faqItems = Array.from(document.querySelectorAll('.faq-item'));
const faqNoResults = document.querySelector('.faq-no-results');
const defaultFaqLimit = 3;

if (faqSearch && faqItems.length) {
    faqItems.forEach((item, index) => {
        item.hidden = index >= defaultFaqLimit;
    });

    faqSearch.addEventListener('input', () => {
        const searchTerm = faqSearch.value.trim().toLowerCase();
        let visibleItems = 0;

        faqItems.forEach((item) => {
            const question = item.querySelector('summary').textContent.toLowerCase();
            const answer = item.querySelector('p').textContent.toLowerCase();
            const matchesSearch = question.includes(searchTerm) || answer.includes(searchTerm);
            const matches = searchTerm ? matchesSearch : faqItems.indexOf(item) < defaultFaqLimit;

            item.hidden = !matches;
            if (matches) visibleItems += 1;
        });

        if (faqNoResults) {
            faqNoResults.hidden = visibleItems !== 0;
        }
    });

    faqItems.forEach((item) => {
        item.addEventListener('toggle', () => {
            if (!item.open) return;

            faqItems.forEach((otherItem) => {
                if (otherItem !== item) otherItem.open = false;
            });
        });
    });
}

const galleryImages = document.querySelectorAll('.gallery-item img');

if (galleryImages.length) {
    const lightbox = document.createElement('div');
    const lightboxImage = document.createElement('img');
    const closeButton = document.createElement('button');

    lightbox.className = 'gallery-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Expanded gallery image');
    lightboxImage.alt = '';
    closeButton.className = 'gallery-lightbox-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close expanded image');
    closeButton.textContent = '\u00d7';

    lightbox.append(lightboxImage, closeButton);
    document.body.appendChild(lightbox);

    const closeLightbox = () => {
        lightbox.hidden = true;
        document.body.style.overflow = '';
    };

    galleryImages.forEach((image) => {
        image.addEventListener('click', () => {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.hidden = false;
            document.body.style.overflow = 'hidden';
        });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
}
