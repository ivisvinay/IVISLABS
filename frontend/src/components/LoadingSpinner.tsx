import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 border-t-primary rounded-full`}
      />
    </div>
  );
};

export const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center"
        >
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </motion.div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-600 dark:text-gray-400 font-medium"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};
