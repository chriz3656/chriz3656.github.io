document.addEventListener('DOMContentLoaded', function() {
    // Update current year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize slider if exists
    const slider = document.getElementById('slider');
    if (slider) {
        initSlider();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.body.classList.toggle('mobile-menu-open');
        });
    }
});

// Slider functionality
function initSlider() {
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const sliderNav = document.getElementById('slider-nav');
    let currentSlide = 0;
    let slideInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    let isScrolling = false;

    // Create navigation dots
    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => goToSlide(index));
        sliderNav.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');
    slider.setAttribute('aria-live', 'polite');

    // Auto-rotate slides
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function goToSlide(index) {
        currentSlide = index;
        slider.scrollTo({
            left: slider.offsetWidth * index,
            behavior: 'smooth'
        });
        updateActiveDot(index);
        resetInterval();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }

    function updateActiveDot(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlider();
    }

    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetInterval();
    }, { passive: true });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', resetInterval);

    // Handle scroll events
    slider.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const slideIndex = Math.round(slider.scrollLeft / slider.offsetWidth);
                if (slideIndex !== currentSlide) {
                    currentSlide = slideIndex;
                    updateActiveDot(slideIndex);
                    resetInterval();
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    // Handle window resize
    window.addEventListener('resize', () => {
        clearInterval(slideInterval);
        goToSlide(currentSlide);
    });

    // Start the slider
    startSlider();
}
