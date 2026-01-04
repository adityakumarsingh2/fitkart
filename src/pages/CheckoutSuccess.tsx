
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

const CheckoutSuccess = () => {
    const { clearCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the cart on successful payment
        clearCart();

        // Optional: You could verify the session_id here if passed in URL
    }, [clearCart]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center bg-white p-8 rounded-lg shadow-md">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Payment Successful!
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>
                </div>
                <div className="mt-8 space-y-4">
                    <Button
                        onClick={() => navigate("/orders")}
                        className="w-full bg-fitkart-purple hover:bg-fitkart-dark"
                    >
                        View My Orders
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate("/")}
                        className="w-full"
                    >
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
