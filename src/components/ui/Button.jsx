import React from 'react';

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
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
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
      
      {/* Ripple effect overlay */}
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-inherit"></div>
    </button>
  );
};

export default Button;