import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = ''
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Size variants
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    xlarge: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (closeOnEscape && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Store the previously focused element
      previousFocusRef.current = document.activeElement;
      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      // Add padding to prevent layout shift
      document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      // Restore focus to previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle close button click
  const handleCloseClick = () => {
    onClose();
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`
          relative w-full ${sizeClasses[size]} max-h-[90vh] bg-white rounded-2xl shadow-2xl
          animate-in zoom-in-95 slide-in-from-bottom-2 duration-300
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            {title && (
              <h2 
                id="modal-title"
                className="font-display text-xl font-semibold text-neutral-900"
              >
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                onClick={handleCloseClick}
                className="p-2 rounded-full text-neutral-400 hover:text-neutral-600 
                         hover:bg-neutral-100 transition-all duration-200 
                         hover:scale-110 focus:outline-none focus:ring-2 
                         focus:ring-primary-400 focus:ring-offset-2"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Pre-built modal variants for common use cases
export const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary" // primary, danger
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const variantStyles = {
    primary: "bg-primary-400 hover:bg-primary-500 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
      <div className="space-y-6">
        <p className="text-neutral-600 leading-relaxed">{message}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-neutral-600 hover:text-neutral-800 
                     hover:bg-neutral-100 rounded-lg transition-colors duration-200
                     border border-neutral-300 hover:border-neutral-400"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 
                       hover:shadow-lg hover:scale-105 ${variantStyles[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const ImageModal = ({ isOpen, onClose, src, alt, title }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="xlarge" 
      className="bg-neutral-900"
      title={title}
    >
      <div className="flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[70vh] object-contain rounded-lg"
        />
      </div>
    </Modal>
  );
};

export const FormModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  onSubmit, 
  submitText = "Submit",
  isLoading = false 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        {children}
        
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4 border-t border-neutral-200">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-neutral-600 hover:text-neutral-800 
                     hover:bg-neutral-100 rounded-lg transition-colors duration-200
                     border border-neutral-300 hover:border-neutral-400
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2 bg-primary-400 hover:bg-primary-500 text-white 
                     rounded-lg font-medium transition-all duration-200 
                     hover:shadow-lg hover:scale-105 disabled:opacity-50 
                     disabled:cursor-not-allowed disabled:hover:scale-100
                     flex items-center justify-center min-w-[100px]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              submitText
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Modal;