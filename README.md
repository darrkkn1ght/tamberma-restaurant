# 🍽️ Tamberma Restaurant & Bar Website

<p align="center">
  <img src="public/images/logo/tamberma-logo.png" alt="Tamberma Restaurant Logo" width="180" />
</p>

<p align="center">
  <a href="https://tamberma-demo.vercel.app/"><img src="https://img.shields.io/badge/demo-online-brightgreen?logo=vercel" alt="Live Demo"></a>
  <a href="https://instagram.com/tamberma_ibadan"><img src="https://img.shields.io/badge/Instagram-@tamberma_ibadan-orange?logo=instagram" alt="Instagram"></a>
  <a href="https://facebook.com/TambermaRestaurant"><img src="https://img.shields.io/badge/Facebook-Tamberma%20Restaurant%20%26%20Bar-blue?logo=facebook" alt="Facebook"></a>
  <a href="https://www.tiktok.com/@helloibadan"><img src="https://img.shields.io/badge/TikTok-helloibadan-black?logo=tiktok" alt="TikTok"></a>
  <a href="mailto:tambermaibadan@gmail.com"><img src="https://img.shields.io/badge/email-tambermaibadan@gmail.com-orange?logo=gmail" alt="Email"></a>
</p>

---

# 📑 Table of Contents
- [Demo](#-demo)
- [Brand Identity](#-brand-identity)
- [Features](#-features)
- [Menu & Cuisine](#-menu--cuisine)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Design System](#-design-system)
- [Quick Start](#-quick-start)
- [Advanced Setup](#-advanced-setup)
- [Scripts](#-scripts)
- [Contribution Guidelines](#-contribution-guidelines)
- [FAQ](#-faq)
- [Contact & Support](#-contact--support)
- [Credits](#-credits)
- [License](#-license)

---

## 🚀 Demo

<p align="center">
  <a href="https://tamberma-demo.vercel.app/">
    <img src="public/images/gallery/hero-bg.jpg" alt="Tamberma Restaurant Screenshot" width="600" style="border-radius:16px;box-shadow:0 8px 32px rgba(230,126,34,0.10);margin-bottom:12px;" />
  </a>
  <br/>
  <a href="https://tamberma-demo.vercel.app/" target="_blank"><b>🌐 Live Demo</b></a>
</p>

---

## 🏢 Brand Identity
- **Name:** Tamberma Restaurant & Bar
- **Concept:** Multi-cuisine restaurant & bar, nature-infused, African-inspired, serene and family-friendly
- **Style:** Modern, naturistic, warm, sophisticated, glassmorphic, African cultural elements
- **Cuisines:** Indian, Nigerian, Chinese, Continental, BBQ & Grill, Bar/Cocktails
- **Atmosphere:** Simple, serene, infused with African culture and nature
- **Target:** Urban professionals, families, foodies, cocktail lovers

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏠 Hero Section | Eye-catching intro with glassmorphism & parallax |
| 🍽️ Menu Viewer | Animated, tabbed, multi-cuisine menu (Indian, Nigerian, Chinese, Continental, BBQ & Grill, Bar) |
| 🖼️ Gallery | Scroll-animated, responsive image gallery (see more on Instagram) |
| 📍 Location | Google Maps embed, hours, contact, CTA |
| 💬 Testimonials | Swipeable, animated customer carousel with real reviews |
| 🍹 Bar & Cocktails | Full bar with specialty cocktails |
| 📱 Mobile-First | Fully responsive, touch-optimized |
| 🎨 Design System | Consistent colors, typography, spacing |
| ⚡ Animations | Framer Motion, CSS, micro-interactions |
| 🧑‍💻 Custom Hooks | useLocalStorage, useResponsive, useScrollAnimation |
| 📝 Accessibility | Semantic HTML, focus states, color contrast |
| 🛵 Delivery | Available via HeyFood Africa, DineSurf, and more |

---

## 🍲 Menu & Cuisine
- **Indian:** Tandoori chicken, naan, murg tikka masala, biryani, curries
- **Nigerian:** Jollof rice, peppered gizzard, seafood okro soup, suya, local soups
- **Chinese:** Singapore noodles, spring rolls, sweet & sour chicken, fried rice
- **Continental:** Spaghetti, pizza (chicken suya, vegetarian, BBQ), mac n cheese
- **BBQ & Grill:** Grilled prawns, beef suya, tandoori grilled fish, lamb chops
- **Bar & Cocktails:** Tamberma special, Sex on the Beach, Raspberry Daiquiri, full bar

---

## 🛠️ Tech Stack
- **React 18+** (Vite/CRA compatible)
- **Tailwind CSS 3+**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **Google Fonts:** Playfair Display, Inter
- **JSDoc** (for utilities/hooks)
- **Vercel** (recommended deployment)

---

## 📁 Folder Structure
```
tamberma-restaurant/
├── public/
│   ├── favicon.ico, index.html, manifest.json
│   └── images/ (menu, gallery, logo, ui)
├── src/
│   ├── components/
│   │   ├── layout/ (Header, Navigation, Footer, Layout)
│   │   ├── sections/ (Hero, About, MenuPreview, Gallery, Contact, Location, Testimonials)
│   │   ├── ui/ (Button, Card, Modal, LoadingSpinner, AnimatedText)
│   │   └── features/ (MenuViewer, ReservationForm, ImageGallery, ContactForm)
│   ├── hooks/ (useScrollAnimation, useResponsive, useLocalStorage)
│   ├── utils/ (animations.js, constants.js, helpers.js)
│   ├── data/ (menuData.js, restaurantInfo.js, galleryData.js)
│   ├── styles/ (globals.css, animations.css)
│   ├── App.jsx, index.js, index.css
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🎨 Design System
- **Colors:**
  - Primary: `#e67e22`, `#d35400`, `#b7471d`
  - Accent: `#8b5a3c`, `#6b4423`
  - Neutral: `#1a1a1a`, `#2c2c2c`, `#f5f5f5`, `#fafafa`
- **Typography:**
  - Headers: Playfair Display (`font-display`)
  - Body: Inter (`font-sans`)
- **Animations:**
  - Page transitions, hover micro-interactions, scroll reveals
  - Glassmorphism, parallax, loading states
- **Accessibility:**
  - Semantic HTML, focus states, color contrast

---

## ⚡ Quick Start

### 1. **Clone & Install**
```bash
git clone https://github.com/your-org/tamberma-restaurant.git
cd tamberma-restaurant
npm install
```

### 2. **Run Locally**
```bash
npm start
```

### 3. **Build for Production**
```bash
npm run build
```

### 4. **Lint & Format**
```bash
npm run lint
npm run format
```

---

## 🛡️ Advanced Setup

### Environment Variables
- Copy `.env.example` to `.env` and fill in any required values (API keys, etc.)
- Example:
  ```env
  REACT_APP_GOOGLE_MAPS_API_KEY=your-key-here
  REACT_APP_ANALYTICS_ID=your-id-here
  ```

### Deployment
- **Vercel** (recommended):
  - Connect your repo, set environment variables, and deploy.
- **Netlify/Render/Other:**
  - Standard React build/deploy process supported.
- **Static Export:**
  - `npm run build` outputs to `/build` for static hosting.

---

## 📝 Scripts
- `npm start` — Run development server
- `npm run build` — Production build
- `npm run lint` — Lint code
- `npm run format` — Format code (Prettier)

---

## 🧑‍💻 Contribution Guidelines
1. **Fork** the repo & create a feature branch
2. **Follow** the project structure & design system
3. **Write** clean, accessible, and well-documented code
4. **Test** on mobile and desktop
5. **Open a Pull Request** with a clear description

---

## ❓ FAQ

**Q: Can I use this for my own restaurant?**
> Yes, but please credit the original author and do not use for commercial purposes without permission.

**Q: How do I add new menu items or images?**
> Edit the files in `/src/data/menuData.js` and `/public/images/menu/` or `/gallery/`.

**Q: Does it support dark mode?**
> Not by default, but the design system is easy to extend for dark mode.

**Q: How do I deploy to Vercel?**
> Push to GitHub, connect your repo on Vercel, set env vars, and deploy.

---

## 📬 Contact & Support
- **Phone:** +234 805 409 0607
- **Address:** Quarters 894, Rev'd Oyebode Crescent, Iyaganku, Ibadan
- **Alternative Location:** Tamberma Ringroad (delivery only)
- **Email:** [tambermaibadan@gmail.com](mailto:tambermaibadan@gmail.com)
- **Instagram:** [@tamberma_ibadan](https://instagram.com/tamberma_ibadan)
- **Facebook:** [Tamberma Restaurant & Bar](https://facebook.com/TambermaRestaurant)
- **TikTok:** [@helloibadan (featured)](https://www.tiktok.com/@helloibadan)
- **Delivery:** Available via HeyFood Africa, DineSurf

---

## 🙏 Credits
- **Research & Content:** [Your Name/Team]
- **Design & Development:** [Your Name/Team]
- **Icons:** [Lucide](https://lucide.dev/)
- **Fonts:** [Google Fonts](https://fonts.google.com/)
- **Images:** Unsplash, Pexels, Instagram @tamberma_ibadan, or as credited in `/public/images`

---

## 📣 License
This project is for demonstration and portfolio use. For commercial use, please contact the author.

---

<p align="center">
  <b>Tamberma Restaurant & Bar</b> — Where nature, culture, and cuisine meet.<br/>
  <a href="https://tamberma-demo.vercel.app/">🌐 tamberma-demo.vercel.app</a>
</p>

<p align="center">
  <a href="https://instagram.com/tamberma_ibadan"><img src="https://img.shields.io/badge/Instagram-@tamberma_ibadan-orange?logo=instagram" alt="Instagram"></a>
  <a href="mailto:tambermaibadan@gmail.com"><img src="https://img.shields.io/badge/email-tambermaibadan@gmail.com-orange?logo=gmail" alt="Email"></a>
  <a href="https://facebook.com/TambermaRestaurant"><img src="https://img.shields.io/badge/Facebook-Tamberma%20Restaurant%20%26%20Bar-blue?logo=facebook" alt="Facebook"></a>
  <a href="https://www.tiktok.com/@helloibadan"><img src="https://img.shields.io/badge/TikTok-helloibadan-black?logo=tiktok" alt="TikTok"></a>
</p>
