/**
 * =============================================
 * TAMBERMA RESTAURANT - ANIMATION UTILITIES
 * Modern 2025 Animation Helper Functions
 * =============================================
 */

// Animation timing constants
export const DURATIONS = {
    fast: 200,
    normal: 300,
    slow: 600,
    extraSlow: 1000
  };
  
  export const EASINGS = {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    sharp: 'cubic-bezier(0.4, 0, 1, 1)',
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)'
  };
  
  /**
   * =============================================
   * SCROLL ANIMATION UTILITIES
   * =============================================
   */
  
  /**
   * Creates intersection observer for scroll animations
   * @param {Function} callback - Function to call when element intersects
   * @param {Object} options - Observer options
   * @returns {IntersectionObserver}
   */
  export const createScrollObserver = (callback, options = {}) => {
    const defaultOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.1
    };
  
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
  };
  
  /**
   * Reveals elements on scroll with stagger effect
   * @param {string} selector - CSS selector for elements to animate
   * @param {number} staggerDelay - Delay between each element (ms)
   */
  export const revealOnScroll = (selector = '.scroll-reveal', staggerDelay = 100) => {
    const elements = document.querySelectorAll(selector);
    
    const observer = createScrollObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * staggerDelay);
          observer.unobserve(entry.target);
        }
      });
    });
  
    elements.forEach(el => observer.observe(el));
    return observer;
  };
  
  /**
   * Parallax scroll effect
   * @param {HTMLElement} element - Element to apply parallax to
   * @param {number} speed - Parallax speed (0.1 to 1)
   */
  export const parallaxScroll = (element, speed = 0.5) => {
    if (!element) return;
  
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      element.style.transform = `translateY(${rate}px)`;
    };
  
    window.addEventListener('scroll', updateParallax, { passive: true });
    return () => window.removeEventListener('scroll', updateParallax);
  };
  
  /**
   * =============================================
   * ELEMENT ANIMATION UTILITIES
   * =============================================
   */
  
  /**
   * Animates element with custom properties
   * @param {HTMLElement} element - Element to animate
   * @param {Object} properties - CSS properties to animate
   * @param {Object} options - Animation options
   * @returns {Promise}
   */
  export const animateElement = (element, properties, options = {}) => {
    return new Promise((resolve) => {
      const {
        duration = DURATIONS.normal,
        easing = EASINGS.smooth,
        delay = 0
      } = options;
  
      if (!element) {
        resolve();
        return;
      }
  
      // Set initial transition
      element.style.transition = `all ${duration}ms ${easing}`;
  
      // Apply delay if specified
      if (delay > 0) {
        setTimeout(() => applyProperties(), delay);
      } else {
        applyProperties();
      }
  
      function applyProperties() {
        // Apply the properties
        Object.entries(properties).forEach(([prop, value]) => {
          element.style[prop] = value;
        });
  
        // Resolve after animation completes
        setTimeout(() => {
          element.style.transition = '';
          resolve();
        }, duration);
      }
    });
  };
  
  /**
   * Stagger animation for multiple elements
   * @param {NodeList|Array} elements - Elements to animate
   * @param {string} animationClass - CSS class to add
   * @param {number} staggerDelay - Delay between elements
   */
  export const staggerAnimation = (elements, animationClass, staggerDelay = 100) => {
    if (!elements || elements.length === 0) return;
  
    Array.from(elements).forEach((element, index) => {
      setTimeout(() => {
        element.classList.add(animationClass);
      }, index * staggerDelay);
    });
  };
  
  /**
   * =============================================
   * SPECIALIZED ANIMATIONS
   * =============================================
   */
  
  /**
   * Typewriter animation effect
   * @param {HTMLElement} element - Element containing text
   * @param {string} text - Text to type
   * @param {number} speed - Typing speed (ms per character)
   */
  export const typewriterEffect = (element, text, speed = 50) => {
    if (!element) return;
  
    element.textContent = '';
    let i = 0;
  
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, speed);
  
    return () => clearInterval(typeInterval);
  };
  
  /**
   * Counter animation effect
   * @param {HTMLElement} element - Element to display counter
   * @param {number} start - Starting number
   * @param {number} end - Ending number
   * @param {number} duration - Animation duration (ms)
   */
  export const counterAnimation = (element, start = 0, end = 100, duration = 2000) => {
    if (!element) return;
  
    const startTime = Date.now();
    const difference = end - start;
  
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (difference * easeOutQuart));
      
      element.textContent = current.toLocaleString();
  
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
  
    requestAnimationFrame(step);
  };
  
  /**
   * =============================================
   * LOADING ANIMATIONS
   * =============================================
   */
  
  /**
   * Creates a loading spinner element
   * @param {Object} options - Spinner options
   * @returns {HTMLElement}
   */
  export const createLoadingSpinner = (options = {}) => {
    const {
      size = '32px',
      color = '#e67e22',
      className = 'loading-spinner'
    } = options;
  
    const spinner = document.createElement('div');
    spinner.className = className;
    spinner.style.width = size;
    spinner.style.height = size;
    spinner.style.borderColor = `#f3f3f3 ${color} #f3f3f3 #f3f3f3`;
    
    return spinner;
  };
  
  /**
   * Show loading state with animation
   * @param {HTMLElement} element - Element to show loading in
   * @param {string} loadingText - Loading text to display
   */
  export const showLoading = (element, loadingText = 'Loading') => {
    if (!element) return;
  
    const originalContent = element.innerHTML;
    const spinner = createLoadingSpinner({ size: '20px' });
    
    element.innerHTML = '';
    element.appendChild(spinner);
    element.insertAdjacentHTML('beforeend', `<span class="ml-2 loading-dots">${loadingText}</span>`);
    element.classList.add('pointer-events-none', 'opacity-75');
  
    return () => {
      element.innerHTML = originalContent;
      element.classList.remove('pointer-events-none', 'opacity-75');
    };
  };
  
  /**
   * =============================================
   * UTILITY FUNCTIONS
   * =============================================
   */
  
  /**
   * Checks if user prefers reduced motion
   * @returns {boolean}
   */
  export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };
  
  /**
   * Safely runs animation with reduced motion check
   * @param {Function} animationFn - Animation function to run
   * @param {Function} fallbackFn - Fallback for reduced motion
   */
  export const safeAnimate = (animationFn, fallbackFn = () => {}) => {
    if (prefersReducedMotion()) {
      fallbackFn();
    } else {
      animationFn();
    }
  };
  
  /**
   * Debounced animation frame
   * @param {Function} callback - Function to call
   * @returns {Function} - Debounced function
   */
  export const debouncedAnimationFrame = (callback) => {
    let rafId = null;
    
    return (...args) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        callback(...args);
      });
    };
  };
  
  /**
   * =============================================
   * PRESET ANIMATION SEQUENCES
   * =============================================
   */
  
  /**
   * Hero section entrance animation
   * @param {Object} elements - Object containing hero elements
   */
  export const heroEntranceAnimation = (elements = {}) => {
    const { title, subtitle, cta, image } = elements;
    
    const sequence = [
      { element: image, class: 'animate-scale-in', delay: 0 },
      { element: title, class: 'animate-fade-in-up', delay: 200 },
      { element: subtitle, class: 'animate-fade-in-up', delay: 400 },
      { element: cta, class: 'animate-fade-in-up', delay: 600 }
    ];
  
    sequence.forEach(({ element, class: className, delay }) => {
      if (element) {
        setTimeout(() => {
          element.classList.add(className);
        }, delay);
      }
    });
  };
  
  /**
   * Menu card hover animation
   * @param {HTMLElement} card - Menu card element
   */
  export const menuCardHover = (card) => {
    if (!card) return;
  
    const image = card.querySelector('img');
    const content = card.querySelector('.card-content');
  
    card.addEventListener('mouseenter', () => {
      if (image) image.style.transform = 'scale(1.1)';
      if (content) content.style.transform = 'translateY(-8px)';
    });
  
    card.addEventListener('mouseleave', () => {
      if (image) image.style.transform = 'scale(1)';
      if (content) content.style.transform = 'translateY(0)';
    });
  };
  
  /**
   * Page transition animation
   * @param {HTMLElement} outElement - Element to animate out
   * @param {HTMLElement} inElement - Element to animate in
   * @param {Function} callback - Callback after transition
   */
  export const pageTransition = async (outElement, inElement, callback = () => {}) => {
    if (outElement) {
      await animateElement(outElement, {
        opacity: '0',
        transform: 'translateY(-20px)'
      }, { duration: DURATIONS.fast });
    }
  
    callback();
  
    if (inElement) {
      inElement.style.opacity = '0';
      inElement.style.transform = 'translateY(20px)';
      
      await animateElement(inElement, {
        opacity: '1',
        transform: 'translateY(0)'
      }, { duration: DURATIONS.normal, delay: 100 });
    }
  };
  
  /**
   * Initialize all scroll animations on page load
   */
  export const initializeScrollAnimations = () => {
    // Reveal elements on scroll
    revealOnScroll('.scroll-reveal', 150);
    
    // Initialize parallax for hero backgrounds
    const parallaxElements = document.querySelectorAll('.parallax-slow');
    parallaxElements.forEach(el => parallaxScroll(el, 0.3));
    
    // Initialize menu card hovers
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => menuCardHover(card));
  };
  
  export default {
    DURATIONS,
    EASINGS,
    createScrollObserver,
    revealOnScroll,
    parallaxScroll,
    animateElement,
    staggerAnimation,
    typewriterEffect,
    counterAnimation,
    createLoadingSpinner,
    showLoading,
    prefersReducedMotion,
    safeAnimate,
    debouncedAnimationFrame,
    heroEntranceAnimation,
    menuCardHover,
    pageTransition,
    initializeScrollAnimations
  };