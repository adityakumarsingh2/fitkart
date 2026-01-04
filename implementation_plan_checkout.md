# Implement Checkout Functionality

When the user taps "Proceed to Checkout" on the Cart page, an "Order placed" notification should appear, and the cart should be cleared.

## Proposed Changes

### [Hooks]

#### [MODIFY] [useCart.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/hooks/useCart.tsx)
- Add a `clearCart` mutation that deletes all items for the current user from the `cart_items` table in Supabase.
- Export `clearCart` from the hook.

### [Pages]

#### [MODIFY] [CartPage.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/pages/CartPage.tsx)
- Import `clearCart` from `useCart`.
- Add an `onClick` handler to the "Proceed to Checkout" button.
- The handler should call `clearCart.mutate()`.
- On successful mutation, show a "Order placed successfully!" toast.

## Verification Plan

### Manual Verification
1. Open the application.
2. Add some items to the cart.
3. Navigate to the Cart page.
4. Click the "Proceed to Checkout" button.
5. Verify that a "Order placed successfully!" toast appears.
6. Verify that the cart items are cleared and the "Your cart is empty" message is displayed.
7. Check the Supabase console (or refresh the page) to ensure `cart_items` for the user are actually gone.
