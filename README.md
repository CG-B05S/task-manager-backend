# Task Manager Backend

## Project Description

This is the backend for the Task Manager application. It provides a RESTful API for user authentication and task management. The backend is built using Node.js, Express, and MongoDB, with Mongoose for object modeling. It supports user registration and login with email and password, as well as authentication using Google OAuth.

## Tech Stack

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling for Node.js
- **Passport**: Authentication middleware for Node.js
- **JWT**: JSON Web Tokens for authentication
- **Render**: Cloud platform for hosting web applications

## Features

- User authentication with Google OAuth
- User registration and login with email and password
- Create, read, update, and delete tasks
- Error handling for user-friendly messages

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine
- MongoDB database

### Clone the Repository

```bash
git clone https://github.com/CG-B05S/task-manager-backend.git
cd task-manager-backend
```

### Setup Environment Variables

Create a `.env` file in the root directory of your backend and add the following environment variables:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
```

### Install Dependencies

#### Backend

```bash
npm install
node index.js
```
Project Structure
-----------------

-   `index.js`: Entry point of the backend server
-   `config/passport.js`: Passport configuration for Google OAuth
-   `controllers/`: Contains authentication and task controllers
    -   `authController.js`: Handles user registration, login, and Google OAuth
    -   `taskController.js`: Manages CRUD operations for tasks
-   `middleware/auth.js`: Middleware for authentication
-   `models/`: Contains MongoDB models for User and Task
    -   `user.js`: User model with password hashing and comparison methods
    -   `task.js`: Task model
-   `routes/`: Defines API routes for authentication and tasks
    -   `authRoutes.js`: Routes for user registration, login, and Google authentication
    -   `taskRoutes.js`: Routes for task CRUD operations

Error Handling
--------------

The backend handles various errors gracefully, providing user-friendly messages:

-   **Registration Errors**: Handles errors such as invalid email, weak passwords, and existing email accounts.
-   **Login Errors**: Provides feedback for incorrect credentials.
-   **Task Management Errors**: Informs users when task creation, updating, or deletion fails.
-   **Google OAuth Errors**: Manages errors during the OAuth process and informs users accordingly.

Deployment
----------

The backend is deployed on Render. Ensure that all environment variables are set correctly in the Render dashboard.

Contributing
------------

If you have suggestions or improvements, please feel free to open an issue or create a pull request.
