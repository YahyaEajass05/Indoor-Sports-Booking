# Quick Start Guide - CourtBooker API

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn

## Installation

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure secret key
   - `CLIENT_URL` - Your frontend URL

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## Testing the Setup

### 1. Check Server Health
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-07T...",
  "environment": "development",
  "uptime": 10.5
}
```

### 2. View API Info
```bash
curl http://localhost:5000/
```

### 3. Register a User
```bash
curl -X POST http://localhost:5000/api/v1/users/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123!",
    "role": "user"
  }'
```

### 4. Login
```bash
curl -X POST http://localhost:5000/api/v1/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

Save the returned `token` for authenticated requests.

### 5. Get User Profile
```bash
curl http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Project Structure

```
server/
├── src/
│   ├── config/           # Configuration files
│   │   ├── db.js         # Database connection
│   │   ├── mailer.js     # Email configuration
│   │   └── roles.js      # Role definitions
│   │
│   ├── controllers/      # Request handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── bookingController.js
│   │   ├── adminController.js
│   │   ├── ownerController.js
│   │   ├── promotionController.js
│   │   └── notificationController.js
│   │
│   ├── middleware/       # Custom middleware
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── ownerMiddleware.js
│   │
│   ├── models/          # Mongoose models
│   │   ├── User.js
│   │   ├── Court.js
│   │   ├── Booking.js
│   │   ├── Promotion.js
│   │   ├── Coupon.js
│   │   ├── Notification.js
│   │   ├── Payout.js
│   │   └── AuditLog.js
│   │
│   ├── routes/          # API routes
│   │   ├── userRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── ownerRoutes.js
│   │   ├── promotionRoutes.js
│   │   └── notificationRoutes.js
│   │
│   ├── services/        # Business logic
│   │   ├── bookingService.js
│   │   ├── payoutService.js
│   │   ├── pricingService.js
│   │   ├── analyticsService.js
│   │   └── auditService.js
│   │
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
│
├── .env.example         # Environment variables template
├── package.json         # Dependencies
├── API_DOCUMENTATION.md # Full API documentation
└── QUICK_START.md      # This file
```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

## Key Features Implemented

### ✅ Authentication & Authorization
- JWT-based authentication
- Role-based access control (User, Owner, Admin)
- Password hashing with bcrypt
- Email verification
- Password reset functionality
- Refresh tokens

### ✅ User Management
- User registration and login
- Profile management
- User statistics tracking
- Soft delete functionality

### ✅ Court Management (Owners)
- Create, update, delete courts
- Manage court availability
- Set pricing (base price, peak hours)
- Upload court images
- Track court statistics

### ✅ Booking System
- Create bookings
- Check slot availability
- Cancel bookings with refund calculation
- Booking history
- Real-time conflict detection

### ✅ Admin Panel
- Dashboard with statistics
- User management
- Court approval system
- Booking oversight
- Revenue reports
- Audit logs
- System settings

### ✅ Promotions & Coupons
- Create promotional campaigns
- Coupon code system
- Usage limits
- Discount calculations
- Validity periods

### ✅ Notifications
- In-app notifications
- Email notifications (configurable)
- Notification preferences
- Real-time updates

### ✅ Payment System (Ready for Integration)
- Payment tracking
- Refund processing
- Owner payouts
- Revenue calculation
- Platform fee management

### ✅ Security Features
- Helmet.js for HTTP headers
- Rate limiting
- CORS configuration
- Cookie parsing
- Input sanitization (NoSQL injection prevention - Express 5 compatible)
- HPP (HTTP Parameter Pollution) protection

## Common Issues & Solutions

### MongoDB Connection Error
**Problem:** Server can't connect to MongoDB

**Solution:**
```bash
# Make sure MongoDB is running
mongod

# Or update MONGODB_URI in .env to point to correct database
MONGODB_URI=mongodb://localhost:27017/indoor-sports-booking
```

### Port Already in Use
**Problem:** Port 5000 is already in use

**Solution:**
```bash
# Change PORT in .env
PORT=3000
```

### JWT Token Errors
**Problem:** "Not authorized to access this route"

**Solution:**
- Make sure JWT_SECRET is set in .env
- Check if token is properly included in Authorization header
- Verify token hasn't expired (default: 7 days)

## Next Steps

1. **Review the full API documentation** in `API_DOCUMENTATION.md`
2. **Test all endpoints** using Postman or cURL
3. **Set up email configuration** for notifications
4. **Configure payment gateways** (Stripe/PayPal)
5. **Deploy to production** with proper environment variables
6. **Set up monitoring** and logging
7. **Configure backups** for MongoDB

## Testing with Postman

Import the following collections:
1. User & Authentication
2. Bookings
3. Admin Operations
4. Owner Operations
5. Promotions
6. Notifications

Set environment variables:
- `base_url`: `http://localhost:5000/api/v1`
- `token`: Your JWT token (auto-populated after login)

## Database Seeding (Optional)

To populate the database with test data:

```javascript
// Create test users
POST /api/v1/users/auth/register
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "Admin123!",
  "role": "admin"
}

POST /api/v1/users/auth/register
{
  "name": "Court Owner",
  "email": "owner@example.com",
  "password": "Owner123!",
  "role": "owner"
}

POST /api/v1/users/auth/register
{
  "name": "Regular User",
  "email": "user@example.com",
  "password": "User123!",
  "role": "user"
}
```

## Production Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets
- [ ] Configure production MongoDB URI
- [ ] Set up email service (SendGrid, AWS SES, etc.)
- [ ] Configure payment gateways
- [ ] Set up SSL/TLS certificates
- [ ] Configure CORS for production domain
- [ ] Set up logging and monitoring
- [ ] Configure automated backups
- [ ] Set up CI/CD pipeline
- [ ] Review and tighten rate limits
- [ ] Enable email verification
- [ ] Set up error tracking (Sentry, etc.)

## Support & Resources

- **Full API Documentation:** `API_DOCUMENTATION.md`
- **Environment Variables:** `.env.example`
- **Models Documentation:** See individual model files in `src/models/`
- **Middleware Documentation:** See individual middleware files in `src/middleware/`

## Development Tips

1. **Use nodemon** for auto-reload during development
2. **Test with different user roles** to verify authorization
3. **Check MongoDB Compass** to inspect database state
4. **Use Postman collections** for consistent testing
5. **Enable detailed error logging** in development mode
6. **Review audit logs** to track system changes

## License

This project is part of the Indoor Sports Booking System.

---

**Happy Coding! 🚀**
