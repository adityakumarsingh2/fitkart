# Implement Orders Page and Checkout Persistence

This plan outlines the steps to persist orders during checkout and display them in a new "Orders" page.

## Proposed Changes

### [Hooks]

#### [MODIFY] [useCart.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/hooks/useCart.tsx)
- Add a `checkout` mutation that:
    - Inserts a new record into the `orders` table with:
        - `user_id`: current user ID
        - `total_amount`: current cart total (including tax)
        - `items`: JSON array of current cart items (including product details)
        - `status`: 'pending'
    - Deletes all items from the `cart_items` table for the user.
- Export `checkout` mutation instead of (or in addition to) `clearCart`.

#### [NEW] [useOrders.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/hooks/useOrders.tsx)
- Create a new hook to fetch orders for the authenticated user from the `orders` table.

### [Pages]

#### [NEW] [OrdersPage.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/pages/OrdersPage.tsx)
- Create a new page to display the user's order history.
- Use a list layout similar to the mock orders in `ProfilePage`.

#### [MODIFY] [CartPage.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/pages/CartPage.tsx)
- Update the "Proceed to Checkout" button to call `checkout.mutate()` instead of `clearCart.mutate()`.

#### [MODIFY] [ProfilePage.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/pages/ProfilePage.tsx)
- Replace mock orders with real data using the `useOrders` hook.
- Add a button to navigate to the full Orders page if necessary, or just keep it in the tab.

### [Routing & Navigation]

#### [MODIFY] [App.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/App.tsx)
- Add a new route for `/orders`.

#### [MODIFY] [Navbar.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/components/Navbar.tsx)
- Add a link to "My Orders" in the user dropdown or navigation menu.

## Verification Plan

### Manual Verification
1. Add items to the cart.
2. Proceed to checkout on the Cart page.
3. Verify the "Order placed successfully!" toast appears.
4. Navigate to the new Orders page (or the Orders tab in Profile).
5. Verify that the new order is listed with correct items, date, and total amount.
6. Verify that the cart is empty.
7. Repeat with multiple orders and verify they all appear in chronological order.
