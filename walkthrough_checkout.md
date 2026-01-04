# Checkout Functionality Walkthrough

I have implemented the checkout functionality as requested. Now, when you tap "Proceed to Checkout" on the Cart page, the following happens:
1. The cart is cleared from the database.
2. A "Order placed successfully!" notification appears.

## Changes Made

### [Hooks]

#### [useCart.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/hooks/useCart.tsx)
- Added a `clearCart` mutation using `useMutation` from `@tanstack/react-query`.
- This mutation deletes all entries in the `cart_items` table for the current authenticated user.

### [Pages]

#### [CartPage.tsx](file:///c:/Users/Aditya%20Kumar%20Singh/project/fitkart-1/src/pages/CartPage.tsx)
- Updated the "Proceed to Checkout" button to trigger the `clearCart` mutation.
- Added a loading state to the button while the mutation is in progress.
- Added a `toast.success` notification from the `sonner` library to inform the user that their order has been placed.

## Verification

### Automated Verification
I have verified that the code changes are correctly applied and consistent with the project's existing hook and component structure.

### Manual Verification Required
1. **Add Items**: Go to the shop and add some items to your cart.
2. **Checkout**: Navigate to the cart page and click "Proceed to Checkout".
3. **Confirm**:
   - Verify that the button shows a loading state briefly.
   - Verify that the "Order placed successfully!" notification appears.
   - Verify that the cart items are cleared and the page displays "Your cart is empty".
