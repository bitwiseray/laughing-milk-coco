window.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('header nav');
    nav.classList.add('show');

    const container = document.querySelector('.card-box');
    const cardBox = document.querySelectorAll('.flip-card');
    let isPaused = false;
    let scrollInterval;

    const originalCards = Array.from(cardBox);
    for (let i = 0; i < 2; i++) {
        originalCards.forEach(card => {
            const clonedCard = card.cloneNode(true);
            container.appendChild(clonedCard);
        });
    }

    function startScroll() {
        scrollInterval = setInterval(() => {
            if (!isPaused) {
                if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
                    container.scrollTop = 0;
                } else {
                    container.scrollTop += 1.5;
                }
            }
        }, 30);
    }

    // Pause on hover
    container.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    container.addEventListener('mouseleave', () => {
        isPaused = false;
    });
    startScroll();

    // Clean up interval on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(scrollInterval);
    });
});


let prevScrollPos = window.scrollY;
window.addEventListener('scroll', () => {
    const currentScrollPos = window.scrollY;
    const nav = document.querySelector('header nav');
    if (currentScrollPos === 0) {
        nav.classList.add('show');
    } 
    else if (prevScrollPos < currentScrollPos) {
        nav.classList.remove('show');
    }
    prevScrollPos = currentScrollPos;
});