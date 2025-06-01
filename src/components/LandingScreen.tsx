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
      className="flex flex-col min-h-[100dvh] text-center bg-gradient-to-b from-gray-900 via-gray-900 to-primary-900/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <motion.div 
          className="flex items-center gap-4 mb-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Logo className="w-16 h-16 text-primary-400" />
          <motion.h1 
            className="text-6xl font-bold bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 text-transparent bg-clip-text"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            SkinSync
          </motion.h1>
        </motion.div>
        
        <motion.div 
          className="mb-16 max-w-2xl mx-auto px-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative p-8 rounded-2xl overflow-hidden backdrop-blur-sm border border-primary-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-accent-500/10 to-primary-600/10"></div>
            <div className="absolute inset-0 bg-primary-950/30"></div>
            <div className="relative">
              <h2 className="text-3xl font-light mb-4 bg-gradient-to-r from-primary-300 via-white to-accent-300 text-transparent bg-clip-text">
                Discover your perfect makeup match
              </h2>
              <p className="text-sm font-light text-gray-300">
                Our AI analyzes your skin & recommends products that enhance your natural beauty
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <Button 
            onClick={handleStartCapture}
            variant="primary" 
            size="lg" 
            className="relative h-16 rounded-full text-2xl font-medium px-12 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 border-2 border-primary-400/20"
          >
            <span className="flex items-center justify-center gap-3">
              <Camera className="w-7 h-7" />
              Take a snap
            </span>
          </Button>
        </motion.div>
      </main>

      <motion.footer 
        className="w-full py-4 px-4 border-t border-gray-800/50 mt-auto bg-gray-900/80 backdrop-blur-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-3 text-sm font-light text-gray-400">
          <ShieldCheck size={18} className="flex-shrink-0 text-primary-400" />
          <span>Your privacy matters. Photos are analyzed instantly and never stored.</span>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default LandingScreen;