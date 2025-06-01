import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Redo2 } from 'lucide-react';
import ProductCard from './ProductCard';
import { Button } from './UI/Button';
import { useAppStore } from '../store';
import { Logo } from './Logo';

const ProductRecommendations: React.FC = () => {
  const { recommendations, skinAnalysis, setCurrentStep } = useAppStore();

  const handleRetake = () => {
    setCurrentStep('camera');
  };

  const totalRecommendations = Object.values(recommendations).reduce(
    (sum, products) => sum + products.length, 
    0
  );

  const allProducts = Object.values(recommendations).flat();

  return (
    <motion.div 
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => setCurrentStep('landing')}
        >
          <ChevronLeft size={16} />
          Home
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleRetake}
        >
          <Redo2 size={16} />
          Retake
        </Button>
      </div>

      {skinAnalysis && (
        <div className="bg-primary-50 px-4 py-8 md:py-12 mb-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Logo className="w-10 h-10" />
              </motion.div>
              <motion.h2 
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Wow! I've found {totalRecommendations} matches for you
              </motion.h2>
            </div>

            <motion.p 
              className="text-lg text-gray-600 mb-8 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Based on your skin analysis, here are your perfect matches customized just for you!
            </motion.p>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div 
                className="bg-white rounded-lg p-6 shadow-sm border border-primary-100"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-sm text-primary-600 font-medium mb-1">Your undertone</div>
                <div className="text-2xl font-semibold text-gray-900 capitalize">
                  {skinAnalysis.undertone}
                </div>
              </motion.div>
              <motion.div 
                className="bg-white rounded-lg p-6 shadow-sm border border-primary-100"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-sm text-primary-600 font-medium mb-1">Your complexion</div>
                <div className="text-2xl font-semibold text-gray-900 capitalize">
                  {skinAnalysis.complexion}
                </div>
              </motion.div>
              <motion.div 
                className="bg-white rounded-lg p-6 shadow-sm border border-primary-100"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-sm text-primary-600 font-medium mb-1">Your skin type</div>
                <div className="text-2xl font-semibold text-gray-900 capitalize">
                  {skinAnalysis.skinType}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      <div className="flex-grow px-4 pb-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {allProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        {allProducts.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">
              No recommendations available
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductRecommendations;