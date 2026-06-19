# 🏎️ Best Auto Sales & Rentals — Premium Digital Showroom

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Engine](https://img.shields.io/badge/Engine-Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Design](https://img.shields.io/badge/Aesthetic-Black%20%26%20Gold-D4AF37?style=for-the-badge)](https://fonts.google.com/specimen/Montserrat)

Welcome to the core repository for the **Best Auto Sales & Rentals** digital infrastructure. This platform delivers a high-end, high-performance vehicle inventory grid, complete with interactive luxury parallax effects, continuous brand marquee tracking, and automated pagination handling.

---

## ✨ Features Matrix

| Feature | Infrastructure Type | Tech Stack Component | UX Impact |
| :--- | :--- | :--- | :--- |
| **5-Row Grid** | Fluid CSS Grid Architecture | `css/inventory.css` | Immersive 5-column showcase layouts on desktop viewports. |
| **Load More Engine** | Dynamic DOM Chunk Pagination | `js/inventory.js` | Injects vehicles 5 at a time (1 row) to keep page speed optimal. |
| **Clean Routing** | Native Environment Rules | `vercel.json` | Strips trailing `.html` extensions for modern, crisp URLs. |
| **Scroll Reveal** | `IntersectionObserver` | Vanilla JavaScript | Smooth staggered slide-up entry animations as users scroll down. |

---

## 🗺️ Live Site Routing Architecture

To clean up navigation paths, the deployment pipelines route directly to extensionless vanity slugs.

```🛡️ Production Map
├── / (Home/Landing Room)
│   ├── #contact?intent=buy   ──> Pre-filters contact form to Buy
│   └── #contact?intent=rent  ──> Pre-filters contact form to Rent
├── /inventory                ──> The Dynamic 5-Column Showroom
│   ├── /toyota-land-cruiser  ──> Deep-linked Asset Profile
│   └── /mercedes-g-class     ──> Deep-linked Asset Profile
└── /services                 ──> Complete Luxury Service Catalog
