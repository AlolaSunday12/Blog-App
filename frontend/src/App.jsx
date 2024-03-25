import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import {createContext, useEffect , useState} from 'react'
import axios from 'axios'
import CreatePost from './CreatePost.jsx';
import Blog from './Blog.jsx';
import UpdateBlog from './UpdateBlog.jsx';

export const userContext = createContext();

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null); // Initialize user state to null

  useEffect(() => {
    axios.get('http://localhost:5000/api/user') // Adjust the URL to match your backend route
      .then(response => {
        setUser(response.data.user); // Set user data
      })
      .catch(err => console.error('Error fetching user data:', err));
  }, []);
  return (
    
     <userContext.Provider value={{user , setUser}}>
      {user !== null ? ( // Render only when user data is available
      <BrowserRouter>
      <Navbar/>
     <Routes>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/create" element={<CreatePost />}></Route>
      <Route path="/blog/:id" element={<Blog />}></Route>
      <Route path="/updateBlog/:id" element={<UpdateBlog />}></Route>
      </Routes>
      </BrowserRouter>
      ) : (
        <p>Loading...</p> // Add loading indicator while user data is being fetched
      )}
     </userContext.Provider>
    
  )
}

export default App
