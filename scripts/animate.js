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
    let isPaused = false, isManuallyScrolling = false, scrollInterval, manualScrollTimeout;

    const duplicateCards = () => {
        for (let i = 0; i < 2; i++) {
            originalCards.forEach(card => {
                container.appendChild(card.cloneNode(true));
            });
        }
    };

    const deleteClones = () => {
        const allCards = [...container.querySelectorAll('.flip-card')];
        allCards.slice(originalCards.length).forEach(card => card.remove());
    };

    const centerCard = card => {
        if (!isManuallyScrolling) {
            const scrollTo = card.offsetTop - (container.clientHeight / 2) + (card.offsetHeight / 2);
            container.scrollTo({ top: scrollTo, behavior: 'smooth' });
        }
    };

    const startScroll = () => {
        scrollInterval = setInterval(() => {
            if (!isPaused && !isManuallyScrolling) {
                if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
                    container.scrollTop = 0;
                } else {
                    container.scrollTop += 1;
                }
            }
        }, 30);
    };

    // Manual scroll detection
    container.addEventListener('wheel', () => {
        isPaused = true;
        isManuallyScrolling = true;
        clearTimeout(manualScrollTimeout);
        manualScrollTimeout = setTimeout(() => {
            isManuallyScrolling = false;
            if (!container.matches(':hover')) isPaused = false;
        }, 100);
    });

    container.addEventListener('mouseleave', () => {
        if (!isManuallyScrolling) {
            isPaused = false;
            duplicateCards();
        }
    });

    container.addEventListener('mouseover', (e) => {
        const card = e.target.closest('.flip-card');
        if (card && !isManuallyScrolling) {
            isPaused = true;
            deleteClones();
            centerCard(card);
        }
    });

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
    }, 7000);
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
