import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from './App.jsx';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/user');
        console.log('Response from server:', response.data);
  
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchUserData();
  }, [setUser]);

  console.log('User:', user); // Log the user state
  console.log('Loading:', loading); // Log the loading state

  const handleLogout = async () => {
    try {
      if (user && user.email) {
        console.log('User email:', user.email); // Log the user email if it exists
      } else {
        console.log('User email is not available');
      }
      const res = await axios.get('http://localhost:5000/api/user/logout');
      if (res.data.message === 'Logout successful') {
        localStorage.removeItem('currentUser'); // Remove currentUser from localStorage
        setUser(null); // Clear user state
        navigate(0); // Redirect to home page
      } else {
        alert('Logout failed');
      }
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Logout failed');
    }
  };
  

  return (
    <div className='navbar-header'>
      <div><h3>Blog App</h3></div>
      <div>
        <Link to='/' className='link'>Home</Link>
        {user && user.users && user.users.length > 0 && user.users[0].name && (
          <Link to='create' className='link'>Create</Link>
        )}
        <a href='' className='link'>Contact</a>
      </div>
      {user && user.users && user.users.length > 0 && user.users[0].name && (
        <div>
          <input type='button' onClick={handleLogout} value='Logout' className='btn_input'></input>
        </div>
      )}
      {!localStorage.getItem('currentUser') && (
        <div>
          <h5>
            <Link to='/register' className='link'>Register</Link>/<Link to='/login' className='link'>Login</Link>
          </h5>
        </div>
      )}
    </div>
  );
}

export default Navbar;