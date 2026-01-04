import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
export const useProducts = (category) => {
    return useQuery({
        queryKey: ['products', category],
        queryFn: async () => {
            let query = supabase
                .from('products')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });
            if (category && category !== 'All') {
                query = query.eq('category', category.toLowerCase());
            }
            const { data, error } = await query;
            if (error)
                throw error;
            return data;
        },
    });
};
export const useProduct = (id) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .maybeSingle();
            if (error)
                throw error;
            return data;
        },
        enabled: !!id,
    });
};
