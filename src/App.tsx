import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingScreen from './components/LandingScreen';
import CameraCapture from './components/CameraCapture';
import AnalyzingScreen from './components/AnalyzingScreen';
import ProductRecommendations from './components/ProductRecommendations';
import { useAppStore } from './store';
import { useTheme } from './hooks/useTheme';

function App() {
  const { currentStep } = useAppStore();
  const { theme } = useTheme();

  useEffect(() => {
    // Update page title based on current step
    const titles = {
      landing: 'SkinSync - Personalized Makeup Recommendations',
      camera: 'SkinSync - Capture Your Face',
      analyzing: 'SkinSync - Analyzing Your Skin',
      results: 'SkinSync - Your Perfect Matches'
    };
    
    document.title = titles[currentStep];
  }, [currentStep]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${
      theme === 'dark' 
        ? 'from-gray-900 to-gray-800 text-white' 
        : 'from-gray-50 to-gray-100 text-gray-900'
    } transition-colors duration-300`}>
      <AnimatePresence mode="wait">
        {currentStep === 'landing' && <LandingScreen key="landing" />}
        {currentStep === 'camera' && <CameraCapture key="camera" />}
        {currentStep === 'analyzing' && <AnalyzingScreen key="analyzing" />}
        {currentStep === 'results' && <ProductRecommendations key="results" />}
      </AnimatePresence>
    </div>
  );
}

export default App;