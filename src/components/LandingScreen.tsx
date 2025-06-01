import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ShieldCheck } from 'lucide-react';
import { Button } from './UI/Button';
import { useAppStore } from '../store';
import { Logo } from './Logo';

const LandingScreen: React.FC = () => {
  const { setCurrentStep } = useAppStore();

  const handleStartCapture = () => {
    setCurrentStep('camera');
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-16 text-center">
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Logo className="w-20 h-20" />
          <motion.h1 
            className="text-5xl font-bold text-primary"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            SkinSync
          </motion.h1>
        </motion.div>
        
        <motion.div 
          className="mb-12 max-w-2xl mx-auto px-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xl mb-2 text-gray-300">
            Take a selfie to discover your perfect makeup matches.
          </p>
          <p className="text-sm font-light text-gray-400">
            Our AI analyzes your unique features to find products that complement your natural beauty.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-md"
        >
          <Button 
            onClick={handleStartCapture}
            variant="primary" 
            size="lg" 
            className="rounded-full px-8 py-6 text-lg flex items-center gap-3 w-full justify-center"
          >
            <Camera size={24} className="flex-shrink-0" />
            Take a snap
          </Button>
        </motion.div>
      </div>

      <motion.footer 
        className="w-full py-6 px-4 border-t border-gray-800 mt-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 text-center">
          <ShieldCheck size={16} className="flex-shrink-0 text-primary-400" />
          <span>Your privacy matters! We don't store any photos - they're analyzed instantly and deleted.</span>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default LandingScreen;