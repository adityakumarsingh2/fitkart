# Local MongoDB Synchronization Plan

## Goal Description
Set up a local Node.js/Express server that runs alongside the existing Supabase integration. This server will connect to a local MongoDB instance ("database") and verify that data operations (User Registration, Orders, Cart, etc.) are synchronized between Supabase and the local MongoDB.

## User Review Required
> [!IMPORTANT]
> **Simultaneous Updates**: The frontend will be modified to "dual-write" to both Supabase and the local server.

> [!NOTE]
> **Database Name**: The local MongoDB database is named `database`. Connection string assumed to be `mongodb://localhost:27017/database`.

## Proposed Changes

### Backend (New `server/` Directory)
Create a new Node.js project in `server/` with `express`, `mongoose`, `cors`, `dotenv`.

#### [NEW] [server/index.js](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/server/index.js)
Main server file.

#### [NEW] server/models/*.js
- **`Profile`**: `user_id` (String), `full_name`, `email`, `avatar_url`, `body_measurements` (Object), `style_preferences` (Array).
- **`Product`**: `id` (UUID), `name`, `description`, `price`, `category`, `brand`, `sizes` (Array), `colors` (Array), `images` (Array), `stock_quantity`.
- **`Order`**: `user_id`, `status` (default 'pending'), `total_amount`, `shipping_address` (Object), `items` (Object/Array).
- **`CartItem`**: `user_id`, `product_id`, `size`, `color`, `quantity`.
- **`WishlistItem`**: `user_id`, `product_id`.
- **`UserRole`**: `user_id`, `role`.

#### [NEW] server/routes/sync.js
API endpoints handling `POST` requests to upsert data into these collections.

### Frontend (`src/`)

#### [NEW] [src/services/localSync.ts](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/services/localSync.ts)
Service to handle API calls (e.g., `syncProfile`, `syncCart`, `syncOrder`).

#### [MODIFY] [src/hooks/useAuth.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/hooks/useAuth.tsx)
- Call `localSync.syncProfile` in `signUp` and `updateProfile`.

#### [MODIFY] src/hooks/*.tsx
- `useCart.tsx`: Call `syncCart` on add/remove.
- `useOrders.tsx`: Call `syncOrder` on creation.

## Verification Plan

### Manual Verification
1.  **Start Local Server**: `npm start` in `server/`.
2.  **Register User**: Sign up a new user; verify in MongoDB `profiles` collection.
3.  **Shop**: Add items to cart, place order; verify in MongoDB `cart_items` and `orders`.
