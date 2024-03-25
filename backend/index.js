import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import Blog from './model/Blog.js';
import cookieParser from "cookie-parser";
import session from 'express-session';
import { verifyUser } from './controllers/user-controller.js';
import multer from 'multer'
import path from "path"


const app = express()
app.use(express.json())
const allowedOrigins = ["http://localhost:5173", "http://localhost:5000"];
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.static('Public'))
app.use(session({
    secret: 'jwt-secret-key',
    resave: false,
    saveUninitialized: false,
    // Add any session configuration options as needed in application
}));

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

app.use("/api/user", router);
app.use("/api/blog", blogRouter);
app.get('/create', verifyUser, (req, res) => {
    return res.json({email: req.email, name: req.name})
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname  + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

blogRouter.post('/create', verifyUser, upload.single('file'), (req, res) => {
    const { title, description, file } = req.body;
    const email = req.email; // Assuming verifyUser middleware sets email in request object
    
    Blog.create({
      title,
      description,
      file: req.file.filename,
      email
    })
    .then(result => res.json("success"))
    .catch(err => res.json(err))
  });
  

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('node server started using nodemon'));

export { upload };
