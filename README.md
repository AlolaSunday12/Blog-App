Blog App Documentation

Project name : Blog-App

Overview

The Blog App is a web application built to enable users to create, update, and delete (CRUDE) blog posts and also view all users blog posts. The application is divided into three major parts: client (frontend), server (backend), and database (MongoDB). Each part works together to create a functioning application.

Technologies Used:
       Frontend: JavaScript (React)
       Backend: Node.js (Express)
       Database: MongoDB

Setup Instructions:
  Client (Frontend):
       Navigate to the frontend directory: cd frontend
       Initialize a new React app: npm init vite.
       Install dependencies:
          npm install
          npm install axios 
          npm install bootstrap 
          npm install sweetalert2
          npm install react-dom
          npm install react-router-dom
          npm install react-spinners
          npm install prop-types

Design Navbar using - CSS

Backend:
    Navigate to the backend directory: cd backend
    Install dependencies:
        npm install cors
        npm install bcrypt
        npm install multer
        npm install nodemon
        npm install cookie-parser
        npm install express
        npm install mongoose
        npm install jsonwebtoken
        npm install path
    Restart the server after configuring the database.
    Create a new file for database connection.
    Create a folder called model for User and Blog Schema.

Database Configuration:
    Create an account on MongoDB Atlas.
    Generate a connecting string from the MongoDB driver.
    Create a new database username and password in MongoDB Atlas.
    Insert the username and password into the connecting string.
    Create a database collection

How the App Works

User Registration/Login:
    Users must register with details like username, email, password, and confirm password.
    Once registered, users can log in using their email and password.

Creating Posts:
    Upon login, users can create a post with a title, description, and image file.

Viewing Posts:
    Users can view all posts made by different users on the Home page.

Updating/Deleting Posts:
    Users can update or delete their own posts at any time.
    Users cannot update or delete posts made by other users due to conditional rendering.

Logout:
    Users can log out using the provided logout button, which also clears cookies from the browser.

COLLABORATORS:
    Alola Sunday (AlolaSunday12)alolasj@gmail.com - 08131552377
    Awolaja Gbenga (Sunnet4)awolaja.sunday@gmail.com - 08168591133