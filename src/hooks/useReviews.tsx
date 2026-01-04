import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
export const useReviews = (productId) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const reviewsQuery = useQuery({
        queryKey: ['reviews', productId],
        queryFn: async () => {
            if (!productId)
                return [];
            const { data, error } = await supabase
                .from('product_reviews')
                .select('*')
                .eq('product_id', productId)
                .order('created_at', { ascending: false });
            if (error)
                throw error;
            return data;
        },
        enabled: !!productId,
    });
    const addReview = useMutation({
        mutationFn: async ({ productId, rating, title, content }) => {
            if (!user)
                throw new Error('Please sign in to write a review');
            const { error } = await supabase
                .from('product_reviews')
                .insert({
                user_id: user.id,
                product_id: productId,
                rating,
                title,
                content,
            });
            if (error) {
                if (error.code === '23505') {
                    throw new Error('You have already reviewed this product');
                }
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            toast.success('Review submitted successfully');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const updateReview = useMutation({
        mutationFn: async ({ reviewId, rating, title, content }) => {
            if (!user)
                throw new Error('Please sign in');
            const { error } = await supabase
                .from('product_reviews')
                .update({ rating, title, content })
                .eq('id', reviewId)
                .eq('user_id', user.id);
            if (error)
                throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            toast.success('Review updated');
        },
    });
    const deleteReview = useMutation({
        mutationFn: async (reviewId) => {
            if (!user)
                throw new Error('Please sign in');
            const { error } = await supabase
                .from('product_reviews')
                .delete()
                .eq('id', reviewId)
                .eq('user_id', user.id);
            if (error)
                throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            toast.success('Review deleted');
        },
    });
    const averageRating = reviewsQuery.data?.length
        ? reviewsQuery.data.reduce((sum, r) => sum + r.rating, 0) / reviewsQuery.data.length
        : 0;
    const userReview = reviewsQuery.data?.find(r => r.user_id === user?.id);
    return {
        reviews: reviewsQuery.data || [],
        isLoading: reviewsQuery.isLoading,
        addReview,
        updateReview,
        deleteReview,
        averageRating,
        reviewCount: reviewsQuery.data?.length || 0,
        userReview,
    };
};
