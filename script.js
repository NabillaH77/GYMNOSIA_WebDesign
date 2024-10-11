document.addEventListener('DOMContentLoaded', function() {
    // Service box animation
    const serviceBoxes = document.querySelectorAll('.service-box');
    serviceBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.querySelector('.service-content').style.height = '200px';
            this.querySelector('p').style.display = 'block';
        });

        box.addEventListener('mouseleave', function() {
            this.querySelector('.service-content').style.height = '100px';
            this.querySelector('p').style.display = 'none';
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Check if it's an internal link (starts with '#')
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Responsive navigation menu (for mobile)
const menuBtn = document.querySelector('.menu-btn');
const navUl = document.querySelector('.nav-links');
menuBtn.addEventListener('click', function() {
    navUl.style.display = navUl.style.display === 'flex' ? 'none' : 'flex';
});

// script.js
document.addEventListener('DOMContentLoaded', function() {
    const featureItems = document.querySelectorAll('.feature-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.5
    });

    featureItems.forEach(item => {
        observer.observe(item);
    });
});

//  Toggle class active
const navbarNav = document.querySelector('.navbar-nav');
// Ketika hamburger menu di klik
document.querySelector('#hamburger-menu').
onclick = () => {
  navbarNav.classList.toggle('active');
};

//Klik diluar sidebar untuk menghilangkan nav
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function (e) {
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
       navbarNav.classList.remove('active'); 
    }
});
