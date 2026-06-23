/**
 * BEST AUTO SALES - BUY PAGE LOGIC
 */

const buyVehicles = [
    { 
        make: "Mitsubishi", 
        model: "Canter", 
        year: "2014", 
        mileage: "35,000", 
        slug: "mitsubishi-canter", 
        // 1. Updated with your requested URLs
        images: [
            "/images/cars/mitsubishi/canter-1d.jpg",
            "/images/cars/mitsubishi/canter-1a.jpg",
            "/images/cars/mitsubishi/canter-1b.jpg",
            "/images/cars/mitsubishi/canter-1c.jpg",
            "/images/cars/mitsubishi/canter-1e.jpg"
        ] 
    },
    { 
        make: "Mercedes-Benz", 
        model: "G-Class", 
        year: "2023", 
        mileage: "12,000", 
        slug: "mercedes-g-class", 
        images: [
            "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1503376712341-ea7820e2e505?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=800&q=80"
        ] 
    },
    { 
        make: "BMW", 
        model: "X5", 
        year: "2025", 
        mileage: "150", 
        slug: "bmw-x5", 
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1503376712341-ea7820e2e505?auto=format&fit=crop&w=800&q=80"
        ] 
    }
];

// Fill with placeholders for testing
while (buyVehicles.length < 25) {
    const num = buyVehicles.length + 1;
    buyVehicles.push({ 
        make: "Purchase Option", 
        model: `Model ${num}`, 
        year: "2024", 
        mileage: "---", 
        slug: `buy-vehicle-${num}`, 
        images: Array(5).fill("") // Filler for the loop
    });
}

const itemsPerPage = 10;
const revealIncrement = 5;

document.addEventListener("DOMContentLoaded", () => {
    renderGrid('buy-grid', buyVehicles);
    setupPaginationControl('load-more-buy', 'buy-grid');
    initScrollReveals();
    initParallaxHero();
});

function renderGrid(gridId, vehicleArray) {
    const gridContainer = document.getElementById(gridId);
    if (!gridContainer) return;

    gridContainer.innerHTML = ''; // Clear container

    vehicleArray.forEach((car, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = index >= itemsPerPage ? `inv-card reveal-on-scroll slide-up is-hidden` : `inv-card reveal-on-scroll slide-up`;
        cardElement.style.transitionDelay = `${(index % 5) * 0.08}s`;

        const imageList = (car.images && Array.isArray(car.images)) ? car.images : [car.img || ""];

        const carouselImages = imageList.map(imgSrc => {
            if (imgSrc) {
                return `<img src="${imgSrc}" alt="${car.make} ${car.model}" style="flex: 0 0 100%; width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block;">`;
            } else {
                return `<div style="flex: 0 0 100%; width: 100%; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; background-color: #eee; color: #888;"><span>Vehicle Image</span></div>`;
            }
        }).join("");

        // 2. Add the navigation arrows to the inner HTML, styled to float over the images
        cardElement.innerHTML = `
            <a href="/buy/${car.slug}" class="card-link" style="display: block; text-decoration: none; color: inherit; position: relative;">
                <div class="img-placeholder" style="overflow: hidden; position: relative; width: 100%;">
                    <div class="carousel-track" style="display: flex; transition: transform 0.3s ease-in-out;">
                        ${carouselImages}
                    </div>
                    
                    <button class="nav-arrow prev-arrow" aria-label="Previous image" style="position: absolute; top: 50%; left: 5px; transform: translateY(-50%); background: rgba(0, 0, 0, 0.6); color: #fff; border: none; border-radius: 4px; padding: 8px 12px; cursor: pointer; z-index: 20; font-size: 16px; transition: background 0.2s;">&#10094;</button>
                    
                    <button class="nav-arrow next-arrow" aria-label="Next image" style="position: absolute; top: 50%; right: 5px; transform: translateY(-50%); background: rgba(0, 0, 0, 0.6); color: #fff; border: none; border-radius: 4px; padding: 8px 12px; cursor: pointer; z-index: 20; font-size: 16px; transition: background 0.2s;">&#10095;</button>

                    <div class="hover-overlay" style="z-index: 10; pointer-events: none;"><p>View Details</p></div>
                </div>
                <div class="inv-details">
                    <h3>${car.make} ${car.model}</h3>
                    <p class="inv-specs">${car.year} • ${car.mileage} miles</p>
                </div>
            </a>
        `;

        // 3. Attach JavaScript for the Arrows
        const prevBtn = cardElement.querySelector('.prev-arrow');
        const nextBtn = cardElement.querySelector('.next-arrow');
        const track = cardElement.querySelector('.carousel-track');
        let currentIndex = 0;
        const imageCount = track.children.length;

        // Hide arrows if there is only one picture
        if (imageCount <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            // Previous Button Logic
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();  // Stops the <a> tag from changing the page
                e.stopPropagation(); // Stops the click from bubbling up
                
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = imageCount - 1; // Loop back to the last image
                }
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            });

            // Next Button Logic
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();  // Stops the <a> tag from changing the page
                e.stopPropagation(); // Stops the click from bubbling up
                
                if (currentIndex < imageCount - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0; // Loop back to the first image
                }
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            });
            
            // Optional UX enhancement: Light up buttons slightly when hovering over them specifically
            prevBtn.addEventListener('mouseenter', () => prevBtn.style.background = 'rgba(0,0,0,0.9)');
            prevBtn.addEventListener('mouseleave', () => prevBtn.style.background = 'rgba(0,0,0,0.6)');
            nextBtn.addEventListener('mouseenter', () => nextBtn.style.background = 'rgba(0,0,0,0.9)');
            nextBtn.addEventListener('mouseleave', () => nextBtn.style.background = 'rgba(0,0,0,0.6)');
        }

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
