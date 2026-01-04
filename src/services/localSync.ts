
const API_URL = 'http://localhost:5000/api/sync';

export const localSync = {
    syncProfile: async (user: any) => {
        try {
            if (!user) return;

            const profileData = {
                user_id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name,
                avatar_url: user.user_metadata?.avatar_url,
            };

            await fetch(`${API_URL}/profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData),
            });
        } catch (error) {
            console.warn('Local sync failed (profile):', error);
        }
    },

    syncCartItem: async (item: any) => {
        try {
            await fetch(`${API_URL}/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
        } catch (error) {
            console.warn('Local sync failed (cart):', error);
        }
    },

    deleteCartItem: async (id: string) => {
        try {
            await fetch(`${API_URL}/cart/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.warn('Local sync failed (delete cart):', error);
        }
    },

    syncOrder: async (order: any) => {
        try {
            await fetch(`${API_URL}/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            });
        } catch (error) {
            console.warn('Local sync failed (order):', error);
        }
    }
};
