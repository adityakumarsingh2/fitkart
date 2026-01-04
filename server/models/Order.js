const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: { type: String, unique: true }, // Supabase UUID, optional if we generate one
    user_id: { type: String, required: true },
    status: { type: String, default: 'pending' },
    total_amount: { type: Number, required: true },
    shipping_address: { type: Object }, // Flexible JSON
    items: { type: Array, required: true }, // Stores order items
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
