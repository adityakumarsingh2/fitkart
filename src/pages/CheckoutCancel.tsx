import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CheckoutCancel = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
                    <XCircle className="h-10 w-10 text-red-600" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-medium mb-4">
                    Payment Cancelled
                </h1>
                <p className="text-muted-foreground text-lg mb-8 max-w-md">
                    The payment process was cancelled. No charges were made.
                </p>
                <Button variant="gold" onClick={() => navigate('/cart')}>
                    Return to Cart
                </Button>
            </div>
            <Footer />
        </main>
    );
};

export default CheckoutCancel;
