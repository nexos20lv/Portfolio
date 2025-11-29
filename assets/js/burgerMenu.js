const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.navLinks');
const nav = document.querySelector('nav');
const navLinksItems = document.querySelectorAll('.navLinks a');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    nav.classList.toggle('menu-open');
});

navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        nav.classList.remove('menu-open');
    });
});

document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        nav.classList.remove('menu-open');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        nav.classList.remove('menu-open');
    }
});