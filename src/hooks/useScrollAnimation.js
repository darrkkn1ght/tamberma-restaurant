import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * Provides intersection observer functionality for revealing elements on scroll
 */
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (delay > 0) {
          setTimeout(() => {
            setIsVisible(true);
            if (triggerOnce) {
              setHasTriggered(true);
            }
          }, delay);
        } else {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        }
      } else if (!triggerOnce && !hasTriggered) {
        setIsVisible(false);
      }
    });
  }, [delay, triggerOnce, hasTriggered]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Don't observe if already triggered and triggerOnce is true
    if (triggerOnce && hasTriggered) return;

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, threshold, rootMargin, triggerOnce, hasTriggered]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { ref: elementRef, isVisible, hasTriggered };
};

/**
 * Hook for staggered animations (multiple elements with delays)
 */
export const useStaggeredAnimation = (itemCount, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    staggerDelay = 100,
    triggerOnce = true
  } = options;

  const [visibleItems, setVisibleItems] = useState(new Set());
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasTriggered) {
        // Trigger staggered animation
        for (let i = 0; i < itemCount; i++) {
          setTimeout(() => {
            setVisibleItems(prev => new Set([...prev, i]));
          }, i * staggerDelay);
        }
        
        if (triggerOnce) {
          setHasTriggered(true);
        }
      }
    });
  }, [itemCount, staggerDelay, triggerOnce, hasTriggered]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || (triggerOnce && hasTriggered)) return;

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observerRef.current.observe(container);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, threshold, rootMargin, triggerOnce, hasTriggered]);

  const isItemVisible = (index) => visibleItems.has(index);

  return { ref: containerRef, isItemVisible, hasTriggered };
};

/**
 * Hook for scroll progress tracking
 */
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll / windowHeight;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
};

/**
 * Hook for parallax scroll effects
 */
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      const elementTop = rect.top + scrollTop;
      const windowHeight = window.innerHeight;
      
      // Calculate parallax offset
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const parallaxOffset = (scrollTop - elementTop) * speed;
        setOffset(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref: elementRef, offset };
};

/**
 * Animation utility classes and styles
 */
export const animationClasses = {
  // Fade animations
  fadeIn: 'opacity-0 transition-opacity duration-700 ease-out',
  fadeInVisible: 'opacity-100',
  
  // Slide animations
  slideUp: 'opacity-0 transform translate-y-8 transition-all duration-700 ease-out',
  slideUpVisible: 'opacity-100 transform translate-y-0',
  
  slideDown: 'opacity-0 transform -translate-y-8 transition-all duration-700 ease-out',
  slideDownVisible: 'opacity-100 transform translate-y-0',
  
  slideLeft: 'opacity-0 transform translate-x-8 transition-all duration-700 ease-out',
  slideLeftVisible: 'opacity-100 transform translate-x-0',
  
  slideRight: 'opacity-0 transform -translate-x-8 transition-all duration-700 ease-out',
  slideRightVisible: 'opacity-100 transform translate-x-0',
  
  // Scale animations
  scaleIn: 'opacity-0 transform scale-95 transition-all duration-700 ease-out',
  scaleInVisible: 'opacity-100 transform scale-100',
  
  // Stagger delays
  stagger1: 'transition-delay-75',
  stagger2: 'transition-delay-150',
  stagger3: 'transition-delay-300',
  stagger4: 'transition-delay-500'
};

/**
 * Helper function to combine animation classes
 */
export const getAnimationClasses = (type = 'slideUp', isVisible = false, stagger = null) => {
  const baseClass = animationClasses[type];
  const visibleClass = animationClasses[`${type}Visible`];
  const staggerClass = stagger ? animationClasses[`stagger${stagger}`] : '';
  
  return `${baseClass} ${isVisible ? visibleClass : ''} ${staggerClass}`.trim();
};