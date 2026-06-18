/**
 * CARICOM AUTO SALES - PERFORMANCE CORE CONTROLLER
 */

document.addEventListener("DOMContentLoaded", () => {
    initClocks();
    initMobileNavigation();
    initServicesEngine();
});

/**
 * Modern High-Precision Global Multi-Clocks
 */
function initClocks() {
    const formatTimeStr = (offset) => {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const targetDate = new Date(utc + (3600000 * offset));
        
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        let hours = targetDate.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // conversion of 0 hours to 12
        
        const minutes = String(targetDate.getMinutes()).padStart(2, '0');
        
        return `${hours}:${minutes} ${ampm}, ${days[targetDate.getDay()]}`;
    };

    const updateAllClocks = () => {
        const japanEl = document.getElementById("timestr");
        const guyanaEl = document.getElementById("guyanaTime");
        
        if(japanEl) japanEl.textContent = formatTimeStr(9);    // Japan GMT +9
        if(guyanaEl) guyanaEl.textContent = formatTimeStr(-4);  // Guyana GMT -4
    };

    updateAllClocks();
    setInterval(updateAllClocks, 1000);
}

/**
 * Native Responsive Touch/Mobile Menu Handler
 */
function initMobileNavigation() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("navbar");
    
    if (toggle && nav) {
        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            nav.classList.toggle("active");
        });

        // Safe closure if clicked outside menu zone
        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove("active");
            }
        });
    }

    // Interactive Dropdowns configuration for mobile devices
    const dropDpowns = document.querySelectorAll(".dropdown");
    dropDpowns.forEach(dp => {
        dp.addEventListener("click", function(e) {
            if(window.innerWidth <= 992) {
                this.classList.toggle("active");
            }
        });
    });
}

/**
 * Micro Dynamic Data Fetcher (Replaces jQuery $.ajax dependencies safely)
 */
async function fetchCarData(endpoint, payload) {
    const tokenMeta = document.querySelector('meta[name="csrf-token"]');
    const token = tokenMeta ? tokenMeta.getAttribute('content') : '';

    try {
        const response = await fetch(`https://www.caricomautosales.gy/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Network query error');
        return await response.json();
    } catch (err) {
        console.error("Data Engine Fetch Error: ", err);
        return null;
    }
}

/**
 * Interactive Client Service Layout Focus Control
 */
function initServicesEngine() {
    const cards = document.querySelectorAll(".service-card");
    if(!cards.length) return;

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
        });
    });
}

/**
 * Global Safe Range Form-Validator
 */
function validateSearchForm(formElement) {
    const mfgFrom = parseInt(formElement.querySelector('#mfg_from')?.value, 10);
    const mfgTo = parseInt(formElement.querySelector('#mfg_to')?.value, 10);

    if (mfgFrom && mfgTo && mfgFrom > mfgTo) {
        alert("Oops! Invalid Year Range chosen.");
        return false;
    }
    return true;
}
