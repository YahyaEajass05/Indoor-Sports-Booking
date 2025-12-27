/**
 * Advanced Animation Utilities
 * Comprehensive animation helpers for the sports booking system
 */

// Framer Motion Variants
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -50,
    transition: { duration: 0.3 }
  }
};

export const slideDownVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: 50,
    transition: { duration: 0.3 }
  }
};

export const slideLeftVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: { duration: 0.3 }
  }
};

export const slideRightVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    x: 100,
    transition: { duration: 0.3 }
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4, 
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.3 }
  }
};

export const scaleOutVariants = {
  hidden: { opacity: 0, scale: 1.2 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    scale: 1.2,
    transition: { duration: 0.3 }
  }
};

export const rotateInVariants = {
  hidden: { opacity: 0, rotate: -180, scale: 0 },
  visible: { 
    opacity: 1, 
    rotate: 0, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  exit: { 
    opacity: 0, 
    rotate: 180, 
    scale: 0,
    transition: { duration: 0.5 }
  }
};

export const flipVariants = {
  hidden: { opacity: 0, rotateY: -180 },
  visible: { 
    opacity: 1, 
    rotateY: 0,
    transition: { duration: 0.8, ease: 'easeInOut' }
  },
  exit: { 
    opacity: 0, 
    rotateY: 180,
    transition: { duration: 0.5 }
  }
};

export const bounceInVariants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.3,
    transition: { duration: 0.3 }
  }
};

export const elasticInVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15
    }
  }
};

export const zoomInVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0,
    transition: { duration: 0.3 }
  }
};

// Stagger Children Animation
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

export const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Grid Animation
export const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const gridItemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

// Card Hover Effects
export const cardHoverVariants = {
  rest: { scale: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  hover: {
    scale: 1.03,
    boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  tap: { scale: 0.98 }
};

export const cardLiftVariants = {
  rest: { y: 0, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  hover: {
    y: -10,
    boxShadow: '0 30px 40px rgba(0,0,0,0.2)',
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

export const cardTiltVariants = {
  rest: { rotateX: 0, rotateY: 0 },
  hover: {
    rotateX: 5,
    rotateY: 5,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

// Button Animation Variants
export const buttonVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

export const buttonGlowVariants = {
  rest: { 
    boxShadow: '0 0 0 rgba(59, 130, 246, 0)' 
  },
  hover: { 
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
    transition: { duration: 0.3 }
  }
};

export const buttonRippleVariants = {
  initial: { scale: 0, opacity: 0.5 },
  animate: {
    scale: 2,
    opacity: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Modal/Dialog Variants
export const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const modalContentVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 50
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    y: 50,
    transition: { duration: 0.2 }
  }
};

export const drawerVariants = {
  hidden: { x: '100%' },
  visible: { 
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    x: '100%',
    transition: { duration: 0.3 }
  }
};

// Notification/Toast Variants
export const toastVariants = {
  hidden: { 
    opacity: 0, 
    y: -50,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  },
  exit: { 
    opacity: 0,
    x: 400,
    transition: { duration: 0.3 }
  }
};

// Dropdown Menu Variants
export const dropdownVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
    y: -10
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.1 }
  }
};

// Tab Animation Variants
export const tabContentVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    transition: { duration: 0.3 }
  })
};

// Scroll Animation Variants
export const scrollRevealVariants = {
  hidden: { 
    opacity: 0,
    y: 50
  },
  visible: (custom = 0) => ({ 
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

export const parallaxVariants = {
  initial: { y: 0 },
  scroll: (scrollY) => ({
    y: scrollY * 0.5,
    transition: { duration: 0 }
  })
};

// Loading Spinner Variants
export const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

export const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Skeleton Loading Variants
export const skeletonVariants = {
  animate: {
    backgroundColor: [
      'rgba(229, 231, 235, 0.4)',
      'rgba(229, 231, 235, 0.8)',
      'rgba(229, 231, 235, 0.4)'
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Counter Animation
export const counterVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
};

// Progress Bar Variants
export const progressBarVariants = {
  initial: { width: 0, opacity: 0 },
  animate: (progress) => ({
    width: `${progress}%`,
    opacity: 1,
    transition: {
      width: { duration: 0.5, ease: 'easeOut' },
      opacity: { duration: 0.3 }
    }
  })
};

// Accordion Variants
export const accordionVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: 'easeInOut' },
      opacity: { duration: 0.2, delay: 0.1 }
    }
  }
};

// Badge/Chip Variants
export const badgeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 20
    }
  }
};

// Image Gallery Variants
export const galleryItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

// Confetti Animation
export const confettiVariants = {
  initial: { y: -20, opacity: 0, rotate: 0 },
  animate: {
    y: '100vh',
    opacity: [0, 1, 1, 0],
    rotate: 360,
    transition: {
      duration: 3,
      ease: 'linear',
      repeat: Infinity
    }
  }
};

// Custom Easing Functions
export const customEasing = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.34, 1.56, 0.64, 1],
  sharp: [0.4, 0, 0.2, 1],
  soft: [0.25, 0.46, 0.45, 0.94]
};

// Spring Configurations
export const springConfigs = {
  gentle: { stiffness: 100, damping: 15 },
  bouncy: { stiffness: 400, damping: 10 },
  snappy: { stiffness: 300, damping: 25 },
  slow: { stiffness: 50, damping: 20 },
  wobbly: { stiffness: 180, damping: 12 }
};

// Gesture Configurations
export const dragConstraints = {
  top: -50,
  left: -50,
  right: 50,
  bottom: 50
};

// Utility Functions
export const getTransitionConfig = (type = 'default', duration = 0.3) => {
  const configs = {
    default: { duration, ease: 'easeInOut' },
    smooth: { duration, ease: customEasing.smooth },
    bounce: { type: 'spring', ...springConfigs.bouncy },
    elastic: { duration, ease: customEasing.elastic },
    spring: { type: 'spring', ...springConfigs.gentle }
  };
  return configs[type] || configs.default;
};

export const generateStaggerVariants = (baseVariants, staggerTime = 0.1, delayTime = 0) => ({
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerTime,
        delayChildren: delayTime
      }
    }
  },
  item: baseVariants
});

export const createScrollAnimation = (yOffset = 50, duration = 0.6) => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: 'easeOut' }
  }
});

export const createHoverScale = (scale = 1.05, duration = 0.2) => ({
  rest: { scale: 1 },
  hover: { scale, transition: { duration } },
  tap: { scale: 0.95 }
});

// Advanced Keyframe Animations
export const complexAnimations = {
  morphing: {
    borderRadius: ['30%', '60%', '40%', '30%'],
    rotate: [0, 90, 180, 270, 360],
    scale: [1, 1.1, 0.9, 1.05, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  floating: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  breathing: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  glitching: {
    x: [0, -5, 5, -3, 3, 0],
    skewX: [0, -5, 5, -3, 3, 0],
    opacity: [1, 0.8, 1, 0.9, 1],
    transition: {
      duration: 0.3,
      repeat: 3,
      repeatDelay: 1
    }
  }
};

// Export all as default object
export default {
  fadeInVariants,
  slideUpVariants,
  slideDownVariants,
  slideLeftVariants,
  slideRightVariants,
  scaleInVariants,
  scaleOutVariants,
  rotateInVariants,
  flipVariants,
  bounceInVariants,
  elasticInVariants,
  zoomInVariants,
  containerVariants,
  childVariants,
  gridContainerVariants,
  gridItemVariants,
  cardHoverVariants,
  cardLiftVariants,
  cardTiltVariants,
  buttonVariants,
  buttonGlowVariants,
  buttonRippleVariants,
  modalOverlayVariants,
  modalContentVariants,
  drawerVariants,
  toastVariants,
  dropdownVariants,
  tabContentVariants,
  scrollRevealVariants,
  parallaxVariants,
  spinnerVariants,
  pulseVariants,
  skeletonVariants,
  counterVariants,
  progressBarVariants,
  accordionVariants,
  badgeVariants,
  galleryItemVariants,
  confettiVariants,
  customEasing,
  springConfigs,
  dragConstraints,
  getTransitionConfig,
  generateStaggerVariants,
  createScrollAnimation,
  createHoverScale,
  complexAnimations
};
