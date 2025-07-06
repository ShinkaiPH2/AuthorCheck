import { clsx } from 'clsx';
import { ButtonProps } from '../../types';

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  children, 
  onClick, 
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400';
  
  const variants = {
    primary: [
      'bg-gradient-to-r from-primary-500 to-secondary-500 text-white',
      'shadow-lg',
      'border-2 border-primary-500',
      'hover:from-primary-600 hover:to-secondary-600',
      'focus:ring-2 focus:ring-primary-400',
      'dark:border-primary-400',
    ].join(' '),
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg',
    outline: [
      'border-2 border-primary-500 dark:border-primary-400',
      'bg-white dark:bg-transparent',
      'text-primary-700 dark:text-primary-400',
      'hover:bg-primary-50 dark:hover:bg-primary-900',
      'hover:border-primary-600 dark:hover:border-primary-300',
      'focus:ring-2 focus:ring-primary-400',
    ].join(' '),
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
