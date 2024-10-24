# Lawyer Website Server

This is the backend server for the Lawyer Website application. It's built using Express.js and MongoDB, providing user authentication and management functionality.

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Authentication](#authentication)
8. [Contributing](#contributing)
9. [License](#license)

## Features

- User registration and authentication
- JWT-based authentication
- Password hashing using bcrypt
- MongoDB integration for data storage
- Admin-only access to user list
- CORS enabled for cross-origin requests

## Prerequisites

- Node.js (v12 or higher recommended)
- MongoDB database
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/CodeBelow89?tab=repositories
   cd lawyer-website-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory with the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

2. Replace `your_mongodb_connection_string` with your MongoDB connection string.
3. Replace `your_jwt_secret_key` with a secure secret key for JWT token generation.

## Usage

To start the server, run:

```
node index.js
```

The server will start running on port 8080 by default.

## API Endpoints

- POST `/user/signup`: Register a new user
- POST `/user/signin`: Authenticate a user and receive a JWT token
- GET `/user/all`: Get all users (admin only)
- GET `/user/api/users`: Get all users (requires authentication)

## Authentication

This server uses JWT (JSON Web Tokens) for authentication. To access protected routes, include the JWT token in the Authorization header of your requests:

```
Authorization: Bearer your_jwt_token
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
