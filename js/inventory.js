/**
 * BEST AUTO SALES & RENTALS - INVENTORY PAGE LOGIC
 * Dynamic Data Partitioning into In Stock / Coming Soon,
 * Full-Card Interactive Links, and Segmented Grid Pagination
 */

// 1. RAW VEHICLE DATA SOURCE
const rawInStockData = [
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

const rawComingSoonData = [
    {
        make: "Audi",
        model: "RS e-tron GT",
        year: "2025",
        mileage: "0",
        slug: "audi-rs-etron-gt",
        img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80"
    }
];

// Generate synthetic placeholders to build up exactly 50 instances for testing
const inStockVehicles = [...rawInStockData];
while (inStockVehicles.length < 25) {
    const num = inStockVehicles.length + 1;
    inStockVehicles.push({
        make: "Premium Stock",
        model: `Model Type ${num}`,
        year: "2024",
        mileage: "---",
        slug: `instock-vehicle-${num}`,
        img: ""
    });
}

const comingSoonVehicles = [...rawComingSoonData];
while (comingSoonVehicles.length < 25) {
    const num = comingSoonVehicles.length + 1;
    comingSoonVehicles.push({
        make: "Incoming Luxury",
        model: `Arrival ${num}`,
        year: "2026",
        mileage: "In Transit",
        slug: `comingsoon-vehicle-${num}`,
        img: ""
    });
}

// 2. PAGINATION LAYOUT CONFIGURATION
// Tracks row displays (2 rows = 10 items initially visible per section)
const itemsPerPage = 10;
const revealIncrement = 5; // Adds 1 clean structural row per pagination click

document.addEventListener("DOMContentLoaded", () => {
    // Render Grids
    renderGrid('instock-grid', inStockVehicles);
    renderGrid('comingsoon-grid', comingSoonVehicles);
    
    // Bind Independent Pagination Actions
    setupPaginationControl('load-more-instock', 'instock-grid');
    setupPaginationControl('load-more-comingsoon', 'comingsoon-grid');
    
    // Initialize Scroll Animations & Parallax Mechanics
    initScrollReveals();
    initParallaxHero();
});

/**
 * 3. DYNAMIC GRID RENDERING ENGINE
 */
function renderGrid(gridId, vehicleArray) {
    const gridContainer = document.getElementById(gridId);
    if (!gridContainer) return;

    vehicleArray.forEach((car, index) => {
        const cardElement = document.createElement('div');
        
        // Hide elements past the initial page-load row constraints
        if (index >= itemsPerPage) {
            cardElement.className = `inv-card reveal-on-scroll slide-up is-hidden`;
        } else {
            cardElement.className = `inv-card reveal-on-scroll slide-up`;
        }
        
        // Smooth staggered rendering coordinates
        cardElement.style.transitionDelay = `${(index % 5) * 0.08}s`;

        const imageContent = car.img 
            ? `<img src="${car.img}" alt="${car.make} ${car.model}" style="width: 100%; height: 100%; object-fit: cover;">`
            : `<span>Vehicle Image</span>`;

        cardElement.innerHTML = `
            <a href="/inventory/${car.slug}" class="card-link">
                <div class="img-placeholder">
                    ${imageContent}
                    <div class="hover-overlay">
                        <p>View Details</p>
                    </div>
                </div>
                <div class="inv-details">
                    <h3>${car.make} ${car.model}</h3>
                    <p class="inv-specs">${car.year} • ${car.mileage} ${car.mileage === 'In Transit' || car.mileage === '---' ? '' : 'miles'}</p>
                </div>
            </a>
        `;

        gridContainer.appendChild(cardElement);
    });
}

/**
 * 4. PAGINATION HOOK CONNECTOR
 */
function setupPaginationControl(buttonId, gridId) {
    const targetButton = document.getElementById(buttonId);
    if (!targetButton) return;

    targetButton.addEventListener('click', () => {
        const targetGrid = document.getElementById(gridId);
        if (!targetGrid) return;

        // Snag only hidden cards localized within this structural layout section
        const targetedHiddenCards = targetGrid.querySelectorAll('.inv-card.is-hidden');
        
        // Strip out display restrictions across next structural segment
        for (let i = 0; i < revealIncrement; i++) {
            if (targetedHiddenCards[i]) {
                targetedHiddenCards[i].classList.remove('is-hidden');
            }
        }

        // Drop the trigger control clean out of view if all records are exposed
        const postCheckHidden = targetGrid.querySelectorAll('.inv-card.is-hidden');
        if (postCheckHidden.length === 0) {
            targetButton.style.display = 'none';
        }

        // Dispatch a window event scroll sequence to force update visibility trackers
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
