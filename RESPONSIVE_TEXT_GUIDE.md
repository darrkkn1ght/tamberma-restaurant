# Responsive Text System Guide

## Overview

The Tamberma Restaurant website now features a comprehensive responsive text system that automatically scales text sizes based on screen size. This ensures optimal readability and visual hierarchy across all devices.

## How It Works

The responsive text system uses Tailwind CSS breakpoints to automatically adjust font sizes:
- **Mobile (default)**: Smallest text size
- **Small (sm: 640px+)**: Slightly larger
- **Medium (md: 768px+)**: Medium size
- **Large (lg: 1024px+)**: Larger size
- **Extra Large (xl: 1280px+)**: Even larger
- **2XL (1536px+)**: Largest size

## Available Responsive Text Classes

### Headings

```css
.heading-xl    /* text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl */
.heading-lg    /* text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl */
.heading-md    /* text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl */
.heading-sm    /* text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl */
```

### Body Text

```css
.text-body-xs  /* text-xs sm:text-sm lg:text-base */
.text-body-sm  /* text-sm sm:text-base lg:text-lg */
.text-body-md  /* text-base sm:text-lg lg:text-xl */
.text-body-lg  /* text-lg sm:text-xl lg:text-2xl */
.text-body-xl  /* text-xl sm:text-2xl lg:text-3xl */
```

### Special Purpose Classes

#### Hero Sections
```css
.hero-title     /* text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl */
.hero-subtitle  /* text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl */
```

#### Menu Items
```css
.menu-title       /* text-xl sm:text-2xl lg:text-3xl xl:text-4xl */
.menu-price       /* text-lg sm:text-xl lg:text-2xl xl:text-3xl */
.menu-description /* text-sm sm:text-base lg:text-lg */
```

#### Cards
```css
.card-title    /* text-lg sm:text-xl lg:text-2xl xl:text-3xl */
.card-subtitle /* text-base sm:text-lg lg:text-xl */
.card-body     /* text-sm sm:text-base lg:text-lg */
```

#### Buttons
```css
.btn-text-sm   /* text-sm sm:text-base lg:text-lg */
.btn-text-md   /* text-base sm:text-lg lg:text-xl */
.btn-text-lg   /* text-lg sm:text-xl lg:text-2xl */
```

#### Navigation
```css
.nav-text    /* text-sm sm:text-base lg:text-lg */
.nav-text-lg /* text-base sm:text-lg lg:text-xl */
```

#### Footer
```css
.footer-title /* text-lg sm:text-xl lg:text-2xl */
.footer-body  /* text-sm sm:text-base lg:text-lg */
```

#### Testimonials
```css
.testimonial-text   /* text-base sm:text-lg lg:text-xl xl:text-2xl */
.testimonial-author /* text-sm sm:text-base lg:text-lg */
```

#### Events
```css
.event-title /* text-lg sm:text-xl lg:text-2xl xl:text-3xl */
.event-time  /* text-sm sm:text-base lg:text-lg */
```

#### Contact Info
```css
.contact-title /* text-lg sm:text-xl lg:text-2xl */
.contact-info  /* text-sm sm:text-base lg:text-lg */
```

## Usage Examples

### Basic Heading
```jsx
<h1 className="heading-xl font-display font-bold text-white">
  Authentic Indian Culinary Experience
</h1>
```

### Hero Section
```jsx
<div className="text-center">
  <h1 className="hero-title font-display font-bold text-white">
    Welcome to Tamberma
  </h1>
  <p className="hero-subtitle text-gray-200">
    Experience the finest Indian cuisine
  </p>
</div>
```

### Menu Item
```jsx
<div className="menu-item">
  <h3 className="menu-title font-display font-bold">
    Tandoori Chicken
  </h3>
  <span className="menu-price font-bold text-orange-400">
    ₦2,500
  </span>
  <p className="menu-description text-gray-600">
    Marinated in yogurt and spices, grilled to perfection
  </p>
</div>
```

### Card Component
```jsx
<Card>
  <CardTitle size="lg">Special Offer</CardTitle>
  <CardDescription>
    Get 20% off on your first visit
  </CardDescription>
</Card>
```

### Button with Responsive Text
```jsx
<Button size="lg" variant="primary">
  Reserve Your Table
</Button>
```

## Best Practices

1. **Use Semantic Classes**: Choose the class that matches your content type (e.g., `menu-title` for menu items, `hero-title` for hero sections)

2. **Combine with Font Classes**: Always combine with font family classes:
   ```jsx
   <h1 className="heading-lg font-display font-bold">
   ```

3. **Maintain Hierarchy**: Use appropriate heading levels:
   - `heading-xl` for main page titles
   - `heading-lg` for section titles
   - `heading-md` for subsection titles
   - `heading-sm` for card titles

4. **Consider Context**: Choose body text classes based on importance:
   - `text-body-lg` for important descriptions
   - `text-body-md` for regular content
   - `text-body-sm` for secondary information

## Migration Guide

### Before (Fixed Sizes)
```jsx
<h1 className="text-4xl md:text-5xl lg:text-7xl">
  Title
</h1>
```

### After (Responsive Classes)
```jsx
<h1 className="heading-lg">
  Title
</h1>
```

### Before (Fixed Body Text)
```jsx
<p className="text-lg md:text-xl">
  Description
</p>
```

### After (Responsive Classes)
```jsx
<p className="text-body-lg">
  Description
</p>
```

## Benefits

1. **Consistency**: All text follows the same responsive scaling pattern
2. **Maintainability**: Easy to update text sizes globally
3. **Performance**: No JavaScript needed for responsive text
4. **Accessibility**: Maintains proper text hierarchy
5. **User Experience**: Optimal readability on all devices

## Testing

To test responsive text behavior:

1. **Desktop**: Resize browser window from 320px to 1920px+
2. **Mobile**: Use browser dev tools to simulate different devices
3. **Tablet**: Test on actual tablet devices
4. **Print**: Check how text scales in print media

## Customization

To add new responsive text classes, add them to `src/index.css` in the `@layer components` section:

```css
.your-custom-class {
  @apply text-base sm:text-lg lg:text-xl xl:text-2xl;
}
```

## Browser Support

This system works in all modern browsers that support:
- CSS Grid
- CSS Custom Properties
- Tailwind CSS 3.0+

The responsive text system gracefully degrades to the smallest size on older browsers. 