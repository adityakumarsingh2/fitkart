# Local MongoDB Sync Walkthrough

I have implemented a dual-write system where actions on the frontend (Sign Up, Add to Cart, Checkout) are synchronized to a local MongoDB instance ("database") alongside Supabase.

## Changes Implemented

### Backend (`/server`)
- **Initialized Node.js Server**: Created `package.json`, installed `express`, `mongoose`, `cors`.
- **Mongoose Schemas**: Defined schemas matching Supabase tables:
    - [Profile.js](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/server/models/Profile.js)
    - [Product.js](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/server/models/Product.js)
    - [Order.js](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/server/models/Order.js)
    - [CartItem.js](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/server/models/CartItem.js)
- **API Routes**: Created [sync.js](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/server/routes/sync.js) to handle `POST` requests for syncing data.

### Frontend (`/src`)
- **[localSync.ts](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/services/localSync.ts)**: Service to communicate with the local server.
- **Hooks Integration**:
    - `useAuth`: Syncs profile on `signUp` and `updateProfile`.
    - `useCart`: Syncs cart items on `addToCart`, `updateQuantity`, and removes on `removeFromCart`. Syncs created order in `checkout`.

## How to Run

1.  **Start Local MongoDB**: Ensure MongoDB is running locally on port 27017.
2.  **Start Sync Server**:
    ```bash
    cd server
    npm install
    npm start
    ```
    The server runs on port 5000.
3.  **Start Frontend**:
    ```bash
    npm run dev
    ```

## Verification Steps
1.  **Register a New User**: The user should appear in both Supabase `profiles` table and MongoDB `profiles` collection.
2.  **Add to Cart**: Items should appear in MongoDB `cartitems` collection.
3.  **Checkout**: The created order should appear in MongoDB `orders` collection.

> [!NOTE]
> If the local server is not running, the frontend will log a warning to the console but continue to function with Supabase.
