/**
 * BEST AUTO SALES & RENTALS - CONTACT PAGE LOGIC
 * Dynamic URL Intent Capturing, Form Interception, and Layout Animators
 */

document.addEventListener("DOMContentLoaded", () => {
    captureInquiryIntent();
    initContactFormHandler();
    initParallaxHero();
    initScrollReveals();
});

/**
 * 1. CHECK URL INTENT PARAMETERS
 * Reads ?intent=buy or ?intent=rent strings passed from inventory card selections
 * and pre-sets the form element values automatically.
 */
function captureInquiryIntent() {
    const selectDropdown = document.getElementById('form-intent');
    if (!selectDropdown) return;

    // Read full context URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const intentParam = urlParams.get('intent');

    if (intentParam) {
        const cleanedIntent = intentParam.toLowerCase();
        
        // Match conditions directly against option tags
        if (cleanedIntent === 'buy') {
            selectDropdown.value = 'buy';
        } else if (cleanedIntent === 'rent') {
            selectDropdown.value = 'rent';
        } else if (cleanedIntent === 'custom') {
            selectDropdown.value = 'custom';
        }
    }
}

/**
 * 2. INTERCEPT FORM SUBMISSION
 * Validates input contexts and provides asynchronous ui feedback states.
 */
function initContactFormHandler() {
    const contactForm = document.getElementById('premium-contact-form');
    const statusBox = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    if (!contactForm || !statusBox || !submitBtn) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Halt default structural landing routes

        // visual pipeline loading state
        submitBtn.disabled = true;
        submitBtn.innerText = "Processing Security Handshake...";
        
        statusBox.className = "form-status-msg is-hidden";

        // Gather form fields securely
        const formData = {
            name: document.getElementById('form-name').value.trim(),
            email: document.getElementById('form-email').value.trim(),
            phone: document.getElementById('form-phone').value.trim(),
            intent: document.getElementById('form-intent').value,
            message: document.getElementById('form-message').value.trim()
        };

        // Simulate secure server submission delay
        setTimeout(() => {
            try {
                // In production, your Fetch processing calls would link directly here
                console.log("Transmission successfully captured:", formData);

                // Display success UI frame
                statusBox.classList.remove('is-hidden');
                statusBox.className = "form-status-msg success";
                statusBox.innerText = `Thank you, ${formData.name}. Your concierge request regarding "${formData.intent.toUpperCase()}" has been recorded. Our advisors will respond within 2 hours.`;
                
                // Clear active fields
                contactForm.reset();
            } catch (err) {
                // Fail-safe handling block
                statusBox.classList.remove('is-hidden');
                statusBox.className = "form-status-msg error";
                statusBox.innerText = "An execution error occurred while dispatching data packages. Please contact us directly via concierge@bestautosales.com.";
            } finally {
                // Re-enable system trigger actions
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Premium Request";
            }
        }, 1200);
    });
}

/**
 * 3. INTERSECTION OBSERVATION AND SCROLL TRACKING
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
                entry.target.style.transform = 'translate(0, 0)';
                observer.unobserve(entry.target);
            } else {
                if (entry.target.classList.contains('slide-up')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(40px)';
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
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
