import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Redo2 } from 'lucide-react';
import ProductCard from './ProductCard';
import { Button } from './UI/Button';
import { useAppStore } from '../store';

const ProductRecommendations: React.FC = () => {
  const { recommendations, skinAnalysis, setCurrentStep } = useAppStore();

  const handleRetake = () => {
    setCurrentStep('camera');
  };

  // Calculate total number of recommendations
  const totalRecommendations = Object.values(recommendations).reduce(
    (sum, products) => sum + products.length, 
    0
  );

  // Combine all products into a single array
  const allProducts = Object.values(recommendations).flat();

  return (
    <motion.div 
      className="flex flex-col h-full pb-6"
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
        <div className="bg-white p-6 mb-4 border-b border-gray-100">
          <h2 className="text-2xl font-medium mb-3 text-gray-900">
            Wow! I've found {totalRecommendations} matches for you! 🎉
          </h2>
          <p className="text-gray-600 mb-4">
            Based on your skin analysis, you have a {skinAnalysis.undertone} undertone, 
            {' '}{skinAnalysis.complexion} complexion, and {skinAnalysis.skinType} skin type. 
            Check out these awesome personalized options below!
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="bg-gray-50 px-3 py-1 rounded-md text-sm text-gray-900">
              {skinAnalysis.undertone} undertone
            </div>
            <div className="bg-gray-50 px-3 py-1 rounded-md text-sm text-gray-900">
              {skinAnalysis.complexion} complexion
            </div>
            <div className="bg-gray-50 px-3 py-1 rounded-md text-sm text-gray-900">
              {skinAnalysis.skinType} skin
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow px-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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