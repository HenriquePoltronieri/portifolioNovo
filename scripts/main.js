// SCROLL PROGRESS INDICATOR
const scrollIndicator = document.getElementById('scroll-indicator');

function updateScrollIndicator() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollIndicator.style.width = progress + '%';
}

// NAVBAR SCROLL EFFECT
const navbar = document.getElementById('navbar');

function updateNavbar() {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// MOBILE HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// INTERSECTION OBSERVER — FADE IN
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

document.querySelectorAll('.skill-card, .course-card').forEach(el => {
    observer.observe(el);
});

// PROJECT FILTER
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const tags = card.dataset.tags || '';
            if (filter === 'all' || tags.includes(filter)) {
                card.classList.remove('hidden');
                card.style.animation = 'none';
                card.offsetHeight;
                card.style.animation = 'fade-up 0.4s ease both';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// CONTACT FORM SUBMIT
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;

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

// SMOOTH ACTIVE NAV HIGHLIGHT
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

// SCROLL EVENT LISTENER
window.addEventListener('scroll', () => {
    updateScrollIndicator();
    updateNavbar();
    highlightActiveNav();
}, { passive: true });

// INITIAL CALL
updateNavbar();


//PROJECT MODAL
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalBanner = document.getElementById('modal-banner');
const modalBannerIcon = document.getElementById('modal-banner-icon');
const modalBannerLabel = document.getElementById('modal-banner-label');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalStatus = document.getElementById('modal-status');
const modalTechs = document.getElementById('modal-techs');
const modalGithub = document.getElementById('modal-github');
const modalDemo = document.getElementById('modal-demo');

// Map of banner background classes per project image class
const bannerClassMap = {
    'project-img--flutter': 'project-img--flutter',
    'project-img--kotlin': 'project-img--kotlin',
    'project-img--swift': 'project-img--swift',
    'project-img--java': 'project-img--java',
    'project-img--python': 'project-img--python',
    'project-img--csharp': 'project-img--csharp',
};

function openModal(card) {
    // Collect data from card's data attributes
    const title = card.dataset.title || '';
    const desc = card.dataset.desc || '';
    const techsRaw = card.dataset.techs || '';
    const status = card.dataset.status || '';
    const github = card.dataset.github || '#';
    const demo = card.dataset.demo || '#';
    const langIcon = card.dataset.langIcon || '';
    const imgClass = card.dataset.imgClass || '';
    const label = card.querySelector('.project-img-label')?.textContent || '';

    // Title
    modalTitle.textContent = title;

    // Description
    modalDesc.textContent = desc;

    // Status badge
    modalStatus.textContent = status;
    modalStatus.className = 'modal-status';
    if (status.toLowerCase().includes('desenvolvimento')) {
        modalStatus.classList.add('status-wip');
    } else {
        modalStatus.classList.add('status-done');
    }

    // Banner background
    // Remove previous banner classes
    Object.values(bannerClassMap).forEach(c => modalBanner.classList.remove(c));
    if (imgClass && bannerClassMap[imgClass]) {
        modalBanner.classList.add(bannerClassMap[imgClass]);
    }

    // Banner icon & label
    modalBannerIcon.src = langIcon;
    modalBannerIcon.alt = title;
    modalBannerLabel.textContent = label;

    // Technologies chips
    modalTechs.innerHTML = '';
    techsRaw.split(',').forEach(tech => {
        const t = tech.trim();
        if (!t) return;
        const chip = document.createElement('span');
        chip.className = 'modal-tech-chip';
        chip.textContent = t;
        modalTechs.appendChild(chip);
    });

    // Links
    modalGithub.href = github;
    modalDemo.href = demo;

    // Always show both buttons
    modalGithub.style.display = 'inline-flex';
    modalDemo.style.display = 'inline-flex';

    // Open overlay
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus trap: focus close button
    setTimeout(() => modalClose.focus(), 50);
}

function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

// Open on project card click
projectCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
});

// Close on button
modalClose.addEventListener('click', closeModal);

// Close on overlay backdrop click (outside modal-box)
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeModal();
    }
});
