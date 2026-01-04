import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingBag, Loader2, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const OrdersPage = () => {
    const { data: orders, isLoading } = useOrders();
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/auth');
        }
    }, [user, authLoading, navigate]);

    if (authLoading || isLoading) {
        return (
            <main className="min-h-screen">
                <Navbar />
                <div className="pt-24 flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-24 md:pt-28 pb-20">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-3xl md:text-4xl font-medium mb-8">My Orders</h1>

                    {!orders || orders.length === 0 ? (
                        <div className="text-center py-20 bg-card rounded-xl border border-border">
                            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                                <Package className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h2 className="font-display text-2xl font-medium mb-2">No orders yet</h2>
                            <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
                            <Button variant="gold" onClick={() => navigate('/shop')}>
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order: any) => (
                                <Card key={order.id} className="overflow-hidden">
                                    <CardHeader className="bg-muted/50 border-b">
                                        <div className="flex flex-wrap justify-between items-center gap-4">
                                            <div className="flex gap-8">
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase font-semibold">Order Placed</p>
                                                    <p className="text-sm font-medium">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase font-semibold">Total</p>
                                                    <p className="text-sm font-medium">₹{Number(order.total_amount).toLocaleString('en-IN')}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase font-semibold text-right">Order #</p>
                                                <p className="text-sm font-mono">{order.id.slice(0, 8).toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            {order.items.map((item: any, idx: number) => (
                                                <div key={idx} className="flex gap-4 items-center">
                                                    <img
                                                        src={item.image || "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100"}
                                                        alt={item.name}
                                                        className="w-16 h-20 object-cover rounded-md border"
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-sm">{item.name}</h4>
                                                        <p className="text-xs text-muted-foreground">Size: {item.size} • Qty: {item.quantity}</p>
                                                        <p className="text-sm font-semibold mt-1">₹{Number(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default OrdersPage;
