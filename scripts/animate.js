window.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('header nav');
    nav.classList.add('show');
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
