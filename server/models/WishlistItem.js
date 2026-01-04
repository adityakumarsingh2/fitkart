const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    id: { type: String, unique: true }, // Supabase UUID
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
