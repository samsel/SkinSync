import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Zap, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Button } from './UI/Button';
import { useAppStore } from '../store';
import { Logo } from './Logo';

const LandingScreen: React.FC = () => {
  const { setCurrentStep } = useAppStore();

  const handleStartCapture = () => {
    setCurrentStep('camera');
  };

  const features = [
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Just take a picture and our Advanced AI technology analyzes your unique features in milliseconds",
      gradient: "from-violet-500 to-fuchsia-500"
    },
    {
      icon: Sparkles,
      title: "Perfect Match",
      description: "Find your ideal makeup shades instantly based on your skin tone",
      gradient: "from-fuchsia-500 to-rose-500"
    },
    {
      icon: ShoppingBag,
      title: "Smart Shopping",
      description: "Shop your perfect matches directly from top beauty brands",
      gradient: "from-rose-500 to-violet-500"
    }
  ];

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-full px-4 py-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
        Take a selfie to discover your perfect makeup matches! Our AI beauty advisor analyzes your unique skin tone, undertones, and facial features to recommend personalized makeup products that will enhance your natural beauty.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center gap-4"
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

        <motion.div 
          className="flex items-center gap-2 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <ShieldCheck size={16} className="text-primary-400" />
          <span>Your privacy matters! We don't store any photos - they're analyzed instantly and deleted.</span>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br" />
            
            <div className="relative p-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="mb-4"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient}`}>
                  <feature.icon size={24} className="text-white" />
                </div>
              </motion.div>

              <motion.h3 
                className="text-xl font-semibold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                {feature.title}
              </motion.h3>

              <motion.p 
                className="text-sm leading-relaxed text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                {feature.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LandingScreen;