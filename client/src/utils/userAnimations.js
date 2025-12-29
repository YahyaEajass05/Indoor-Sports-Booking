/**
 * Advanced User-Specific Animation Utilities
 * Provides comprehensive animation configurations for user dashboard components
 */

import { keyframes } from 'framer-motion';

// ==================== PAGE TRANSITIONS ====================

export const userPageTransitions = {
  fadeSlide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  fadeScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  }
};

// ==================== CARD ANIMATIONS ====================

export const cardAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  },
  hover: {
    scale: 1.05,
    y: -8,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

// ==================== STAT CARD ANIMATIONS ====================

export const statCardAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  },
  card: {
    hidden: { opacity: 0, scale: 0.8, rotateY: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    }
  },
  hover: {
    scale: 1.05,
    y: -10,
    rotateY: 5,
    boxShadow: '0 25px 50px rgba(59, 130, 246, 0.3)',
    transition: { duration: 0.3 }
  },
  iconFloat: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  counterUp: (value) => ({
    from: 0,
    to: value,
    duration: 1.5,
    ease: 'easeOut'
  })
};

// ==================== TABLE ANIMATIONS ====================

export const tableAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  },
  row: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.2 }
    }
  },
  rowHover: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    scale: 1.01,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.2 }
  },
  cellSlide: {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  }
};

// ==================== MODAL ANIMATIONS ====================

export const modalAnimations = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, delay: 0.1 }
    }
  },
  modal: {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
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
  },
  slideFromBottom: {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      y: 100,
      transition: { duration: 0.2 }
    }
  }
};

// ==================== BUTTON ANIMATIONS ====================

export const buttonAnimations = {
  primary: {
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  },
  secondary: {
    hover: {
      scale: 1.02,
      backgroundColor: 'rgba(243, 244, 246, 1)',
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },
  icon: {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.9,
      rotate: -5,
      transition: { duration: 0.1 }
    }
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// ==================== BADGE ANIMATIONS ====================

export const badgeAnimations = {
  fadeIn: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 25
      }
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  },
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// ==================== FORM ANIMATIONS ====================

export const formAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  field: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  },
  fieldFocus: {
    scale: 1.02,
    borderColor: 'rgb(59, 130, 246)',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    transition: { duration: 0.2 }
  },
  errorShake: {
    x: [-10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  }
};

// ==================== LIST ANIMATIONS ====================

export const listAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  },
  item: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  },
  exit: {
    opacity: 0,
    x: -100,
    height: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

// ==================== NOTIFICATION ANIMATIONS ====================

export const notificationAnimations = {
  slideIn: {
    hidden: { opacity: 0, x: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  },
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 0.5,
      repeat: 2,
      ease: 'easeInOut'
    }
  },
  progress: {
    scaleX: [1, 0],
    transition: {
      duration: 5,
      ease: 'linear'
    }
  }
};

// ==================== AVATAR ANIMATIONS ====================

export const avatarAnimations = {
  hover: {
    scale: 1.1,
    rotate: 5,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.3 }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  glow: {
    boxShadow: [
      '0 0 20px rgba(59, 130, 246, 0.5)',
      '0 0 40px rgba(59, 130, 246, 0.8)',
      '0 0 20px rgba(59, 130, 246, 0.5)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// ==================== CHART ANIMATIONS ====================

export const chartAnimations = {
  bar: {
    hidden: { scaleY: 0, opacity: 0 },
    visible: (i) => ({
      scaleY: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  },
  line: {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut'
      }
    }
  },
  pie: {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  }
};

// ==================== SKELETON LOADING ANIMATIONS ====================

export const skeletonAnimations = {
  pulse: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  shimmer: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear'
    }
  },
  wave: {
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// ==================== PAYMENT CARD ANIMATIONS ====================

export const paymentCardAnimations = {
  flip: {
    hidden: { rotateY: -90, opacity: 0 },
    visible: {
      rotateY: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    }
  },
  hover: {
    scale: 1.05,
    y: -10,
    rotateY: 5,
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    transition: { duration: 0.3 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  },
  chipAnimation: {
    rotate: [0, 360],
    transition: { duration: 0.6 }
  }
};

// ==================== BOOKING CARD ANIMATIONS ====================

export const bookingCardAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  },
  card: {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  },
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.3 }
  },
  statusPulse: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// ==================== SAVED COURT ANIMATIONS ====================

export const savedCourtAnimations = {
  grid: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  },
  card: {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: -100,
      transition: { duration: 0.3 }
    }
  },
  imageHover: {
    scale: 1.1,
    transition: { duration: 0.4 }
  },
  heartBeat: {
    scale: [1, 1.3, 1],
    transition: {
      duration: 0.5,
      repeat: 2,
      ease: 'easeInOut'
    }
  }
};

// ==================== PROFILE ANIMATIONS ====================

export const profileAnimations = {
  headerReveal: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  },
  avatarUpload: {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 25
      }
    }
  },
  badgePopIn: {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.3,
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }
  },
  tabSwitch: {
    enter: {
      opacity: 0,
      x: 20
    },
    center: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: -20
    }
  }
};

// ==================== DASHBOARD WIDGETS ====================

export const dashboardWidgetAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  widget: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.3 }
  }
};

// ==================== SEARCH AND FILTER ANIMATIONS ====================

export const searchFilterAnimations = {
  expand: {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, delay: 0.1 },
        opacity: { duration: 0.2 }
      }
    }
  },
  filterChip: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 20
      }
    }
  }
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Create stagger animation with custom delay
 */
export const createStaggerAnimation = (staggerDelay = 0.1, childDelay = 0) => ({
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  }
});

/**
 * Create sequential reveal animation
 */
export const createSequentialReveal = (totalItems, duration = 0.5) => {
  return Array.from({ length: totalItems }, (_, i) => ({
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: i * (duration / totalItems),
        duration: 0.3
      }
    }
  }));
};

/**
 * Create spring animation with custom config
 */
export const createSpringAnimation = (stiffness = 300, damping = 24) => ({
  type: 'spring',
  stiffness,
  damping
});

/**
 * Create count-up animation
 */
export const createCountUpAnimation = (start, end, duration = 1.5) => ({
  from: start,
  to: end,
  duration,
  ease: 'easeOut'
});

/**
 * Floating animation generator
 */
export const createFloatingAnimation = (distance = 10, duration = 3) => ({
  y: [0, -distance, 0],
  transition: {
    duration,
    repeat: Infinity,
    ease: 'easeInOut'
  }
});

/**
 * Rotating animation generator
 */
export const createRotatingAnimation = (degrees = 360, duration = 2) => ({
  rotate: [0, degrees],
  transition: {
    duration,
    repeat: Infinity,
    ease: 'linear'
  }
});

// ==================== PRESET COMBINATIONS ====================

export const presetAnimations = {
  quickAction: {
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  },
  statCounter: {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 20
      }
    }
  },
  notification: {
    initial: { x: 100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }
};

export default {
  userPageTransitions,
  cardAnimations,
  statCardAnimations,
  tableAnimations,
  modalAnimations,
  buttonAnimations,
  badgeAnimations,
  formAnimations,
  listAnimations,
  notificationAnimations,
  avatarAnimations,
  chartAnimations,
  skeletonAnimations,
  paymentCardAnimations,
  bookingCardAnimations,
  savedCourtAnimations,
  profileAnimations,
  dashboardWidgetAnimations,
  searchFilterAnimations,
  createStaggerAnimation,
  createSequentialReveal,
  createSpringAnimation,
  createCountUpAnimation,
  createFloatingAnimation,
  createRotatingAnimation,
  presetAnimations
};
