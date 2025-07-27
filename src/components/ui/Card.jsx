import React from 'react';

const Card = ({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  padding = 'default',
  shadow = 'default',
  rounded = 'default',
  tabIndex,
  ...props 
}) => {
  const baseClasses = 'bg-white transition-all duration-300 ease-in-out relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400';
  
  const variants = {
    default: 'border border-neutral-200',
    glass: 'backdrop-blur-md bg-white bg-opacity-80 border border-white border-opacity-20',
    gradient: 'bg-gradient-to-br from-white to-neutral-50 border border-neutral-200',
    dark: 'bg-neutral-800 border border-neutral-700 text-white',
    featured: 'border-2 border-primary-400 bg-gradient-to-br from-primary-50 to-white'
  };
  
  const hoverEffects = {
    true: hover ? 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer active:scale-95 focus:shadow-2xl focus:-translate-y-2' : '',
    false: ''
  };
  
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const shadows = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    default: 'shadow-lg',
    lg: 'shadow-xl',
    xl: 'shadow-2xl'
  };
  
  const roundedSizes = {
    none: 'rounded-none',
    sm: 'rounded-lg',
    default: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${hoverEffects[hover]} ${paddings[padding]} ${shadows[shadow]} ${roundedSizes[rounded]} ${className}`;
  
  return (
    <div
      className={classes}
      tabIndex={tabIndex !== undefined ? tabIndex : hover ? 0 : undefined}
      {...props}
    >
      {/* Card content */}
      {children}
      {/* Subtle highlight overlay for interactive cards */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-transparent opacity-0 hover:opacity-5 transition-opacity duration-300 rounded-inherit pointer-events-none"></div>
      )}
    </div>
  );
};

// Card Header Component
const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`border-b border-neutral-200 pb-4 mb-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Title Component
const CardTitle = ({ children, className = '', size = 'default', ...props }) => {
  const sizes = {
    sm: 'text-lg font-display font-semibold',
    default: 'text-xl font-display font-semibold',
    lg: 'text-2xl font-display font-bold',
    xl: 'text-3xl font-display font-bold'
  };
  
  return (
    <h3 className={`text-neutral-900 ${sizes[size]} ${className}`} {...props}>
      {children}
    </h3>
  );
};

// Card Description Component
const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-neutral-600 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
};

// Card Content Component
const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Footer Component
const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`border-t border-neutral-200 pt-4 mt-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Image Component
const CardImage = ({ src, alt, className = '', aspectRatio = 'default', ...props }) => {
  const aspectRatios = {
    square: 'aspect-square',
    default: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]'
  };
  
  return (
    <div className={`overflow-hidden rounded-lg ${aspectRatios[aspectRatio]} ${className}`}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 active:scale-100 focus:scale-105"
        {...props}
      />
    </div>
  );
};

// Export all components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Image = CardImage;

export default Card;