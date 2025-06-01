import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from './UI/Button';
import { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: index * 0.1 } 
      }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 flex-grow">
        <div className="inline-block px-2 py-1 bg-primary-700/20 text-primary-400 text-xs rounded-md mb-3">
          {product.category}
        </div>
        
        <div className="text-sm text-gray-400 mb-1">{product.brand}</div>
        <h3 className="text-base font-medium text-white mb-3">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <div 
            className="w-5 h-5 rounded-full border border-gray-600" 
            style={{ backgroundColor: product.color_code }}
            title={product.color_name}
          />
          <span className="text-sm text-gray-300">
            {product.color_name}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-md">
            {product.undertone} undertone
          </span>
          <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-md">
            {product.complexion} complexion
          </span>
        </div>
        
        {product.description && (
          <p className="text-sm text-gray-400">
            {product.description}
          </p>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <Button 
          variant="primary" 
          size="sm" 
          className="w-full flex items-center justify-center gap-2"
          onClick={() => window.open(product.purchase_url, '_blank')}
        >
          Purchase <ExternalLink size={14} />
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;