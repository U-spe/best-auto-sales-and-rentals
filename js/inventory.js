/**
 * BEST AUTO SALES & RENTALS - INVENTORY PAGE LOGIC
 * Dynamic Data Array, Centered Card Rendering, and 5-Card Pagination
 */

// 1. VEHICLE DATA STORAGE
const vehicleData = [
    { 
        make: "Toyota", 
        model: "Land Cruiser", 
        year: "2024", 
        mileage: "5,000", 
        slug: "toyota-land-cruiser", 
        img: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80" 
    },
    { 
        make: "Mercedes-Benz", 
        model: "G-Class", 
        year: "2023", 
        mileage: "12,000", 
        slug: "mercedes-g-class", 
        img: "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=800&q=80" 
    },
    { 
        make: "BMW", 
        model: "X5", 
        year: "2025", 
        mileage: "150", 
        slug: "bmw-x5", 
        img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80" 
    }
];

// Fill the array to hit exactly 50 total records
while (vehicleData.length < 50) {
    const i = vehicleData.length + 1;
    vehicleData.push({
        make: "Make Placeholder",
        model: `Model ${i}`,
        year: "YYYY",
        mileage: "---",
        slug: `vehicle-${i}`,
        img: "" 
    });
}

// 2. PAGINATION CONFIGURATION
// Since rows contain 5 elements, we display 10 (2 full rows) to begin with.
let visibleCount = 10; 

document.addEventListener("DOMContentLoaded", () => {
    generateInventoryCards();
    initPagination();
    initParallaxHero();
});

/**
 * 3. BUILD AND ATTACH CARDS TO DOM
 */
function generateInventoryCards() {
    const grid = document.getElementById('inventory-grid');
    if (!grid) return;

    vehicleData.forEach((car, index) => {
        const card = document.createElement('div');
        
        // Hide items beyond the current visibility threshold
        if (index >= visibleCount) {
            card.className = `inv-card reveal-on-scroll slide-up is-hidden`;
        } else {
            card.className = `inv-card reveal-on-scroll slide-up`;
        }
        
        card.style.transitionDelay = `${(index % 5) * 0.08}s`;

        const imageContent = car.img 
            ? `<img src="${car.img}" alt="${car.make} ${car.model}" style="width: 100%; height: 100%; object-fit: cover;">`
            : `<span>Vehicle Image</span>`;

        card.innerHTML = `
            <a href="/inventory/${car.slug}" class="card-link">
                <div class="img-placeholder">
                    ${imageContent}
                    <div class="hover-overlay">
                        <p>View Details</p>
                    </div>
                </div>
                
                <div class="inv-details">
                    <h3>${car.make} ${car.model}</h3>
                    <p class="inv-specs">${car.year} • ${car.mileage} miles</p>
                    
                    <div class="inv-actions">
                        <button class="btn-half btn-buy" data-action="buy">Buy</button>
                        <button class="btn-half btn-rent" data-action="rent">Rent</button>
                    </div>
                </div>
            </a>
        `;

        // Action interception
        const buttons = card.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); 
                e.stopPropagation(); 
                
                const action = e.target.getAttribute('data-action');
                if (action === 'buy') {
                    window.location.href = '/#contact?intent=buy';
                } else if (action === 'rent') {
                    window.location.href = '/#contact?intent=rent';
                }
            });
        });

        grid.appendChild(card);
    });

    initScrollReveals();
}

/**
 * 4. PAGINATION ENGINE
 * Reveals 5 elements per iteration (exactly 1 complete row)
 */
function initPagination() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', () => {
        // Find all currently hidden cards
        const hiddenCards = document.querySelectorAll('.inv-card.is-hidden');
        
        // Strip the display block class off the next 5 items
        for (let i = 0; i < 5; i++) {
            if (hiddenCards[i]) {
                hiddenCards[i].classList.remove('is-hidden');
            }
        }

        // Drop the selection trigger entirely if no further items are packed
        const remainingHidden = document.querySelectorAll('.inv-card.is-hidden');
        if (remainingHidden.length === 0) {
            loadMoreBtn.style.display = 'none';
        }

        // Force a scroll dispatch to execute viewport tracking on elements newly brought into view
        window.dispatchEvent(new Event('scroll'));
    });
}

/**
 * 5. CORE LAYOUT VIEWPORT TRACKING
 */
function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05 
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.visibility = 'visible';
                entry.target.style.transform = 'translate(0, 0) scale(1)';
                observer.unobserve(entry.target);
            } else {
                if (entry.target.classList.contains('slide-up') && !entry.target.classList.contains('is-hidden')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(40px)';
                    entry.target.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                }
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

function initParallaxHero() {
    const heroImg = document.querySelector('.parallax-img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset;
            heroImg.style.transform = `translateY(${scrollPos * 0.4}px) scale(1.1)`;
        }, { passive: true });
    }
}
