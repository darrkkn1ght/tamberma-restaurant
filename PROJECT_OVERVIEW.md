# Project Overview

## 1. High-Level Summary
- **Project Name:** Tamberma Restaurant Website
- **Description:** A premium, comprehensive web application designed for Tamberma Restaurant. It serves as a digital storefront showcasing the restaurant's Indian cuisine, ambiance, and events.
- **Target Audience:** Potential and existing customers of Tamberma looking for menu details, location, gallery visualization, or table reservations.
- **Core Value:** Provides a highly responsive, visually rich, and interactive user experience that reflects the restaurant's premium branding while facilitating key business functions like reservations and inquiries.

## 2. Tech Stack
- **Frontend Framework:** React 18 (via Create React App `react-scripts`)
- **Routing:** React Router DOM (v6)
- **Styling System:** 
  - **Tailwind CSS (v3.4):** Utility-first styling.
  - **PostCSS:** Tooling for CSS transformations.
  - **Headless UI:** Unstyled, accessible UI components.
- **Animations:** 
  - **Framer Motion:** Complex layout animations and gestures.
  - **React Intersection Observer:** Scroll-based visibility detection.
- **State Management:** React Native State (Context + Hooks).
- **Icons:** Lucide React & React Icons.
- **Forms/Email:** EmailJS (implied by dependencies) for handling contact and reservation submissions.
- **SEO:** React Helmet Async.
- **Utilities:** Swiper (Carousels), date-fns (implied logic).

## 3. Architecture Overview
This project follows a **Modular Component-Based Architecture**. 
- **Pattern:** Single Page Application (SPA) with lazy-loaded routes.
- **Separation of Concerns:**
  - **Data Layer:** Static data files in `src/data` act as the source of truth for content (Menu, Events, FAQs).
  - **Presentation Layer:** `components/ui` contains dumb, reusable atoms. `components/sections` contains page-level blocks.
  - **Logic Layer:** Custom hooks in `src/hooks` encapsulate reusable logic (scroll handling, storage).
  - **Feature Layer:** `components/features` contains complex, business-logic-heavy components (Forms, Interactive Galleries).

## 4. Folder & File Structure Breakdown

### `/src` - Source Root
- **`App.jsx`**: Main application entry point. Handles routing, global layout wrapping, and initial loading state.
- **`index.js`**: React DOM render entry.
- **`index.css`**: Global styles and Tailwind directives.

### `/src/components` - Component Library
- **`/features`**: Complex key business modules.
  - `ContactForm.jsx`, `ReservationForm.jsx`: Logic for user inputs.
  - `ImageGallery.jsx`: Advanced media display logic.
  - `MenuViewer.jsx`: Interactive menu browsing.
- **`/layout`**: Global layout wrappers.
  - Likely `Header`, `Footer`, `MainLayout`.
- **`/sections`**: Large-scale page sections.
  - `Hero`, `About`, `MenuPage`, `Testimonials`, `Location`.
- **`/ui`**: Reusable low-level primitives.
  - `Button`, `Card`, `Modal`, `LoadingSpinner`, `AnimatedText`.

### `/src/data` - Static Content Database
- Acts as a CMS-lite. Contains JS arrays/objects for:
  - `menuData.js` (Items, prices, descriptions)
  - `galleryData.js` (Image paths, categories)
  - `weeklyEvents.js`, `faq.js`, `testimonials.js`

### `/src/hooks` - Custom Logic
- `useLocalStorage.js`: Persist state to browser storage.
- `useResponsive.js`: Handle viewport breakpoints.
- `useScrollAnimation.js`: Connect Intersection Observer with Framer Motion.

### `/src/utils` - Helpers
- `animations.js`: Presets for motion variants.
- `constants.js`: App-wide constant values.
- `helpers.js`: Pure utility functions.

## 5. Core Features & Modules

### Business Logic Modules
1.  **Reservation System (`ReservationForm`)**: Handles validation and submission of table booking requests.
2.  **Menu Explorer (`MenuViewer`, `MenuPage`)**: Categorized display of food items with prices and descriptions.
3.  **Visual Showcase (`Gallery`, `ImageGallery`)**: Filterable media grid for atmosphere and food photos.
4.  **Events Handling (`WeeklyEvents`)**: Display for recurring or special restaurant events.
5.  **Contact Management (`ContactForm`)**: General inquiry handler.

### Shared Services (`services/` implies external, but likely internal here)
- **Data Service**: The `src/data` folder serves as the static data provider, decoupling content from components.

## 6. State Management & Data Flow
- **State Location**: 
  - Predominantly local component state (`useState`) for UI toggles and form inputs.
  - `App.jsx` holds "Session" state like `currentSection` (for navigation highlighting) and `isLoading`.
- **Data Flow**: Unidirectional (Parent -> Child). Static data is imported at the Section or Feature level and passed down to UI components.
- **Caching**: `useLocalStorage` hook implies some user preferences or form data might be cached locally.

## 7. Routing & Navigation
- **Library**: `react-router-dom` v6.
- **Strategy**: 
  - **Main Routes**: `/`, `/about`, `/menu`, `/gallery`, `/contact`, `/events`.
  - **Lazy Loading**: All route components are wrapped in `Suspense` and `lazy()` imports to optimize bundle size.
  - **Scroll Spy**: The app monitors scroll position to update the active navigation link dynamically on the single-page scroll sections (Home).

## 8. Authentication & Authorization
- **Status**: Not currently implemented. The site is public-facing. Admin features (if any) are likely handled via external CMS or direct code edits.

## 9. Environment & Configuration
- **Build Tool**: `react-scripts` (Webpack under the hood).
- **Styling Config**: `tailwind.config.js` defines the design system (colors, fonts, breakpoints).
- **Env Variables**: Standard `.env` support via CRA (likely used for EmailJS Service IDs, though not explicitly viewed).

## 10. Error Handling & Logging
- **Boundaries**: `components/ui/ErrorBoundary.jsx` wraps key parts of the app to catch React render errors gracefully.
- **User Feedback**: Forms likely have validation error states (UI feedback) processing errors.
- **404**: Router likely handles unmatched paths (though specific 404 page depends on `App.jsx` catch-all route).

## 11. Performance Considerations
- **Lazy Loading**: Route-based code splitting reduces initial load time.
- **Suspense**: Used to show `LoadingSpinner` while chunks load.
- **Image Optimization**: `src/components/ui/LoadingSpinner.jsx` and likely generic placeholders.
- **Scroll Performance**: `IntersectionObserver` is used instead of scroll event listeners to minimize main-thread work.

## 12. Security Considerations
- **Input Sanitization**: React automatically safeguards against XSS in JSX.
- **Environment Variables**: API keys (for EmailJS) should be stored in `.env` and not committed to repo.
- **Form Handling**: Validation appears to be client-side. Server-side validation (via EmailJS service) is assumed.

## 13. Testing Setup
- **Framework**: Jest + React Testing Library (standard CRA setup).
- **Files**:
  - `App.test.js`: Basic smoke test.
  - `setupTests.js`: Test environment configuration.
- **Coverage**: Likely unit tests for critical UI components and utilities.

## 14. How To Run Locally

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher) or yarn

### Setup Steps
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/tamberma/restaurant-website.git
    cd tamberma-restaurant
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    Access the app at `http://localhost:3000`.

### Building for Production
```bash
npm run build
```
This generates a static build in the `build` folder, ready for deployment (e.g., Vercel, Netlify).

## 15. Future Improvement Suggestions
1.  **Architecture**: Migrate to Next.js for better SEO (SSR/SSG), image optimization, and file-based routing.
2.  **Content Management**: Connect to a Headless CMS (Contentful, Strapi) so non-developers can update the menu/events without touching parsing JSON files.
3.  **Booking Integration**: Integrate with a real reservation API (OpenTable, Resy) instead of email-based forms.
4.  **Testing**: Expand test coverage to include integration tests for the Booking and Contact flows.
5.  **Type Safety**: Migrate to TypeScript for better maintainability and developer experience.
