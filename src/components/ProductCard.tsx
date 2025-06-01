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
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col"
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
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="inline-block px-2 py-1 bg-primary/90 text-white text-xs rounded-md">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="text-sm text-gray-600 mb-1">{product.brand}</div>
        <h3 className="text-base font-medium text-gray-900 mb-3">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <div 
            className="w-5 h-5 rounded-full border border-gray-200" 
            style={{ backgroundColor: product.color_code }}
            title={product.color_name}
          />
          <span className="text-sm text-gray-600">
            {product.color_name}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-md">
            {product.undertone} undertone
          </span>
          <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-md">
            {product.complexion} complexion
          </span>
        </div>
        
        {product.description && (
          <p className="text-sm text-gray-600">
            {product.description}
          </p>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-100">
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