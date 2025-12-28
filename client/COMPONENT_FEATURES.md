# 🎨 Layout Components - Feature Highlights

## 🌟 Advanced Features Implemented

### 1. **Navbar Component** (438 lines)
#### 🎯 Key Features:
- **Glass Morphism Effect**: Transforms on scroll with backdrop blur
- **Smart Search Bar**: Expands from 200px to 400px on focus
- **Real-time Notifications**: Dropdown with unread count badge
- **Profile Menu**: Quick access to dashboard, bookings, settings
- **Mobile Responsive**: Full-screen slide-out menu
- **Active Route Highlighting**: Animated underline indicator
- **Gradient Logo**: Rotating animation on hover
- **Smooth Transitions**: All interactions use Framer Motion

#### 🎨 Animations:
- Logo rotation (360°) on hover
- Dropdown fade-in with scale
- Menu items stagger animation
- Search bar width expansion
- Badge pulse animation
- Notification slide-in

---

### 2. **Sidebar Component** (542 lines)
#### 🎯 Key Features:
- **Role-Based Menus**: Different menus for Admin, Owner, User
- **Collapsible Design**: Switches between 72px and 288px width
- **Submenu Support**: Expandable nested navigation
- **Badge Indicators**: Real-time counts for notifications
- **Gradient Icons**: Each menu item has unique gradient
- **Mobile Overlay**: Backdrop blur with touch gestures
- **Persistent State**: Remembers collapsed/expanded state

#### 🎨 Animations:
- Smooth width transitions
- Icon rotation on hover
- Submenu accordion animation
- Menu item stagger reveal
- Badge scale-in animation
- Hover glow effects

#### 📊 Menu Items by Role:

**Admin (8 items):**
- Dashboard, Users (245), Owners, Courts (with 3 submenu items), Bookings (89), Promotions, Reports (with 3 submenu items), System Settings, Audit Logs

**Owner (6 items):**
- Dashboard, My Courts (5), Bookings (23), Availability, Revenue (with 3 submenu items), Promotions, Notifications (8)

**User (4 items):**
- Dashboard, My Bookings (with 3 submenu items), Saved Courts (12), Notifications (5), Security

---

### 3. **Footer Component** (393 lines)
#### 🎯 Key Features:
- **Dynamic Stats Section**: 4 animated counters
  - Courts Listed: 1,000+
  - Happy Users: 50,000+
  - Bookings Made: 100,000+
  - Cities: 50+
- **Newsletter Subscription**: With success animation
- **Social Media Links**: 5 platforms with hover effects
  - Facebook, Twitter, Instagram, LinkedIn, YouTube
- **Footer Sections**: 3 navigation columns
  - Quick Links (5 items)
  - Support (5 items)
  - For Owners (5 items)
- **Scroll-to-Top Button**: Fixed button with circular progress
- **Floating Particles**: 20 animated particles in background
- **Gradient Border**: Top border with animated glow

#### 🎨 Animations:
- Stats counters with bounce
- Emoji rotation and scale
- Newsletter success state
- Social icon hover lift
- Particle floating effects
- Heart pulse in copyright
- Scroll button rotation

---

### 4. **AnimatedBackground Component** (155 lines)
#### 🎯 Variants:

**Particles (Default):**
- 100 animated particles
- Connection lines (within 150px)
- Dynamic movement
- Responsive canvas

**Gradient:**
- Moving gradient background
- 20-second animation loop
- 200% background size

**Mesh:**
- Grid pattern overlay
- Radial gradient pulse
- Scale animation (1 → 1.2 → 1)

**Waves:**
- 3 wave layers
- Different speeds per layer
- Infinite vertical movement

---

### 5. **LoadingScreen Component** (131 lines)
#### 🎯 Key Features:
- **Full-screen Overlay**: Dark gradient background
- **Rotating Logo**: 360° continuous rotation
- **Particle Stars**: 50 floating particles
- **Progress Bar**: Gradient sliding animation
- **Loading Dots**: 3 pulsing indicators
- **Glow Effect**: Animated blur around logo
- **Custom Message**: Configurable loading text

#### 🎨 Animations:
- Logo rotation (2s linear infinite)
- Glow pulse effect
- Particles fade in/out
- Progress bar slide
- Dots stagger pulse
- Screen fade in/out

---

### 6. **ScrollProgressBar Component** (105 lines)
#### 🎯 Key Features:
- **Linear Progress**: Top or bottom positioned
- **Circular Indicator**: Fixed bottom-right with percentage
- **Scroll-to-Top Button**: Inside circular progress
- **Multiple Colors**: Gradient, primary, secondary, accent
- **Smooth Animations**: Spring physics for natural feel
- **Auto-hide**: Only shows after 50px scroll

#### 🎨 Animations:
- Linear scaleX animation
- Circular path drawing
- Button scale on hover
- Fade in/out on scroll
- Blur glow effect

---

### 7. **PageTransition Component** (70 lines)
#### 🎯 Transition Variants:

**8 Different Effects:**
1. **Fade**: Simple opacity change
2. **Slide**: Horizontal movement
3. **SlideUp**: Vertical movement
4. **Scale**: Zoom effect
5. **Rotate**: Rotation with scale
6. **Blur**: Blur filter transition
7. **Curtain**: Reveal with clip-path
8. **Zoom**: Full zoom in/out

#### 🎨 Usage:
```jsx
<PageTransition variant="fade">
  <YourPage />
</PageTransition>
```

---

### 8. **Breadcrumb Component** (57 lines)
#### 🎯 Key Features:
- **Auto-generation**: From URL path
- **Home Icon**: SVG house icon
- **Custom Labels**: Override default labels
- **Active Styling**: Different style for current page
- **Hover Effects**: Animated underline
- **Arrow Separators**: Chevron icons

#### 🎨 Animations:
- Stagger reveal (0.1s delay per item)
- Underline expand on hover
- Icon transitions

---

### 9. **NotificationToast Component** (139 lines)
#### 🎯 Key Features:
- **4 Notification Types**: Success, Error, Warning, Info
- **6 Position Options**: All corners and centers
- **Auto-dismiss Timer**: Configurable duration
- **Manual Dismiss**: Close button
- **Progress Bar**: Visual countdown
- **Stack Management**: Multiple notifications
- **Type-specific Styling**: Color-coded

#### 🎨 Animations:
- Slide-in from top/side
- Scale animation
- Icon rotation
- Progress bar countdown
- Exit animation
- Stagger for multiple toasts

---

## 🛠️ Animation Utilities (layoutAnimations.js)

### 15+ Custom Hooks & Classes:

#### 1. **ParticleSystem**
Canvas-based particle animation with connections
```javascript
new ParticleSystem(canvas, options)
```

#### 2. **useMouseFollow**
Element follows mouse movement
```javascript
useMouseFollow(ref, { intensity: 20, smooth: 0.1 })
```

#### 3. **useParallaxScroll**
Parallax scrolling effect
```javascript
useParallaxScroll(ref, speed)
```

#### 4. **use3DTilt**
3D tilt on hover
```javascript
use3DTilt(ref, { maxTilt: 15, perspective: 1000 })
```

#### 5. **useMagneticEffect**
Magnetic button attraction
```javascript
useMagneticEffect(ref, strength)
```

#### 6. **useIntersectionAnimation**
Scroll-triggered animations
```javascript
useIntersectionAnimation(ref, options)
```

#### 7. **createRipple**
Material Design ripple effect
```javascript
createRipple(event, element)
```

#### 8. **smoothScrollTo**
Smooth scroll to element with easing
```javascript
smoothScrollTo(elementId, offset)
```

#### 9. **useGlitchEffect**
Text glitch animation
```javascript
useGlitchEffect(ref, options)
```

#### 10. **useCounterAnimation**
Animated number counter
```javascript
const count = useCounterAnimation(1000, 2000, 0)
```

#### 11. **CursorTrail**
Custom cursor trail effect
```javascript
new CursorTrail(options)
```

#### 12. **useScrollProgress**
Get scroll percentage
```javascript
const progress = useScrollProgress()
```

#### 13. **staggerAnimation**
Framer Motion stagger variants
```javascript
<motion.div variants={staggerAnimation.container}>
  <motion.div variants={staggerAnimation.item} />
</motion.div>
```

#### 14. **pageTransitionVariants**
Ready-to-use page transition configs

#### 15. **useTypingEffect**
Typewriter animation
```javascript
const text = useTypingEffect("Hello", 100)
```

---

## 🎨 Color System Integration

### Gradient Combinations:
```css
/* Primary to Secondary */
from-primary-500 via-secondary-500 to-accent-500

/* Blue to Purple to Orange */
#0ea5e9 → #d946ef → #f97316
```

### Glow Effects:
- `shadow-neon`: Neon blue glow
- `shadow-glow`: Standard glow
- `shadow-glow-lg`: Large glow

### Glass Effects:
- `.glass`: Light glass morphism
- `.glass-dark`: Dark glass morphism
- `.frosted-glass`: Frosted effect

---

## 📊 Performance Optimizations

### 1. **Lazy Loading**
- Components use dynamic imports where possible
- Heavy animations only load when visible

### 2. **Memoization**
- React.memo for static components
- useMemo for expensive calculations

### 3. **Debouncing**
- Scroll events debounced
- Resize handlers optimized

### 4. **Animation Frame**
- requestAnimationFrame for smooth 60fps
- Cancel on unmount to prevent memory leaks

### 5. **CSS Hardware Acceleration**
- transform and opacity for GPU rendering
- will-change hints for better performance

---

## 🌐 Responsive Breakpoints

```javascript
// Tailwind breakpoints used:
sm:  640px  // Mobile landscape
md:  768px  // Tablet
lg:  1024px // Desktop
xl:  1280px // Large desktop
2xl: 1536px // Extra large
```

### Mobile Optimizations:
- Touch-friendly tap targets (44px minimum)
- Reduced animation intensity
- Simplified effects for performance
- Optimized bundle size

---

## ✨ Unique Features

### 1. **Particle Network**
- Dynamic connection lines
- Distance-based opacity
- Responsive to screen size

### 2. **Gradient Text Animation**
- Moving gradient background
- 200% background size
- Seamless loop

### 3. **Holographic Effect**
- Multi-color gradient
- 400% background size
- 10-second animation

### 4. **Neumorphism**
- Soft shadows
- Inset variants
- Light theme styling

### 5. **Ripple Effect**
- Click position detection
- Expanding circle
- Auto-remove after animation

---

## 🚀 Integration Example

```jsx
import {
  Navbar,
  Footer,
  Sidebar,
  AnimatedBackground,
  LoadingScreen,
  ScrollProgressBar,
  PageTransition,
  Breadcrumb,
  NotificationToast,
} from './components/layout';

function App() {
  return (
    <>
      <LoadingScreen isLoading={loading} />
      <AnimatedBackground variant="particles" />
      <ScrollProgressBar position="top" />
      <Navbar />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} userRole="user" />
      
      <PageTransition variant="fade">
        <main>
          <Breadcrumb />
          {/* Your content */}
        </main>
      </PageTransition>
      
      <Footer />
      <NotificationToast notifications={toasts} onClose={closeToast} />
    </>
  );
}
```

---

## 📈 Code Statistics

| Component | Lines | Animations | Features |
|-----------|-------|------------|----------|
| Navbar | 438 | 8+ | Search, Notifications, Profile |
| Sidebar | 542 | 10+ | Role-based, Collapsible, Badges |
| Footer | 393 | 12+ | Stats, Newsletter, Social |
| AnimatedBackground | 155 | 4 variants | Particles, Gradient, Mesh, Waves |
| LoadingScreen | 131 | 6+ | Particles, Progress, Logo |
| ScrollProgressBar | 105 | 4+ | Linear, Circular, Button |
| PageTransition | 70 | 8 variants | Multiple transition types |
| Breadcrumb | 57 | 3+ | Auto-generation, Hover |
| NotificationToast | 139 | 6+ | 4 types, 6 positions |

**Total: 2,030+ lines of production-ready code**

---

## 🎯 Next Steps

1. ✅ Test all components in development
2. ✅ Verify responsive behavior
3. ✅ Check animation performance
4. ✅ Validate accessibility
5. ✅ Optimize bundle size
6. ✅ Add error boundaries
7. ✅ Document API usage

---

**Built with modern React, Framer Motion, and Tailwind CSS for the CourtBook Indoor Sports Booking System** 🏀⚽🏸
