const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/database')
    .then(() => console.log('Connected to local MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
const syncRoutes = require('./routes/sync');
app.use('/api/sync', syncRoutes);

app.get('/', (req, res) => {
    res.send('FitKart Local Sync Server Running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
