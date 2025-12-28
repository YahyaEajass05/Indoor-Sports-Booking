// Advanced animation utilities for layout components
import { useEffect, useRef, useState } from 'react';

/**
 * Particle System for Background Effects
 */
export class ParticleSystem {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.options = {
      count: options.count || 50,
      color: options.color || 'rgba(59, 130, 246, 0.5)',
      maxSize: options.maxSize || 4,
      minSize: options.minSize || 1,
      speed: options.speed || 0.5,
      connections: options.connections !== false,
      connectionDistance: options.connectionDistance || 150,
    };
    
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.options.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        size: Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize,
      });
    }
  }

  update() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary check
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections
    if (this.options.connections) {
      this.particles.forEach((p1, i) => {
        this.particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.options.connectionDistance) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / this.options.connectionDistance)})`;
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
          }
        });
      });
    }

    // Draw particles
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.options.color;
      this.ctx.fill();
    });
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

/**
 * Mouse Follow Effect
 */
export const useMouseFollow = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const { intensity = 20, smooth = 0.1 } = options;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX = (e.clientX - centerX) / rect.width * intensity;
      mouseY = (e.clientY - centerY) / rect.height * intensity;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * smooth;
      currentY += (mouseY - currentY) * smooth;
      
      element.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref, options]);
};

/**
 * Parallax Scroll Effect
 */
export const useParallaxScroll = (ref, speed = 0.5) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      element.style.transform = `translate3d(0, ${rate}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);
};

/**
 * Intersection Observer Animation
 */
export const useIntersectionAnimation = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const {
      threshold = 0.1,
      rootMargin = '0px',
      animationClass = 'animate-fade-in-up',
    } = options;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            if (options.once !== false) {
              observer.unobserve(entry.target);
            }
          } else if (options.once === false) {
            entry.target.classList.remove(animationClass);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);
};

/**
 * Ripple Effect Generator
 */
export const createRipple = (event, element) => {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add('ripple');

  element.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
};

/**
 * Typing Animation Effect
 */
export const useTypingEffect = (text, speed = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};

/**
 * Smooth Scroll to Element
 */
export const smoothScrollTo = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  const animation = (currentTime) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

/**
 * Magnetic Button Effect
 */
export const useMagneticEffect = (ref, strength = 0.3) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let bounds;

    const handleMouseEnter = () => {
      bounds = element.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
      if (!bounds) return;

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
      bounds = null;
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength]);
};

/**
 * 3D Tilt Effect
 */
export const use3DTilt = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const { maxTilt = 15, perspective = 1000, scale = 1.05 } = options;

    element.style.transformStyle = 'preserve-3d';
    element.style.perspective = `${perspective}px`;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * maxTilt;
      const rotateY = ((centerX - x) / centerX) * maxTilt;

      element.style.transform = `
        perspective(${perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;
    };

    const handleMouseLeave = () => {
      element.style.transform = `
        perspective(${perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, options]);
};

/**
 * Stagger Animation Helper
 */
export const staggerAnimation = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  },
};

/**
 * Page Transition Variants
 */
export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Scroll Progress Indicator
 */
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.pageYOffset / scrollHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return scrollProgress;
};

/**
 * Cursor Trail Effect
 */
export class CursorTrail {
  constructor(options = {}) {
    this.trail = [];
    this.maxLength = options.maxLength || 20;
    this.color = options.color || 'rgba(59, 130, 246, 0.5)';
    this.size = options.size || 5;
    
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    
    document.body.appendChild(this.canvas);
    this.resize();
    
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.addPoint(e.clientX, e.clientY));
    
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  addPoint(x, y) {
    this.trail.push({ x, y, life: 1 });
    if (this.trail.length > this.maxLength) {
      this.trail.shift();
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.trail.forEach((point, index) => {
      point.life -= 0.05;
      const size = this.size * point.life;
      const alpha = point.life;
      
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color.replace('0.5', alpha.toString());
      this.ctx.fill();
    });
    
    this.trail = this.trail.filter(point => point.life > 0);
    
    requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.canvas.remove();
  }
}

/**
 * Glitch Effect
 */
export const useGlitchEffect = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const { duration = 200, intensity = 5 } = options;
    let isGlitching = false;

    const glitch = () => {
      if (isGlitching) return;
      isGlitching = true;

      const originalText = element.textContent;
      const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
      let iterations = 0;

      const interval = setInterval(() => {
        element.textContent = originalText
          .split('')
          .map((char, index) => {
            if (index < iterations) return originalText[index];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('');

        iterations += 1 / 3;

        if (iterations >= originalText.length) {
          clearInterval(interval);
          element.textContent = originalText;
          isGlitching = false;
        }
      }, 30);
    };

    element.addEventListener('mouseenter', glitch);

    return () => {
      element.removeEventListener('mouseenter', glitch);
    };
  }, [ref, options]);
};

/**
 * Number Counter Animation
 */
export const useCounterAnimation = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
};

export default {
  ParticleSystem,
  useMouseFollow,
  useParallaxScroll,
  useIntersectionAnimation,
  createRipple,
  useTypingEffect,
  smoothScrollTo,
  useMagneticEffect,
  use3DTilt,
  staggerAnimation,
  pageTransitionVariants,
  useScrollProgress,
  CursorTrail,
  useGlitchEffect,
  useCounterAnimation,
};
