/**
 * BEST AUTO SALES & RENTALS - MAIN SINGLE-PAGE CONTROLLER
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

    // --- Smooth Scrolling for Single Page Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Let JS handle the smooth scroll, stop default instant jump
                e.preventDefault();

                // Instantly collapse mobile menu if a user clicks a link inside it
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
                
                // Perfect alignment offset so the fixed header doesn't block section titles
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

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Drop active state from old buttons and assign to the new choice
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Filter cards based on their data-category attribute
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
    }

});
