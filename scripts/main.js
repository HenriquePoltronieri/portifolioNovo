/* ===========================
    SCROLL PROGRESS INDICATOR
   =========================== */
const scrollIndicator = document.getElementById('scroll-indicator');

function updateScrollIndicator() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollIndicator.style.width = progress + '%';
}

/* ===========================
    NAVBAR SCROLL EFFECT
   =========================== */
const navbar = document.getElementById('navbar');

function updateNavbar() {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/* ===========================
    MOBILE HAMBURGER MENU
   =========================== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

/*  ===========================
    INTERSECTION OBSERVER — FADE IN
    =========================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, parseInt(delay));
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and course cards
document.querySelectorAll('.skill-card, .course-card').forEach(el => {
    observer.observe(el);
});

/*  ===========================
    PROJECT FILTER
    =========================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const tags = card.dataset.tags || '';
            if (filter === 'all' || tags.includes(filter)) {
                card.classList.remove('hidden');
                card.style.animation = 'none';
                card.offsetHeight; // reflow
                card.style.animation = 'fade-up 0.4s ease both';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

/*  ===========================
    CONTACT FORM SUBMIT
    =========================== */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            contactForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
            formSuccess.classList.add('show');
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 4000);
        }, 1200);
    });
}

/*  ===========================
    SMOOTH ACTIVE NAV HIGHLIGHT
    =========================== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function highlightActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navItems.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + id) {
                    link.style.color = 'var(--purple-light)';
                }
            });
        }
    });
}

/* ===========================
    SCROLL EVENT LISTENER
   =========================== */
window.addEventListener('scroll', () => {
    updateScrollIndicator();
    updateNavbar();
    highlightActiveNav();
}, { passive: true });

/* ===========================
    CURSOR GLOW EFFECT (desktop)
   =========================== */
if (window.innerWidth > 1024) {
    const glow = document.createElement('div');
    glow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.5s ease, top 0.5s ease;
    will-change: left, top;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

/* ===========================
    INITIAL CALL
   =========================== */
updateNavbar();