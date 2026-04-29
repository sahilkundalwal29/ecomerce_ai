# E-Commerce Website

A full-stack e-commerce website built with React, Node.js, and MySQL.

## Project Structure

```
├── client/              # React Frontend
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── server/             # Node.js Backend
    ├── routes/         # API routes
    ├── controllers/    # Business logic
    ├── models/         # Database models
    ├── middleware/     # Custom middleware
    ├── config/         # Configuration files
    ├── server.js
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL Server

## Installation

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory and configure your MySQL credentials:
```
PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=ecommerce
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Create the database tables by importing the schema:
```bash
mysql -u root -p < config/schema.sql
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

### Start the Frontend

In a new terminal:

```bash
cd client
npm start
```

The frontend will run on `http://localhost:3000`

## Available API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user by ID

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID

## Features

- User authentication with JWT
- Product listing and management
- Shopping cart functionality
- Order management
- Responsive design

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, JWT
- **Database**: MySQL
- **Authentication**: BCrypt, JWT

## License

MIT
