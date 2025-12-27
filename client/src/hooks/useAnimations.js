/**
 * Custom Animation Hooks
 * Advanced React hooks for animations
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Hook for scroll-triggered animations
 */
export const useScrollAnimation = (options = {}) => {
  const { threshold = 0.1, triggerOnce = true, rootMargin = '0px' } = options;
  
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin
  });

  return [ref, inView];
};

/**
 * Hook for staggered animations
 */
export const useStaggerAnimation = (itemCount, delay = 100) => {
  const [animatedItems, setAnimatedItems] = useState([]);

  useEffect(() => {
    const timers = [];
    for (let i = 0; i < itemCount; i++) {
      const timer = setTimeout(() => {
        setAnimatedItems(prev => [...prev, i]);
      }, i * delay);
      timers.push(timer);
    }

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [itemCount, delay]);

  return animatedItems;
};

/**
 * Hook for mouse parallax effect
 */
export const useMouseParallax = (strength = 20) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / strength;
      const deltaY = (e.clientY - centerY) / strength;

      setPosition({ x: deltaX, y: deltaY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return [elementRef, position];
};

/**
 * Hook for scroll progress
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
};

/**
 * Hook for typing animation
 */
export const useTypingAnimation = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText('');
    setIsComplete(false);

    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
};

/**
 * Hook for counter animation
 */
export const useCounterAnimation = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = useCallback(() => {
    setIsAnimating(true);
    const startTime = Date.now();
    const range = end - start;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuad = progress * (2 - progress);
      const current = Math.floor(start + range * easeOutQuad);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(updateCount);
  }, [start, end, duration]);

  return { count, animate, isAnimating };
};

/**
 * Hook for element visibility detection
 */
export const useElementVisibility = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: options.threshold || 0.1 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options.threshold]);

  return [elementRef, isVisible];
};

/**
 * Hook for hover animation state
 */
export const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return [elementRef, isHovered];
};

/**
 * Hook for smooth value transitions
 */
export const useSmoothValue = (targetValue, duration = 300) => {
  const [currentValue, setCurrentValue] = useState(targetValue);

  useEffect(() => {
    const startValue = currentValue;
    const startTime = Date.now();
    const valueRange = targetValue - startValue;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeInOut = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      setCurrentValue(startValue + valueRange * easeInOut);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, duration]);

  return currentValue;
};

/**
 * Hook for ripple effect
 */
export const useRipple = () => {
  const [ripples, setRipples] = useState([]);

  const addRipple = useCallback((event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  }, []);

  return { ripples, addRipple };
};

/**
 * Hook for auto-animation cleanup
 */
export const useAutoAnimate = (ref) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Auto-animate on mount
    element.style.animation = 'fadeIn 0.5s ease-in-out';

    return () => {
      // Cleanup on unmount
      element.style.animation = '';
    };
  }, [ref]);
};

/**
 * Hook for page transition state
 */
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 500);
  }, []);

  return { isTransitioning, startTransition };
};

/**
 * Hook for carousel/slider animations
 */
export const useCarousel = (itemCount, autoPlayInterval = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % itemCount);
  }, [itemCount]);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goToIndex = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  useEffect(() => {
    if (!autoPlayInterval) return;

    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, goToNext]);

  return {
    currentIndex,
    direction,
    goToNext,
    goToPrevious,
    goToIndex
  };
};

/**
 * Hook for accordion animation
 */
export const useAccordion = (initialState = false) => {
  const [isExpanded, setIsExpanded] = useState(initialState);
  const contentRef = useRef(null);

  const toggle = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (isExpanded) {
      content.style.maxHeight = `${content.scrollHeight}px`;
    } else {
      content.style.maxHeight = '0px';
    }
  }, [isExpanded]);

  return { isExpanded, toggle, contentRef };
};

/**
 * Hook for drag and drop animations
 */
export const useDragAnimation = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDrag = useCallback((e) => {
    if (isDragging) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    isDragging,
    position,
    handleDragStart,
    handleDrag,
    handleDragEnd
  };
};

/**
 * Hook for loading skeleton animation
 */
export const useSkeletonAnimation = (isLoading) => {
  const [showSkeleton, setShowSkeleton] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowSkeleton(false), 300);
      return () => clearTimeout(timer);
    }
    setShowSkeleton(true);
  }, [isLoading]);

  return showSkeleton;
};

export default {
  useScrollAnimation,
  useStaggerAnimation,
  useMouseParallax,
  useScrollProgress,
  useTypingAnimation,
  useCounterAnimation,
  useElementVisibility,
  useHoverAnimation,
  useSmoothValue,
  useRipple,
  useAutoAnimate,
  usePageTransition,
  useCarousel,
  useAccordion,
  useDragAnimation,
  useSkeletonAnimation
};
