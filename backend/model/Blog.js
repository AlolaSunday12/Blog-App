const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: String,
    description: String,
    file: String,
    email: String
});

const Blog = mongoose.model('blogs', BlogSchema);

module.exports = Blog;