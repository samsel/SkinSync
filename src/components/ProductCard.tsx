import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Heart } from 'lucide-react';
import { Button } from './UI/Button';
import { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: index * 0.1 } 
      }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-square">
        <img 
          src={product.image_url} 
          alt={`${product.brand} ${product.name} - ${product.color_name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/40">
            <Heart size={18} />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs rounded-full mb-2">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="font-bold text-gray-800 dark:text-white mb-1">{product.brand}</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{product.name}</h3>
        
        <div className="mt-2 flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full border border-gray-200" 
            style={{ backgroundColor: product.color_code }}
            title={product.color_name}
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {product.color_name}
          </span>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            {product.undertone} undertone
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            {product.complexion} complexion
          </span>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {product.description}
        </p>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
        <Button 
          variant="secondary" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => window.open(product.purchase_url, '_blank')}
        >
          Purchase <ExternalLink size={14} />
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;