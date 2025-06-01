import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingScreen from './components/LandingScreen';
import CameraCapture from './components/CameraCapture';
import AnalyzingScreen from './components/AnalyzingScreen';
import ProductRecommendations from './components/ProductRecommendations';
import { useAppStore } from './store';

function App() {
  const { currentStep } = useAppStore();

  useEffect(() => {
    const titles = {
      landing: 'SkinSync - Personalized Makeup Recommendations',
      camera: 'SkinSync - Capture Your Face',
      analyzing: 'SkinSync - Analyzing Your Skin',
      results: 'SkinSync - Your Perfect Matches'
    };
    
    document.title = titles[currentStep];
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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