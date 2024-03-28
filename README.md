//Blog-Ap

BLOG APP

Project name : Blog-App


The building of the app is divided into 3 major parts, client, server and database, they all work together to create a functioning application: the client provides the user interface and handles user interactions, the server processes requests, executes business logic, and communicates with the database to retrieve or store data, and the database stores and manages the application's data. We use javascript for frontend, Nodejs for backend and NoSqL(mongoDB) for database

To run the App:
frontend  - npm run dev
Backend - npm start

Client:
To create React App - npm init vite  
 cd Blog-APP 
cd frontend
npm init vite
npm install
npm install axios 
npm install bootstrap 
npm install sweetalert2
npm install react-dom
npm install react-router-dom
npm install react-spinners
npm install prop-types
npm install Bootstrap
Navbar design - css

Backend: 
cd backend
npm install
npm install cors
npm install bcrypt
npm install multer
npm install nodemon
npm install cookie-parser
npm install express
npm install mongoose
npm install jsonwebtoken
npm install path

Database config
Create an account on mongoDB Atlass and login with your email to create database.
Go to connect and click on mongoDB driver as connecting string.
Go to database access to create a new database username and password and insert both the username and password to the connecting string.
Create a database collection in mongoDB
npm mongoose.
Restart the server.
Create a new file for database connection
Create a folder called models for User and Blog Schema.

HOW THE APP WORK

To use the Blog-App, you must be a User as the Create post button is hidden until you LOGIN to the App
Each user needs to Register with details like Username, Email, password and confirm password then proceed to Login page, the users needs to input their Login details like Email and password.
Having access to Bolg-App, Users will be able to Create a post with Title, description and file(image)
 Users can update or delete their post at any time but wont be able to update or delete another User post because of condition rendered to the post
There is Home button where Users can view all the post made by different Users
There is also a Logout button provided for logging out Users once they wish to leave the App and this logout button automatically logout the current user and also clear the cookies from the browser

COLLABORATORS:
Alola Sunday (AlolaSunday12) alolasj@gmail.com
Awolaja Gbenga (Sunnet4)awolaja.sunday@gmail.com