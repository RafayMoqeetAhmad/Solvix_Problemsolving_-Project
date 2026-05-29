# Solvix Backend API

RESTful API for Solvix - A Problem Solving App with Guidance Expert System

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Problem Management**: Create, read, update, delete problems with AI solutions
- **Tutorial System**: Comprehensive tutorial management
- **Admin Dashboard**: Platform statistics and user management
- **AI Solution Generation**: Automatic solution generation for submitted problems
- **Rating System**: Users can rate solutions
- **Search & Filter**: Advanced filtering capabilities

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Validation**: express-validator
- **Development**: nodemon for auto-restart

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher) - Local or MongoDB Atlas
- npm or yarn

## 🔧 Installation

### 1. Extract and Navigate
```bash
cd solvix-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory (or use the provided `.env.example`):

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/solvix
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/solvix

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=30d

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

### 4. Start MongoDB
If using local MongoDB:
```bash
mongod
```

### 5. Seed Database (Optional)
Populate the database with sample data:
```bash
npm run seed
```

This creates:
- 2 users (user and admin)
- Sample tutorials
- Test problems

**Test Credentials:**
- **User**: username: `user`, password: `user123`
- **Admin**: username: `admin`, password: `admin123`

### 6. Start Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Response Format
All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "error": { ... }
}
```

## 🔐 Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "user",
  "password": "user123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "username": "user",
      "email": "user@solvix.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "user123",
  "newPassword": "newpassword123"
}
```

## 📝 Problem Endpoints

### Create Problem
```http
POST /api/problems
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My laptop won't start",
  "description": "Laptop doesn't turn on when I press power button",
  "category": "Technical"
}
```

**Response includes AI-generated solution automatically**

### Get User's Problems
```http
GET /api/problems
Authorization: Bearer <token>

# Query parameters:
# ?category=Technical
# ?status=solved
# ?sort=oldest
```

### Get Single Problem
```http
GET /api/problems/:id
Authorization: Bearer <token>
```

### Update Problem
```http
PUT /api/problems/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "solved"
}
```

### Rate Problem Solution
```http
PUT /api/problems/:id/rate
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "feedback": "Very helpful solution!"
}
```

### Delete Problem
```http
DELETE /api/problems/:id
Authorization: Bearer <token>
```

### Get Problem Statistics
```http
GET /api/problems/stats
Authorization: Bearer <token>
```

### Get All Problems (Admin)
```http
GET /api/problems/admin/all
Authorization: Bearer <admin-token>
```

## 📚 Tutorial Endpoints

### Get All Tutorials
```http
GET /api/tutorials

# Query parameters:
# ?category=Technical
# ?difficulty=Easy
# ?search=router
# ?sort=popular
```

### Get Single Tutorial
```http
GET /api/tutorials/:id
```

### Create Tutorial (Admin)
```http
POST /api/tutorials
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "How to Reset Router",
  "category": "Technical",
  "difficulty": "Easy",
  "duration": "5 mins",
  "steps": [
    "Step 1...",
    "Step 2...",
    "Step 3..."
  ]
}
```

### Update Tutorial (Admin)
```http
PUT /api/tutorials/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Updated Title",
  "duration": "10 mins"
}
```

### Delete Tutorial (Admin)
```http
DELETE /api/tutorials/:id
Authorization: Bearer <admin-token>
```

### Mark Tutorial as Helpful
```http
PUT /api/tutorials/:id/helpful
Authorization: Bearer <token>
```

## 👨‍💼 Admin Endpoints

### Get Platform Statistics
```http
GET /api/admin/stats
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": {
      "total": 150,
      "active": 142,
      "admins": 3
    },
    "problems": {
      "total": 523,
      "solved": 487,
      "pending": 36,
      "averageRating": 4.6
    },
    "tutorials": {
      "total": 45,
      "totalViews": 12847
    },
    "recentActivity": { ... },
    "analytics": { ... }
  }
}
```

### Get All Users
```http
GET /api/admin/users
Authorization: Bearer <admin-token>

# Query parameters:
# ?role=user
# ?isActive=true
# ?search=john
```

### Get Single User
```http
GET /api/admin/users/:id
Authorization: Bearer <admin-token>
```

### Update User
```http
PUT /api/admin/users/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "admin",
  "isActive": true
}
```

### Delete User
```http
DELETE /api/admin/users/:id
Authorization: Bearer <admin-token>
```

## 🗂️ Problem Categories

- Technical
- Household
- Scheduling
- Writing
- Financial
- Health
- Education
- Other

## 🔒 Security Features

- Password hashing with bcrypt
- JWT authentication
- Role-based access control (RBAC)
- Protected routes
- Input validation
- CORS protection
- MongoDB injection prevention

## 📁 Project Structure

```
solvix-backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── problemController.js # Problem management
│   ├── tutorialController.js# Tutorial management
│   └── adminController.js   # Admin operations
├── middleware/
│   ├── auth.js             # JWT verification
│   └── errorHandler.js     # Error handling
├── models/
│   ├── User.js             # User schema
│   ├── Problem.js          # Problem schema
│   └── Tutorial.js         # Tutorial schema
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   ├── problemRoutes.js    # Problem endpoints
│   ├── tutorialRoutes.js   # Tutorial endpoints
│   └── adminRoutes.js      # Admin endpoints
├── seeders/
│   └── seed.js             # Database seeding
├── utils/
│   ├── jwt.js              # JWT utilities
│   └── aiSolution.js       # AI solution generator
├── .env                    # Environment variables
├── .env.example            # Example env file
├── server.js               # Entry point
└── package.json            # Dependencies
```

## 🧪 Testing with Postman

1. Import the API endpoints to Postman
2. Create an environment with:
   - `base_url`: http://localhost:5000/api
   - `token`: (set after login)
3. Login to get token
4. Use token in Authorization header: `Bearer <token>`

## 🚀 Deployment

### Heroku
```bash
heroku create solvix-api
heroku config:set MONGODB_URI=<your-mongodb-atlas-uri>
heroku config:set JWT_SECRET=<your-secret>
git push heroku main
```

### Railway/Render
1. Connect your repository
2. Set environment variables
3. Deploy

## 🔄 Database Seeding

Seed database with sample data:
```bash
npm run seed
```

Clear database:
```bash
node seeders/seed.js -d
```

## 📊 Database Schema

### User Model
- name, username, email, password
- role (user/admin)
- isActive status
- timestamps

### Problem Model
- title, description, category
- user (reference)
- solution (type, steps, additionalInfo)
- rating, feedback
- status (pending/solved/closed)
- timestamps

### Tutorial Model
- title, category, difficulty
- duration, steps
- views, helpful count
- createdBy (reference)
- isActive status
- timestamps

## ⚠️ Important Notes

1. **Change JWT Secret**: Update `JWT_SECRET` in production
2. **MongoDB Atlas**: Use MongoDB Atlas for production
3. **Environment Variables**: Never commit `.env` file
4. **CORS**: Update `CLIENT_URL` for production
5. **Rate Limiting**: Add rate limiting for production

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- For Atlas, whitelist your IP

### JWT Error
- Check if token is expired
- Verify JWT_SECRET matches

### Port Already in Use
Change port in `.env`:
```env
PORT=5001
```

## 📝 License

This project is for educational purposes.

## 👥 Support

For issues or questions, please check the documentation or contact support.

---

**Made with ❤️ using Node.js & MongoDB**
#   S o l v i x _ P r o b l e m s o l v i n g _ b a c k e n d  
 #   S o l v i x _ P r o b l e m s o l v i n g _ b a c k e n d  
 