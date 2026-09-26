// ========================================
// MOBILE MENU
// ========================================

const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('#nav-links');

function closeMenu() {
    navLinks.classList.remove('active');
    menuIcon.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
    const isOpen = navLinks.classList.toggle('active');
    menuIcon.setAttribute('aria-expanded', String(isOpen));
}

menuIcon.addEventListener('click', toggleMenu);

// Close the menu after choosing a link, or on outside click
navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
    const clickedInsideNav = navLinks.contains(event.target) || menuIcon.contains(event.target);
    if (!clickedInsideNav && navLinks.classList.contains('active')) {
        closeMenu();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
        menuIcon.focus();
    }
});


// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach((anchor) => {
                    const isActive = anchor.getAttribute('href') === `#${id}`;
                    anchor.classList.toggle('active', isActive);
                    if (isActive) {
                        anchor.setAttribute('aria-current', 'true');
                    } else {
                        anchor.removeAttribute('aria-current');
                    }
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach((section) => navObserver.observe(section));
}


// ========================================
// SCROLL REVEAL
// ========================================

const revealEls = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => revealObserver.observe(el));
}


// ========================================
// CONTACT FORM
// ========================================

// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

const EMAILJS_SERVICE_ID = 'service_l176jkg';
const EMAILJS_TEMPLATE_ID = 'template_411rrph';
const EMAILJS_PUBLIC_KEY = 'RVD6VoJOT48_MGskD';

emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
});

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            formStatus.textContent =
                'Please enter a valid email and message.';
            return;
        }

        const senderEmail =
            document.querySelector('#contact-email').value.trim();

        const message =
            document.querySelector('#contact-message').value.trim();

        const submitBtn =
            contactForm.querySelector('button[type="submit"]');

        submitBtn.disabled = true;
        formStatus.textContent = 'Sending...';

        emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                email: senderEmail,
                message: message
            }
        )
        .then(function (response) {
            console.log('Email sent:', response);

            formStatus.textContent =
                "Thanks — I'll get back to you soon.";

            contactForm.reset();
        })
        .catch(function (error) {
            console.error('EmailJS error:', error);

            formStatus.textContent =
                'Failed to send email. Please try again.';
        })
        .finally(function () {
            submitBtn.disabled = false;
        });
    });
}


// ========================================
// FOOTER YEAR
// ========================================

const yearEl = document.querySelector('#year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}