import React, { useState, useEffect, useRef } from 'react';

const AnimatedText = ({ 
  text, 
  animation = 'fadeInUp', 
  delay = 0, 
  duration = 0.6,
  className = '',
  as = 'div',
  trigger = 'scroll', // 'scroll', 'immediate', 'hover'
  stagger = 0.1,
  splitBy = 'word' // 'word', 'char', 'line'
}) => {
  const [isVisible, setIsVisible] = useState(trigger === 'immediate');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    if (trigger !== 'scroll') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [trigger, hasAnimated]);

  // Split text based on splitBy prop
  const splitText = (text, splitBy) => {
    switch (splitBy) {
      case 'char':
        return text.split('');
      case 'word':
        return text.split(' ');
      case 'line':
        return text.split('\n');
      default:
        return [text];
    }
  };

  // Animation variants
  const animations = {
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 }
    },
    fadeInDown: {
      initial: { opacity: 0, y: -30 },
      animate: { opacity: 1, y: 0 }
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 }
    },
    fadeInRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    },
    slideInUp: {
      initial: { opacity: 0, y: 50, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 }
    },
    typewriter: {
      initial: { width: 0 },
      animate: { width: 'auto' }
    },
    bounce: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 }
    }
  };

  const currentAnimation = animations[animation] || animations.fadeInUp;

  // Component to render
  const Component = as;

  // Handle hover trigger
  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsVisible(false);
    }
  };

  // Split animation (word/char level)
  if (splitBy !== 'line' && (splitBy === 'word' || splitBy === 'char')) {
    const parts = splitText(text, splitBy);
    
    return (
      <Component
        ref={elementRef}
        className={`${className} ${animation === 'typewriter' ? 'overflow-hidden' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {parts.map((part, index) => (
          <span
            key={index}
            className={`inline-block transition-all ease-out`}
            style={{
              ...currentAnimation.initial,
              ...(isVisible ? currentAnimation.animate : {}),
              transitionDuration: `${duration}s`,
              transitionDelay: `${delay + (index * stagger)}s`,
              ...(splitBy === 'char' ? {} : { marginRight: '0.25rem' })
            }}
          >
            {part}
            {splitBy === 'word' && index < parts.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Component>
    );
  }

  // Simple single element animation
  return (
    <Component
      ref={elementRef}
      className={`transition-all ease-out ${className}`}
      style={{
        ...currentAnimation.initial,
        ...(isVisible ? currentAnimation.animate : {}),
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </Component>
  );
};

// Specialized animated text components
export const FadeInText = ({ children, className = '', delay = 0 }) => (
  <AnimatedText 
    text={children} 
    animation="fadeInUp" 
    className={className}
    delay={delay}
  />
);

export const TypewriterText = ({ 
  text, 
  className = '', 
  speed = 0.05,
  showCursor = true 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursorState, setShowCursorState] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed * 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  // Cursor blinking effect
  useEffect(() => {
    if (showCursor) {
      const cursorInterval = setInterval(() => {
        setShowCursorState(prev => !prev);
      }, 500);

      return () => clearInterval(cursorInterval);
    }
  }, [showCursor]);

  return (
    <span className={`${className} font-mono`}>
      {displayText}
      {showCursor && (
        <span className={`ml-1 ${showCursorState ? 'opacity-100' : 'opacity-0'}`}>
          |
        </span>
      )}
    </span>
  );
};

export const StaggeredText = ({ 
  text, 
  className = '', 
  stagger = 0.1,
  animation = 'fadeInUp' 
}) => (
  <AnimatedText 
    text={text}
    animation={animation}
    splitBy="word"
    stagger={stagger}
    className={className}
  />
);

export const CountUpText = ({ 
  end, 
  duration = 2, 
  prefix = '', 
  suffix = '',
  className = '' 
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const increment = end / (duration * 60); // 60fps
    const timer = setInterval(() => {
      setCount(prevCount => {
        const newCount = prevCount + increment;
        if (newCount >= end) {
          clearInterval(timer);
          return end;
        }
        return newCount;
      });
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration, isVisible]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{Math.floor(count)}{suffix}
    </span>
  );
};

// Text reveal on scroll
export const ScrollRevealText = ({ 
  children, 
  className = '',
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedText;