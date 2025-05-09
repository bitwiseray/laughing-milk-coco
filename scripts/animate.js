document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCardScroll();
    revealHeroText();
    setupScrollHideNav();
});

function initNavigation() {
    const nav = document.querySelector('header nav');
    nav.classList.add('show');
}

function initCardScroll() {
    const container = document.querySelector('.card-box');
    const originalCards = [...document.querySelectorAll('.flip-card')];
    let isPaused = false,
        isManuallyScrolling = false,
        scrollInterval,
        manualScrollTimeout;

    // Clone your cards twice for seamless looping
    const duplicateCards = () => {
        for (let i = 0; i < 2; i++) {
            originalCards.forEach(card => {
                container.appendChild(card.cloneNode(true));
            });
        }
    };

    // Remove the clones when you want to recenter
    const deleteClones = () => {
        const allCards = [...container.querySelectorAll('.flip-card')];
        allCards.slice(originalCards.length).forEach(card => card.remove());
    };

    // Center a card horizontally
    const centerCard = card => {
        if (!isManuallyScrolling) {
            const scrollTo = card.offsetLeft
                - (container.clientWidth / 2)
                + (card.offsetWidth / 2);
            container.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    // Auto‑scroll to the right, reset to 0 when you hit the end
    const startScroll = () => {
        scrollInterval = setInterval(() => {
            if (!isPaused && !isManuallyScrolling) {
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                    container.scrollLeft = 0;
                } else {
                    container.scrollLeft += 1;
                }
            }
        }, 30);
    };

    // Hijack wheel events for horizontal manual scroll
    container.addEventListener('wheel', (e) => {
        e.preventDefault();  // stop vertical scroll
        isPaused = true;
        isManuallyScrolling = true;
        clearTimeout(manualScrollTimeout);
        container.scrollLeft += e.deltaY;  // scroll horizontally by the wheel’s delta
        manualScrollTimeout = setTimeout(() => {
            isManuallyScrolling = false;
            if (!container.matches(':hover')) isPaused = false;
        }, 100);
    }, { passive: false });

    // When the mouse leaves, resume auto‑scroll and re‑duplicate
    container.addEventListener('mouseleave', () => {
        if (!isManuallyScrolling) {
            isPaused = false;
            duplicateCards();
        }
    });

    // On hover over a card, pause, delete clones, and center that card
    container.addEventListener('mouseover', (e) => {
        const card = e.target.closest('.flip-card');
        if (card && !isManuallyScrolling) {
            isPaused = true;
            deleteClones();
            centerCard(card);
        }
    });

    // Clean up on unload
    window.addEventListener('beforeunload', () => {
        clearInterval(scrollInterval);
        clearTimeout(manualScrollTimeout);
    });

    duplicateCards();
    startScroll();
}

function revealHeroText() {
    setTimeout(() => {
        const text = document.querySelector('.hero-mn-text');
        if (text) text.style.opacity = 1;
    }, 7200);
}

function setupScrollHideNav() {
    const nav = document.querySelector('header nav');
    let prevScrollPos = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollPos = window.scrollY;
        if (currentScrollPos === 0) nav.classList.add('show');
        else if (prevScrollPos < currentScrollPos) nav.classList.remove('show');
        prevScrollPos = currentScrollPos;
    });
}
