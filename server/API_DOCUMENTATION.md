# CourtBooker API Documentation

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [User & Auth Routes](#user--auth-routes)
- [Booking Routes](#booking-routes)
- [Admin Routes](#admin-routes)
- [Owner Routes](#owner-routes)
- [Promotion Routes](#promotion-routes)
- [Notification Routes](#notification-routes)
- [Error Handling](#error-handling)

## Overview

**Base URL:** `http://localhost:5000/api/v1`

**API Version:** v1

### Quick Start
```bash
# Health Check
GET http://localhost:5000/health

# API Info
GET http://localhost:5000/
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Role-Based Access
- **user**: Regular users who can book courts
- **owner**: Court owners who can manage courts
- **admin**: System administrators with full access

---

## User & Auth Routes

### Register User
```http
POST /api/v1/users/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

### Login
```http
POST /api/v1/users/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### Get Current User
```http
GET /api/v1/users/auth/me
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /api/v1/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  }
}
```

### Change Password
```http
PUT /api/v1/users/auth/update-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

### Forgot Password
```http
POST /api/v1/users/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### Reset Password
```http
PUT /api/v1/users/auth/reset-password/:token
Content-Type: application/json

{
  "password": "NewPassword123!"
}
```

### Logout
```http
POST /api/v1/users/auth/logout
Authorization: Bearer <token>
```

---

## Booking Routes

### Create Booking
```http
POST /api/v1/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "courtId": "60d5ec49f1b2c8b5f8c8e8e1",
  "date": "2026-01-15",
  "startTime": "14:00",
  "endTime": "16:00",
  "duration": 2,
  "paymentMethod": "card",
  "notes": "Birthday celebration"
}
```

### Get User Bookings
```http
GET /api/v1/bookings/my-bookings?status=confirmed&page=1&limit=10
Authorization: Bearer <token>
```

### Get Booking by ID
```http
GET /api/v1/bookings/:id
Authorization: Bearer <token>
```

### Update Booking
```http
PUT /api/v1/bookings/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "notes": "Updated notes"
}
```

### Cancel Booking
```http
PATCH /api/v1/bookings/:id/cancel
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Schedule conflict"
}
```

### Get Available Slots
```http
GET /api/v1/bookings/courts/:courtId/available-slots?date=2026-01-15
```

### Check Slot Availability
```http
POST /api/v1/bookings/courts/:courtId/check-availability
Content-Type: application/json

{
  "date": "2026-01-15",
  "startTime": "14:00",
  "endTime": "16:00"
}
```

### Get Booking Statistics
```http
GET /api/v1/bookings/stats
Authorization: Bearer <token>
```

---

## Admin Routes

**Note:** All admin routes require admin role authentication.

### Get Dashboard Stats
```http
GET /api/v1/admin/dashboard
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 150,
      "totalCourts": 45,
      "totalBookings": 320,
      "totalRevenue": 45000,
      "activeBookings": 25,
      "pendingCourts": 3
    },
    "recentBookings": [...],
    "recentUsers": [...]
  }
}
```

### User Management

#### Get All Users
```http
GET /api/v1/admin/users?page=1&limit=10&role=user&search=john
Authorization: Bearer <admin_token>
```

#### Get User by ID
```http
GET /api/v1/admin/users/:id
Authorization: Bearer <admin_token>
```

#### Update User
```http
PUT /api/v1/admin/users/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "owner",
  "status": "active",
  "isEmailVerified": true
}
```

#### Delete User
```http
DELETE /api/v1/admin/users/:id
Authorization: Bearer <admin_token>
```

### Booking Management

#### Get All Bookings
```http
GET /api/v1/admin/bookings?status=confirmed&sport=badminton&page=1&limit=10
Authorization: Bearer <admin_token>
```

### Court Management

#### Get All Courts
```http
GET /api/v1/admin/courts?status=active&approvalStatus=pending
Authorization: Bearer <admin_token>
```

#### Approve Court
```http
PATCH /api/v1/admin/courts/:id/approve
Authorization: Bearer <admin_token>
```

#### Reject Court
```http
PATCH /api/v1/admin/courts/:id/reject
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "reason": "Incomplete documentation"
}
```

### Promotions
```http
GET /api/v1/admin/promotions
Authorization: Bearer <admin_token>
```

### Audit Logs
```http
GET /api/v1/admin/audit-logs?action=user_login&userId=60d5ec49f1b2c8b5f8c8e8e1&page=1&limit=50
Authorization: Bearer <admin_token>
```

### System Settings
```http
GET /api/v1/admin/settings
Authorization: Bearer <admin_token>
```

```http
PUT /api/v1/admin/settings
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "bookingBufferMinutes": 15,
  "cancellationDeadlineHours": 24,
  "refundPercentage": 80,
  "platformFeePercentage": 10
}
```

### Reports
```http
GET /api/v1/admin/reports/revenue?startDate=2026-01-01&endDate=2026-01-31
Authorization: Bearer <admin_token>
```

### Export Data
```http
POST /api/v1/admin/export/users
Authorization: Bearer <admin_token>
```

---

## Owner Routes

**Note:** All owner routes require owner or admin role.

### Get Dashboard Stats
```http
GET /api/v1/owner/dashboard
Authorization: Bearer <owner_token>
```

### Court Management

#### Get My Courts
```http
GET /api/v1/owner/courts
Authorization: Bearer <owner_token>
```

#### Create Court
```http
POST /api/v1/owner/courts
Authorization: Bearer <owner_token>
Content-Type: application/json

{
  "name": "Premium Badminton Court",
  "sport": "badminton",
  "description": "Professional grade court with wooden flooring",
  "location": {
    "address": "123 Sports Complex",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "zipCode": "10001",
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  },
  "pricing": {
    "basePrice": 50,
    "currency": "USD",
    "peakHours": {
      "enabled": true,
      "multiplier": 1.5,
      "hours": ["17:00-21:00"]
    }
  },
  "amenities": ["parking", "locker_rooms", "water", "equipment_rental"],
  "availability": {
    "weeklySchedule": [
      {
        "day": "monday",
        "isOpen": true,
        "openTime": "08:00",
        "closeTime": "22:00"
      }
    ]
  },
  "images": ["url1", "url2"],
  "contactInfo": {
    "phone": "+1234567890",
    "email": "court@example.com"
  }
}
```

#### Update Court
```http
PUT /api/v1/owner/courts/:id
Authorization: Bearer <owner_token>
Content-Type: application/json

{
  "status": "active",
  "pricing": {
    "basePrice": 60
  }
}
```

#### Delete Court
```http
DELETE /api/v1/owner/courts/:id
Authorization: Bearer <owner_token>
```

#### Update Court Availability
```http
PUT /api/v1/owner/courts/:id/availability
Authorization: Bearer <owner_token>
Content-Type: application/json

{
  "availability": {
    "weeklySchedule": [...]
  }
}
```

### Booking Management

#### Get Court Bookings
```http
GET /api/v1/owner/courts/:id/bookings?status=confirmed&startDate=2026-01-01&endDate=2026-01-31
Authorization: Bearer <owner_token>
```

#### Update Booking Status
```http
PATCH /api/v1/owner/bookings/:id/status
Authorization: Bearer <owner_token>
Content-Type: application/json

{
  "status": "confirmed"
}
```

### Revenue & Payouts

#### Get Revenue Report
```http
GET /api/v1/owner/revenue?startDate=2026-01-01&endDate=2026-01-31
Authorization: Bearer <owner_token>
```

#### Get Payouts
```http
GET /api/v1/owner/payouts
Authorization: Bearer <owner_token>
```

#### Request Payout
```http
POST /api/v1/owner/payouts/request
Authorization: Bearer <owner_token>
Content-Type: application/json

{
  "startDate": "2026-01-01",
  "endDate": "2026-01-31",
  "paymentMethod": "bank_transfer",
  "paymentDetails": {
    "accountNumber": "1234567890",
    "accountName": "John's Sports LLC",
    "bankName": "Chase Bank",
    "swiftCode": "CHASUS33"
  }
}
```

### Analytics
```http
GET /api/v1/owner/analytics
Authorization: Bearer <owner_token>
```

---

## Promotion Routes

### Get Active Promotions
```http
GET /api/v1/promotions/active
```

### Get Promotion by ID
```http
GET /api/v1/promotions/:id
```

### Create Promotion
```http
POST /api/v1/promotions
Authorization: Bearer <owner_token>
Content-Type: application/json

{
  "title": "New Year Special",
  "description": "Get 20% off on all bookings",
  "code": "NEWYEAR2026",
  "type": "percentage",
  "discountValue": 20,
  "minPurchaseAmount": 50,
  "validFrom": "2026-01-01T00:00:00Z",
  "validUntil": "2026-01-31T23:59:59Z",
  "usageLimit": {
    "totalUsageLimit": 100,
    "perUserLimit": 1
  },
  "status": "active"
}
```

### Update Promotion
```http
PUT /api/v1/promotions/:id
Authorization: Bearer <owner_token>
Content-Type: application/json

{
  "status": "inactive"
}
```

### Delete Promotion
```http
DELETE /api/v1/promotions/:id
Authorization: Bearer <owner_token>
```

### Validate Coupon
```http
POST /api/v1/promotions/validate-coupon
Authorization: Bearer <token>
Content-Type: application/json

{
  "code": "NEWYEAR2026",
  "totalAmount": 100
}
```

### Apply Coupon
```http
POST /api/v1/promotions/apply-coupon
Authorization: Bearer <token>
Content-Type: application/json

{
  "code": "NEWYEAR2026",
  "bookingId": "60d5ec49f1b2c8b5f8c8e8e1",
  "totalAmount": 100
}
```

### Get User Coupons
```http
GET /api/v1/promotions/my-coupons
Authorization: Bearer <token>
```

---

## Notification Routes

### Get Notifications
```http
GET /api/v1/notifications?status=unread&page=1&limit=20
Authorization: Bearer <token>
```

### Get Unread Count
```http
GET /api/v1/notifications/unread-count
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "unreadCount": 5
  }
}
```

### Mark as Read
```http
PATCH /api/v1/notifications/:id/read
Authorization: Bearer <token>
```

### Mark All as Read
```http
PATCH /api/v1/notifications/mark-all-read
Authorization: Bearer <token>
```

### Delete Notification
```http
DELETE /api/v1/notifications/:id
Authorization: Bearer <token>
```

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": ["Detailed error 1", "Detailed error 2"],
  "stack": "Stack trace (in development only)"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Too Many Requests
- `500` - Internal Server Error

### Common Error Messages

#### Authentication Errors
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

#### Validation Errors
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Email is required",
    "Password must be at least 8 characters"
  ]
}
```

#### Rate Limit Error
```json
{
  "success": false,
  "message": "Too many requests, please try again later.",
  "retryAfter": "2026-01-07T17:00:00Z"
}
```

---

## Pagination

List endpoints support pagination with the following query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

**Response format:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "pages": 15
  }
}
```

---

## Rate Limiting

- **General API:** 100 requests per 15 minutes per IP
- **Authentication endpoints:** 5 requests per 15 minutes per IP
- **User-specific endpoints:** Additional per-user rate limiting may apply

---

## Testing the API

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/v1/users/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123!"}'

# Login
curl -X POST http://localhost:5000/api/v1/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Get Profile
curl -X GET http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman
1. Import the endpoints as a collection
2. Set up environment variables for `base_url` and `token`
3. Use Pre-request Scripts for automatic token management

---

## Additional Resources

- **MongoDB Database:** `mongodb://localhost:27017/indoor-sports-booking`
- **Environment Variables:** See `.env.example` for all configuration options
- **Models:** Located in `server/src/models/`
- **Middleware:** Located in `server/src/middleware/`

## Support

For issues or questions, please contact the development team or create an issue in the project repository.
