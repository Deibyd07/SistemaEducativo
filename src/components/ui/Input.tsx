import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  required?: boolean;
  describedBy?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon,
  className,
  id,
  required = false,
  describedBy,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;
  const describedByIds = [describedBy, error && errorId, helperText && !error && helperId]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="requerido">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div 
            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            aria-hidden="true"
          >
            <div className="text-gray-400 dark:text-gray-500">
              {icon}
            </div>
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
            icon && 'pl-10',
            error && 'border-red-300 dark:border-red-500 focus:ring-red-500 focus:border-red-500',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedByIds || undefined}
          aria-required={required}
          {...props}
        />
      </div>
      {error && (
        <p 
          id={errorId}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p 
          id={helperId}
          className="mt-1 text-sm text-gray-500 dark:text-gray-400"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};