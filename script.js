document.addEventListener('DOMContentLoaded', function() {
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
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-overlay').style.opacity = '1';
            card.querySelector('img').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-overlay').style.opacity = '0';
            card.querySelector('img').style.transform = 'scale(1)';
        });
    });
    
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
    
    // Update current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
});
