import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-medium mb-4">
                    Payment Successful!
                </h1>
                <p className="text-muted-foreground text-lg mb-8 max-w-md">
                    Thank you for your purchase. Your order has been placed and is being processed.
                </p>
                <div className="flex gap-4">
                    <Button variant="gold" onClick={() => navigate('/orders')}>
                        View My Orders
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/shop')}>
                        Continue Shopping
                    </Button>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default CheckoutSuccess;
