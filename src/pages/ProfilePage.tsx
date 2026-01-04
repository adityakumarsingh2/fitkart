import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, User, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useOrders } from "@/hooks/useOrders";

const ProfilePage = () => {
    const { user, updateProfile } = useAuth();
    const { data: orders, isLoading: ordersLoading } = useOrders();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        weight: "",
        height: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                full_name: user.user_metadata?.full_name || "",
                email: user.email || "",
                weight: user.user_metadata?.weight || "",
                height: user.user_metadata?.height || ""
            });
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await updateProfile({
                full_name: formData.full_name,
                weight: formData.weight,
                height: formData.height
            });
            if (error) throw error;
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update profile");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-24">
            <h1 className="font-display text-3xl md:text-4xl font-semibold mb-8">My Account</h1>

            <Tabs defaultValue="profile" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="orders" className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Orders
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                        <Card>
                            <CardContent className="pt-6 flex flex-col items-center">
                                <Avatar className="h-24 w-24 mb-4">
                                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <h2 className="font-semibold text-xl">{formData.full_name || "User"}</h2>
                                <p className="text-muted-foreground text-sm">{user?.email}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Details</CardTitle>
                                <CardDescription>Update your personal information and body measurements for better fit recommendations.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleUpdate} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="full_name">Full Name</Label>
                                        <Input
                                            id="full_name"
                                            value={formData.full_name}
                                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" value={formData.email} disabled />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="weight">Weight (kg)</Label>
                                            <Input
                                                id="weight"
                                                type="number"
                                                value={formData.weight}
                                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                                placeholder="e.g. 70"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="height">Height (cm)</Label>
                                            <Input
                                                id="height"
                                                type="number"
                                                value={formData.height}
                                                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                                placeholder="e.g. 175"
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? "Saving..." : "Save Changes"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order History</CardTitle>
                            <CardDescription>View your past orders and their status.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {ordersLoading ? (
                                <div className="flex justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                                </div>
                            ) : !orders || orders.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">No orders yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order: any) => (
                                        <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="space-y-1 text-left">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold">ORD-#{order.id.slice(0, 8).toUpperCase()}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${order.status === "delivered" ? "bg-green-100 text-green-700" :
                                                        order.status === "processing" ? "bg-blue-100 text-blue-700" :
                                                            "bg-yellow-100 text-yellow-700"
                                                        }`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(order.created_at).toLocaleDateString()} • {order.items.length} items
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate max-w-md">
                                                    {order.items.map((i: any) => i.name).join(", ")}
                                                </p>
                                            </div>
                                            <div className="mt-2 sm:mt-0 text-right">
                                                <p className="font-semibold">₹{Number(order.total_amount).toLocaleString('en-IN')}</p>
                                                <Button variant="link" size="sm" className="h-auto p-0 text-accent">View Details</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ProfilePage;
