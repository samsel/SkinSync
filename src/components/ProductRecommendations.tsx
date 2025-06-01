import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Redo2 } from 'lucide-react';
import ProductCard from './ProductCard';
import { Button } from './UI/Button';
import { useAppStore } from '../store';
import { Logo } from './Logo';
import { PRODUCT_CATEGORIES } from '../lib/supabase';

const ProductRecommendations: React.FC = () => {
  const { recommendations, skinAnalysis, setCurrentStep } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleRetake = () => {
    setCurrentStep('camera');
  };

  const totalRecommendations = Object.values(recommendations).reduce(
    (sum, products) => sum + Math.min(products.length, 3), 
    0
  );

  // Filter and limit products based on selected category
  const displayProducts = selectedCategory
    ? recommendations[selectedCategory]?.slice(0, 3) || []
    : Object.entries(recommendations).flatMap(([category, products]) => 
        products.slice(0, 3).map(product => ({ ...product, category }))
      );

  return (
    <motion.div 
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
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
        <div className="bg-gray-800/50 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Logo className="w-8 h-8" />
              </motion.div>
              <motion.h2 
                className="text-xl font-medium text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Found {totalRecommendations} perfect matches
              </motion.h2>
            </div>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="text-xs uppercase tracking-wider text-gray-400">Undertone</div>
                <div className="px-3 py-1 bg-gray-800 rounded-full text-sm font-medium text-white capitalize">
                  {skinAnalysis.undertone}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs uppercase tracking-wider text-gray-400">Complexion</div>
                <div className="px-3 py-1 bg-gray-800 rounded-full text-sm font-medium text-white capitalize">
                  {skinAnalysis.complexion}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs uppercase tracking-wider text-gray-400">Skin Type</div>
                <div className="px-3 py-1 bg-gray-800 rounded-full text-sm font-medium text-white capitalize">
                  {skinAnalysis.skinType}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="px-4 py-3 max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={selectedCategory === null ? "primary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Products
            </Button>
            {PRODUCT_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-grow px-4 pb-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto pt-6">
          {displayProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        {displayProducts.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">
              No recommendations available
              {selectedCategory && ` for ${selectedCategory}`}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductRecommendations;