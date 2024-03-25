import express from 'express';
import { getblogs, getblogbyid, updateBlog, deleteBlog } from '../controllers/blog-controller.js';

const blogRouter = express.Router();

// Middleware to handle errors
blogRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

blogRouter.get("/getblogs", getblogs);
//blogRouter.post('/add', addBlog);
blogRouter.put("/updateBlog/:id", updateBlog);
blogRouter.get("/getblogbyid/:id", getblogbyid);
blogRouter.delete("/deleteBlog/:id", deleteBlog);
//blogRouter.get("/user/:id", getByUserId);

export default blogRouter;
