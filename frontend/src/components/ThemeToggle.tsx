import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useThemeStore } from '../store/themeStore';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, setTheme } = useThemeStore();

  useEffect(() => {
    // Apply theme on mount
    setTheme(theme);
  }, []);

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-1 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 28 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {theme === 'light' ? (
          <SunIcon className="w-4 h-4 text-yellow-500" />
        ) : (
          <MoonIcon className="w-4 h-4 text-blue-500" />
        )}
      </motion.div>
    </motion.button>
  );
};
