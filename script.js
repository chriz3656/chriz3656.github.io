// Create and add progress bar
const progressBar = document.createElement('div');
progressBar.className = 'page-progress';
document.body.appendChild(progressBar);

// Handle page load progress
window.addEventListener('load', () => {
    progressBar.style.width = '100%';
    setTimeout(() => {
        progressBar.style.opacity = '0';
    }, 1000);
});

// Lazy load images with fade-in effect
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
    // Custom Cursor Initialization
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
    
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
            
            // Animate Links
            navItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }
    
    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burger.classList.remove('active');
                    navItems.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
    
    // Navbar Scroll Effect
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
    
    // Work Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Animate elements when scrolling
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.about-content, .project-card, .minecraft-item, ' +
            '.gallery-item, .tech-badge, .contact-card'
        );
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll(
        '.about-content, .project-card, .minecraft-item, ' +
        '.gallery-item, .tech-badge, .contact-card'
    );
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add hover effect to project cards with tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            card.querySelector('.project-overlay').style.opacity = '1';
            card.querySelector('img').style.transform = 'scale(1.1)';
            
            // Add tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xc = (x - rect.width / 2) / 20;
                const yc = (y - rect.height / 2) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${-yc}deg) rotateY(${xc}deg) scale3d(1.05, 1.05, 1.05)`;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-overlay').style.opacity = '0';
            card.querySelector('img').style.transform = 'scale(1)';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Dark mode toggle
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
    
    // Add hover effect to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.gallery-caption').style.bottom = '0';
            item.querySelector('img').style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('.gallery-caption').style.bottom = '-50px';
            item.querySelector('img').style.transform = 'scale(1)';
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            fetch(this.action, {
                method: this.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                formMessage.textContent = data;
                formMessage.className = 'success';
                formMessage.style.display = 'block';
                contactForm.reset();
            })
            .catch(error => {
                formMessage.textContent = 'There was a problem submitting your form. Please try again.';
                formMessage.className = 'error';
                formMessage.style.display = 'block';
            });
        });
    }
    
    // Scroll to Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Update current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
});
