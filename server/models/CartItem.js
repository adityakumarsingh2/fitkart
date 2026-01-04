const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    id: { type: String, unique: true }, // Supabase UUID
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    size: { type: String, required: true },
    color: String,
    quantity: { type: Number, default: 1 },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CartItem', cartItemSchema);
