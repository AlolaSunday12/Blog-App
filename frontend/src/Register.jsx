import { useState } from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import axios from 'axios'

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    async function register() {
        try {
            setLoading(true);
            const user = { name, email, password };
            const result = await axios.post('http://localhost:5000/api/user/register', user);
            setLoading(false);
            setSuccess(true);
            setName('');
            setEmail('');
            setPassword('');

            window.location.href = '/login';
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }
  return (
    <div className='signup_container'>
        <div className='signup_form'>
            <h2>Sign Up</h2>
            <br />
            <form onSubmit={(e) => {
                e.preventDefault();
                register();
            }}>
                <div>
                    <label htmlFor="name">Name:</label> <br />
                    <input type="text" id="name" placeholder='Enter Name'
                    onChange={e => setName(e.target.value)} autoComplete="name" />
                </div>
                <br />
                <div>
                    <label htmlFor="email">Email:</label> <br />
                    <input type="email" id="email" placeholder='Enter email'
                    onChange={e => setEmail(e.target.value)} autoComplete="email" />
                </div>
                <br />
                <div>
                    <label htmlFor="password">Password:</label> <br />
                    <input type="password" id="password" placeholder='******'
                    onChange={e => setPassword(e.target.value)} autoComplete="new-password" />
                </div>
                <button type="submit" className="signup_btn">Sign Up</button>
            </form>
            <br></br>
            <p>Already have account.</p>
            <Link to="/login"><button type="button">Login</button></Link>
        </div>
    </div>
  )
}

export default Register;