import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { cartItems, userEmail } = await req.json();

        // Default to test key if env var is missing/placeholder, just for safety or log check
        // Ideally this comes from Deno.env.get('STRIPE_SECRET_KEY')
        const stripeKey = Deno.env.get('STRIPE_SECRET_KEY') || '';
        if (!stripeKey) {
            console.error("Stripe Secret Key not found in environment.");
            throw new Error("Stripe configuration error");
        }

        const stripe = new Stripe(stripeKey, {
            apiVersion: '2023-10-16',
            httpClient: Stripe.createFetchHttpClient(),
        });

        const lineItems = cartItems.map((item: any) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                    images: item.image ? [item.image] : [],
                },
                unit_amount: Math.round(item.price * 100), // Stripe expects amount in paise
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/checkout/success`,
            cancel_url: `${req.headers.get('origin')}/checkout/cancel`,
            customer_email: userEmail,
            billing_address_collection: 'required',
        });

        return new Response(
            JSON.stringify({ url: session.url }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        );
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 500,
            }
        );
    }
});
