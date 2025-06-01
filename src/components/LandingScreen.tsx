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
        
        <motion.p 
          className="text-xl mb-12 max-w-2xl mx-auto text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Take a selfie to{' '}
          <span className="relative inline-block">
            discover your perfect makeup matches
            <span className="absolute left-0 right-0 bottom-1 h-[6px] bg-gradient-to-r from-primary-400/20 via-primary-400/40 to-primary-400/20 rounded-full blur-[1px] transform -skew-x-12"></span>
          </span>
          {' '}Our AI analyzes your unique features to find products that complement your natural beauty.
        </motion.p>
        
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
        className="w-full py-4 px-4 border-t border-gray-800"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-2 text-sm text-gray-400 whitespace-nowrap">
          <ShieldCheck size={20} className="flex-shrink-0 text-primary-400" />
          <span>Your privacy matters! We don't store any photos - they're analyzed instantly and deleted.</span>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default LandingScreen;