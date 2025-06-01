import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
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
      className="flex flex-col items-center justify-center min-h-full px-4 py-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="mb-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Logo className="w-32 h-32" />
      </motion.div>
      
      <motion.h1 
        className="text-5xl font-bold mb-4 text-primary"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        SkinSync
      </motion.h1>
      
      <motion.p 
        className="text-xl mb-12 max-w-md mx-auto text-gray-300"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Your personal beauty companion for perfect makeup matches
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button 
          onClick={handleStartCapture}
          variant="primary" 
          size="lg" 
          className="rounded-full px-8 py-6 text-lg flex items-center gap-2"
        >
          <Camera size={20} />
          Take a snap
        </Button>
      </motion.div>
      
      <motion.div 
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[
          {
            title: "Instant Analysis",
            description: "Our AI analyzes your facial features in seconds"
          },
          {
            title: "Perfect Match",
            description: "Find makeup products that perfectly match your skin tone"
          },
          {
            title: "Shop Directly",
            description: "Purchase recommended products from your favorite brands"
          }
        ].map((feature, index) => (
          <div key={index} className="p-6 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LandingScreen;