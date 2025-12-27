/**
 * Particle Effects & Background Animations
 * Advanced particle systems and background effects
 */

// Particle configuration for booking success
export const bookingSuccessParticles = {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'] },
    shape: { type: 'circle' },
    opacity: {
      value: 0.8,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0, sync: false }
    },
    size: {
      value: 5,
      random: true,
      anim: { enable: true, speed: 5, size_min: 0.1, sync: false }
    },
    line_linked: { enable: false },
    move: {
      enable: true,
      speed: 6,
      direction: 'top',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: false },
      onclick: { enable: false },
      resize: true
    }
  },
  retina_detect: true
};

// Floating particles for hero section
export const heroParticles = {
  particles: {
    number: { value: 50, density: { enable: true, value_area: 1000 } },
    color: { value: '#3b82f6' },
    shape: { type: ['circle', 'triangle'] },
    opacity: {
      value: 0.3,
      random: true,
      anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#3b82f6',
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      grab: { distance: 200, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
};

// Network effect for dashboard
export const networkParticles = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#64748b' },
    shape: { type: 'circle' },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: true, speed: 1, opacity_min: 0.2, sync: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#94a3b8',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: { enable: true, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'bubble' },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      bubble: { distance: 250, size: 6, duration: 2, opacity: 0.8 }
    }
  },
  retina_detect: true
};

// Snow effect for seasonal themes
export const snowEffect = {
  particles: {
    number: { value: 150, density: { enable: true, value_area: 800 } },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: {
      value: 0.8,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 4,
      random: true,
      anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
    },
    line_linked: { enable: false },
    move: {
      enable: true,
      speed: 2,
      direction: 'bottom',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'bubble' },
      onclick: { enable: false },
      resize: true
    },
    modes: {
      bubble: { distance: 100, size: 8, duration: 2, opacity: 0.8 }
    }
  },
  retina_detect: true
};

// Stars background effect
export const starsEffect = {
  particles: {
    number: { value: 200, density: { enable: true, value_area: 800 } },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: {
      value: 1,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0, sync: false }
    },
    size: {
      value: 2,
      random: true,
      anim: { enable: true, speed: 2, size_min: 0, sync: false }
    },
    line_linked: { enable: false },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: false },
      onclick: { enable: false },
      resize: true
    }
  },
  retina_detect: true
};

// Bubble effect
export const bubbleEffect = {
  particles: {
    number: { value: 30, density: { enable: true, value_area: 800 } },
    color: { value: ['#3b82f6', '#8b5cf6', '#ec4899'] },
    shape: { type: 'circle' },
    opacity: {
      value: 0.4,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 40,
      random: true,
      anim: { enable: true, speed: 5, size_min: 10, sync: false }
    },
    line_linked: { enable: false },
    move: {
      enable: true,
      speed: 3,
      direction: 'top',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'bubble' },
      onclick: { enable: true, mode: 'repulse' },
      resize: true
    },
    modes: {
      bubble: { distance: 200, size: 60, duration: 2, opacity: 0.6 },
      repulse: { distance: 150, duration: 0.4 }
    }
  },
  retina_detect: true
};

// Fireflies effect
export const firefliesEffect = {
  particles: {
    number: { value: 50, density: { enable: true, value_area: 800 } },
    color: { value: '#fbbf24' },
    shape: { type: 'circle' },
    opacity: {
      value: 0.8,
      random: true,
      anim: { enable: true, speed: 3, opacity_min: 0, sync: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: true, speed: 5, size_min: 0.5, sync: false }
    },
    line_linked: { enable: false },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'bounce',
      bounce: true
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'bubble' },
      onclick: { enable: false },
      resize: true
    },
    modes: {
      bubble: { distance: 100, size: 6, duration: 2, opacity: 1 }
    }
  },
  retina_detect: true
};

// Matrix rain effect
export const matrixRainEffect = {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: '#00ff00' },
    shape: { type: 'char', character: { value: ['0', '1'], font: 'Courier', style: '', weight: '400' } },
    opacity: {
      value: 0.8,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0, sync: false }
    },
    size: {
      value: 16,
      random: true
    },
    line_linked: { enable: false },
    move: {
      enable: true,
      speed: 10,
      direction: 'bottom',
      random: false,
      straight: true,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: false },
      onclick: { enable: false },
      resize: true
    }
  },
  retina_detect: true
};

export default {
  bookingSuccessParticles,
  heroParticles,
  networkParticles,
  snowEffect,
  starsEffect,
  bubbleEffect,
  firefliesEffect,
  matrixRainEffect
};
