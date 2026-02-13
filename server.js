const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://cleaning-service-frontend1664.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('MongoDB connection error:', err));

// Add after your MongoDB connection
console.log('=== EMAIL CONFIG CHECK ===');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'NOT SET');
console.log('EMAIL_PASS (first 4 chars):', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.substring(0, 4) + '...' : 'NOT SET');
console.log('========================');

// Import routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
