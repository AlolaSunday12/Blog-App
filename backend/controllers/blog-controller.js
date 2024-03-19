import Blog from '../model/Blog.js';
import User from '../model/User.js';
import mongoose from 'mongoose';


export const getAllBlogs = async(req , res) => {
    let blogs;
    try {        
         blogs = await Blog.find();        
    } catch (err) {
        return console.log(err)        
    }
    if (!blogs) {
        return res.status(400).json({ message: "No blogs found" });
    }
    return res.status(200).json({blogs})
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

export const updateBlog = async (req, res) => {
    const {title , description} = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId , {
            title,
            description,
        })
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(500).json({message: "Unable to update the blog"});
    }
    return res.status(200).json({blog});
};

export const getById = async (req , res) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(404).json({message: "No blog found"});
    }
    return res.status(200).json({blog});
}

export const deleteBlog = async (req, res) => {
    const id = req.params.id;
    try {
        // Find and delete the blog
        const blog = await Blog.findByIdAndDelete(id).populate("user");

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