// ==================== //
// Navigation Toggle
// ==================== //
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ==================== //
// Job Search Functionality
// ==================== //
const searchJobsBtn = document.getElementById('search-jobs-btn');
if (searchJobsBtn) {
    searchJobsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const jobTitle = document.querySelector('.job-search-container input[placeholder*="Job Title"]').value;
        const location = document.querySelector('.job-search-container input[placeholder*="City"]').value;

        if (!jobTitle && !location) {
            alert('Please enter a job title or location to search');
            return;
        }

        // Simulate search with loading state
        const originalText = searchJobsBtn.textContent;
        searchJobsBtn.textContent = 'Searching...';
        searchJobsBtn.disabled = true;

        setTimeout(() => {
            alert(`Searching for: ${jobTitle || 'All positions'} in ${location || 'All locations'}\n\nPlease contact us to discuss available opportunities!`);
            searchJobsBtn.textContent = originalText;
            searchJobsBtn.disabled = false;
        }, 1000);
    });
}

// ==================== //
// Smooth Scroll with Offset
// ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 80; // Height of fixed navbar
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== //
// Navbar Background on Scroll
// ==================== //
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==================== //
// Active Navigation Link
// ==================== //
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== //
// Scroll Animations (Fade In Up)
// ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with fade-in class
const fadeElements = document.querySelectorAll('.fade-in-up');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ==================== //
// Contact Form Handling
// ==================== //
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        setTimeout(() => {
            alert('Message sent successfully! We will get back to you soon.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// ==================== //
// Add Hover Effects to Cards
// ==================== //
const cards = document.querySelectorAll('.staffing-card, .type-card, .feature-card, .testimonial-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

console.log('Spark Tek Solutions - Loaded Successfully');
