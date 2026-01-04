import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Ruler, Weight } from "lucide-react";
import { toast } from "sonner";

const WeightHeightDialog = ({ open, onSave }) => {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        // Validation
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);

        if (!weight || !height) {
            toast.error("Please enter both weight and height");
            return;
        }

        if (weightNum < 30 || weightNum > 300) {
            toast.error("Please enter a valid weight (30-300 kg)");
            return;
        }

        if (heightNum < 100 || heightNum > 250) {
            toast.error("Please enter a valid height (100-250 cm)");
            return;
        }

        setLoading(true);
        try {
            await onSave(weight, height);
            toast.success("Measurements saved successfully!");
        } catch (error) {
            toast.error("Failed to save measurements");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={() => { }}>
            <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Ruler className="h-5 w-5 text-accent" />
                        Your Measurements
                    </DialogTitle>
                    <DialogDescription>
                        To provide accurate size recommendations, we need your measurements. This information will be saved to your profile and only asked once.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="weight" className="flex items-center gap-2">
                            <Weight className="h-4 w-4" />
                            Weight (kg)
                        </Label>
                        <Input
                            id="weight"
                            type="number"
                            placeholder="e.g. 70"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            min="30"
                            max="300"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="height" className="flex items-center gap-2">
                            <Ruler className="h-4 w-4" />
                            Height (cm)
                        </Label>
                        <Input
                            id="height"
                            type="number"
                            placeholder="e.g. 175"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            min="100"
                            max="250"
                        />
                    </div>

                    <div className="bg-accent/10 rounded-lg p-3 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground mb-1">🔒 Privacy First</p>
                        <p>Your measurements are stored securely and used only to improve your shopping experience.</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="gold"
                        className="flex-1"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save & Continue"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WeightHeightDialog;
