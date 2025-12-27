/**
 * Component-Specific Animations
 * Advanced animations for UI components
 */

import { gsap } from 'gsap';

// Court Card Animations
export const courtCardAnimations = {
  // Hover effect with 3D tilt
  tiltHover: (card) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(card, {
      y: -10,
      boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
      duration: 0.3,
      ease: 'power2.out'
    });
    return tl;
  },

  // Image zoom on hover
  imageZoom: (image) => {
    return gsap.to(image, {
      scale: 1.1,
      duration: 0.4,
      ease: 'power2.out'
    });
  },

  // Badge pop-in
  badgePopIn: (badge) => {
    return gsap.from(badge, {
      scale: 0,
      rotation: 180,
      duration: 0.5,
      ease: 'back.out(2)'
    });
  },

  // Favorite heart animation
  favoriteHeart: (heart) => {
    const tl = gsap.timeline();
    tl.to(heart, {
      scale: 1.3,
      duration: 0.15,
      ease: 'power2.out'
    }).to(heart, {
      scale: 1,
      duration: 0.3,
      ease: 'elastic.out(1, 0.3)'
    });
    return tl;
  },

  // Price pulse
  pricePulse: (price) => {
    return gsap.to(price, {
      scale: [1, 1.15, 1],
      color: ['#000000', '#3b82f6', '#000000'],
      duration: 0.6,
      ease: 'power2.inOut'
    });
  }
};

// Booking Form Animations
export const bookingFormAnimations = {
  // Step transition
  stepTransition: (currentStep, nextStep) => {
    const tl = gsap.timeline();
    tl.to(currentStep, {
      opacity: 0,
      x: -50,
      duration: 0.3,
      ease: 'power2.in'
    }).fromTo(
      nextStep,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    );
    return tl;
  },

  // Date picker animation
  datePickerOpen: (picker) => {
    return gsap.from(picker, {
      opacity: 0,
      y: -20,
      scale: 0.95,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
  },

  // Time slot selection
  timeSlotSelect: (slot) => {
    return gsap.to(slot, {
      backgroundColor: '#3b82f6',
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out'
    });
  },

  // Form validation error shake
  errorShake: (field) => {
    return gsap.fromTo(
      field,
      { x: 0 },
      {
        x: [5, -5, 5, -5, 0],
        duration: 0.4,
        ease: 'power2.inOut'
      }
    );
  },

  // Success checkmark
  successCheck: (checkmark) => {
    const tl = gsap.timeline();
    tl.from(checkmark, {
      scale: 0,
      rotation: -180,
      duration: 0.4,
      ease: 'back.out(2)'
    }).to(checkmark, {
      scale: [1, 1.2, 1],
      duration: 0.3,
      ease: 'power2.inOut'
    });
    return tl;
  }
};

// Calendar Animations
export const calendarAnimations = {
  // Month transition
  monthTransition: (direction = 'next') => {
    const x = direction === 'next' ? 50 : -50;
    return {
      exit: (element) => gsap.to(element, {
        opacity: 0,
        x: -x,
        duration: 0.3,
        ease: 'power2.in'
      }),
      enter: (element) => gsap.fromTo(
        element,
        { opacity: 0, x: x },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
      )
    };
  },

  // Available date highlight
  availableHighlight: (date) => {
    return gsap.to(date, {
      backgroundColor: '#dcfce7',
      scale: 1.1,
      duration: 0.2,
      ease: 'power2.out'
    });
  },

  // Selected date animation
  selectDate: (date) => {
    const tl = gsap.timeline();
    tl.to(date, {
      scale: 0.9,
      duration: 0.1,
      ease: 'power2.in'
    }).to(date, {
      scale: 1.05,
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      duration: 0.3,
      ease: 'elastic.out(1, 0.5)'
    });
    return tl;
  }
};

// Search Bar Animations
export const searchAnimations = {
  // Expand search
  expandSearch: (searchBar) => {
    return gsap.to(searchBar, {
      width: '100%',
      duration: 0.4,
      ease: 'power2.out'
    });
  },

  // Search results dropdown
  resultsDropdown: (results) => {
    return gsap.from(results, {
      opacity: 0,
      y: -20,
      height: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  },

  // Result item stagger
  resultStagger: (items) => {
    return gsap.from(items, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.out'
    });
  },

  // Loading dots
  loadingDots: (dots) => {
    return gsap.to(dots, {
      y: -10,
      duration: 0.4,
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
};

// Filter Panel Animations
export const filterAnimations = {
  // Panel slide in
  panelSlideIn: (panel) => {
    return gsap.fromTo(
      panel,
      { x: -300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
    );
  },

  // Filter option toggle
  optionToggle: (option, isActive) => {
    return gsap.to(option, {
      backgroundColor: isActive ? '#3b82f6' : '#f3f4f6',
      color: isActive ? '#ffffff' : '#000000',
      scale: isActive ? 1.05 : 1,
      duration: 0.2,
      ease: 'power2.out'
    });
  },

  // Range slider
  rangeSlider: (handle) => {
    return gsap.to(handle, {
      scale: 1.2,
      duration: 0.2,
      ease: 'power2.out'
    });
  },

  // Clear filters
  clearFilters: (filters) => {
    return gsap.to(filters, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'back.in(1.7)'
    });
  }
};

// Navigation Animations
export const navAnimations = {
  // Mobile menu toggle
  mobileMenuToggle: (menu, isOpen) => {
    const tl = gsap.timeline();
    if (isOpen) {
      tl.fromTo(
        menu,
        { x: '100%' },
        { x: 0, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      tl.to(menu, {
        x: '100%',
        duration: 0.3,
        ease: 'power3.in'
      });
    }
    return tl;
  },

  // Menu items cascade
  menuCascade: (items) => {
    return gsap.from(items, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out'
    });
  },

  // Submenu dropdown
  submenuDropdown: (submenu) => {
    return gsap.from(submenu, {
      opacity: 0,
      height: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  },

  // Active link underline
  activeLinkUnderline: (underline) => {
    return gsap.from(underline, {
      width: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
};

// Gallery Animations
export const galleryAnimations = {
  // Image grid entrance
  gridEntrance: (images) => {
    return gsap.from(images, {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.6,
      stagger: {
        amount: 0.8,
        grid: 'auto',
        from: 'start'
      },
      ease: 'power2.out'
    });
  },

  // Lightbox open
  lightboxOpen: (lightbox, image) => {
    const tl = gsap.timeline();
    tl.fromTo(
      lightbox,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    ).fromTo(
      image,
      { scale: 0.5, rotation: -15 },
      { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.1'
    );
    return tl;
  },

  // Image navigation
  imageNavigation: (direction) => {
    return {
      exit: (image) => gsap.to(image, {
        opacity: 0,
        x: direction === 'next' ? -100 : 100,
        duration: 0.3,
        ease: 'power2.in'
      }),
      enter: (image) => gsap.fromTo(
        image,
        { opacity: 0, x: direction === 'next' ? 100 : -100 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      )
    };
  }
};

// Rating Animations
export const ratingAnimations = {
  // Star fill animation
  starFill: (star, delay = 0) => {
    return gsap.fromTo(
      star,
      { scale: 0, rotation: -180 },
      { 
        scale: 1, 
        rotation: 0, 
        duration: 0.4, 
        delay,
        ease: 'back.out(2)' 
      }
    );
  },

  // Star hover
  starHover: (star) => {
    return gsap.to(star, {
      scale: 1.3,
      duration: 0.2,
      ease: 'power2.out'
    });
  },

  // Rating count increment
  countIncrement: (element, from, to) => {
    const obj = { value: from };
    return gsap.to(obj, {
      value: to,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.floor(obj.value);
      }
    });
  }
};

// Review Card Animations
export const reviewAnimations = {
  // Card entrance
  cardEntrance: (card, index) => {
    return gsap.from(card, {
      opacity: 0,
      y: 50,
      rotation: -5,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power2.out'
    });
  },

  // Expand review
  expandReview: (content) => {
    return gsap.to(content, {
      height: 'auto',
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  },

  // Like button animation
  likeButton: (button) => {
    const tl = gsap.timeline();
    tl.to(button, {
      scale: 1.3,
      duration: 0.15,
      ease: 'power2.out'
    }).to(button, {
      scale: 1,
      duration: 0.3,
      ease: 'elastic.out(1, 0.3)'
    });
    return tl;
  }
};

// Payment Animations
export const paymentAnimations = {
  // Card flip
  cardFlip: (card) => {
    return gsap.to(card, {
      rotateY: 180,
      duration: 0.6,
      ease: 'power2.inOut'
    });
  },

  // Processing animation
  processing: (element) => {
    return gsap.to(element, {
      opacity: [1, 0.5, 1],
      scale: [1, 1.05, 1],
      duration: 1.5,
      repeat: -1,
      ease: 'sine.inOut'
    });
  },

  // Success confetti
  successConfetti: (container) => {
    const confetti = [];
    for (let i = 0; i < 50; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      container.appendChild(piece);
      confetti.push(piece);
    }

    return gsap.to(confetti, {
      y: 'random(200, 400)',
      x: 'random(-200, 200)',
      rotation: 'random(-360, 360)',
      opacity: 0,
      duration: 2,
      stagger: 0.02,
      ease: 'power2.out'
    });
  }
};

// Notification Badge Animations
export const badgeAnimations = {
  // Pop in
  popIn: (badge) => {
    return gsap.from(badge, {
      scale: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)'
    });
  },

  // Pulse
  pulse: (badge) => {
    return gsap.to(badge, {
      scale: [1, 1.2, 1],
      duration: 0.6,
      repeat: 3,
      ease: 'sine.inOut'
    });
  },

  // Remove animation
  remove: (badge) => {
    return gsap.to(badge, {
      scale: 0,
      rotation: 360,
      duration: 0.4,
      ease: 'back.in(1.7)'
    });
  }
};

// Loading Skeleton Animations
export const skeletonAnimations = {
  // Shimmer effect
  shimmer: (skeleton) => {
    return gsap.to(skeleton, {
      backgroundPosition: '200% center',
      duration: 1.5,
      repeat: -1,
      ease: 'none'
    });
  },

  // Pulse effect
  pulse: (skeleton) => {
    return gsap.to(skeleton, {
      opacity: [0.5, 0.8, 0.5],
      duration: 1.5,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }
};

// Empty State Animations
export const emptyStateAnimations = {
  // Bounce in
  bounceIn: (container) => {
    return gsap.from(container, {
      opacity: 0,
      scale: 0.5,
      y: 100,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)'
    });
  },

  // Icon float
  iconFloat: (icon) => {
    return gsap.to(icon, {
      y: [-10, 10],
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
};

export default {
  courtCardAnimations,
  bookingFormAnimations,
  calendarAnimations,
  searchAnimations,
  filterAnimations,
  navAnimations,
  galleryAnimations,
  ratingAnimations,
  reviewAnimations,
  paymentAnimations,
  badgeAnimations,
  skeletonAnimations,
  emptyStateAnimations
};
