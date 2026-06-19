/**
 * BEST AUTO SALES - ABOUT PAGE ANIMATION CONTROLLER
 * Handles 3D Tilt Cards, Scroll Reveals, Parallax, and Stat Counters
 */

document.addEventListener("DOMContentLoaded", () => {
    
    initScrollReveals();
    init3DTiltEffect();
    initParallaxHero();

});

/**
 * Uses IntersectionObserver to reveal elements as they enter the viewport
 */
function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    let countersStarted = false;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // If this is the stats section, trigger the counter animation once
                if (entry.target.querySelector('.counter') && !countersStarted) {
                    runStatCounters();
                    countersStarted = true;
                }
                
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Animated number counters for the stats section
 */
function runStatCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Lower is slower

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

/**
 * Applies a 3D tilt and glare effect mapped to mouse movement over the image cards
 */
function init3DTiltEffect() {
    const cards = document.querySelectorAll('.3d-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation degrees (max 10 deg)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Move the glare effect based on mouse position
            const glare = card.querySelector('.card-glare');
            if (glare) {
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, transparent 60%)`;
            }
        });

        // Reset the card when the mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            const glare = card.querySelector('.card-glare');
            if (glare) {
                glare.style.background = `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 25%, transparent 30%)`;
            }
        });
    });
}

/**
 * Simple background parallax effect on scroll for the hero image
 */
function initParallaxHero() {
    const heroImg = document.querySelector('.parallax-img');
    
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset;
            // Move the image slightly downwards as the user scrolls down
            heroImg.style.transform = `translateY(${scrollPos * 0.4}px) scale(1.1)`;
        }, { passive: true });
    }
}
