// Wait for DOM and GSAP to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- 1. Page Load Progress Bar ---
    const progressBar = document.createElement('div');
    progressBar.className = 'page-progress';
    document.body.appendChild(progressBar);
    window.addEventListener('load', () => {
        gsap.to(progressBar, {
            width: '100%',
            duration: 0.5,
            onComplete: () => {
                gsap.to(progressBar, {
                    opacity: 0,
                    duration: 0.5,
                    delay: 0.5,
                    onComplete: () => progressBar.remove()
                });
            }
        });
    });

    // --- 2. Lazy Load Images with Fade-In (using IntersectionObserver) ---
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
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    };

    // --- 3. Custom Cursor ---
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    if (cursor && cursorDot) {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
        const moveCursor = (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
            gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.05 });
        };
        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('mousedown', () => gsap.to(cursor, { scale: 0.8, duration: 0.1 }));
        document.addEventListener('mouseup', () => gsap.to(cursor, { scale: 1, duration: 0.1 }));
        document.querySelectorAll('a, button, .project-card, .gallery-item, .btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 1.5, borderColor: 'var(--neon-pink)', duration: 0.2 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, borderColor: 'var(--neon-blue)', duration: 0.2 });
            });
        });
    }

    // --- 4. Initialize lazy loading ---
    lazyLoadImages();

    // --- 5. Mobile Navigation ---
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
            navItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // --- 6. Enhanced Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Handle home link if needed differently
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetId,
                    offsetY: 80, // Adjust for fixed navbar
                    autoKill: false
                },
                ease: "power2.inOut"
            });

            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                navItems.forEach(link => link.style.animation = '');
            }
        });
    });

    // --- 7. Navbar Scroll Effect ---
    gsap.to('.navbar', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '100px top',
            scrub: true
        },
        padding: '15px 40px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
        duration: 0 // Instant update with scroll
    });

    // --- 8. Work Tabs ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- 9. 3D Profile Card Flip ---
    const profileCard = document.getElementById('profile-card');
    profileCard.addEventListener('click', () => {
        profileCard.classList.toggle('flipped');
    });

    // --- 10. 3D Hero Section Background with Three.js ---
    const initThreeJS = () => {
        const canvas = document.getElementById('hero-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Add a simple rotating cube as a 3D element
        const geometry = new THREE.BoxGeometry();
        // Use a more interesting material
        const material = new THREE.MeshStandardMaterial({
            color: 0x00f3ff,
            emissive: 0x00aaff,
            metalness: 0.7,
            roughness: 0.2
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xff00aa, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        camera.position.z = 5;

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.005; // Slow rotation
            cube.rotation.y += 0.005;
            renderer.render(scene, camera);
        };
        animate();
    };
    initThreeJS(); // Initialize 3D background

    // --- 11. Parallax Scrolling Effects ---
    // Parallax background on hero section
    gsap.to('.hero', {
        backgroundPositionY: '70%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Parallax effect on about section background (example)
    // Note: For this to work visually, you'd need a background image set on .about
    // gsap.to('.about', {
    //     backgroundPositionY: '30%',
    //     ease: 'none',
    //     scrollTrigger: {
    //         trigger: '.about',
    //         start: 'top bottom',
    //         end: 'bottom top',
    //         scrub: true
    //     }
    // });

    // --- 12. Scroll Animations for Elements using GSAP & ScrollTrigger ---
    gsap.utils.toArray('.about-content, .project-card, .minecraft-item, .gallery-item, .tech-badge, .contact-card').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%', // Start animation when element is 85% up the viewport
                toggleActions: 'play none none reverse' // Play on enter, reverse on leave
            },
            opacity: 0,
            y: 50, // Start 50px below
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Stagger animations for lists or grids
    gsap.from('.personality-traits .trait', {
        scrollTrigger: '.personality-traits',
        opacity: 0,
        y: 30,
        stagger: 0.1, // Delay between each element
        duration: 0.6
    });

    gsap.from('.work-tabs .tab-btn', {
        scrollTrigger: '.work-tabs',
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.5
    });

    // --- 13. Enhanced Hover Effects for Cards ---
    // Project Cards Tilt and Glow
    gsap.utils.toArray('.project-card').forEach(card => {
        const image = card.querySelector('img');
        const overlay = card.querySelector('.project-overlay');

        card.addEventListener('mouseenter', () => {
            gsap.to(overlay, { opacity: 1, duration: 0.3 });
            gsap.to(image, { scale: 1.1, duration: 0.5, ease: 'power2.out' });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(overlay, { opacity: 0, duration: 0.3 });
            gsap.to(image, { scale: 1, duration: 0.5, ease: 'power2.out' });
            gsap.to(card, { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' }); // Reset
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = (x - rect.width / 2) / 10; // Reduced sensitivity
            const yc = (y - rect.height / 2) / 10;

            gsap.to(card, {
                rotationY: xc,
                rotationX: -yc,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Gallery Items Hover
    gsap.utils.toArray('.gallery-item').forEach(item => {
        const image = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');

        item.addEventListener('mouseenter', () => {
            gsap.to(caption, { bottom: 0, duration: 0.3 });
            gsap.to(image, { scale: 1.1, duration: 0.5 });
            gsap.to(item, { y: -10, duration: 0.3, boxShadow: '0 15px 30px rgba(0, 243, 255, 0.2)' });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(caption, { bottom: '-50px', duration: 0.3 });
            gsap.to(image, { scale: 1, duration: 0.5 });
            gsap.to(item, { y: 0, duration: 0.3, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)' });
        });
    });

    // Tech Badge Hover
    gsap.utils.toArray('.tech-badge').forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            gsap.to(badge, {
                y: -10,
                scale: 1.1,
                duration: 0.3,
                boxShadow: '0 10px 20px rgba(0, 243, 255, 0.2)',
                ease: 'power2.out'
            });
            gsap.to(badge.querySelector('i'), { scale: 1.2, duration: 0.3 });
        });

        badge.addEventListener('mouseleave', () => {
            gsap.to(badge, {
                y: 0,
                scale: 1,
                duration: 0.3,
                boxShadow: 'none',
                ease: 'power2.out'
            });
            gsap.to(badge.querySelector('i'), { scale: 1, duration: 0.3 });
        });
    });

    // --- 14. Dark Mode Toggle (Kept from original) ---
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

    // --- 15. Contact Form Submission (Kept from original) ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            fetch(this.action, {
                method: this.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
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

    // --- 16. Scroll to Top Button (Kept from original, enhanced with GSAP) ---
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);
    gsap.set(scrollToTopBtn, { display: 'none', opacity: 0 }); // Start hidden

    ScrollTrigger.create({
        start: '300px top',
        toggleActions: 'play none none reverse',
        onEnter: () => gsap.to(scrollToTopBtn, { display: 'block', opacity: 1, duration: 0.3 }),
        onLeaveBack: () => gsap.to(scrollToTopBtn, { opacity: 0, duration: 0.3, onComplete: () => scrollToTopBtn.style.display = 'none' })
    });

    scrollToTopBtn.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: { y: 0 },
            ease: "power2.inOut"
        });
    });

    // --- 17. Update current year in footer (Kept from original) ---
    document.getElementById('current-year').textContent = new Date().getFullYear();

}); // End DOMContentLoaded