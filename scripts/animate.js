window.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('header nav');
    nav.classList.add('show');
    const container = document.querySelector('.card-box');
    const originalCards = Array.from(document.querySelectorAll('.flip-card'));
    let isPaused = false;
    let scrollInterval;
    function duplicateCards() {
        for (let i = 0; i < 2; i++) {
            originalCards.forEach(card => {
                const clonedCard = card.cloneNode(true);
                container.appendChild(clonedCard);
            });
        }
    }
    function deleteClones() {
        const allCards = Array.from(container.querySelectorAll('.flip-card'));
        allCards.forEach((card, index) => {
            if (index >= originalCards.length) {
                card.remove();
            }
        });
    }
    function centerCard(card) {
        const containerHeight = container.clientHeight;
        const cardHeight = card.offsetHeight;
        const cardOffsetTop = card.offsetTop;
        const scrollTo = cardOffsetTop - (containerHeight / 2) + (cardHeight / 2);
        container.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
        });
    }
    function startScroll() {
        scrollInterval = setInterval(() => {
            if (!isPaused) {
                if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
                    container.scrollTop = 0;
                } else {
                    container.scrollTop += 1;
                }
            }
        }, 30);
    }
    container.addEventListener('mouseenter', () => {
        isPaused = true;
        deleteClones();
    });

    container.addEventListener('mouseleave', () => {
        isPaused = false;
        duplicateCards();
    });

    // // Center a card when hovered
    // container.addEventListener('mouseover', (event) => {
    //     if (event.target.closest('.flip-card')) {
    //         centerCard(event.target.closest('.flip-card'));
    //     }
    // });
    window.addEventListener('beforeunload', () => {
        clearInterval(scrollInterval);
    });
    duplicateCards();
    startScroll();
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