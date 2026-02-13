const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send email to customer
const sendBookingConfirmation = async (booking) => {
  console.log('📧 Preparing customer email...');
  console.log('Customer email address:', booking.email);
  console.log('Customer name:', booking.name);
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.email,  // Customer's email
    subject: 'Booking Confirmation - CleanPro',
    html: `
      <h2>Booking Confirmed!</h2>
      <p>Hi ${booking.name},</p>
      <p>Thank you for booking with CleanPro. Here are your booking details:</p>
      <ul>
        <li><strong>Service:</strong> ${booking.serviceType}</li>
        <li><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</li>
        <li><strong>Time:</strong> ${booking.time}</li>
        <li><strong>Address:</strong> ${booking.address}</li>
      </ul>
      <p>We'll see you soon!</p>
      <p>Best regards,<br>CleanPro Team</p>
    `
  };

  console.log('Sending to:', mailOptions.to);
  const result = await transporter.sendMail(mailOptions);
  console.log('✅ Customer email sent! Message ID:', result.messageId);
  return result;
};

// Send notification to admin
const sendAdminNotification = async (booking) => {
  console.log('📧 Preparing admin email...');
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Your email (admin)
    subject: 'New Booking Received - CleanPro',
    html: `
      <h2>New Booking Alert!</h2>
      <p>You have a new booking:</p>
      <ul>
        <li><strong>Customer:</strong> ${booking.name}</li>
        <li><strong>Email:</strong> ${booking.email}</li>
        <li><strong>Phone:</strong> ${booking.phone}</li>
        <li><strong>Service:</strong> ${booking.serviceType}</li>
        <li><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</li>
        <li><strong>Time:</strong> ${booking.time}</li>
        <li><strong>Address:</strong> ${booking.address}</li>
        <li><strong>Notes:</strong> ${booking.notes || 'None'}</li>
      </ul>
    `
  };

  console.log('Sending to admin:', mailOptions.to);
  const result = await transporter.sendMail(mailOptions);
  console.log('✅ Admin email sent! Message ID:', result.messageId);
  return result;
};

module.exports = { sendBookingConfirmation, sendAdminNotification };