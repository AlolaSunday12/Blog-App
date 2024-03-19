import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import cookieParser from "cookie-parser";
import path from "path"


const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())

// Database connection setup
const mongoURL = 'mongodb+srv://femi:alolasj@cluster0.uq1r6xc.mongodb.net/blog?retryWrites=true&w=majority';
mongoose.connect(mongoURL);

const connection = mongoose.connection;

connection.on('error', (error) => {
    console.error('MongoDB connection failed:', error);
});

connection.on('connected', () => {
    console.log('MongoDB connection successful');
});

app.use("/api/users", router);
app.use("/api/blog", blogRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('node server started using nodemon'));