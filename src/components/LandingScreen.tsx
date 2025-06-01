import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ShieldCheck } from 'lucide-react';
import { Button } from './UI/Button';
import { useAppStore } from '../store';
import { Logo } from './Logo';
import SkinToneStrip from './UI/SkinToneStrip';

const LandingScreen: React.FC = () => {
  const { setCurrentStep } = useAppStore();

  const handleStartCapture = () => {
    setCurrentStep('camera');
  };

  const valueProps = [
    {
      title: "Take a Selfie",
      description: "Snap a quick photo in natural light",
      delay: 0.2
    },
    {
      title: "AI Analysis",
      description: "Get instant analysis of your unique skin",
      delay: 0.3
    },
    {
      title: "Perfect Match",
      description: "Discover makeup that works for you",
      delay: 0.4
    }
  ];

  return (
    <motion.div 
      className="flex flex-col min-h-[100dvh] text-center bg-gradient-to-b from-gray-900 via-gray-900 to-primary-900/50 safe-top safe-bottom relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-4 safe-top safe-bottom">
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8 px-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Logo className="w-16 h-16 sm:w-20 sm:h-20 text-primary-400" />
          <motion.h1 
            className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 text-transparent bg-clip-text"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            SkinSync
          </motion.h1>
        </motion.div>
        
        <motion.div 
          className="mb-10 sm:mb-12 w-full max-w-2xl mx-auto px-4 sm:px-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative p-2 overflow-hidden backdrop-blur-sm border border-primary-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-accent-500/10 to-primary-600/10"></div>
            <div className="absolute inset-0 bg-primary-950/30"></div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-light mb-2 bg-gradient-to-r from-primary-300 via-white to-accent-300 text-transparent bg-clip-text">
                your natural beauty + makeup = sync
              </h2>
              <p className="text-sm font-light text-gray-300 max-w-md mx-auto">
                Get beauty recs powered by AI that actually gets you.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative px-4 mb-8"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <Button 
            onClick={handleStartCapture}
            variant="primary" 
            size="lg" 
            className="relative h-16 rounded-full text-2xl font-medium px-12 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 border-2 border-primary-400/20"
          >
            <span className="flex items-center justify-center gap-3">
              <Camera className="w-6 h-6 sm:w-7 sm:h-7" />
              Take a snap
            </span>
          </Button>
        </motion.div>

        {/* Value Proposition Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: prop.delay }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10 blur-xl transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 p-3 sm:p-6 h-full transform hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-sm sm:text-lg font-medium text-white mb-1 sm:mb-2">{prop.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 sm:line-clamp-none">{prop.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <motion.footer
        className="w-full py-3 px-4 border-t border-gray-800/50 bg-gray-900/80 backdrop-blur-sm relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <SkinToneStrip />
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-3 text-sm font-light text-gray-400">
          <ShieldCheck size={18} className="flex-shrink-0 text-primary-400" />
          <span>Your privacy matters. Photos are analyzed instantly and never stored.</span>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default LandingScreen;