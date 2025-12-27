/**
 * Page Transition Animations
 * Advanced page transition effects for route changes
 */

import { gsap } from 'gsap';

// Fade Transitions
export const fadeTransitions = {
  // Simple fade
  fade: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    },
    exit: (element) => {
      return gsap.to(element, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  },

  // Fade with scale
  fadeScale: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
    },
    exit: (element) => {
      return gsap.to(element, {
        opacity: 0,
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  },

  // Cross fade
  crossFade: {
    concurrent: (exitElement, enterElement) => {
      const tl = gsap.timeline();
      tl.to(exitElement, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      }).fromTo(
        enterElement,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.inOut' },
        '-=0.2'
      );
      return tl;
    }
  }
};

// Slide Transitions
export const slideTransitions = {
  // Slide left
  slideLeft: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { x: '100%' },
        { x: 0, duration: 0.5, ease: 'power3.out' }
      );
    },
    exit: (element) => {
      return gsap.to(element, {
        x: '-100%',
        duration: 0.5,
        ease: 'power3.in'
      });
    }
  },

  // Slide right
  slideRight: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { x: '-100%' },
        { x: 0, duration: 0.5, ease: 'power3.out' }
      );
    },
    exit: (element) => {
      return gsap.to(element, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.in'
      });
    }
  },

  // Slide up
  slideUp: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { y: '100%' },
        { y: 0, duration: 0.6, ease: 'power3.out' }
      );
    },
    exit: (element) => {
      return gsap.to(element, {
        y: '-100%',
        duration: 0.6,
        ease: 'power3.in'
      });
    }
  },

  // Slide down
  slideDown: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { y: '-100%' },
        { y: 0, duration: 0.6, ease: 'power3.out' }
      );
    },
    exit: (element) => {
      return gsap.to(element, {
        y: '100%',
        duration: 0.6,
        ease: 'power3.in'
      });
    }
  }
};

// Reveal Transitions
export const revealTransitions = {
  // Wipe left
  wipeLeft: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0 0 0)', duration: 0.7, ease: 'power2.inOut' }
      );
    },
    exit: (element) => {
      return gsap.to(element, {
        clipPath: 'inset(0 0 0 100%)',
        duration: 0.7,
        ease: 'power2.inOut'
      });
    }
  },

  // Wipe right
  wipeRight: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { clipPath: 'inset(0 0 0 100%)' },
        { clipPath: 'inset(0 0 0 0)', duration: 0.7, ease: 'power2.inOut' }
      );
    },
    exit: (element) => {
      return gsap.to(element, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.7,
        ease: 'power2.inOut'
      });
    }
  },

  // Circular reveal
  circular: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { clipPath: 'circle(0% at 50% 50%)' },
        { clipPath: 'circle(150% at 50% 50%)', duration: 0.8, ease: 'power2.out' }
      );
    },
    exit: (element) => {
      return gsap.to(element, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 0.8,
        ease: 'power2.in'
      });
    }
  }
};

// Zoom Transitions
export const zoomTransitions = {
  // Zoom in
  zoomIn: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
    },
    exit: (element) => {
      return gsap.to(element, {
        opacity: 0,
        scale: 1.5,
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  },

  // Zoom out
  zoomOut: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { opacity: 0, scale: 1.5 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
    },
    exit: (element) => {
      return gsap.to(element, {
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }
};

// Rotate Transitions
export const rotateTransitions = {
  // Rotate in
  rotateIn: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { opacity: 0, rotation: -90, scale: 0.5 },
        { opacity: 1, rotation: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)' }
      );
    },
    exit: (element) => {
      return gsap.to(element, {
        opacity: 0,
        rotation: 90,
        scale: 0.5,
        duration: 0.5,
        ease: 'power2.in'
      });
    }
  },

  // Flip
  flip: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { opacity: 0, rotateY: 90, transformPerspective: 1000 },
        { opacity: 1, rotateY: 0, duration: 0.8, ease: 'power2.out' }
      );
    },
    exit: (element) => {
      return gsap.to(element, {
        opacity: 0,
        rotateY: -90,
        transformPerspective: 1000,
        duration: 0.8,
        ease: 'power2.in'
      });
    }
  }
};

// Split Screen Transitions
export const splitTransitions = {
  // Vertical split
  verticalSplit: {
    enter: (element) => {
      const leftHalf = element.querySelector('.left-half');
      const rightHalf = element.querySelector('.right-half');
      const tl = gsap.timeline();
      
      tl.fromTo(
        leftHalf,
        { x: '-100%' },
        { x: 0, duration: 0.6, ease: 'power3.out' }
      ).fromTo(
        rightHalf,
        { x: '100%' },
        { x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.6'
      );
      
      return tl;
    }
  },

  // Horizontal split
  horizontalSplit: {
    enter: (element) => {
      const topHalf = element.querySelector('.top-half');
      const bottomHalf = element.querySelector('.bottom-half');
      const tl = gsap.timeline();
      
      tl.fromTo(
        topHalf,
        { y: '-100%' },
        { y: 0, duration: 0.6, ease: 'power3.out' }
      ).fromTo(
        bottomHalf,
        { y: '100%' },
        { y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.6'
      );
      
      return tl;
    }
  }
};

// Curtain Transitions
export const curtainTransitions = {
  // Curtain open
  curtainOpen: {
    enter: (element) => {
      const leftCurtain = element.querySelector('.left-curtain');
      const rightCurtain = element.querySelector('.right-curtain');
      const content = element.querySelector('.content');
      const tl = gsap.timeline();
      
      tl.set(content, { opacity: 0 })
        .to([leftCurtain, rightCurtain], {
          scaleX: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          stagger: 0.1
        })
        .to(content, { opacity: 1, duration: 0.3 }, '-=0.3');
      
      return tl;
    }
  }
};

// Glitch Transitions
export const glitchTransitions = {
  // Digital glitch
  glitch: {
    enter: (element) => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { opacity: 0, x: 0 },
        { opacity: 1, duration: 0.1 }
      );
      
      // Create glitch effect
      for (let i = 0; i < 5; i++) {
        tl.to(element, {
          x: Math.random() * 10 - 5,
          duration: 0.05,
          ease: 'none'
        });
      }
      
      tl.to(element, { x: 0, duration: 0.05 });
      return tl;
    }
  }
};

// Liquid Transitions
export const liquidTransitions = {
  // Wave transition
  wave: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { 
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          y: 50
        },
        { 
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          y: 0,
          duration: 1,
          ease: 'power2.out'
        }
      );
    }
  }
};

// 3D Transitions
export const threeDTransitions = {
  // Cube rotate
  cubeRotate: {
    concurrent: (exitElement, enterElement) => {
      const tl = gsap.timeline();
      
      tl.set([exitElement, enterElement], {
        transformStyle: 'preserve-3d',
        transformPerspective: 1000
      });
      
      tl.to(exitElement, {
        rotateY: -90,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      }).fromTo(
        enterElement,
        { rotateY: 90, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 0.6, ease: 'power2.inOut' },
        '-=0.3'
      );
      
      return tl;
    }
  },

  // Door swing
  doorSwing: {
    enter: (element) => {
      return gsap.fromTo(
        element,
        { 
          rotateY: -90,
          transformOrigin: 'left',
          transformPerspective: 1000
        },
        { 
          rotateY: 0,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    }
  }
};

// Particle Transitions
export const particleTransitions = {
  // Dissolve effect
  dissolve: {
    exit: (element) => {
      const tl = gsap.timeline();
      tl.to(element, {
        opacity: 0,
        scale: 0.8,
        filter: 'blur(10px)',
        duration: 0.6,
        ease: 'power2.in'
      });
      return tl;
    },
    enter: (element) => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { opacity: 0, scale: 1.2, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }
      );
      return tl;
    }
  }
};

// Stagger Content Transitions
export const staggerTransitions = {
  // Stagger fade in
  staggerFadeIn: (elements) => {
    return gsap.from(elements, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
  },

  // Cascade from sides
  cascadeSides: (leftElements, rightElements) => {
    const tl = gsap.timeline();
    tl.from(leftElements, {
      opacity: 0,
      x: -100,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    }).from(
      rightElements,
      {
        opacity: 0,
        x: 100,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      },
      '-=0.4'
    );
    return tl;
  }
};

// Framer Motion Page Variants (for React Router)
export const pageVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
  },
  
  slideLeft: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  
  slideUp: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  
  scaleRotate: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 180 },
    transition: { duration: 0.5 }
  }
};

export default {
  fadeTransitions,
  slideTransitions,
  revealTransitions,
  zoomTransitions,
  rotateTransitions,
  splitTransitions,
  curtainTransitions,
  glitchTransitions,
  liquidTransitions,
  threeDTransitions,
  particleTransitions,
  staggerTransitions,
  pageVariants
};
