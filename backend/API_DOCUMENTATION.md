# Magical Calligraphy Backend API Documentation

## Base URL

```
http://localhost:5000/api
```

## User Registration Endpoints

### 1. Register User

**POST** `/users/register`

**Description:** Register a new user with payment screenshot

**Request Body (multipart/form-data):**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "whatsapp": "0332-5275117",
  "paymentMethod": "easypaisa",
  "paymentScreenshot": [file]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Registration successful! We will verify your payment and contact you soon.",
  "user": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "status": "pending"
  }
}
```

### 2. Get All Users (Admin)

**GET** `/users/users`

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response:**

```json
{
  "success": true,
  "count": 10,
  "users": [...]
}
```

### 3. Get Single User

**GET** `/users/users/:id`

**Response:**

```json
{
  "success": true,
  "user": {...}
}
```

### 4. Update User Status (Admin)

**PUT** `/users/users/:id/status`

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "status": "approved",
  "adminNotes": "Payment verified"
}
```

### 5. Delete User (Admin)

**DELETE** `/users/users/:id`

**Headers:**

```
Authorization: Bearer <admin_token>
```

## Admin Endpoints

### 1. Admin Login

**POST** `/admin/login`

**Request Body:**

```json
{
  "username": "admin",
  "password": "password"
}
```

**Response:**

```json
{
  "success": true,
  "token": "jwt_token",
  "admin": {
    "id": "admin_id",
    "username": "admin"
  }
}
```

### 2. Get Dashboard Stats

**GET** `/admin/dashboard-stats`

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response:**

```json
{
  "success": true,
  "stats": {
    "totalUsers": 50,
    "pendingUsers": 10,
    "approvedUsers": 35,
    "rejectedUsers": 5
  }
}
```

### 3. Send Course Link

**POST** `/admin/send-link/:id`

**Headers:**

```
Authorization: Bearer <admin_token>
```

## User Model Schema

```javascript
{
  fullName: String (required),
  email: String (required, unique),
  whatsapp: String (required),
  paymentScreenshot: String (file path),
  paid: Boolean (default: false),
  paymentId: String,
  paymentMethod: String (enum: ['easypaisa', 'nayapay', 'sadapay']),
  paymentAmount: Number (default: 1499),
  status: String (enum: ['pending', 'approved', 'rejected'], default: 'pending'),
  registrationDate: Date (default: now),
  adminNotes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Responses

### Validation Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Full name is required", "Invalid email format"]
}
```

### Not Found Error

```json
{
  "success": false,
  "message": "User not found"
}
```

### Server Error

```json
{
  "success": false,
  "message": "Internal server error. Please try again later."
}
```

## File Upload

- Payment screenshots are stored in the `uploads/` directory
- Only image files are allowed (jpg, png, gif, etc.)
- Maximum file size: 5MB
- Files are accessible via `/uploads/filename.ext`

## Environment Variables Required

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL=your_gmail_address
EMAIL_PASS=your_gmail_app_password
STRIPE_SECRET=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
```
