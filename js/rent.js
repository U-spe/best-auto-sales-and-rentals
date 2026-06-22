/**
 * BEST AUTO SALES - RENT PAGE LOGIC
 */

const rentVehicles = [
    { make: "Audi", model: "RS e-tron GT", year: "2025", mileage: "0", slug: "audi-rs-etron-gt", img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80" },
    { make: "Porsche", model: "911 Carrera", year: "2024", mileage: "1,200", slug: "porsche-911", img: "https://images.unsplash.com/photo-1503376712353-81b4f4c3cb3d?auto=format&fit=crop&w=800&q=80" }
];

// Fill with placeholders for testing
while (rentVehicles.length < 25) {
    const num = rentVehicles.length + 1;
    rentVehicles.push({ make: "Luxury Rental", model: `Fleet Vehicle ${num}`, year: "2024", mileage: "---", slug: `rent-vehicle-${num}`, img: "" });
}

const itemsPerPage = 10;
const revealIncrement = 5;

document.addEventListener("DOMContentLoaded", () => {
    renderGrid('rent-grid', rentVehicles);
    setupPaginationControl('load-more-rent', 'rent-grid');
    initScrollReveals();
    initParallaxHero();
});

function renderGrid(gridId, vehicleArray) {
    const gridContainer = document.getElementById(gridId);
    if (!gridContainer) return;

    vehicleArray.forEach((car, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = index >= itemsPerPage ? `inv-card reveal-on-scroll slide-up is-hidden` : `inv-card reveal-on-scroll slide-up`;
        cardElement.style.transitionDelay = `${(index % 5) * 0.08}s`;

        const imageContent = car.img ? `<img src="${car.img}" alt="${car.make} ${car.model}" style="width: 100%; height: 100%; object-fit: cover;">` : `<span>Vehicle Image</span>`;

        cardElement.innerHTML = `
            <a href="/inventory/${car.slug}" class="card-link">
                <div class="img-placeholder">
                    ${imageContent}
                    <div class="hover-overlay"><p>View Details</p></div>
                </div>
                <div class="inv-details">
                    <h3>${car.make} ${car.model}</h3>
                    <p class="inv-specs">${car.year} • ${car.mileage} miles</p>
                </div>
            </a>
        `;
        gridContainer.appendChild(cardElement);
    });
}

function setupPaginationControl(buttonId, gridId) {
    const targetButton = document.getElementById(buttonId);
    if (!targetButton) return;
    targetButton.addEventListener('click', () => {
        const targetGrid = document.getElementById(gridId);
        const targetedHiddenCards = targetGrid.querySelectorAll('.inv-card.is-hidden');
        for (let i = 0; i < revealIncrement; i++) {
            if (targetedHiddenCards[i]) targetedHiddenCards[i].classList.remove('is-hidden');
        }
        if (targetGrid.querySelectorAll('.inv-card.is-hidden').length === 0) targetButton.style.display = 'none';
        window.dispatchEvent(new Event('scroll'));
    });
}

function initScrollReveals() {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.visibility = 'visible';
                entry.target.style.transform = 'translate(0, 0) scale(1)';
                observer.unobserve(entry.target);
            } else if (entry.target.classList.contains('slide-up') && !entry.target.classList.contains('is-hidden')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(40px)';
                entry.target.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.05 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));
}

function initParallaxHero() {
    const heroImg = document.querySelector('.parallax-img');
    if (heroImg) {
        window.addEventListener('scroll', () => { heroImg.style.transform = `translateY(${window.pageYOffset * 0.4}px) scale(1.1)`; }, { passive: true });
    }
}
