import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Toast as ToastType } from '../../contexts/ToastContext';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastStyles = {
  success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
};

const iconStyles = {
  success: 'text-green-500 dark:text-green-400',
  error: 'text-red-500 dark:text-red-400',
  warning: 'text-yellow-500 dark:text-yellow-400',
  info: 'text-blue-500 dark:text-blue-400',
};

export const Toast: React.FC<ToastProps> = ({ toast, onRemove, position = 'top-right' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const Icon = toastIcons[toast.type];

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300);
  };

  const handleAction = () => {
    toast.action?.onClick();
    handleRemove();
  };

  return (
    <div
      className={cn(
        'relative w-full max-w-sm bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out',
        toastStyles[toast.type],
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        isExiting ? 'opacity-0 translate-y-2 scale-95' : '',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
      )}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      tabIndex={0}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Icon className={cn('h-5 w-5', iconStyles[toast.type])} aria-hidden="true" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium">{toast.title}</div>
          {toast.message && (
            <div className="mt-1 text-sm opacity-90">{toast.message}</div>
          )}
          {toast.action && (
            <button
              onClick={handleAction}
              className="mt-2 text-sm font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        
        <button
          onClick={handleRemove}
          className="flex-shrink-0 ml-3 p-1 rounded-md hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
          aria-label="Cerrar notificación"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ 
  toasts, 
  onRemove, 
  position = 'top-right' 
}) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  return (
    <div
      className={cn(
        'fixed z-50 space-y-2 pointer-events-none',
        positionClasses[position]
      )}
      role="region"
      aria-label="Notificaciones del sistema"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onRemove={onRemove} position={position} />
        </div>
      ))}
    </div>
  );
}; 