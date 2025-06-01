import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      <div className="absolute inset-0 bg-primary rounded-lg rotate-45" />
      <div className="absolute inset-[2px] bg-white rounded-lg rotate-45" />
      <div className="absolute inset-[4px] bg-primary rounded-lg rotate-45">
        <div className="absolute inset-0 flex items-center justify-center -rotate-45">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      </div>
    </motion.div>
  );
};