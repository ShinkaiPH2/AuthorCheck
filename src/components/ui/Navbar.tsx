import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { BrainIcon } from './Icons';

export const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/analyze', label: 'Analyze' },
    { to: '/learn-more', label: 'Learn More' },
  ];
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-primary-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-9 h-9 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
            <BrainIcon size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
            AuthorCheck
          </span>
        </Link>
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center space-x-2 md:space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg font-medium text-base border border-transparent transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 outline-none focus:outline-none ${location.pathname === link.to ? 'bg-primary-200 dark:bg-primary-800 text-primary-700 dark:text-primary-200' : 'text-gray-700 dark:text-gray-200'}`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
        {/* Hamburger menu button for mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6 text-primary-600 dark:text-primary-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        {/* Mobile nav menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-b border-primary-100 dark:border-gray-800 flex flex-col items-center py-4 md:hidden animate-fade-in">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`w-11/12 text-center my-2 px-4 py-3 rounded-lg font-medium text-lg border border-transparent transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 outline-none focus:outline-none ${location.pathname === link.to ? 'bg-primary-200 dark:bg-primary-800 text-primary-700 dark:text-primary-200' : 'text-gray-700 dark:text-gray-200'}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}; 