import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  className = '',
  text = null,
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-primary-400',
    accent: 'border-accent-400',
    white: 'border-white',
    neutral: 'border-neutral-800'
  };

  const SpinnerElement = () => (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Main Spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div 
          className={`
            ${sizeClasses[size]} 
            border-2 border-transparent 
            border-t-2 ${colorClasses[color]}
            rounded-full 
            animate-spin
          `}
        />
        
        {/* Inner accent ring */}
        <div 
          className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            ${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-8 h-8'}
            border border-transparent 
            border-t ${colorClasses[color]} 
            opacity-60
            rounded-full 
            animate-spin
          `}
          style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
        />
      </div>

      {/* Loading Text */}
      {text && (
        <div className={`
          mt-3 text-sm font-medium
          ${color === 'white' ? 'text-white' : 'text-neutral-600'}
          animate-pulse
        `}>
          {text}
        </div>
      )}
    </div>
  );

  // Full screen overlay version
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-neutral-100">
          <SpinnerElement />
        </div>
      </div>
    );
  }

  return <SpinnerElement />;
};

// Specialized spinner variants
export const ButtonSpinner = ({ className = '' }) => (
  <LoadingSpinner 
    size="sm" 
    color="white" 
    className={`mr-2 ${className}`}
  />
);

export const PageSpinner = ({ text = "Loading..." }) => (
  <div className="flex items-center justify-center min-h-[200px]">
    <LoadingSpinner 
      size="lg" 
      color="primary" 
      text={text}
    />
  </div>
);

export const OverlaySpinner = ({ text = "Loading..." }) => (
  <LoadingSpinner 
    size="xl" 
    color="primary" 
    text={text}
    fullScreen={true}
  />
);

// Skeleton loading components
export const SkeletonCard = ({ className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-neutral-200 rounded-lg h-48 mb-4"></div>
    <div className="space-y-2">
      <div className="bg-neutral-200 rounded h-4 w-3/4"></div>
      <div className="bg-neutral-200 rounded h-4 w-1/2"></div>
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`animate-pulse space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i}
        className={`bg-neutral-200 rounded h-4 ${
          i === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      />
    ))}
  </div>
);

export default LoadingSpinner;