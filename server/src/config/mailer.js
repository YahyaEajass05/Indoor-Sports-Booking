const nodemailer = require('nodemailer');

/**
 * Email Configuration and Service
 * Features:
 * - HTML email templates
 * - Email verification
 * - Password reset emails
 * - Booking confirmation emails
 * - Notification emails
 * - Retry mechanism
 */

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

/**
 * Send email with retry mechanism
 */
const sendEmail = async (options, retries = 3) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'CourtBooker <noreply@courtbooker.com>',
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    
    if (retries > 0) {
      console.log(`🔄 Retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return sendEmail(options, retries - 1);
    }
    
    return { success: false, error: error.message };
  }
};

/**
 * Email verification template
 */
const sendVerificationEmail = async (user, verificationToken) => {
  const verificationUrl = `${process.env.CLIENT_URL}/auth/verify-email?token=${verificationToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎾 Welcome to CourtBooker!</h1>
        </div>
        <div class="content">
          <h2>Hi ${user.name},</h2>
          <p>Thank you for registering with CourtBooker. To complete your registration, please verify your email address.</p>
          <p>Click the button below to verify your email:</p>
          <a href="${verificationUrl}" class="button">Verify Email</a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #3b82f6;">${verificationUrl}</p>
          <p><strong>This link will expire in 24 hours.</strong></p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>© 2026 CourtBooker. All rights reserved.</p>
          <p>Indoor Sports Booking Made Easy</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: user.email,
    subject: 'Verify Your Email - CourtBooker',
    html,
  });
};

/**
 * Password reset email template
 */
const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/auth/reset-password?token=${resetToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset Request</h1>
        </div>
        <div class="content">
          <h2>Hi ${user.name},</h2>
          <p>We received a request to reset your password for your CourtBooker account.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${resetUrl}" class="button">Reset Password</a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #ef4444;">${resetUrl}</p>
          <div class="warning">
            <strong>⚠️ Security Notice:</strong>
            <ul>
              <li>This link will expire in 1 hour</li>
              <li>If you didn't request this, please ignore this email</li>
              <li>Your password won't change unless you click the link above</li>
            </ul>
          </div>
        </div>
        <div class="footer">
          <p>© 2026 CourtBooker. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: user.email,
    subject: 'Password Reset Request - CourtBooker',
    html,
  });
};

/**
 * Booking confirmation email
 */
const sendBookingConfirmation = async (user, booking, court) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #10b981; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Booking Confirmed!</h1>
        </div>
        <div class="content">
          <h2>Hi ${user.name},</h2>
          <p>Great news! Your booking has been confirmed.</p>
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <div class="detail-row">
              <strong>Booking ID:</strong>
              <span>${booking.bookingId || booking._id}</span>
            </div>
            <div class="detail-row">
              <strong>Court:</strong>
              <span>${court.name}</span>
            </div>
            <div class="detail-row">
              <strong>Sport:</strong>
              <span>${court.sport}</span>
            </div>
            <div class="detail-row">
              <strong>Date:</strong>
              <span>${new Date(booking.date).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <strong>Time:</strong>
              <span>${booking.startTime} - ${booking.endTime}</span>
            </div>
            <div class="detail-row">
              <strong>Duration:</strong>
              <span>${booking.duration} hour(s)</span>
            </div>
            <div class="detail-row">
              <strong>Total Amount:</strong>
              <span style="color: #10b981; font-size: 18px; font-weight: bold;">$${booking.totalAmount}</span>
            </div>
          </div>

          <p><strong>Location:</strong> ${court.location?.address || 'N/A'}</p>
          
          <a href="${process.env.CLIENT_URL}/dashboard/user/booking-history" class="button">View Booking</a>
          
          <p style="margin-top: 30px;"><strong>Important Notes:</strong></p>
          <ul>
            <li>Please arrive 10 minutes before your booking time</li>
            <li>Bring valid ID for verification</li>
            <li>Cancellation is allowed up to 24 hours before booking</li>
          </ul>
        </div>
        <div class="footer">
          <p>© 2026 CourtBooker. All rights reserved.</p>
          <p>Need help? Contact us at support@courtbooker.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: user.email,
    subject: `Booking Confirmed - ${court.name}`,
    html,
  });
};

/**
 * Booking cancellation email
 */
const sendBookingCancellation = async (user, booking, court, refundAmount) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: #fef2f2; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ef4444; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>❌ Booking Cancelled</h1>
        </div>
        <div class="content">
          <h2>Hi ${user.name},</h2>
          <p>Your booking has been cancelled as requested.</p>
          
          <div class="info-box">
            <h3>Cancelled Booking Details</h3>
            <p><strong>Booking ID:</strong> ${booking.bookingId || booking._id}</p>
            <p><strong>Court:</strong> ${court.name}</p>
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
            ${refundAmount > 0 ? `<p><strong>Refund Amount:</strong> <span style="color: #10b981; font-size: 18px;">$${refundAmount}</span></p>` : ''}
          </div>

          ${refundAmount > 0 ? '<p>Your refund will be processed within 5-7 business days.</p>' : '<p>No refund is applicable for this cancellation.</p>'}
          
          <p>We hope to see you again soon!</p>
        </div>
        <div class="footer">
          <p>© 2026 CourtBooker. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: user.email,
    subject: 'Booking Cancellation Confirmation',
    html,
  });
};

/**
 * Welcome email for new users
 */
const sendWelcomeEmail = async (user) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .feature { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #3b82f6; }
        .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to CourtBooker!</h1>
          <p style="font-size: 18px; margin-top: 10px;">Your sports booking journey starts here</p>
        </div>
        <div class="content">
          <h2>Hi ${user.name},</h2>
          <p>Welcome aboard! We're excited to have you as part of the CourtBooker community.</p>
          
          <h3>What you can do with CourtBooker:</h3>
          
          <div class="feature">
            <strong>🏀 Book Courts Instantly</strong>
            <p>Browse and book from hundreds of indoor sports courts near you</p>
          </div>
          
          <div class="feature">
            <strong>💳 Secure Payments</strong>
            <p>Safe and secure online payment options</p>
          </div>
          
          <div class="feature">
            <strong>📱 Manage Bookings</strong>
            <p>Track, modify, or cancel your bookings anytime</p>
          </div>
          
          <div class="feature">
            <strong>⭐ Save Favorites</strong>
            <p>Save your favorite courts for quick booking</p>
          </div>

          <a href="${process.env.CLIENT_URL}/courts" class="button">Start Booking Now</a>
          
          <p style="margin-top: 30px;">Need help getting started? Check out our <a href="${process.env.CLIENT_URL}/how-it-works">How It Works</a> guide.</p>
        </div>
        <div class="footer">
          <p>© 2026 CourtBooker. All rights reserved.</p>
          <p>Questions? Reply to this email or visit our <a href="${process.env.CLIENT_URL}/faq">FAQ</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: user.email,
    subject: 'Welcome to CourtBooker - Let\'s Get Started! 🎾',
    html,
  });
};

/**
 * Test email configuration
 */
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return { success: true };
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendBookingConfirmation,
  sendBookingCancellation,
  sendWelcomeEmail,
  testEmailConfig,
};
