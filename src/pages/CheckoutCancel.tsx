
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CheckoutCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center bg-white p-8 rounded-lg shadow-md">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                    <XCircle className="h-10 w-10 text-red-600" />
                </div>
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Payment Cancelled
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Your payment was cancelled. No charges were made.
                    </p>
                </div>
                <div className="mt-6">
                    <Link to="/cart">
                        <Button className="w-full bg-fitkart-purple hover:bg-fitkart-dark">
                            Return to Cart
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutCancel;
