import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/getblogs`, {
      withCredentials: true 
    })
      .then(response => {
        const { blogs } = response.data; 
        setBlogs(blogs);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="blogs_container">
      {
        blogs.map(blog => (
          <Link to={`/blog/${blog._id}`} key={blog._id} className="blog">
            <img src={`http://localhost:5000/Images/${blog.file}`} alt="" />
            <div className="blog_text">
              <h2>{blog.title}</h2>
              <p>{blog.description}</p>
            </div>
          </Link>
        )
      )}
    </div>
  );
}

export default Home;