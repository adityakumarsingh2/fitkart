import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import { localSync } from '@/services/localSync';
export const useCart = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const cartQuery = useQuery({
        queryKey: ['cart', user?.id],
        queryFn: async () => {
            if (!user)
                return [];
            const { data, error } = await supabase
                .from('cart_items')
                .select(`
          *,
          product:products(id, name, price, images, brand)
        `)
                .eq('user_id', user.id);
            if (error)
                throw error;
            return data;
        },
        enabled: !!user,
    });
    const addToCart = useMutation({
        mutationFn: async ({ productId, size, color, quantity = 1 }: {
            productId: string;
            size: string;
            color?: string;
            quantity?: number;
        }) => {
            if (!user)
                throw new Error('Please sign in to add items to cart');
            // Check if item already exists in cart
            const { data: existing } = await supabase
                .from('cart_items')
                .select('id, quantity')
                .eq('user_id', user.id)
                .eq('product_id', productId)
                .eq('size', size)
                .maybeSingle();
            if (existing) {
                // Update quantity
                const { error } = await supabase
                    .from('cart_items')
                    .update({ quantity: existing.quantity + quantity })
                    .eq('id', existing.id);
                if (error)
                    throw error;

                await localSync.syncCartItem({
                    id: existing.id,
                    user_id: user.id,
                    product_id: productId,
                    size,
                    color,
                    quantity: existing.quantity + quantity
                });
            }
            else {
                // Insert new item
                const { data, error } = await supabase
                    .from('cart_items')
                    .insert({
                        user_id: user.id,
                        product_id: productId,
                        size,
                        color,
                        quantity,
                    })
                    .select()
                    .single();
                if (error)
                    throw error;

                if (data) {
                    await localSync.syncCartItem(data);
                }
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success('Added to cart!');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const updateQuantity = useMutation({
        mutationFn: async ({ itemId, quantity }) => {
            if (quantity <= 0) {
                const { error } = await supabase
                    .from('cart_items')
                    .delete()
                    .eq('id', itemId);
                if (error)
                    throw error;
                await localSync.deleteCartItem(itemId);
            }
            else {
                const { error } = await supabase
                    .from('cart_items')
                    .update({ quantity })
                    .eq('id', itemId);
                if (error)
                    throw error;
                // Ideally we sync the whole item, but we only have ID here. 
                // We'll trust the ID lookup on the server or we would need to fetch the item first.
                // Sending just ID and quantity works if the item exists in local DB.
                await localSync.syncCartItem({ id: itemId, quantity });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
    const removeFromCart = useMutation({
        mutationFn: async (itemId) => {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('id', itemId);
            if (error)
                throw error;
            await localSync.deleteCartItem(itemId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success('Removed from cart');
        },
    });
    const checkout = useMutation({
        mutationFn: async () => {
            if (!user)
                throw new Error('Please sign in to checkout');
            if (!cartQuery.data || cartQuery.data.length === 0)
                throw new Error('Cart is empty');

            // 1. Create Stripe Checkout Session
            const { data: sessionData, error: sessionError } = await supabase.functions.invoke('create-stripe-checkout', {
                body: {
                    items: cartQuery.data.map(item => ({
                        product: {
                            name: item.product?.name,
                            price: item.product?.price,
                            images: item.product?.images,
                        },
                        quantity: item.quantity,
                    })),
                    successUrl: `${window.location.origin}/checkout/success`,
                    cancelUrl: `${window.location.origin}/checkout/cancel`,
                },
            });

            if (sessionError)
                throw sessionError;
            if (!sessionData?.url)
                throw new Error('Failed to create checkout session');
            // 2. Clear the cart (we do this pre-redirect for simplicity in this demo, 
            // but ideally you'd use a webhook to handle this after payment confirmation)
            const { error: clearError } = await supabase
                .from('cart_items')
                .delete()
                .eq('user_id', user.id);
            if (clearError)
                throw clearError;
            // 3. Create the order as 'pending'
            // 3. Create the order as 'pending'
            const orderTotal = Math.round(cartTotal * 1.1);
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    total_amount: orderTotal,
                    items: cartQuery.data.map(item => ({
                        id: item.id,
                        product_id: item.product_id,
                        name: item.product?.name,
                        price: item.product?.price,
                        quantity: item.quantity,
                        size: item.size,
                        image: item.product?.images?.[0]
                    })),
                    status: 'pending'
                })
                .select()
                .single();

            if (orderError) throw orderError;

            if (order) {
                await localSync.syncOrder(order);
            }
            // 4. Redirect to Stripe
            window.location.href = sessionData.url;
            return sessionData;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const cartTotal = cartQuery.data?.reduce((total, item) => {
        const price = item.product?.price || 0;
        return total + (price * item.quantity);
    }, 0) || 0;
    const cartCount = cartQuery.data?.reduce((count, item) => count + item.quantity, 0) || 0;
    return {
        items: cartQuery.data || [],
        isLoading: cartQuery.isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        checkout,
        cartTotal,
        cartCount,
    };
};
