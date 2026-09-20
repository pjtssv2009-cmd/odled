# ODLED — Premium LED Display Technology Website

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/ES6_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/Vanilla_CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)

Complete redesign and rebuild of the **ODLED** website ([https://odled.net/](https://odled.net/)) utilizing the **Motex ThemeForest design language, oversized typography scale, dark technology aesthetic, and interactive visual hierarchy**.

---

## 🌟 Key Features

- **Floating Glassmorphic Navigation**: Minimalist sticky pill header with responsive mobile drawer and scroll-activated compact state.
- **Interactive LED Matrix Canvas**: Hardware-accelerated particle canvas background reacting to user mouse proximity.
- **Live Scrolling LED Simulator**: Dynamic text marquee ticker with real-time text input and color profile toggling (Cyan, Red, Amber, RGB Multicolor).
- **5-Layer Exploded Technology Explorer**: Interactive modular component breakdown (*LED Module → Aluminium Cabinet → Video Processor → Power SMPS → Complete Video Wall*).
- **Interactive Display Estimator**: Real-time calculator for resolution, pixel count, area (sq.ft / m²), and average/max power consumption.
- **Verified Real Installations Portfolio**: 40+ authentic installations across India (VBJ Jewellers, Chennai Central Railway Station, Allison Transmission, HP India, Hanu Reddy Realtors, etc.) with category filters and high-res Lightbox modal.
- **Direct Manufacturer Quote Configurator**: Multi-step modal for swift project assessment.

---

## 📂 Page Templates & Structure

```
├── index.html                 # Revamped Full Homepage
├── products.html              # Products Matrix & Catalog Page
├── product-detail.html        # Product Detail Sheet with Interactive Spec Switcher & Calculator
├── solutions.html             # Solutions & Industry Applications Showcase
├── projects.html              # Verified Projects Portfolio with Lightbox
├── project-detail.html        # Chennai Central Railway Station Case Study
├── about.html                 # About ODLED & Ambattur Manufacturing Facility
├── contact.html               # Contact & Instant Quote Request Builder
├── src/
│   ├── css/
│   │   ├── base.css           # Design tokens, typography, reset & utility classes
│   │   ├── layout.css         # Grid layouts, header, footer, containers
│   │   ├── components.css     # Buttons, cards, modals, tabs, simulators
│   │   └── animations.css     # Keyframes, glow effects, IntersectionObserver reveals
│   ├── js/
│   │   ├── main.js            # Entry script, scroll listener, drawer, tab switchers
│   │   ├── hero-canvas.js     # Interactive LED dot-matrix canvas
│   │   ├── scrolling-led.js   # Live LED marquee simulator
│   │   ├── tech-breakdown.js  # Interactive 5-layer modular explorer
│   │   ├── quote-modal.js     # Quote modal & screen calculation logic
│   │   └── project-filter.js  # Projects filter & lightbox modal
│   └── assets/
│       └── images/            # High-resolution product and project imagery
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🏢 Company & Manufacturing Credentials

- **Headquarters & Factory**: 4/17, North Phase, SIDCO Industrial Estate, Ambattur, Chennai - 600 098, Tamil Nadu, India.
- **Showroom Outlet**: Old No. 50, New No. 72, Shop No. 6, Ellis Road, Chennai - 600 002, Tamil Nadu, India.
- **Official Website**: [https://odled.net/](https://odled.net/)
- **Phone**: +91-44-42034343 / +91 9003010590
