# API Testing Guide

## Test Sequence for Complete Backend

### 1. Health Check
```bash
curl http://localhost:5000/health
```

### 2. Register a User
```bash
curl -X POST http://localhost:5000/api/v1/users/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "Test123!",
    "role": "user"
  }'
```

### 3. Register an Owner
```bash
curl -X POST http://localhost:5000/api/v1/users/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Court Owner",
    "email": "owner@example.com",
    "password": "Owner123!",
    "role": "owner"
  }'
```

### 4. Register an Admin
```bash
curl -X POST http://localhost:5000/api/v1/users/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "Admin123!",
    "role": "admin"
  }'
```

### 5. Login as User
```bash
curl -X POST http://localhost:5000/api/v1/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "Test123!"
  }'
```
**Save the token from response!**

### 6. Get User Profile
```bash
curl http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_USER_TOKEN"
```

### 7. Login as Owner
```bash
curl -X POST http://localhost:5000/api/v1/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@example.com",
    "password": "Owner123!"
  }'
```
**Save the owner token!**

### 8. Create a Court (as Owner)
```bash
curl -X POST http://localhost:5000/api/v1/owner/courts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_OWNER_TOKEN" \
  -d '{
    "name": "Elite Badminton Court",
    "sport": "badminton",
    "description": "Professional indoor badminton court with premium facilities",
    "location": {
      "address": "123 Sports Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "pricing": {
      "hourlyRate": 50,
      "peakHourRate": 75,
      "currency": "USD"
    },
    "amenities": ["parking", "locker-room", "wifi", "air-conditioning"],
    "availability": {
      "monday": { "open": "08:00", "close": "22:00", "closed": false },
      "tuesday": { "open": "08:00", "close": "22:00", "closed": false },
      "wednesday": { "open": "08:00", "close": "22:00", "closed": false },
      "thursday": { "open": "08:00", "close": "22:00", "closed": false },
      "friday": { "open": "08:00", "close": "22:00", "closed": false },
      "saturday": { "open": "09:00", "close": "23:00", "closed": false },
      "sunday": { "open": "09:00", "close": "21:00", "closed": false }
    }
  }'
```
**Save the court ID from response!**

### 9. Login as Admin
```bash
curl -X POST http://localhost:5000/api/v1/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "Admin123!"
  }'
```
**Save the admin token!**

### 10. Approve Court (as Admin)
```bash
curl -X PATCH http://localhost:5000/api/v1/admin/courts/COURT_ID/approve \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 11. Get All Courts (Public)
```bash
curl http://localhost:5000/api/v1/courts
```

### 12. Get Specific Court
```bash
curl http://localhost:5000/api/v1/courts/COURT_ID
```

### 13. Check Available Slots
```bash
curl "http://localhost:5000/api/v1/bookings/courts/COURT_ID/available-slots?date=2026-01-20"
```

### 14. Create Booking (as User)
```bash
curl -X POST http://localhost:5000/api/v1/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_USER_TOKEN" \
  -d '{
    "courtId": "COURT_ID",
    "date": "2026-01-20",
    "startTime": "14:00",
    "endTime": "16:00",
    "duration": 2,
    "paymentMethod": "card"
  }'
```

### 15. Get User Bookings
```bash
curl http://localhost:5000/api/v1/bookings/my-bookings \
  -H "Authorization: Bearer YOUR_USER_TOKEN"
```

### 16. Get Owner Dashboard
```bash
curl http://localhost:5000/api/v1/owner/dashboard \
  -H "Authorization: Bearer YOUR_OWNER_TOKEN"
```

### 17. Get Admin Dashboard
```bash
curl http://localhost:5000/api/v1/admin/dashboard \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 18. Create Promotion (as Admin)
```bash
curl -X POST http://localhost:5000/api/v1/promotions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "title": "New Year Special",
    "description": "Get 20% off on all bookings",
    "code": "NEWYEAR2026",
    "type": "percentage",
    "discountValue": 20,
    "validFrom": "2026-01-01",
    "validUntil": "2026-01-31",
    "status": "active"
  }'
```

### 19. Get Active Promotions
```bash
curl http://localhost:5000/api/v1/promotions/active
```

### 20. Get Notifications
```bash
curl http://localhost:5000/api/v1/notifications \
  -H "Authorization: Bearer YOUR_USER_TOKEN"
```

## Expected Results

✅ All endpoints should return `"success": true`
✅ Health check shows server running
✅ Users can register and login
✅ Owners can create courts
✅ Admins can approve courts
✅ Users can view and book courts
✅ Bookings are tracked properly
✅ Role-based access control works

## Common Issues

### 401 Unauthorized
- Make sure you're using the correct token for each role
- Check if token has expired (default: 7 days)

### 404 Not Found
- Verify the correct court/booking ID
- Check if resource was deleted

### 400 Bad Request
- Verify request body format
- Check required fields

### 403 Forbidden
- Using wrong role token (e.g., user token for admin endpoint)
- Court not approved yet
