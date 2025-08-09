// === PAGE PROGRESS BAR ===
const progressBar = document.createElement('div');
progressBar.className = 'page-progress';
document.body.appendChild(progressBar);

window.addEventListener('load', () => {
    progressBar.style.width = '100%';
    setTimeout(() => {
        progressBar.style.opacity = '0';
    }, 1000);
});

// === LAZY LOAD IMAGES ===
const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
};

document.addEventListener('DOMContentLoaded', function() {
    // === EmailJS Init ===
    emailjs.init("pQhfyyq80r665-nGI");

    // === CUSTOM CURSOR ===
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    if (cursor && cursorDot) {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
        });
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });
        document.querySelectorAll('a, button, .project-card, .gallery-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = 'var(--neon-pink)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--neon-blue)';
            });
        });
    }

    // Initialize lazy loading
    lazyLoadImages();

    // === MOBILE NAVIGATION ===
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
            navItems.forEach((link, index) => {
                link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            });
        });
    }

    // === SMOOTH SCROLLING ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burger.classList.remove('active');
                    navItems.forEach(link => link.style.animation = '');
                }
            }
        });
    });

    // === NAVBAR SCROLL EFFECT ===
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // === TABS FOR WORK SECTION ===
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // === SCROLL ANIMATION ===
    const animateOnScroll = () => {
        document.querySelectorAll(
            '.about-content, .project-card, .minecraft-item, .gallery-item, .tech-badge, .contact-card'
        ).forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            if (elementPosition < window.innerHeight / 1.2) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll(
        '.about-content, .project-card, .minecraft-item, .gallery-item, .tech-badge, .contact-card'
    ).forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // === PROJECT CARD TILT ===
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-overlay').style.opacity = '1';
            card.querySelector('img').style.transform = 'scale(1.1)';
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const xc = (e.clientX - rect.left - rect.width / 2) / 20;
                const yc = (e.clientY - rect.top - rect.height / 2) / 20;
                card.style.transform = `perspective(1000px) rotateX(${-yc}deg) rotateY(${xc}deg) scale3d(1.05, 1.05, 1.05)`;
            });
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-overlay').style.opacity = '0';
            card.querySelector('img').style.transform = 'scale(1)';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        });
    });

    // === DARK MODE TOGGLE ===
    const createDarkModeToggle = () => {
        const toggle = document.createElement('button');
        toggle.innerHTML = '🌙';
        toggle.className = 'dark-mode-toggle';
        document.body.appendChild(toggle);
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            toggle.innerHTML = '☀️';
        }
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            toggle.innerHTML = isDark ? '☀️' : '🌙';
        });
    };
    createDarkModeToggle();

    // === GALLERY HOVER EFFECT ===
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.gallery-caption').style.bottom = '0';
            item.querySelector('img').style.transform = 'scale(1.1)';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('.gallery-caption').style.bottom = '-50px';
            item.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // === CONTACT FORM EMAILJS + SPAM PROTECTION ===
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Honeypot spam check
            const honeypot = document.getElementById('website');
            if (honeypot && honeypot.value !== "") {
                formMessage.textContent = 'Spam detected. Submission blocked.';
                formMessage.className = 'error';
                formMessage.style.display = 'block';
                return;
            }

            emailjs.send("service_b3g34df", "template_cv5yi1w", {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                time: new Date().toLocaleString()
            })
            .then(() => {
                formMessage.textContent = '✅ Message sent successfully!';
                formMessage.className = 'success';
                formMessage.style.display = 'block';
                contactForm.reset();
            })
            .catch((error) => {
                console.error(error);
                formMessage.textContent = '❌ There was a problem sending your message. Please try again.';
                formMessage.className = 'error';
                formMessage.style.display = 'block';
            });
        });
    }

    // === SCROLL TO TOP BUTTON ===
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);
    window.addEventListener('scroll', () => {
        scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === FOOTER YEAR ===
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
