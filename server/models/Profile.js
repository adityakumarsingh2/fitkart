const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    full_name: String,
    email: String,
    avatar_url: String,
    body_measurements: { type: Map, of: String }, // Flexible for JSONB
    style_preferences: [String],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);
