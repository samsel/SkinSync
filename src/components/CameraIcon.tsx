import React from 'react';
import { motion } from 'framer-motion';

export const CameraIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
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
        {/* Camera body */}
        <motion.path
          d="M20 30 H35 L40 25 H60 L65 30 H80 C85 30 90 35 90 40 V75 C90 80 85 85 80 85 H20 C15 85 10 80 10 75 V40 C10 35 15 30 20 30"
          fill="currentColor"
          className="text-primary"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        
        {/* Lens */}
        <motion.circle
          cx="50"
          cy="55"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-gray-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        />
        
        {/* Flash */}
        <motion.rect
          x="65"
          y="40"
          width="8"
          height="8"
          rx="2"
          fill="currentColor"
          className="text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
      </svg>
    </motion.div>
  );
};