# Advanced Animation System Documentation

## Overview
This indoor sports booking system features a comprehensive animation system with **100+ advanced animations** built using modern libraries and techniques.

## Technology Stack
- **Framer Motion** - React animation library for declarative animations
- **GSAP** - Professional-grade animation library
- **Tailwind CSS** - Utility-first CSS with custom animations
- **React Spring** - Spring-physics based animations
- **AOS (Animate On Scroll)** - Scroll-triggered animations
- **Three.js & React Three Fiber** - 3D animations
- **Lottie** - Vector animations

## Animation Files Structure

### Core Animation Files
```
client/src/animations/
├── animationUtils.js        - Framer Motion variants (100+ variants)
├── dashboardAnimations.js   - Dashboard-specific GSAP animations
├── modalAnimations.js       - Modal and dialog animations
├── pageTransitions.js       - Route transition effects
├── componentAnimations.js   - Component-specific animations
├── particleEffects.js       - Particle system configurations
├── threeDAnimations.js      - 3D animation helpers
└── loaders.js              - Loading indicators (React components)
```

### Utility Files
```
client/src/hooks/
└── useAnimations.js         - Custom animation hooks

client/src/utils/
└── animationUtils.js        - Animation helper functions
```

## Available Animations

### 1. Framer Motion Variants (animationUtils.js)
- **Fade Animations**: fadeIn, fadeOut, fadeInUp, fadeInDown, fadeInLeft, fadeInRight
- **Slide Animations**: slideUp, slideDown, slideLeft, slideRight
- **Scale Animations**: scaleIn, scaleOut, scalePulse, zoomIn, elasticIn
- **Rotate Animations**: rotateIn, rotateOut, flip, flipX, flipY
- **Bounce Animations**: bounceIn, elasticIn
- **Container Animations**: containerVariants, gridContainer, stagger
- **Card Animations**: cardHover, cardLift, cardTilt
- **Button Animations**: buttonVariants, buttonGlow, buttonRipple
- **Modal Animations**: modalOverlay, modalContent, drawer
- **Toast Animations**: toastVariants
- **Dropdown Animations**: dropdownVariants
- **Tab Animations**: tabContent
- **Scroll Animations**: scrollReveal, parallax
- **Badge Animations**: badgeVariants
- **Accordion Animations**: accordionVariants
- **Progress Animations**: progressBar

### 2. GSAP Dashboard Animations (dashboardAnimations.js)
- **Stats Cards**: entrance, countUp, hoverGlow, pulse
- **Charts**: barEntrance, lineDrawIn, pieSegments, dataPoints
- **Tables**: rowFadeIn, highlightRow, sortAnimation
- **Widgets**: slideInFromSides, morph, flipReveal
- **Notifications**: slideInTop, bounceIn, slideOut
- **Sidebar**: toggle, menuCascade, slideIn
- **Activity Feed**: newItemPulse, timelineReveal
- **Header**: stickyReveal, searchExpand, profileDropdown
- **Grid**: masonryEntrance, itemLift, reorder
- **Progress**: circularProgress, linearProgress, stepProgress
- **Filters**: panelSlide, chipAdd, resultsUpdate
- **Scroll**: parallax, fadeInOnScroll, pinSection
- **Micro-interactions**: buttonPress, iconBounce, checkboxCheck, toggleSwitch

### 3. Modal Animations (modalAnimations.js)
- **Entrance Effects**: fadeScale, slideBottom, zoomIn, flip, newspaper, blur
- **Exit Effects**: fadeScale, slideBottom, zoomOut
- **Drawer Effects**: slideRight, slideLeft
- **Toast Effects**: slideTop, bounceIn
- **Dropdown Effects**: expandTop, fadeSlide
- **Tooltip Effects**: fadeIn, popIn
- **Popover Effects**: scaleIn
- **Dialog Effects**: shake, buttonPulse

### 4. Page Transitions (pageTransitions.js)
- **Fade Transitions**: fade, fadeScale, crossFade
- **Slide Transitions**: slideLeft, slideRight, slideUp, slideDown
- **Reveal Transitions**: wipeLeft, wipeRight, circular
- **Zoom Transitions**: zoomIn, zoomOut
- **Rotate Transitions**: rotateIn, flip
- **Split Transitions**: verticalSplit, horizontalSplit
- **Curtain Transitions**: curtainOpen
- **Glitch Transitions**: glitch
- **Liquid Transitions**: wave
- **3D Transitions**: cubeRotate, doorSwing
- **Particle Transitions**: dissolve
- **Stagger Transitions**: staggerFadeIn, cascadeSides

### 5. Component Animations (componentAnimations.js)
- **Court Cards**: tiltHover, imageZoom, badgePopIn, favoriteHeart, pricePulse
- **Booking Forms**: stepTransition, datePickerOpen, timeSlotSelect, errorShake, successCheck
- **Calendar**: monthTransition, availableHighlight, selectDate
- **Search**: expandSearch, resultsDropdown, resultStagger, loadingDots
- **Filters**: panelSlideIn, optionToggle, rangeSlider, clearFilters
- **Navigation**: mobileMenuToggle, menuCascade, submenuDropdown, activeLinkUnderline
- **Gallery**: gridEntrance, lightboxOpen, imageNavigation
- **Rating**: starFill, starHover, countIncrement
- **Reviews**: cardEntrance, expandReview, likeButton
- **Payment**: cardFlip, processing, successConfetti
- **Badges**: popIn, pulse, remove
- **Skeleton**: shimmer, pulse
- **Empty States**: bounceIn, iconFloat

### 6. Particle Effects (particleEffects.js)
- **Booking Success**: Confetti particles
- **Hero Section**: Floating connected particles
- **Dashboard**: Network particles
- **Seasonal**: Snow effect
- **Background**: Stars effect
- **Interactive**: Bubble effect
- **Ambient**: Fireflies effect
- **Tech**: Matrix rain effect

### 7. 3D Animations (threeDAnimations.js)
- **3D Cards**: Rotation on mouse move
- **Floating Objects**: Y-axis animation
- **Wave Effect**: Geometry manipulation
- **Particle System**: 5000 particle system
- **Court Models**: 3D court animations
- **Glass Morphism**: Material effects
- **Holographic**: Shader effects
- **Camera**: Zoom, orbit, shake
- **Lights**: Pulse, color shift
- **Post-processing**: Bloom, chromatic aberration, vignette, glitch

### 8. Loaders (loaders.js)
React components for loading indicators:
- **DotsLoader**: Animated dots
- **CircleSpinner**: Rotating circle
- **ProgressBar**: Linear progress
- **SkeletonLoader**: Content placeholder
- **RippleLoader**: Expanding ripples
- **BarsLoader**: Animated bars
- **HeartBeatLoader**: Pulsing heart
- **InfinityLoader**: Infinity symbol
- **ClockLoader**: Rotating clock hands
- **GridLoader**: Grid pattern
- **WaveLoader**: Wave animation
- **BouncingBalls**: Bouncing spheres

## Custom Hooks

### useAnimations.js
- `useScrollAnimation()` - Scroll-triggered animations
- `useStaggerAnimation()` - Stagger children animations
- `useMouseParallax()` - Mouse parallax effect
- `useScrollProgress()` - Scroll progress tracking
- `useTypingAnimation()` - Typing effect
- `useCounterAnimation()` - Number counter
- `useElementVisibility()` - Visibility detection
- `useHoverAnimation()` - Hover state management
- `useSmoothValue()` - Smooth value transitions
- `useRipple()` - Ripple effect
- `useAutoAnimate()` - Auto-animation cleanup
- `usePageTransition()` - Page transition state
- `useCarousel()` - Carousel/slider logic
- `useAccordion()` - Accordion animation
- `useDragAnimation()` - Drag and drop
- `useSkeletonAnimation()` - Loading skeleton

## Tailwind Custom Animations

### Available Classes
```css
/* Fade */
animate-fade-in, animate-fade-out, animate-fade-in-up, animate-fade-in-down

/* Slide */
animate-slide-in-up, animate-slide-in-down, animate-slide-in-left, animate-slide-in-right

/* Scale */
animate-scale-in, animate-scale-out, animate-scale-pulse

/* Rotate */
animate-rotate-in, animate-rotate-out

/* Bounce */
animate-bounce-in, animate-bounce-slow

/* Shake */
animate-shake, animate-shake-x, animate-shake-y

/* Flip */
animate-flip, animate-flip-x, animate-flip-y

/* Glow */
animate-glow, animate-glow-pulse

/* Gradient */
animate-gradient-x, animate-gradient-y, animate-gradient-xy

/* Shimmer */
animate-shimmer, animate-shimmer-slow

/* Float */
animate-float, animate-float-slow

/* Wiggle */
animate-wiggle, animate-wiggle-slow

/* Spin */
animate-spin-slow, animate-spin-slower, animate-spin-reverse

/* And many more... */
```

### Custom CSS Classes
```css
/* Effects */
.glass, .glass-dark           - Glass morphism
.gradient-text                - Gradient text
.gradient-text-animated       - Animated gradient
.neon-border, .neon-text     - Neon effects
.holographic                  - Holographic effect
.neumorphic                   - Neumorphism
.card-hover, .card-glow       - Card effects
.shimmer                      - Shimmer loading
.floating                     - Float animation
.pulse-ring                   - Pulse ring
.gradient-border              - Animated border
.animated-bg                  - Animated background
.grid-bg, .dots-bg           - Pattern backgrounds
.frosted-glass                - Frosted glass effect
```

## Usage Examples

### 1. Framer Motion
```jsx
import { motion } from 'framer-motion';
import { fadeInVariants, slideUpVariants } from './animations/animationUtils';

<motion.div
  variants={fadeInVariants}
  initial="hidden"
  animate="visible"
  exit="exit"
>
  Content
</motion.div>
```

### 2. GSAP
```jsx
import { useEffect, useRef } from 'react';
import { statsCardAnimations } from './animations/dashboardAnimations';

const StatsCard = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    statsCardAnimations.entrance(cardRef.current, 0.2);
  }, []);

  return <div ref={cardRef}>Stats</div>;
};
```

### 3. Custom Hooks
```jsx
import { useScrollAnimation, useCounterAnimation } from './hooks/useAnimations';

const Component = () => {
  const [ref, inView] = useScrollAnimation();
  const { count, animate } = useCounterAnimation(1000);

  useEffect(() => {
    if (inView) animate();
  }, [inView]);

  return <div ref={ref}>{count}</div>;
};
```

### 4. Tailwind Classes
```jsx
<div className="animate-fade-in-up card-glow">
  <h1 className="gradient-text-animated">Title</h1>
  <button className="btn-primary animate-pulse-glow">
    Click Me
  </button>
</div>
```

### 5. Loaders
```jsx
import { DotsLoader, CircleSpinner } from './animations/loaders';

<DotsLoader size="md" color="primary" />
<CircleSpinner size={40} color="#3b82f6" />
```

## Performance Optimization

1. **Use `will-change` CSS property** for animated elements
2. **Lazy load animations** for off-screen content
3. **Use `AnimatePresence`** for exit animations
4. **Prefer transforms** over position properties
5. **Use `requestAnimationFrame`** for custom animations
6. **Debounce scroll events** for scroll animations
7. **Use `IntersectionObserver`** for scroll triggers
8. **Minimize reflows** during animations

## Accessibility

- All animations respect `prefers-reduced-motion`
- Keyboard navigation maintained during animations
- Focus states properly handled
- ARIA attributes for animated content
- Screen reader announcements for state changes

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Installation

```bash
cd client
npm install
```

## Running the Application

```bash
npm run dev
```

Visit `http://localhost:5173` to see the animations in action.

## Contributing

When adding new animations:
1. Add animation function to appropriate file
2. Document in this README
3. Test across browsers
4. Ensure accessibility compliance
5. Add usage examples

## License

MIT License - See LICENSE file for details
