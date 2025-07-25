import React, { useRef } from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const buttonRef = useRef(null);

  const baseClasses = 'font-medium transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'bg-primary-400 hover:bg-primary-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-primary-400',
    secondary: 'bg-accent-400 hover:bg-accent-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-accent-400',
    outline: 'border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white hover:-translate-y-0.5 focus:ring-primary-400',
    ghost: 'text-primary-400 hover:bg-primary-400 hover:bg-opacity-10 hover:text-primary-500 focus:ring-primary-400',
    dark: 'bg-neutral-800 hover:bg-neutral-900 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-neutral-600'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
    xl: 'px-10 py-5 text-xl rounded-2xl'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  // Ripple effect handler
  const handleRipple = (e) => {
    const button = buttonRef.current;
    if (!button) return;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.className = 'ripple-effect';
    button.appendChild(circle);
    setTimeout(() => {
      circle.remove();
    }, 600);
  };

  const handleClick = (e) => {
    if (!disabled && !loading) {
      handleRipple(e);
      if (onClick) onClick(e);
    }
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {/* Loading spinner overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
        </div>
      )}
      {/* Button content with opacity control for loading state */}
      <span className={`${loading ? 'opacity-0' : 'opacity-100'} flex items-center justify-center gap-2 transition-opacity duration-200`}>
        {children}
      </span>
      {/* Ripple effect overlay (CSS will style .ripple-effect) */}
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-inherit pointer-events-none"></div>
    </button>
  );
};

export default Button;

// Add ripple effect CSS (should be in global CSS or a CSS module)
// .ripple-effect {
//   position: absolute;
//   border-radius: 50%;
//   transform: scale(0);
//   animation: ripple 0.6s linear;
//   background: rgba(255,255,255,0.5);
//   pointer-events: none;
//   z-index: 10;
// }
// @keyframes ripple {
//   to {
//     transform: scale(2.5);
//     opacity: 0;
//   }
// }