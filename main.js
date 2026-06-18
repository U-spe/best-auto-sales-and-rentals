/**
 * BEST AUTO SALES & RENTALS - CONTROLLER ENGINE
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Mobile Navigation Bar Engine ---
    const mobileBtn = document.getElementById("mobile-toggle");
    const mainNav = document.getElementById("main-nav");

    if (mobileBtn && mainNav) {
        mobileBtn.addEventListener("click", () => {
            mainNav.classList.toggle("active");
        });
    }

    // --- Dynamic Header Density on Scroll ---
    const header = document.getElementById("header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.style.background = "rgba(10, 10, 10, 0.98)";
            header.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.7)";
        } else {
            header.style.background = "rgba(10, 10, 10, 0.9)";
            header.style.boxShadow = "none";
        }
    }, { passive: true });

    // --- Viewport Content Jump Offset Link Fix ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
                
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Client Inventory Sorting Mechanism ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const vehicleCards = document.querySelectorAll('.vehicle-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            vehicleCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // --- Lead Capture Interface Submission Response ---
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Inquiry successfully captured! Our automotive specialists will be in contact shortly.");
            form.reset();
        });
    }
});
