import Blog from '../model/Blog.js';
import express from 'express';

const router = express.Router();

export const getblogs = async (req, res) => {
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
  };

  export const getblogbyid = async (req, res) => {
    const id = req.params.id;
    Blog.findOne({_id: id})
    .then(blog => res.json(blog))
    .catch(err => console.log(err))
  }
  
  /*
  export const getblogbyid = async (req, res) => {
    const id = req.params.id; // Use req.params.id to get the blog ID
    try {
      Blog.findOne({_id: id});
      if (!blog) {
        return res.status(404).json({ message: "No blog found" });
      }
      return res.status(200).json({ blog });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };  

export const addBlog = async (req, res) => {
    const {title , description , image , user} = req.body;
    let newUser
    try {
        newUser = await User.findById(user);
    } catch (error) {
        return console.log(error)
    }
    if (!newUser) {
        return res.status(400).json({message: "Unable to find User by this Id"})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        newUser.blogs.push(blog);
        await newUser.save({session});
        await session.commitTransaction();
    } catch (error) {
        return console.log(error);
    }
    return res.status(200).json({blog});
};
*/
export const updateBlog = async (req, res) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate({_id: id}, 
            {title: req.body.title,
            description: req.body.description
        })
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(500).json({message: "Unable to update the blog"});
    }
    return res.status(200).json({blog});
};

export const deleteBlog = async (req, res) => {
    const id = req.params.id;
    Blog. findByIdAndDelete({_id: req.params.id})
    .then(result => res.json("Success"))
    .catch(err => res.json(err))
}

/*
export const deleteBlog = async (req, res) => {
    const id = req.params.id;
    try {
        // Find and delete the blog
        const blog = await Blog.findByIdAndDelete(id)

        // Check if the blog exists
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Check if the blog has a user
        if (!blog.user) {
            return res.status(400).json({ message: "Blog has no associated user" });
        }

        // Remove the blog from the user's blogs list
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        // Respond with success message
        return res.status(200).json({ message: "Blog successfully deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getByUserId = async (req , res) => {
    const userId = req.params.id;
    let userBlogs
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (error) {
        return console.log(error);
    }
    if (!userBlogs) {
        return res.status(404).json({message: "No blog found"});
    }
    return res.status(200).json({blogs: userBlogs});
}
/*
const addBlog = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file.filename;

    try {
        // Fetch user ID dynamically based on the authenticated user's session
        const userId = req.session.userId; // Adjust this based on your session implementation

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "Unable to find User by this Id" });
        }

        // Create a new blog post
        const blog = new Blog({ title, description, image, user: userId });

        // Start a database session and save the blog post
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });

        // Update the user's blogs list
        user.blogs.push(blog);
        await user.save({ session });

        // Commit the transaction and send a successful response
        await session.commitTransaction();
        return res.status(200).json({ blog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Public/Images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const addBlog = async (req, res) => {
    try {
        // Extract required data from the request body
        const { title, description } = req.body;
        const image = req.file.filename;

        // Fetch user ID dynamically based on the authenticated user's session
        const userId = req.session.userId; // Adjust this based on your session implementation

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "Unable to find User by this Id" });
        }

        // Create a new blog post
        const blog = new Blog({ title, description, image, user: userId });

        // Start a database session and save the blog post
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });

        // Update the user's blogs list
        user.blogs.push(blog);
        await user.save({ session });

        // Commit the transaction and send a successful response
        await session.commitTransaction();
        return res.status(200).json({ blog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
*/