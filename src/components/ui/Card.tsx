import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: 'article' | 'section' | 'div';
  role?: string;
  'aria-label'?: string;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false, 
  as: Component = 'div',
  role,
  'aria-label': ariaLabel,
  ...props
}) => {
  return (
    <Component 
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm',
        hover && 'transition-all duration-200 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600',
        className
      )}
      role={role}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Component>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  as?: 'header' | 'div';
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  children, 
  className, 
  as: Component = 'div' 
}) => {
  return (
    <Component className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)}>
      {children}
    </Component>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  as?: 'main' | 'section' | 'div';
}

export const CardContent: React.FC<CardContentProps> = ({ 
  children, 
  className, 
  as: Component = 'div' 
}) => {
  return (
    <Component className={cn('px-6 py-4', className)}>
      {children}
    </Component>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  as?: 'footer' | 'div';
}

export const CardFooter: React.FC<CardFooterProps> = ({ 
  children, 
  className, 
  as: Component = 'div' 
}) => {
  return (
    <Component className={cn('px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl', className)}>
      {children}
    </Component>
  );
};