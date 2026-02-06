# Mobile Menu Size Fix

## What Was Oversized

| Element | Before | After |
|---------|--------|-------|
| Panel width | `max-w-sm` (384px) | `min(85vw, 320px)` |
| Nav link font | `text-2xl` (24px) | `text-lg` (18px) |
| Nav spacing | `space-y-5` (20px) | `space-y-1` (4px) + `py-2.5` per item |
| CTA button height | `py-4` (16px each side) | `py-3` (12px each side) |
| CTA font | `text-lg` (18px) | `text-base` (16px) |
| Close icon | 24px | 20px |
| Nav padding | `px-6 py-8` | `px-4 py-5` |
| CTA padding | `px-6 py-6` | `px-4 py-4` |

---

## File Changed

### [Header.tsx](file:///c:/Users/nccdi/Documents/tamberma-restaurant/src/components/layout/Header.tsx)

**Summary of changes:**
- Panel width: `width: min(85vw, 320px)` via inline style
- Nav links: `text-lg` with `py-2.5 px-2` and hover background
- Active link: subtle `bg-primary/5` highlight
- CTA: compact `py-3 rounded-lg text-base`
- Close button: smaller icon (20px) with subtle styling

---

## Visual Result (375px viewport)

```
┌─────────────────────────┬─────────────────┐
│                         │ [Logo]      [X] │
│     Dark backdrop       ├─────────────────┤
│     (60% opacity +      │ Home            │
│     8px blur)           │ Menu            │
│                         │ Gallery         │
│                         │ Events          │
│                         │ Contact         │
│                         ├─────────────────┤
│                         │ [Reserve Table] │
└─────────────────────────┴─────────────────┘
         ~55px                  ~320px
```

---

## Design Tokens Used

- `--background`: Panel background color
- `bg-primary/5`: Active link highlight
- `text-primary`: Active link color
- `text-neutral-700` / `text-neutral-900`: Link colors
- `border-neutral-200`: Panel border
- `hover:bg-neutral-50`: Link hover state
