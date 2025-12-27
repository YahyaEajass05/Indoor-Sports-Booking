/**
 * Dashboard Animations
 * Advanced animations specifically for dashboard components
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Stats Card Animations
export const statsCardAnimations = {
  // Entrance animation for stats cards
  entrance: (element, delay = 0) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
        rotateX: -15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        delay,
        ease: 'back.out(1.7)',
        stagger: 0.1
      }
    );
  },

  // Number counter animation
  countUp: (element, endValue, duration = 2) => {
    const obj = { value: 0 };
    return gsap.to(obj, {
      value: endValue,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.floor(obj.value);
      }
    });
  },

  // Hover glow effect
  hoverGlow: (element) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(element, {
      boxShadow: '0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)',
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
    return tl;
  },

  // Pulse animation for active states
  pulse: (element) => {
    return gsap.to(element, {
      scale: 1.1,
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
};

// Chart Animations
export const chartAnimations = {
  // Bar chart entrance
  barEntrance: (bars) => {
    return gsap.from(bars, {
      scaleY: 0,
      transformOrigin: 'bottom',
      duration: 1,
      stagger: 0.1,
      ease: 'elastic.out(1, 0.5)'
    });
  },

  // Line chart draw animation
  lineDrawIn: (path, duration = 2) => {
    const length = path.getTotalLength();
    return gsap.fromTo(
      path,
      {
        strokeDasharray: length,
        strokeDashoffset: length
      },
      {
        strokeDashoffset: 0,
        duration,
        ease: 'power2.inOut'
      }
    );
  },

  // Pie chart segments
  pieSegments: (segments) => {
    return gsap.from(segments, {
      scale: 0,
      transformOrigin: 'center',
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    });
  },

  // Data point pop-in
  dataPoints: (points) => {
    return gsap.from(points, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'back.out(2)'
    });
  }
};

// Table Animations
export const tableAnimations = {
  // Row by row fade-in
  rowFadeIn: (rows) => {
    return gsap.from(rows, {
      opacity: 0,
      x: -30,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out'
    });
  },

  // Highlight row on update
  highlightRow: (row) => {
    const tl = gsap.timeline();
    tl.to(row, {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      duration: 0.3,
      ease: 'power2.out'
    }).to(row, {
      backgroundColor: 'transparent',
      color: 'inherit',
      duration: 0.5,
      delay: 0.5,
      ease: 'power2.in'
    });
    return tl;
  },

  // Sort animation
  sortAnimation: (container) => {
    return gsap.from(container.children, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.03,
      ease: 'power2.out'
    });
  }
};

// Widget Animations
export const widgetAnimations = {
  // Widget slide in from sides
  slideInFromSides: (leftWidgets, rightWidgets) => {
    const tl = gsap.timeline();
    tl.from(leftWidgets, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });
    tl.from(
      rightWidgets,
      {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      },
      '-=0.6'
    );
    return tl;
  },

  // Morph animation
  morph: (element) => {
    return gsap.to(element, {
      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  },

  // Flip reveal
  flipReveal: (element) => {
    return gsap.from(element, {
      rotationY: 90,
      opacity: 0,
      duration: 0.8,
      transformPerspective: 1000,
      ease: 'power2.out'
    });
  }
};

// Notification Animations
export const notificationAnimations = {
  // Slide in from top
  slideInTop: (element) => {
    return gsap.from(element, {
      y: -100,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)'
    });
  },

  // Bounce in
  bounceIn: (element) => {
    return gsap.from(element, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)'
    });
  },

  // Slide out
  slideOut: (element, direction = 'right') => {
    const x = direction === 'right' ? 400 : -400;
    return gsap.to(element, {
      x,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });
  }
};

// Sidebar Animations
export const sidebarAnimations = {
  // Expand/collapse
  toggle: (element, isExpanded) => {
    return gsap.to(element, {
      width: isExpanded ? 250 : 80,
      duration: 0.4,
      ease: 'power2.inOut'
    });
  },

  // Menu items cascade
  menuCascade: (items, isExpanded) => {
    if (isExpanded) {
      return gsap.from(items, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out'
      });
    } else {
      return gsap.to(items, {
        opacity: 0,
        x: -20,
        duration: 0.2,
        stagger: 0.02,
        ease: 'power2.in'
      });
    }
  },

  // Slide in from left
  slideIn: (element) => {
    return gsap.from(element, {
      x: -300,
      duration: 0.5,
      ease: 'power3.out'
    });
  }
};

// Activity Feed Animations
export const activityFeedAnimations = {
  // New item pulse
  newItemPulse: (element) => {
    const tl = gsap.timeline();
    tl.from(element, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(2)'
    }).to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: 'sine.inOut',
      repeat: 2,
      yoyo: true
    });
    return tl;
  },

  // Timeline items
  timelineReveal: (items) => {
    return gsap.from(items, {
      opacity: 0,
      x: -50,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }
};

// Header Animations
export const headerAnimations = {
  // Sticky header reveal
  stickyReveal: (element) => {
    return gsap.from(element, {
      y: -100,
      duration: 0.4,
      ease: 'power2.out'
    });
  },

  // Search bar expand
  searchExpand: (element) => {
    return gsap.to(element, {
      width: '100%',
      duration: 0.3,
      ease: 'power2.out'
    });
  },

  // Profile dropdown
  profileDropdown: (element, isOpen) => {
    return gsap.to(element, {
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
};

// Grid Layout Animations
export const gridAnimations = {
  // Masonry layout
  masonryEntrance: (items) => {
    return gsap.from(items, {
      opacity: 0,
      scale: 0.8,
      y: 60,
      duration: 0.8,
      stagger: {
        amount: 1.2,
        grid: 'auto',
        from: 'start'
      },
      ease: 'power2.out'
    });
  },

  // Grid item hover lift
  itemLift: (element) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(element, {
      y: -10,
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      duration: 0.3,
      ease: 'power2.out'
    });
    return tl;
  },

  // Reorder animation
  reorder: (items, newOrder) => {
    return gsap.to(items, {
      y: (i) => newOrder[i] * 100,
      duration: 0.5,
      ease: 'power2.inOut'
    });
  }
};

// Progress Indicator Animations
export const progressAnimations = {
  // Circular progress
  circularProgress: (element, percentage) => {
    return gsap.to(element, {
      strokeDashoffset: 100 - percentage,
      duration: 1.5,
      ease: 'power2.out'
    });
  },

  // Linear progress bar
  linearProgress: (element, percentage) => {
    return gsap.to(element, {
      width: `${percentage}%`,
      duration: 1,
      ease: 'power2.out'
    });
  },

  // Step indicator
  stepProgress: (steps, currentStep) => {
    const tl = gsap.timeline();
    steps.forEach((step, index) => {
      if (index < currentStep) {
        tl.to(
          step,
          {
            backgroundColor: '#10b981',
            scale: 1.1,
            duration: 0.3,
            ease: 'back.out(1.7)'
          },
          index * 0.2
        );
      }
    });
    return tl;
  }
};

// Filter and Sort Animations
export const filterAnimations = {
  // Filter panel slide
  panelSlide: (element, isOpen) => {
    return gsap.to(element, {
      x: isOpen ? 0 : -300,
      duration: 0.4,
      ease: 'power2.inOut'
    });
  },

  // Chip add animation
  chipAdd: (element) => {
    return gsap.from(element, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'back.out(2)'
    });
  },

  // Results update
  resultsUpdate: (container) => {
    const tl = gsap.timeline();
    tl.to(container, {
      opacity: 0,
      y: -20,
      duration: 0.2,
      ease: 'power2.in'
    }).set(container, {
      y: 20
    }).to(container, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
    return tl;
  }
};

// Dashboard Page Load Sequence
export const dashboardLoadSequence = {
  init: (elements) => {
    const { header, sidebar, statsCards, charts, widgets } = elements;
    const tl = gsap.timeline();

    // Header slides down
    tl.from(header, {
      y: -100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    });

    // Sidebar slides in
    tl.from(
      sidebar,
      {
        x: -300,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      },
      '-=0.3'
    );

    // Stats cards pop in
    tl.from(
      statsCards,
      {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      },
      '-=0.3'
    );

    // Charts fade in
    tl.from(
      charts,
      {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      },
      '-=0.4'
    );

    // Widgets cascade in
    tl.from(
      widgets,
      {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      },
      '-=0.4'
    );

    return tl;
  }
};

// Scroll-triggered animations
export const scrollAnimations = {
  // Parallax effect
  parallax: (element, speed = 0.5) => {
    return gsap.to(element, {
      y: () => window.scrollY * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  },

  // Fade in on scroll
  fadeInOnScroll: (elements) => {
    return gsap.from(elements, {
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
  },

  // Pin section
  pinSection: (section, endTrigger) => {
    return ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: endTrigger,
      pin: true,
      pinSpacing: false
    });
  }
};

// Micro-interactions
export const microInteractions = {
  // Button press
  buttonPress: (element) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(element, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.in'
    }).to(element, {
      scale: 1,
      duration: 0.2,
      ease: 'elastic.out(1, 0.3)'
    });
    return tl;
  },

  // Icon bounce
  iconBounce: (element) => {
    return gsap.to(element, {
      y: -5,
      duration: 0.3,
      repeat: 1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  },

  // Checkbox check
  checkboxCheck: (element) => {
    return gsap.from(element, {
      scale: 0,
      rotation: -180,
      duration: 0.4,
      ease: 'back.out(2)'
    });
  },

  // Toggle switch
  toggleSwitch: (element, isOn) => {
    return gsap.to(element, {
      x: isOn ? 20 : 0,
      backgroundColor: isOn ? '#10b981' : '#6b7280',
      duration: 0.3,
      ease: 'power2.inOut'
    });
  }
};

export default {
  statsCardAnimations,
  chartAnimations,
  tableAnimations,
  widgetAnimations,
  notificationAnimations,
  sidebarAnimations,
  activityFeedAnimations,
  headerAnimations,
  gridAnimations,
  progressAnimations,
  filterAnimations,
  dashboardLoadSequence,
  scrollAnimations,
  microInteractions
};
