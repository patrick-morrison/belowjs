/**
 * Navigation functionality for BelowJS static site
 */

function toggleMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.getElementById('nav-mobile');
    
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.getElementById('nav-mobile');
    
    if (!toggle.contains(event.target) && !mobileNav.contains(event.target)) {
        toggle.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Close mobile nav when window resizes to desktop
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const toggle = document.querySelector('.nav-toggle');
        const mobileNav = document.getElementById('nav-mobile');
        toggle.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Set active navigation item based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPath === href || (href !== '/' && currentPath.startsWith(href)))) {
            link.classList.add('active');
        }
    });
});