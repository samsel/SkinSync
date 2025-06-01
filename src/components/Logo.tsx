import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      >
        <motion.path
          d="M50 10 C20 10 10 30 10 50 C10 70 20 90 50 90 C80 90 90 70 90 50 C90 30 80 10 50 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M30 40 C40 30 60 30 70 40 C80 50 70 65 50 65 C30 65 20 50 30 40"
          fill="currentColor"
          className="text-primary"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        />
      </svg>
    </motion.div>
  );
};