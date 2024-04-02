import {useContext } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { userContext } from './App.jsx';
import axios from 'axios';

function Navbar() {
  //const navigate = useNavigate();
  const user = useContext(userContext);
  
  
  const handleLogout = () => {
       axios.get('http://localhost:5000/logout')
       .then(res => {
        if(res.data === "Success") {
       //navigate('/'); // Redirect to home 
       localStorage.removeItem('currentUser');
        window.location.href='/';
        }
       }).catch(err => console.log(err))
  };
  
  return (
    <div className='navbar-header'>
      <div>
        <h3>Blog App</h3>
      </div>
      <div className='nav-links'>
        <Link to='/' className='link'><i className="fas fa-home"></i>Home</Link>
        {user.username &&
          <Link to='create' className='link'><i className="fas fa-edit"></i>Create-Blog</Link>
        }
      </div>
      {user.username ?
        <div className="user-info">
          <button onClick={handleLogout} className='btn_input'> Logout</button>
          <span><i className="fa fa-address-book" aria-hidden="true"></i> {user.username}</span>
        </div>
        :
        <div>
          <h5>
            <Link to='/register' className='link'>Register</Link> <Link to='/login' className='link'>Login</Link>
          </h5>
        </div>
      }
    </div>
  );
}

export default Navbar;