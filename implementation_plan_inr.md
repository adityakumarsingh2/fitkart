# Convert Prices to INR and Update Product Catalog

## Goal Description
Convert all product prices from USD ($) to Indian Rupees (₹), add more clothing items to the database, and remove all accessories from the shop. The conversion rate will be approximately 1 USD = ₹83 (rounded for clean pricing).

## User Review Required

> [!IMPORTANT]
> **Currency Symbol Change**: All `$` symbols will be replaced with `₹` throughout the application.

> [!IMPORTANT]
> **Price Conversion**: Existing prices will be multiplied by 83 and rounded to nearest 100 for clean INR pricing (e.g., $299 → ₹24,900).

> [!IMPORTANT]
> **Product Changes**: 
> - Will add 10+ new clothing items (shirts, trousers, dresses, jackets, sweaters)
> - Will remove any accessories if present in the database

## Proposed Changes

### Database Migration

#### [NEW] [convert_to_inr.sql](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/supabase/migrations/convert_to_inr.sql)

**Changes**:
1. Update existing products with INR prices (multiply by 83, round to nearest 100)
2. Delete any products with category 'accessories', 'watches', 'jewelry', 'bags', etc.
3. Insert new clothing products:
   - **Shirts**: Formal shirts, casual shirts, polo shirts (5 items)
   - **Trousers**: Chinos, formal trousers, joggers (4 items)
   - **Dresses**: Casual dresses, formal dresses, maxi dresses (4 items)
   - **Jackets**: Bomber jackets, leather jackets, windbreakers (3 items)
   - **Sweaters**: Hoodies, cardigans, pullovers (3 items)
   - **Jeans**: Slim fit, regular fit, relaxed fit (3 items)

---

### Frontend Price Display Updates

#### [MODIFY] [ProductCard.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/components/ProductCard.tsx)
- Change `$` to `₹` in price display (line 80)
- Update formatting to use Indian number format (e.g., ₹24,900 instead of ₹24900)

#### [MODIFY] [ProductQuickView.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/components/ProductQuickView.tsx)
- Change `$` to `₹` in price display (line 94)

#### [MODIFY] [ProductFilters.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/components/ProductFilters.tsx)
- Change `$` to `₹` in price range display (lines 66-67)
- Update default price range from [0, 1000] to [0, 100000] for INR

#### [MODIFY] [FeaturedProducts.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/components/FeaturedProducts.tsx)
- Change `$` to `₹` in price display (lines 102, 104)
- Update hardcoded prices to INR (multiply by 83)

---

#### [MODIFY] [ProductPage.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/pages/ProductPage.tsx)
- Change `$` to `₹` in price display (line 150)
- Update free shipping threshold from "$100" to "₹5,000" (lines 226, 282)

#### [MODIFY] [TryOnPage.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/pages/TryOnPage.tsx)
- Change `$` to `₹` in price display (line 351)

#### [MODIFY] [CartPage.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/pages/CartPage.tsx)
- Change `$` to `₹` in all price displays (lines 81, 96, 104, 109)
- Update free shipping threshold from "$100" to "₹5,000" (line 120)

#### [MODIFY] [WishlistPage.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/pages/WishlistPage.tsx)
- Change `$` to `₹` in price display (line 77)

#### [MODIFY] [ShopPage.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/pages/ShopPage.tsx)
- Change `$` to `₹` in price range filter display (line 141)
- Update default price range from [0, 1000] to [0, 100000] (lines 44, 48, 49, 85, 88, 140, 146, 163)

#### [MODIFY] [ProfilePage.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/pages/ProfilePage.tsx)
- Change `$` to `₹` in order history (lines 53-54)

## Verification Plan

### Database Verification
1. **Check product prices**:
   ```sql
   SELECT name, price, category FROM products ORDER BY category, price;
   ```
   - Verify all prices are in INR (multiples of 100, in thousands range)
   - Verify no accessories exist

2. **Count products by category**:
   ```sql
   SELECT category, COUNT(*) FROM products GROUP BY category;
   ```
   - Verify we have clothing categories only
   - Verify we have 20+ total products

### Manual Verification

1. **Shop Page**:
   - Navigate to `/shop`
   - Verify all prices show ₹ symbol
   - Verify price filter shows INR ranges (₹0 - ₹100,000)
   - Verify no accessories appear in any category
   - Verify new clothing items are visible

2. **Product Details Page**:
   - Click on any product
   - Verify price shows ₹ symbol
   - Verify "Free shipping on orders over ₹5,000" message

3. **Cart Page**:
   - Add items to cart
   - Navigate to `/cart`
   - Verify all prices show ₹ symbol
   - Verify subtotal, tax, and total show ₹
   - Verify free shipping threshold shows ₹5,000

4. **Try-On Page**:
   - Navigate to `/try-on`
   - Verify product price shows ₹ symbol

5. **Wishlist Page**:
   - Add items to wishlist
   - Navigate to `/wishlist`
   - Verify prices show ₹ symbol

6. **Home Page Featured Products**:
   - Navigate to `/`
   - Scroll to featured products section
   - Verify all prices show ₹ symbol
