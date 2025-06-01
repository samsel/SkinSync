import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are properly formatted URLs
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || '';

// Validate Supabase configuration
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey
  });
  throw new Error('Supabase configuration is missing. Please check your environment variables.');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  console.error('Invalid Supabase URL:', error);
  throw new Error('Invalid Supabase URL format. Please check your VITE_SUPABASE_URL environment variable.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Product categories
export const PRODUCT_CATEGORIES = [
  'Foundation',
  'Concealer',
  'Compact Powder',
  'Setting Powder',
  'Blush',
  'Highlighter'
] as const;

// Types
export interface SkinAnalysisResult {
  undertone: 'warm' | 'cool' | 'neutral';
  complexion: 'fair' | 'light' | 'medium' | 'tan' | 'deep' | 'dark';
  skinType: 'dry' | 'oily' | 'combination' | 'normal';
}

export interface Product {
  id: string;
  category: typeof PRODUCT_CATEGORIES[number];
  brand: string;
  name: string;
  description: string;
  color_name: string;
  color_code: string;
  undertone: SkinAnalysisResult['undertone'];
  complexion: SkinAnalysisResult['complexion'];
  price: number;
  currency: string;
  purchase_url: string;
  image_url: string;
}

// Function to fetch products by category
export const getProductsByCategory = async (category: string) => {
  try {
    console.log('Fetching products for category:', category);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('brand');
    
    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    
    console.log(`Found ${data?.length || 0} products for category:`, category);
    return data || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

// Function to get product recommendations based on skin analysis
export const getRecommendations = async (skinAnalysis: SkinAnalysisResult) => {
  try {
    console.log('Getting recommendations for skin analysis:', skinAnalysis);
    const recommendations: Record<string, Product[]> = {};

    for (const category of PRODUCT_CATEGORIES) {
      console.log(`Fetching recommendations for category: ${category}`);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .eq('undertone', skinAnalysis.undertone)
        .eq('complexion', skinAnalysis.complexion)
        .limit(5);

      if (error) {
        console.error(`Error fetching ${category} recommendations:`, error);
        recommendations[category] = [];
      } else {
        console.log(`Found ${data?.length || 0} recommendations for ${category}`);
        recommendations[category] = data || [];
      }
    }

    return recommendations;
  } catch (error) {
    console.error('Failed to get recommendations:', error);
    throw error;
  }
};

// Sample product data for database seeding
export const productData: Omit<Product, 'id'>[] = [
  {
    category: 'Foundation',
    brand: 'Fenty Beauty',
    name: 'Pro Filtr Soft Matte Longwear Foundation',
    description: 'A soft matte, long-wear foundation with buildable, medium to full coverage.',
    color_name: '150 - Light',
    color_code: '#F5DCBA',
    undertone: 'neutral',
    complexion: 'light',
    price: 39.00,
    currency: 'USD',
    purchase_url: 'https://fentybeauty.com/products/pro-filtr-soft-matte-longwear-foundation',
    image_url: 'https://images.pexels.com/photos/2688991/pexels-photo-2688991.jpeg'
  },
  {
    category: 'Foundation',
    brand: 'Fenty Beauty',
    name: 'Pro Filtr Soft Matte Longwear Foundation',
    description: 'A soft matte, long-wear foundation with buildable, medium to full coverage.',
    color_name: '445 - Deep',
    color_code: '#8B4513',
    undertone: 'warm',
    complexion: 'deep',
    price: 39.00,
    currency: 'USD',
    purchase_url: 'https://fentybeauty.com/products/pro-filtr-soft-matte-longwear-foundation',
    image_url: 'https://images.pexels.com/photos/2688991/pexels-photo-2688991.jpeg'
  },
  {
    category: 'Concealer',
    brand: 'NARS',
    name: 'Radiant Creamy Concealer',
    description: 'Award-winning concealer that provides medium-buildable coverage.',
    color_name: 'Light 2.5 - Creme Brulee',
    color_code: '#F3D5B5',
    undertone: 'neutral',
    complexion: 'light',
    price: 32.00,
    currency: 'USD',
    purchase_url: 'https://www.narscosmetics.com/radiant-creamy-concealer',
    image_url: 'https://images.pexels.com/photos/2688992/pexels-photo-2688992.jpeg'
  },
  {
    category: 'Compact Powder',
    brand: 'Charlotte Tilbury',
    name: 'Airbrush Flawless Finish Setting Powder',
    description: 'A micro-fine powder with a soft-focus finish.',
    color_name: 'Fair',
    color_code: '#F7E2D0',
    undertone: 'cool',
    complexion: 'fair',
    price: 48.00,
    currency: 'USD',
    purchase_url: 'https://www.charlottetilbury.com/airbrush-flawless-finish',
    image_url: 'https://images.pexels.com/photos/2688993/pexels-photo-2688993.jpeg'
  },
  {
    category: 'Setting Powder',
    brand: 'Laura Mercier',
    name: 'Translucent Loose Setting Powder',
    description: 'A cult-favorite setting powder for all skin tones.',
    color_name: 'Translucent',
    color_code: '#FFF5EA',
    undertone: 'neutral',
    complexion: 'light',
    price: 40.00,
    currency: 'USD',
    purchase_url: 'https://www.lauramercier.com/translucent-loose-setting-powder',
    image_url: 'https://images.pexels.com/photos/2688994/pexels-photo-2688994.jpeg'
  },
  {
    category: 'Blush',
    brand: 'NARS',
    name: 'Blush',
    description: 'The ultimate authority in blush, the perfect cheek color.',
    color_name: 'Orgasm',
    color_code: '#FF9B8C',
    undertone: 'warm',
    complexion: 'light',
    price: 32.00,
    currency: 'USD',
    purchase_url: 'https://www.narscosmetics.com/blush',
    image_url: 'https://images.pexels.com/photos/2688995/pexels-photo-2688995.jpeg'
  },
  {
    category: 'Highlighter',
    brand: 'Rare Beauty',
    name: 'Positive Light Liquid Luminizer',
    description: 'A silky, second-skin liquid highlighter.',
    color_name: 'Enlighten',
    color_code: '#FFE1BF',
    undertone: 'warm',
    complexion: 'light',
    price: 25.00,
    currency: 'USD',
    purchase_url: 'https://www.rarebeauty.com/positive-light-liquid-luminizer',
    image_url: 'https://images.pexels.com/photos/2688996/pexels-photo-2688996.jpeg'
  }
];

// Function to seed the database (run this once)
export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    const { error } = await supabase
      .from('products')
      .insert(productData);
    
    if (error) {
      console.error('Error seeding database:', error);
      return false;
    }
    
    console.log('Database seeding completed successfully');
    return true;
  } catch (error) {
    console.error('Failed to seed database:', error);
    throw error;
  }
};