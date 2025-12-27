/**
 * Modal & Dialog Animations
 * Advanced animations for modals, dialogs, and overlays
 */

import { gsap } from 'gsap';

// Modal Entrance Animations
export const modalEntranceAnimations = {
  // Fade with scale
  fadeScale: (modal, overlay) => {
    const tl = gsap.timeline();
    tl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    ).fromTo(
      modal,
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' },
      '-=0.2'
    );
    return tl;
  },

  // Slide from bottom
  slideBottom: (modal, overlay) => {
    const tl = gsap.timeline();
    tl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    ).fromTo(
      modal,
      { y: '100%' },
      { y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.1'
    );
    return tl;
  },

  // Zoom in
  zoomIn: (modal, overlay) => {
    const tl = gsap.timeline();
    tl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.25 }
    ).fromTo(
      modal,
      { scale: 0, rotation: -15 },
      { 
        scale: 1, 
        rotation: 0, 
        duration: 0.6, 
        ease: 'elastic.out(1, 0.8)' 
      },
      '-=0.1'
    );
    return tl;
  },

  // Flip entrance
  flip: (modal, overlay) => {
    const tl = gsap.timeline();
    tl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    ).fromTo(
      modal,
      { opacity: 0, rotateX: -90, transformPerspective: 1000 },
      { 
        opacity: 1, 
        rotateX: 0, 
        duration: 0.7, 
        ease: 'power2.out' 
      },
      '-=0.15'
    );
    return tl;
  },

  // Newspaper entrance
  newspaper: (modal, overlay) => {
    const tl = gsap.timeline();
    tl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    ).fromTo(
      modal,
      { 
        opacity: 0, 
        scale: 0, 
        rotation: 720 
      },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        duration: 0.8, 
        ease: 'power2.out' 
      },
      '-=0.1'
    );
    return tl;
  },

  // Blur entrance
  blur: (modal, overlay) => {
    const tl = gsap.timeline();
    tl.fromTo(
      overlay,
      { opacity: 0, backdropFilter: 'blur(0px)' },
      { opacity: 1, backdropFilter: 'blur(10px)', duration: 0.4 }
    ).fromTo(
      modal,
      { opacity: 0, scale: 1.2, filter: 'blur(20px)' },
      { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)', 
        duration: 0.5, 
        ease: 'power2.out' 
      },
      '-=0.25'
    );
    return tl;
  }
};

// Modal Exit Animations
export const modalExitAnimations = {
  // Fade out with scale
  fadeScale: (modal, overlay) => {
    const tl = gsap.timeline();
    tl.to(modal, {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.3,
      ease: 'power2.in'
    }).to(
      overlay,
      { opacity: 0, duration: 0.2 },
      '-=0.1'
    );
    return tl;
  },

  // Slide to bottom
  slideBottom: (modal, overlay) => {
    const tl = gsap.timeline();
    tl.to(modal, {
      y: '100%',
      duration: 0.4,
      ease: 'power3.in'
    }).to(
      overlay,
      { opacity: 0, duration: 0.2 },
      '-=0.2'
    );
    return tl;
  },

  // Zoom out
  zoomOut: (modal, overlay) => {
    const tl = gsap.timeline();
    tl.to(modal, {
      scale: 0,
      rotation: 15,
      duration: 0.4,
      ease: 'back.in(1.7)'
    }).to(
      overlay,
      { opacity: 0, duration: 0.2 },
      '-=0.2'
    );
    return tl;
  }
};

// Drawer Animations
export const drawerAnimations = {
  // Slide from right
  slideRight: (drawer) => {
    return gsap.fromTo(
      drawer,
      { x: '100%' },
      { x: 0, duration: 0.4, ease: 'power3.out' }
    );
  },

  // Slide from left
  slideLeft: (drawer) => {
    return gsap.fromTo(
      drawer,
      { x: '-100%' },
      { x: 0, duration: 0.4, ease: 'power3.out' }
    );
  }
};

// Toast/Snackbar Animations
export const toastAnimations = {
  // Slide in from top
  slideTop: (toast) => {
    return gsap.fromTo(
      toast,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  },

  // Bounce in
  bounceIn: (toast) => {
    return gsap.fromTo(
      toast,
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.6, 
        ease: 'elastic.out(1, 0.5)' 
      }
    );
  }
};

// Dropdown Menu Animations
export const dropdownAnimations = {
  // Expand from top
  expandTop: (menu) => {
    return gsap.fromTo(
      menu,
      { 
        height: 0, 
        opacity: 0, 
        transformOrigin: 'top' 
      },
      { 
        height: 'auto', 
        opacity: 1, 
        duration: 0.3, 
        ease: 'power2.out' 
      }
    );
  },

  // Fade with slide
  fadeSlide: (items) => {
    return gsap.from(items, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.out'
    });
  }
};

// Tooltip Animations
export const tooltipAnimations = {
  // Fade in
  fadeIn: (tooltip) => {
    return gsap.fromTo(
      tooltip,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' }
    );
  },

  // Pop in
  popIn: (tooltip) => {
    return gsap.fromTo(
      tooltip,
      { scale: 0, transformOrigin: 'bottom' },
      { scale: 1, duration: 0.3, ease: 'back.out(2)' }
    );
  }
};

// Popover Animations
export const popoverAnimations = {
  // Scale in
  scaleIn: (popover) => {
    return gsap.fromTo(
      popover,
      { scale: 0, opacity: 0, transformOrigin: 'top left' },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
    );
  }
};

// Confirmation Dialog Animations
export const confirmDialogAnimations = {
  // Shake for attention
  shake: (dialog) => {
    return gsap.to(dialog, {
      x: [-10, 10, -10, 10, 0],
      duration: 0.5,
      ease: 'power2.inOut'
    });
  },

  // Button pulse
  buttonPulse: (button) => {
    return gsap.to(button, {
      scale: [1, 1.1, 1],
      duration: 0.5,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }
};

export default {
  modalEntranceAnimations,
  modalExitAnimations,
  drawerAnimations,
  toastAnimations,
  dropdownAnimations,
  tooltipAnimations,
  popoverAnimations,
  confirmDialogAnimations
};
