import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.9.0?target=deno";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { items, successUrl, cancelUrl } = await req.json();

        const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
        if (!stripeSecretKey) {
            throw new Error("STRIPE_SECRET_KEY is not set");
        }

        const stripe = new Stripe(stripeSecretKey, {
            apiVersion: "2022-11-15",
        });

        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.product?.name || item.name,
                    images: item.product?.images || (item.image ? [item.image] : []),
                },
                unit_amount: Math.round((item.product?.price || item.price) * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            automatic_payment_methods: { enabled: true },
            line_items: lineItems,
            mode: "payment",
            success_url: successUrl,
            cancel_url: cancelUrl,
            billing_address_collection: "required",
            shipping_address_collection: {
                allowed_countries: ["IN", "US", "GB", "CA"], // Adjust as needed
            },
        });

        return new Response(
            JSON.stringify({ url: session.url }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 400,
            }
        );
    }
});
