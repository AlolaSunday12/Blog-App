import React, {useContext,  useEffect, useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from './App.jsx';
import axios from 'axios';

function Navbar() {
  //const navigate = useNavigate();
  const user = useContext(userContext);
  
  
  const handleLogout = () => {
       axios.get('http://localhost:5000/logout')
       .then(res => {
        if(res.data === "Success") {
       //navigate('/'); // Redirect to home page
        window.location.href='/';
        }
       }).catch(err => console.log(err))
  };
  
  return (
    <div className='navbar-header'>
      <div><h3>Blog App</h3></div>
      <div>
        <Link to='/' className='link'>Home</Link>
        { user.username ?
          <Link to='create' className='link'>Create-Blog</Link>
        : <></>
        }
        
      </div>
      {user.username ? 
        <div>
          <input type='button' onClick={handleLogout} value='Logout' className='btn_input'></input>
        </div>
      
       : 
        <div>
          <h5>
            <Link to='/register' className='link'>Register</Link>/<Link to='/login' className='link'>Login</Link>
          </h5>
        </div>
      }

    </div>
  );
}

export default Navbar;