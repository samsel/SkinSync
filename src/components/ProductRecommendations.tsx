import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Redo2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCard from './ProductCard';
import { Button } from './UI/Button';
import { useAppStore } from '../store';
import { PRODUCT_CATEGORIES } from '../lib/supabase';

const ProductRecommendations: React.FC = () => {
  const { recommendations, skinAnalysis, setCurrentStep } = useAppStore();
  const [activeCategory, setActiveCategory] = useState(PRODUCT_CATEGORIES[0]);

  const handleRetake = () => {
    setCurrentStep('camera');
  };

  return (
    <motion.div 
      className="flex flex-col h-full pb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-800">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => setCurrentStep('landing')}
        >
          <ChevronLeft size={16} />
          Home
        </Button>
        <h1 className="text-xl font-bold">Your Matches</h1>
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
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 mb-4">
          <h2 className="text-lg font-medium mb-2">Your Skin Analysis</h2>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
              Undertone: <span className="font-medium capitalize">{skinAnalysis.undertone}</span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
              Complexion: <span className="font-medium capitalize">{skinAnalysis.complexion}</span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
              Skin Type: <span className="font-medium capitalize">{skinAnalysis.skinType}</span>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 mb-4 overflow-x-auto">
        <div className="flex space-x-2">
          {PRODUCT_CATEGORIES.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow px-4 overflow-hidden">
        {recommendations[activeCategory] && recommendations[activeCategory].length > 0 ? (
          <Swiper
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={false}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 3.2,
              },
            }}
          >
            {recommendations[activeCategory].map((product, index) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">
              No recommendations available for {activeCategory}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductRecommendations;