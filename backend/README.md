# MERN E-Commerce Backend

This is the production-ready Node.js + Express backend API foundation for the MERN E-Commerce application.

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js
- **MongoDB & Mongoose**: NoSQL database and Object Data Modeling (ODM) library
- **ES Modules**: Modern JavaScript module format (`import` / `export`)

## Setup Instructions

1. **Install Dependencies**
   Ensure you are in the `backend` directory and run:

   ```bash
   npm install
   ```

2. **Environment Configuration**
   This project relies on environment variables. A default `.env` file has been provided. Be sure to update your MongoDB connection string before running the server:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=<your_mongodb_cluster_connection_uri>
   ```

3. **Run the Server**
   To start the backend server in development mode, run:
   ```bash
   npm run dev
   ```
   The server will start running on `http://localhost:5000` (or whichever port you specified in `.env`).

## API Endpoints Structure

### Products API (`/api/products`)

- `GET /` - Fetch all products
- `GET /:id` - Fetch a single product by its ObjectId

### Authentication API (`/api/auth`)

_(Logic scheduled for Day 2)_

- `POST /login` - Authenticate a user and issue a token
- `POST /register` - Register a new user profile

### Orders API (`/api/orders`)

_(Payment processing scheduled for Day 2)_

- `POST /` - Create a new order and save items to history
- `GET /:id` - Fetch an order by its ObjectId

## Architecture Notes

- **Error Handling:** Any routes not caught will trigger a global `404 Not Found` middleware. Any endpoints that throw an error or encounter an invalid MongoDB ObjectId will be securely caught by the central `/middleware/errorMiddleware.js`.
- **Database Models:** The app utilizes strict Mongoose schemas with automatic `timestamps` enabled for `User`, `Product`, and `Order` models.
