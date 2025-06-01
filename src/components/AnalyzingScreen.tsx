import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, AlertCircle } from 'lucide-react';
import ParticleCanvas from './UI/ParticleCanvas';
import { useAppStore } from '../store';
import { analyzeSkinTone } from '../services/colorAnalysis';
import { getRecommendations } from '../lib/supabase';
import { Button } from './UI/Button';

const AnalyzingScreen: React.FC = () => {
  const { capturedImage, setCurrentStep, setSkinAnalysis, setRecommendations } = useAppStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!capturedImage) {
      setCurrentStep('camera');
      return;
    }

    const processImage = async () => {
      try {
        console.log('Starting image processing...');
        
        // Step 1: Analyze the skin tone
        const analysisResult = await analyzeSkinTone(capturedImage);
        
        // Check if there was an error from the Llama API
        if ('error' in analysisResult) {
          throw new Error(analysisResult.error);
        }
        
        console.log('Skin analysis completed:', analysisResult);
        setSkinAnalysis(analysisResult);
        
        // Step 2: Get product recommendations based on the analysis
        const recommendedProducts = await getRecommendations(analysisResult);
        console.log('Product recommendations received:', recommendedProducts);
        setRecommendations(recommendedProducts);
        
        // Step 3: Move to results screen
        setTimeout(() => {
          setCurrentStep('results');
        }, 1000); // Additional delay for smooth transition
      } catch (error) {
        console.error('Analysis failed:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    };

    processImage();
  }, [capturedImage, setCurrentStep, setSkinAnalysis, setRecommendations]);

  const handleRetry = () => {
    setError(null);
    setCurrentStep('camera');
  };

  if (error) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center h-full p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-400 mb-2">Analysis Failed</h3>
          <p className="text-gray-300 mb-6">{error}</p>
          <Button onClick={handleRetry} variant="primary">
            Try Again
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="relative flex flex-col items-center justify-center h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParticleCanvas className="absolute inset-0 w-full h-full" />
      
      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto px-4">
        {capturedImage && (
          <div className="relative w-64 h-64 mb-8">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/20 rounded-full"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <img 
              src={capturedImage} 
              alt="Captured face" 
              className="w-full h-full object-cover rounded-full"
            />
            <motion.div 
              className="absolute inset-0 border-4 border-primary rounded-full"
              animate={{ 
                rotate: 360,
                borderColor: ['#6B7280', '#9CA3AF', '#6B7280']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        )}
        
        <motion.div 
          className="flex items-center gap-3 bg-gray-800/10 backdrop-blur-md px-6 py-4 rounded-full mb-4"
          animate={{ y: [0, -5, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <Scan className="text-primary" />
          <span className="text-xl font-medium">Analyzing your skin...</span>
        </motion.div>
        
        <motion.div 
          className="w-full bg-gray-800/20 h-2 rounded-full overflow-hidden"
          initial={{ width: '100%', opacity: 0.7 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-primary-600"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </motion.div>
        
        <motion.p 
          className="mt-4 text-center text-sm text-gray-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Our AI is analyzing your skin tone, undertone, and features to find your perfect match
        </motion.p>
      </div>
    </motion.div>
  );
};

export default AnalyzingScreen;