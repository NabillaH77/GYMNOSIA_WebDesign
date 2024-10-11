document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const controls = document.querySelectorAll('.carousel-control');
    let currentIndex = 0;

    controls.forEach(control => {
        control.addEventListener('click', (e) => {
            e.preventDefault();
            if (control.classList.contains('left')) {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
            } else {
                currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            }
            updateCarousel();
        });
    });

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
});