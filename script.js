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
// Job Search & Filter Functionality
// ==================== //
const searchJobsBtn = document.getElementById('search-jobs-btn');
const jobsGrid = document.getElementById('jobsGrid');

if (searchJobsBtn && jobsGrid) {
    const jobKeywordInput = document.getElementById('jobKeywordInput');
    const jobLocationInput = document.getElementById('jobLocationInput');
    const jobCategoryFilter = document.getElementById('jobCategoryFilter');
    const jobTypeFilter = document.getElementById('jobTypeFilter');
    const jobResultsCount = document.getElementById('jobResultsCount');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const jobCards = Array.from(jobsGrid.querySelectorAll('.job-card'));

    const runJobSearch = () => {
        const keyword = jobKeywordInput.value.trim().toLowerCase();
        const location = jobLocationInput.value.trim().toLowerCase();
        const category = jobCategoryFilter.value;
        const type = jobTypeFilter.value;

        let visibleCount = 0;

        jobCards.forEach(card => {
            const title = (card.dataset.title || '').toLowerCase();
            const cardLocation = (card.dataset.location || '').toLowerCase();
            const cardCategory = card.dataset.category || '';
            const cardType = card.dataset.type || '';

            const matchesKeyword = !keyword || title.includes(keyword) || card.textContent.toLowerCase().includes(keyword);
            const matchesLocation = !location || cardLocation.includes(location);
            const matchesCategory = category === 'all' || cardCategory === category;
            const matchesType = type === 'all' || cardType === type;

            const isMatch = matchesKeyword && matchesLocation && matchesCategory && matchesType;
            card.style.display = isMatch ? '' : 'none';
            if (isMatch) visibleCount++;
        });

        if (jobResultsCount) {
            jobResultsCount.textContent = visibleCount === jobCards.length
                ? 'Showing all open roles'
                : `Showing ${visibleCount} of ${jobCards.length} open roles`;
        }

        if (noResultsMessage) {
            noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    };

    searchJobsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        runJobSearch();
    });

    [jobKeywordInput, jobLocationInput].forEach(input => {
        input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') runJobSearch();
        });
    });

    [jobCategoryFilter, jobTypeFilter].forEach(select => {
        select.addEventListener('change', runJobSearch);
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
