/**
 * =============================================
 * TAMBERMA RESTAURANT - RESPONSIVE HOOK
 * Modern React Hook for Responsive Design
 * =============================================
 */

import { useState, useEffect, useCallback } from 'react';

// Breakpoint constants matching Tailwind CSS
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

/**
 * Custom hook for responsive design utilities
 * @returns {Object} Responsive utilities and state
 */
const useResponsive = () => {
  // State for current screen dimensions
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // State for current breakpoint
  const [currentBreakpoint, setCurrentBreakpoint] = useState('sm');

  // State for device type detection
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isTouchDevice: false,
    orientation: 'portrait'
  });

  /**
   * Update dimensions and breakpoint information
   */
  const updateDimensions = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update dimensions
    setDimensions({ width, height });

    // Determine current breakpoint
    let breakpoint = 'sm';
    if (width >= BREAKPOINTS['2xl']) breakpoint = '2xl';
    else if (width >= BREAKPOINTS.xl) breakpoint = 'xl';
    else if (width >= BREAKPOINTS.lg) breakpoint = 'lg';
    else if (width >= BREAKPOINTS.md) breakpoint = 'md';
    
    setCurrentBreakpoint(breakpoint);

    // Update device information
    const isMobile = width < BREAKPOINTS.md;
    const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
    const isDesktop = width >= BREAKPOINTS.lg;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const orientation = height > width ? 'portrait' : 'landscape';

    setDeviceInfo({
      isMobile,
      isTablet,
      isDesktop,
      isTouchDevice,
      orientation
    });
  }, []);

  // Effect to handle window resize
  useEffect(() => {
    // Initial call
    updateDimensions();

    // Debounced resize handler
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 150);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [updateDimensions]);

  /**
   * Check if current screen is at least the specified breakpoint
   * @param {string} breakpoint - Breakpoint to check (sm, md, lg, xl, 2xl)
   * @returns {boolean}
   */
  const isAtLeast = useCallback((breakpoint) => {
    return dimensions.width >= BREAKPOINTS[breakpoint];
  }, [dimensions.width]);

  /**
   * Check if current screen is below the specified breakpoint
   * @param {string} breakpoint - Breakpoint to check
   * @returns {boolean}
   */
  const isBelow = useCallback((breakpoint) => {
    return dimensions.width < BREAKPOINTS[breakpoint];
  }, [dimensions.width]);

  /**
   * Check if current screen is exactly at the specified breakpoint range
   * @param {string} breakpoint - Breakpoint to check
   * @returns {boolean}
   */
  const isExactly = useCallback((breakpoint) => {
    const breakpoints = Object.keys(BREAKPOINTS);
    const currentIndex = breakpoints.indexOf(breakpoint);
    
    if (currentIndex === -1) return false;
    
    const min = BREAKPOINTS[breakpoint];
    const nextBreakpoint = breakpoints[currentIndex + 1];
    const max = nextBreakpoint ? BREAKPOINTS[nextBreakpoint] : Infinity;
    
    return dimensions.width >= min && dimensions.width < max;
  }, [dimensions.width]);

  /**
   * Get responsive value based on current breakpoint
   * @param {Object} values - Object with breakpoint keys and values
   * @param {any} defaultValue - Default value if no match
   * @returns {any}
   */
  const getResponsiveValue = useCallback((values, defaultValue = null) => {
    const breakpoints = ['2xl', 'xl', 'lg', 'md', 'sm'];
    
    for (const bp of breakpoints) {
      if (isAtLeast(bp) && values[bp] !== undefined) {
        return values[bp];
      }
    }
    
    return values.default || defaultValue;
  }, [isAtLeast]);

  /**
   * Calculate responsive columns for grid layouts
   * @param {Object} columnConfig - Configuration for different breakpoints
   * @returns {number}
   */
  const getResponsiveColumns = useCallback((columnConfig = {}) => {
    const defaultConfig = {
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
      '2xl': 4
    };

    const config = { ...defaultConfig, ...columnConfig };
    return getResponsiveValue(config, 1);
  }, [getResponsiveValue]);

  /**
   * Calculate responsive spacing values
   * @param {Object} spacingConfig - Configuration for different breakpoints
   * @returns {string}
   */
  const getResponsiveSpacing = useCallback((spacingConfig = {}) => {
    const defaultConfig = {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '2.5rem',
      '2xl': '3rem'
    };

    const config = { ...defaultConfig, ...spacingConfig };
    return getResponsiveValue(config, '1rem');
  }, [getResponsiveValue]);

  /**
   * Get container max width based on current breakpoint
   * @returns {string}
   */
  const getContainerMaxWidth = useCallback(() => {
    const containerWidths = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    };

    return containerWidths[currentBreakpoint] || '100%';
  }, [currentBreakpoint]);

  /**
   * Check if current device is likely a mobile device
   * @returns {boolean}
   */
  const isMobileDevice = useCallback(() => {
    return deviceInfo.isMobile || (deviceInfo.isTouchDevice && dimensions.width < BREAKPOINTS.md);
  }, [deviceInfo, dimensions.width]);

  /**
   * Get responsive font size
   * @param {Object} fontConfig - Font size configuration
   * @returns {string}
   */
  const getResponsiveFontSize = useCallback((fontConfig = {}) => {
    const defaultConfig = {
      sm: '0.875rem',    // text-sm
      md: '1rem',        // text-base
      lg: '1.125rem',    // text-lg
      xl: '1.25rem',     // text-xl
      '2xl': '1.5rem'    // text-2xl
    };

    const config = { ...defaultConfig, ...fontConfig };
    return getResponsiveValue(config, '1rem');
  }, [getResponsiveValue]);

  /**
   * Generate responsive CSS classes
   * @param {Object} classConfig - Classes for different breakpoints
   * @returns {string}
   */
  const getResponsiveClasses = useCallback((classConfig = {}) => {
    const classes = [];
    
    Object.entries(classConfig).forEach(([breakpoint, className]) => {
      if (breakpoint === 'default') {
        classes.push(className);
      } else if (isAtLeast(breakpoint)) {
        classes.push(`${breakpoint}:${className}`);
      }
    });

    return classes.join(' ');
  }, [isAtLeast]);

  /**
   * Check if screen is in landscape mode
   * @returns {boolean}
   */
  const isLandscape = useCallback(() => {
    return deviceInfo.orientation === 'landscape';
  }, [deviceInfo.orientation]);

  /**
   * Check if screen is in portrait mode
   * @returns {boolean}
   */
  const isPortrait = useCallback(() => {
    return deviceInfo.orientation === 'portrait';
  }, [deviceInfo.orientation]);

  /**
   * Get viewport dimensions as CSS custom properties
   * @returns {Object}
   */
  const getViewportCSSVars = useCallback(() => {
    return {
      '--vw': `${dimensions.width}px`,
      '--vh': `${dimensions.height}px`,
      '--vw-percent': '100vw',
      '--vh-percent': '100vh'
    };
  }, [dimensions]);

  /**
   * Determine if hamburger menu should be shown
   * @returns {boolean}
   */
  const shouldShowMobileMenu = useCallback(() => {
    return deviceInfo.isMobile || isBelow('lg');
  }, [deviceInfo.isMobile, isBelow]);

  /**
   * Get appropriate image sizes for responsive images
   * @param {Object} sizeConfig - Size configuration for different breakpoints
   * @returns {string}
   */
  const getImageSizes = useCallback((sizeConfig = {}) => {
    const defaultConfig = {
      sm: '100vw',
      md: '50vw',
      lg: '33vw',
      xl: '25vw',
      '2xl': '20vw'
    };

    const config = { ...defaultConfig, ...sizeConfig };
    const sizes = [];

    Object.entries(BREAKPOINTS).forEach(([breakpoint, width]) => {
      if (config[breakpoint]) {
        sizes.push(`(min-width: ${width}px) ${config[breakpoint]}`);
      }
    });

    // Add default size
    if (config.default || config.sm) {
      sizes.push(config.default || config.sm);
    }

    return sizes.join(', ');
  }, []);

  /**
   * Custom media query hook
   * @param {string} query - Media query string
   * @returns {boolean}
   */
  const useMediaQuery = useCallback((query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      
      if (media.matches !== matches) {
        setMatches(media.matches);
      }

      const listener = () => setMatches(media.matches);
      media.addEventListener('change', listener);
      
      return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
  }, []);

  // Return all utilities and state
  return {
    // Dimensions and device info
    width: dimensions.width,
    height: dimensions.height,
    currentBreakpoint,
    deviceInfo,

    // Breakpoint utilities
    isAtLeast,
    isBelow,
    isExactly,
    isMobile: deviceInfo.isMobile,
    isTablet: deviceInfo.isTablet,
    isDesktop: deviceInfo.isDesktop,
    isTouchDevice: deviceInfo.isTouchDevice,
    isLandscape,
    isPortrait,

    // Responsive value getters
    getResponsiveValue,
    getResponsiveColumns,
    getResponsiveSpacing,
    getResponsiveFontSize,
    getResponsiveClasses,
    getContainerMaxWidth,
    getImageSizes,

    // Utility functions
    isMobileDevice,
    shouldShowMobileMenu,
    getViewportCSSVars,
    useMediaQuery,

    // Constants
    BREAKPOINTS
  };
};

export default useResponsive;