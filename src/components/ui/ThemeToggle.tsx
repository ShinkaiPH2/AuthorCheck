import { useTheme } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon } from './Icons';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    >
      {theme === 'dark' ? (
        <MoonIcon size={20} className="text-white" />
      ) : (
        <SunIcon size={20} className="text-white" />
      )}
    </button>
  );
}; 