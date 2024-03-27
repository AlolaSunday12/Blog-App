const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//const router = require('./routes/user-routes.js');
//const blogRouter = require('./routes/blog-routes.js');
const Blog = require('./model/Blog');
const User = require('./model/User');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname  + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json("The token is missing")
        } else {
            jwt.verify(token, "jwt-secret-key", (err, decoded) => {
                if (err) {
                    return res.json("The token is wrong")
                } else {
                    req.email = decoded.email;
                    req.username = decoded.username;
                    next()
                }
            })
        }
};

app.post('/create', verifyUser, upload.single('file'), (req, res) => {
    Blog.create({
        title: req.body.title,
        description: req.body.description,
        file: req.file.filename,
        email: req.body.email
      })    
    .then(result => res.json(result))
    .catch(err => res.json(err))
  });

  app.get('/', verifyUser, (req, res) => {
   return res.json({email: req.email, username: req.username})
  })

app.post('/register', (req, res) => {
    const {username, email, password}= req.body;

    bcrypt.hash(password, 10)
    .then(hash => {
        User.create({username, email, password: hash})
        .then(user => res.json(user))
        .catch(err => res.json(err))
     }).catch(err => console.log(err))
    
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                // Generate JWT token with email, username, and any other necessary fields
                const token = jwt.sign({ email: user.email, username: user.username }, 'jwt-secret-key', { expiresIn: '1h' });

                // Set token in cookie
                res.cookie('token', token , { secure: true }); // Max age in milliseconds (1 hour)

               //set X-Content-Type-Options header
                res.setHeader('X-Content-Type-Options', 'nosniff');
                
                return res.status(200).json({ message: "Login successful" });
            }
        }
        return res.status(400).json({ message: 'Login failed' });
    } catch (error) {
        return res.status(400).json({ error });
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json("Success")
});


app.get('/getblogs', async (req, res) => {
    try {
      const blogs = await Blog.find();
      if (!blogs || blogs.length === 0) {
        return res.status(404).json({ message: "No blogs found" });
      }
      return res.status(200).json({ blogs });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get('/getblogbyid/:id', async (req, res) => {
    const id = req.params.id;
    Blog.findById({_id: id})
    .then(blog => res.json(blog))
    .catch(err => console.log(err))
  });

  app.put('/updateBlog/:id', async (req, res) => {
    const id = req.params.id;
    
     Blog.findByIdAndUpdate({_id: id}, 
            {title: req.body.title,
            description: req.body.description
        })
    .then(result => res.json(result))
    .catch(err => res.json(err))
});

    app.delete('/deleteBlog/:id', async (req, res) => {
    const id = req.params.id;
        // Find and delete the blog
        Blog.findByIdAndDelete({_id: req.params.id})
        .then(result => res.json(result))
        .catch(err => res.json(err))

    })

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('node server started using nodemon'));
