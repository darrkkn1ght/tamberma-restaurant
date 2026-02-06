# Mobile Menu Overlay Fix

## Root Cause Analysis

The mobile menu was rendering **inside the `<header>` element** which has `position: fixed` and `z-index: 50`. This created a **stacking context trap** - even though the overlay had `z-index: 60`, it was still constrained by its parent's stacking context, causing the hero content to show through.

### Issues Identified
1. **Stacking context**: Overlay trapped inside header's stacking context
2. **Background**: Solid white attempted but not rendering properly
3. **Scroll lock**: Only `overflow: hidden` on body, no iOS touch prevention
4. **Accessibility**: Missing `aria-expanded`, `aria-controls`, ESC key handler

---

## Files Changed

### 1. [Header.tsx](file:///c:/Users/nccdi/Documents/tamberma-restaurant/src/components/layout/Header.tsx)

**Major changes:**
- Implemented **React Portal** (`createPortal`) to render menu at `document.body` level
- Added **glass backdrop** with `rgba(0, 0, 0, 0.6)` + `backdrop-filter: blur(8px)`
- Added **slide-in animation** for menu panel
- Added **ESC key handler** to close menu
- Added **aria attributes**: `aria-expanded`, `aria-controls`, `aria-modal`, `aria-label`
- Added **focus management** with ref to first focusable element
- Improved **scroll lock** with CSS class approach + scroll position preservation

### 2. [globals.css](file:///c:/Users/nccdi/Documents/tamberma-restaurant/src/styles/globals.css)

**Added:**
```css
:root {
  --z-modal: 9999;
  --z-modal-backdrop: 9998;
}

body.menu-open {
  overflow: hidden !important;
  position: fixed;
  width: 100%;
  height: 100%;
  touch-action: none;
  -webkit-overflow-scrolling: none;
}
```

---

## Before/After Behavior Checklist

| Behavior | Before | After |
|----------|:------:|:-----:|
| Overlay covers full viewport | ❌ | ✅ |
| Overlay above all content | ❌ | ✅ |
| Glass effect readable | ❌ | ✅ |
| Scroll locked (incl. iOS) | ❌ | ✅ |
| ESC closes menu | ❌ | ✅ |
| Click backdrop closes | ❌ | ✅ |
| Aria attributes present | ❌ | ✅ |
| Scroll position preserved | ❌ | ✅ |

---

## Design Tokens Used

- `--background`: HSL `40 20% 97%` (warm off-white) for menu panel
- `--z-modal`: `9999` for menu panel
- `--z-modal-backdrop`: `9998` for backdrop
- `--primary`: HSL `11 55% 50%` (terracotta) for active links and CTA
- `bg-neutral-*` classes for borders and hover states

---

## Testing Instructions

1. Open http://localhost:3000 on mobile viewport (375px)
2. Click hamburger menu → should see dark glass overlay + white panel sliding in
3. Press **ESC** → menu closes
4. Reopen menu, click **dark backdrop area** → menu closes
5. With menu open, try scrolling → page should NOT scroll
6. Close menu → scroll position should be preserved
