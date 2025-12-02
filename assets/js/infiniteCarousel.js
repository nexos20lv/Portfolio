const carousel = document.querySelector(".infiniteCarousel");
const container = document.querySelector(".carouselContainer");

// Only run if carousel elements exist
if (carousel && container && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    carousel.setAttribute("data-animated", true);

    // Duplicate items for seamless scrolling
    const items = Array.from(container.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", true);
        container.appendChild(clone);
    });
}