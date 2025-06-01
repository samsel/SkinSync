/*
  # Create products table for makeup recommendations

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `category` (text) - Type of makeup product
      - `brand` (text) - Manufacturer/brand name
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `color_name` (text) - Name of the color variant
      - `color_code` (text) - Hex code of the color
      - `undertone` (text) - Warm/cool/neutral undertone
      - `complexion` (text) - Fair/light/medium/tan/deep/dark skin tone
      - `price` (numeric) - Product price
      - `currency` (text) - Price currency
      - `purchase_url` (text) - URL to purchase the product
      - `image_url` (text) - Product image URL
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access
    - Add policy for authenticated users to insert products
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  brand text NOT NULL,
  name text NOT NULL,
  description text,
  color_name text NOT NULL,
  color_code text NOT NULL,
  undertone text NOT NULL,
  complexion text NOT NULL,
  price numeric NOT NULL,
  currency text NOT NULL,
  purchase_url text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_undertone CHECK (undertone IN ('warm', 'cool', 'neutral')),
  CONSTRAINT valid_complexion CHECK (complexion IN ('fair', 'light', 'medium', 'tan', 'deep', 'dark'))
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);