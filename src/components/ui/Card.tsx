import { clsx } from 'clsx';
import { CardProps } from '../../types';

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={clsx(
        'bg-white/90 dark:bg-gray-900/80',
        'rounded-2xl border-2 border-primary-300 dark:border-gray-700/70',
        'shadow-2xl dark:shadow-lg',
        'p-6',
        className
      )}
    >
      {children}
    </div>
  );
};
