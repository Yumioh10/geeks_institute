# User Management API

A complete user management system with registration and login functionality built with Express.js, Bcrypt, and JSON file storage.

## Features

- ✅ User Registration with validation
- ✅ User Login with password verification
- ✅ Password hashing with Bcrypt
- ✅ JSON file storage for user data
- ✅ RESTful API endpoints
- ✅ Beautiful HTML forms with disabled submit when inputs are empty
- ✅ CRUD operations for users
- ✅ Error handling and validation

## Project Structure

```
user-management-api/
├── server.js              # Main Express server
├── routes/
│   └── users.js          # User routes and API logic
├── public/
│   ├── register.html     # Registration form
│   └── login.html        # Login form
├── users.json            # User data storage (created automatically)
├── package.json          # Dependencies
└── README.md             # This file
```

## Installation

1. **Create the project directory:**
```bash
mkdir user-management-api
cd user-management-api
```

2. **Initialize npm and install dependencies:**
```bash
npm init -y
npm install express bcrypt cors
npm install --save-dev nodemon
```

3. **Create the folder structure:**
```bash
mkdir routes
mkdir public
```

4. **Copy the files:**
   - Copy `server.js` to the root directory
   - Copy `routes/users.js` to the routes folder
   - Copy `public/register.html` and `public/login.html` to the public folder
   - Create an empty `users.json` file with `[]` in the root directory

## Running the Application

1. **Start the server:**
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

2. **Access the application:**
   - Register: http://localhost:3000/register.html
   - Login: http://localhost:3000/login.html

## API Endpoints

### POST /register
Register a new user

**Request Body:**
```json
{
  "name": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "username": "johnny",
  "password": "securepassword"
}
```

**Success Response:**
```json
{
  "message": "Hello John Your account is now created!",
  "userId": 1
}
```

**Error Response (Username exists):**
```json
{
  "message": "Username already exists"
}
```

### POST /login
Login with username and password

**Request Body:**
```json
{
  "username": "johnny",
  "password": "securepassword"
}
```

**Success Response:**
```json
{
  "message": "Hi johnny welcome back again!",
  "userId": 1
}
```

**Error Response (Not registered):**
```json
{
  "message": "Username is not registered"
}
```

### GET /users
Get all users (without passwords)

**Response:**
```json
{
  "count": 2,
  "users": [
    {
      "id": 1,
      "name": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "username": "johnny",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /users/:id
Get a specific user by ID

**Response:**
```json
{
  "id": 1,
  "name": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "username": "johnny",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### PUT /users/:id
Update user information

**Request Body:**
```json
{
  "name": "Jane",
  "email": "jane@example.com"
}
```

**Response:**
```json
{
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "name": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "username": "johnny",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

## Testing with cURL

**Register a user:**
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "username": "johnny",
    "password": "securepassword"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johnny",
    "password": "securepassword"
  }'
```

**Get all users:**
```bash
curl http://localhost:3000/users
```

**Get user by ID:**
```bash
curl http://localhost:3000/users/1
```

**Update user:**
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane",
    "email": "jane@example.com"
  }'
```

## Testing with Postman

1. Import the endpoints into Postman
2. Set the request type (POST, GET, PUT)
3. Set the URL (http://localhost:3000/register, etc.)
4. For POST/PUT requests, go to Body → raw → JSON and enter the request body
5. Click Send

## Features Explained

### HTML Forms
- **Disabled Submit Button:** The submit button is disabled when any input field is empty
- **Real-time Validation:** Inputs are validated as you type
- **Error/Success Messages:** Clear feedback for all operations
- **Responsive Design:** Works on all screen sizes

### Security
- **Password Hashing:** All passwords are hashed using bcrypt before storage
- **Validation:** All inputs are validated on the server
- **Duplicate Prevention:** Checks for existing usernames and emails

### Error Handling
- File read/write errors are caught and handled
- Route validation prevents invalid data
- Clear error messages for failed operations

## Example User Data (users.json)

```json
[
  {
    "id": 1,
    "name": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "username": "johnny",
    "password": "$2b$10$abcdefghijklmnopqrstuvwxyz...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## Notes

- The `users.json` file is created automatically if it doesn't exist
- Passwords are never returned in API responses
- User IDs are auto-incremented
- All timestamps are in ISO format

## Technologies Used

- **Express.js** - Web framework
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Node.js** - Runtime environment
- **JSON** - Data storage

## License

ISC