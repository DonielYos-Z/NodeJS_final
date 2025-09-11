# NodeJS Final Project - Toys API

This is a Node.js + Express + MongoDB project created for my final assignment for the summer semester 2025.  
It provides an API for managing the users and toys in a toy store.

---

## Features
- User registration and login with JWT authentication
- Token-protected routes
- CRUD operations for toys (create, read, update, delete)
- Filtering, searching, and paging for toys
- MongoDB storage with Mongoose models
- Input validation using Joi

---

## Installation

1. Clone the repository:
   git clone https://github.com/YOUR_USERNAME/NodeJS_final.git
   cd NodeJS_final

2. Install dependencies:
   npm install

3. Create a `.env` file in the root folder with the following:
   MONGO_DB=your_mongodb_connection_string
   TOKEN_KEY=your_secret_key

4. Run the server:
   node app.js
   The server will run at: http://localhost:3001

## API Endpoints
### Users
- POST /users → Register a new user
- POST /users/login → Login and receive JWT token
- GET /users/myInfo → Get logged-in user info (requires token)
- GET /users/userInfo → Get info by token

### Toys
- GET /toys → Get all toys (with pagination)
- GET /toys/search?s=keyword → Search toys by name or info
- GET /toys/category?cat=categoryName → Filter toys by category
- GET /toys/count → Get total number of toys
- POST /toys → Add a toy (requires token)
- PUT /toys/:id → Update a toy (requires token, owner only)
- DELETE /toys/:id → Delete a toy (requires token, owner only)

## Data
The `json/` folder contains exported MongoDB collections for users and toys, so the database can be restored if needed.

## Author
Project by YOUR NAME for the NodeJS final assignment.
