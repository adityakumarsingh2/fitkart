-- Convert existing products to INR (keeping prices between ₹500 and ₹5,000)
-- Delete accessories and add new clothing items

-- First, update existing products with INR prices (Adjusted to range 500-5000)
UPDATE public.products SET price = 3500 WHERE name = 'Classic Linen Blazer';
UPDATE public.products SET price = 4800 WHERE name = 'Silk Evening Dress';
UPDATE public.products SET price = 2400 WHERE name = 'Tailored Wool Trousers';
UPDATE public.products SET price = 1200 WHERE name = 'Cotton Casual Shirt';
UPDATE public.products SET price = 4200 WHERE name = 'Cashmere Sweater';
UPDATE public.products SET price = 2800 WHERE name = 'Denim Jacket';

-- Delete any accessories (if they exist)
DELETE FROM public.products WHERE category IN ('accessories', 'watches', 'jewelry', 'bags', 'belts', 'hats', 'scarves');

-- Add new clothing items (Prices adjusted between 500 and 5000)
INSERT INTO public.products (name, description, price, category, brand, sizes, colors, images) VALUES

-- Shirts (5 items)
('Formal White Dress Shirt', 'Classic white dress shirt perfect for office and formal occasions', 1800, 'shirts', 'Executive Collection', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['White', 'Light Blue', 'Pink'], ARRAY['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500']),
('Casual Linen Shirt', 'Breathable linen shirt for casual summer days', 1500, 'shirts', 'Summer Breeze', ARRAY['S', 'M', 'L', 'XL'], ARRAY['White', 'Beige', 'Sky Blue'], ARRAY['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500']),
('Polo T-Shirt', 'Classic polo shirt with modern fit', 1200, 'shirts', 'Sport Casual', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Navy', 'Black', 'White', 'Red'], ARRAY['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500']),
('Checked Flannel Shirt', 'Warm flannel shirt with classic check pattern', 1600, 'shirts', 'Rustic Wear', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Red Check', 'Blue Check', 'Green Check'], ARRAY['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500']),
('Oxford Button-Down Shirt', 'Premium Oxford cloth button-down shirt', 1900, 'shirts', 'Classic Gentleman', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['White', 'Light Blue', 'Pink', 'Lavender'], ARRAY['https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500']),

-- Trousers (4 items)
('Slim Fit Chinos', 'Modern slim fit chinos for versatile styling', 2200, 'trousers', 'Urban Fit', ARRAY['28', '30', '32', '34', '36', '38'], ARRAY['Khaki', 'Navy', 'Black', 'Olive'], ARRAY['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500']),
('Formal Dress Trousers', 'Elegant dress trousers for formal occasions', 2600, 'trousers', 'Executive Collection', ARRAY['28', '30', '32', '34', '36', '38'], ARRAY['Charcoal', 'Navy', 'Black'], ARRAY['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500']),
('Cargo Joggers', 'Comfortable cargo joggers with multiple pockets', 1800, 'trousers', 'Street Style', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Black', 'Olive', 'Khaki'], ARRAY['https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=500']),
('Pleated Wide Leg Trousers', 'Trendy wide leg trousers with pleats', 2400, 'trousers', 'Modern Classics', ARRAY['28', '30', '32', '34', '36'], ARRAY['Beige', 'Black', 'Navy'], ARRAY['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500']),

-- Dresses (4 items)
('Floral Summer Dress', 'Light and breezy floral dress perfect for summer', 2800, 'dresses', 'Summer Romance', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Pink Floral', 'Blue Floral', 'Yellow Floral'], ARRAY['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500']),
('Little Black Dress', 'Timeless little black dress for any occasion', 3500, 'dresses', 'Elegance', ARRAY['XS', 'S', 'M', 'L'], ARRAY['Black'], ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500']),
('Maxi Boho Dress', 'Flowing maxi dress with bohemian style', 3200, 'dresses', 'Boho Chic', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Rust', 'Teal', 'Mustard'], ARRAY['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500']),
('Wrap Midi Dress', 'Flattering wrap dress with midi length', 2900, 'dresses', 'Modern Classics', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Navy', 'Burgundy', 'Forest Green'], ARRAY['https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500']),

-- Jackets (3 items)
('Bomber Jacket', 'Classic bomber jacket with modern details', 3900, 'jackets', 'Urban Edge', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Black', 'Olive', 'Navy'], ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500']),
('Leather Biker Jacket', 'Premium leather jacket with asymmetric zip', 4800, 'jackets', 'Rebel Spirit', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'Brown'], ARRAY['https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500']),
('Windbreaker', 'Lightweight windbreaker for outdoor activities', 2500, 'jackets', 'Active Wear', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Black', 'Navy', 'Red', 'Yellow'], ARRAY['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500']),

-- Sweaters (3 items)
('Hooded Sweatshirt', 'Comfortable hoodie for casual wear', 2200, 'sweaters', 'Comfort Zone', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Black', 'Gray', 'Navy', 'Maroon'], ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500']),
('Cardigan Sweater', 'Classic cardigan with button front', 2800, 'sweaters', 'Cozy Knits', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Camel', 'Gray', 'Navy'], ARRAY['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500']),
('Crew Neck Pullover', 'Essential crew neck pullover sweater', 2400, 'sweaters', 'Basics Plus', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Black', 'Gray', 'Navy', 'Burgundy'], ARRAY['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500']),

-- Jeans (3 items)
('Slim Fit Jeans', 'Modern slim fit jeans with stretch', 2500, 'jeans', 'Denim Co', ARRAY['28', '30', '32', '34', '36', '38'], ARRAY['Dark Blue', 'Light Blue', 'Black'], ARRAY['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500']),
('Regular Fit Jeans', 'Classic regular fit jeans for everyday wear', 1800, 'jeans', 'Denim Co', ARRAY['28', '30', '32', '34', '36', '38', '40'], ARRAY['Dark Blue', 'Medium Blue', 'Black'], ARRAY['https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500']),
('Relaxed Fit Jeans', 'Comfortable relaxed fit jeans with room to move', 2100, 'jeans', 'Denim Co', ARRAY['30', '32', '34', '36', '38', '40'], ARRAY['Dark Blue', 'Light Blue', 'Black'], ARRAY['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500']);

