const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { sendBookingConfirmation, sendAdminNotification } = require('../utils/emailService');

// Create a new booking
router.post('/create', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    
    console.log('✅ Booking saved to database');
    console.log('📧 Attempting to send emails...');

    // Send emails
    try {
      console.log('Sending confirmation email to:', booking.email);
      await sendBookingConfirmation(booking);
      console.log('✅ Confirmation email sent successfully!');
      
      console.log('Sending admin notification...');
      await sendAdminNotification(booking);
      console.log('✅ Admin notification sent successfully!');
    } catch (emailError) {
      console.log('❌ Email error occurred:');
      console.log('Error message:', emailError.message);
      console.log('Full error:', emailError);
      // Don't fail the booking if email fails
    }

    res.status(201).json({ message: 'Booking created successfully!', booking });
  } catch (error) {
    console.log('❌ Booking creation error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get all bookings
router.get('/all', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;