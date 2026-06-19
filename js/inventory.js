/**
 * BEST AUTO SALES - INVENTORY PAGE LOGIC
 * Handles Dynamic Card Generation and Animations
 */

document.addEventListener("DOMContentLoaded", () => {
    generateInventoryCards(50);
    initParallaxHero();
});

/**
 * Generates N empty placeholder cards and injects them into the grid
 */
function generateInventoryCards(count) {
    const grid = document.getElementById('inventory-grid');
    if (!grid) return;

    for (let i = 1; i <= count; i++) {
        // Create the card element
        const card = document.createElement('div');
        // Add classes for styling and scroll-reveal animation
        card.className = `inv-card reveal-on-scroll slide-up`;
        // Stagger the animation delay slightly based on row position
        card.style.transitionDelay = `${(i % 3) * 0.1}s`;

        // Card HTML Structure
        card.innerHTML = `
            <a href="/inventory/vehicle-${i}.html" class="card-link">
                <!-- Image Placeholder Area -->
                <div class="img-placeholder">
                    <span>Vehicle Image</span>
                    <div class="hover-overlay">
                        <p>View Details</p>
                    </div>
                </div>
                
                <!-- Text Details Area -->
                <div class="inv-details">
                    <h3>Make & Model Placeholder</h3>
                    <p class="inv-specs">Year Placeholder • Mileage Placeholder</p>
                    
                    <!-- Buttons -->
                    <div class="inv-actions">
                        <button class="btn-half btn-buy" data-action="buy">Buy</button>
                        <button class="btn-half btn-rent" data-action="rent">Rent</button>
                    </div>
                </div>
            </a>
        `;

        // Handle inner button clicks so they don't trigger the parent <a> tag immediately
        // if you want the buttons to do something different than the card click.
        const buttons = card.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Stop the <a> tag from redirecting
                e.stopPropagation(); // Stop the event from bubbling up
                
                const action = e.target.getAttribute('data-action');
                if (action === 'buy') {
                    // Redirect to contact page with a purchase query
                    window.location.href = '/#contact?intent=buy';
                } else if (action === 'rent') {
                    // Redirect to contact page with a rental query
                    window.location.href = '/#contact?intent=rent';
                }
            });
        });

        grid.appendChild(card);
    }

    // Initialize the scroll reveal observer on the newly created cards
    initScrollReveals();
}

/**
 * Uses IntersectionObserver to reveal elements as they enter the viewport
 */
function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Triggers when 10% of the element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove initial transform to trigger CSS transition
                entry.target.style.opacity = '1';
                entry.target.style.visibility = 'visible';
                entry.target.style.transform = 'translate(0, 0) scale(1)';
                
                // Stop observing once revealed
                observer.unobserve(entry.target);
            } else {
                // Setup initial states based on their classes before they enter screen
                if (entry.target.classList.contains('slide-up')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(50px)';
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.5, 0, 0, 1)';
                }
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Simple background parallax effect on scroll for the hero image
 */
function initParallaxHero() {
    const heroImg = document.querySelector('.parallax-img');
    
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset;
            heroImg.style.transform = `translateY(${scrollPos * 0.4}px) scale(1.1)`;
        }, { passive: true });
    }
}
