const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    role: { type: String, required: true }, // e.g. 'admin', 'customer'
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserRole', userRoleSchema);
