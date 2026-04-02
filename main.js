// Menu burger fonctionnel
document.addEventListener('DOMContentLoaded', function() {
    const btnMenu = document.getElementById('btn_menu');
    const navContent = document.querySelector('.nav_content');
    const navLinks = document.querySelectorAll('.nav_content a');

    // Ouvrir/Fermer le menu au clic sur le bouton et mettre à jour aria-expanded
    btnMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        const open = navContent.classList.toggle('active');
        btnMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navContent.classList.remove('active');
            btnMenu.setAttribute('aria-expanded', 'false');
        });
    });

    // Fermer le menu quand on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!navContent.contains(e.target) && e.target !== btnMenu) {
            navContent.classList.remove('active');
            btnMenu.setAttribute('aria-expanded', 'false');
        }
    });

    // Fermer le menu avec la touche Echap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (navContent.classList.contains('active')) {
                navContent.classList.remove('active');
                btnMenu.setAttribute('aria-expanded', 'false');
                btnMenu.focus();
            }
        }
    });

    // Fermer le menu si la fenêtre est redimensionnée
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navContent.classList.remove('active');
            btnMenu.setAttribute('aria-expanded', 'false');
        }
    });
});



// Floating contact widget (WhatsApp + Devis)
document.addEventListener('DOMContentLoaded', function() {
    // create container
    const float = document.createElement('div');
    float.className = 'floating-contact';

    // sub button WhatsApp
    const btnWhats = document.createElement('a');
    btnWhats.className = 'fab-sub fab-whats';
    btnWhats.href = 'https://wa.me/243859367449';
    btnWhats.target = '_blank';
    btnWhats.setAttribute('aria-label', 'Contacter sur WhatsApp');
    btnWhats.innerHTML = '<i class="fab fa-whatsapp"></i>';

    // sub button Devis (scroll to contact)
    const btnDevis = document.createElement('a');
    btnDevis.className = 'fab-sub fab-devis';
    btnDevis.href = 'contact.html#contact';
    btnDevis.setAttribute('aria-label', 'Demander un devis');
    btnDevis.innerHTML = '<i class="fas fa-file-invoice-dollar"></i>';

    // main button
    const btnMain = document.createElement('button');
    btnMain.className = 'fab-main';
    btnMain.setAttribute('aria-label', 'Contact rapide');
    btnMain.innerHTML = '<i class="fas fa-comment-dots"></i>';

    float.appendChild(btnWhats);
    float.appendChild(btnDevis);
    float.appendChild(btnMain);
    document.body.appendChild(float);

    // toggle
    btnMain.addEventListener('click', function(e){
        e.preventDefault();
        float.classList.toggle('open');
    });

    // close on outside click
    document.addEventListener('click', function(e){
        if (!float.contains(e.target)) float.classList.remove('open');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('[data-animation="fadeInUp"], [data-animation="InUp"]');

    if (serviceCards.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        observer.observe(card);
    });
});

// Portfolio Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project');

    // Show all projects by default
    projects.forEach(project => {
        project.style.display = 'grid';
    });

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projects.forEach(project => {
                    if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                        project.style.display = 'grid'; // Restore grid display
                        // Re-trigger animation
                        project.classList.remove('visible');
                        setTimeout(() => project.classList.add('visible'), 50);
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }
});

/* ===== INTERSECTION OBSERVER POUR ANIMATIONS VIEWPORT ===== */

document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('[data-animation="InUp"]');

    if (serviceCards.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        observer.observe(card);
    });
});
/* ===== HOVER SHIMMER EFFECT POUR BOUTONS ===== */
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('a[style*="background: linear-gradient"], button[style*="background: linear-gradient"], .cta_devis');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            // Ajouter classe pour animation shimmer
            if (!this.classList.contains('shimmer-active')) {
                this.classList.add('shimmer-active');
            }
        });

        btn.addEventListener('mouseleave', function(e) {
            this.classList.remove('shimmer-active');
        });
    });
});

/* ===== CONFETTI on CTA ===== */
function createConfetti(x, y) {
    const colors = [
        'var(--emerald-400)',
        'var(--cyan-400)',
        'var(--indigo-400)',
        '#FFD700',
        '#FF6B6B'
    ];
    for (let i = 0; i < 30; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = `${x + (Math.random() - 0.5) * 60}px`;
        piece.style.top = `${y + (Math.random() - 0.5) * 60}px`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 2100);
    }
}

document.addEventListener('click', function(e) {
    const target = e.target.closest('.btn-primary');
    if (target) {
        const rect = target.getBoundingClientRect();
        createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
});

/* ===== FUN CURSOR TRAIL ===== */
document.addEventListener('DOMContentLoaded', function() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    document.addEventListener('mousemove', (e) => {
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
    });
});

/* ===== SMOOTH SCROLL À LA PAGE ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Focus sur l'élément cible pour l'accessibilité
            target.focus({ preventScroll: true});
        }
    });
});

/* ===== RANDOM ICON COLORS (SERVICES PAGE) ===== */
document.addEventListener('DOMContentLoaded', function() {
    // Ne s'exécute que si on est sur la page services ou si les cartes de service existent
    const serviceIcons = document.querySelectorAll('.service-card__icon i');
    if (serviceIcons.length === 0) return;

    const colors = [
        'var(--emerald-400)',
        'var(--cyan-400)',
        'var(--indigo-400)'
    ];

    serviceIcons.forEach(icon => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        icon.style.color = randomColor;
    });
});