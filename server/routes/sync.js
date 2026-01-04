const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const Product = require('../models/Product');
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const UserRole = require('../models/UserRole');
const WishlistItem = require('../models/WishlistItem');

// Sync Profile
router.post('/profile', async (req, res) => {
    try {
        const { user_id, ...data } = req.body;
        const profile = await Profile.findOneAndUpdate(
            { user_id },
            { user_id, ...data },
            { upsert: true, new: true }
        );
        res.json(profile);
    } catch (err) {
        console.error('Error syncing profile:', err);
        res.status(500).json({ error: err.message });
    }
});

// Sync Cart Item (Upsert)
router.post('/cart', async (req, res) => {
    try {
        const { id, user_id, product_id, size, color, quantity } = req.body;
        // If id is provided, use it to find update, else find by composite key
        const query = id ? { id } : { user_id, product_id, size, color };

        const cartItem = await CartItem.findOneAndUpdate(
            query,
            req.body,
            { upsert: true, new: true }
        );
        res.json(cartItem);
    } catch (err) {
        console.error('Error syncing cart item:', err);
        res.status(500).json({ error: err.message });
    }
});

// Delete Cart Item
router.delete('/cart/:id', async (req, res) => {
    try {
        await CartItem.deleteOne({ id: req.params.id });
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting cart item:', err);
        res.status(500).json({ error: err.message });
    }
});

// Sync Order
router.post('/order', async (req, res) => {
    try {
        const { id, ...data } = req.body;
        const order = await Order.findOneAndUpdate(
            { id },
            { id, ...data },
            { upsert: true, new: true }
        );
        res.json(order);
    } catch (err) {
        console.error('Error syncing order:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
