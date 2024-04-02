import { useState } from 'react';
import './index.css';
import axios from 'axios'
import Success from './Components/Success.jsx'
import Loader from './Components/Loader.jsx'
import swal from 'sweetalert2'

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    async function register() {
        if(password === confirmPassword) {
        try {
            setLoading(true);
            const user = { username, email, password };
            const result = await axios.post('http://localhost:5000/register', user);
            setLoading(false);
            setSuccess(true);
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            
            swal.fire('congratulation' , 'Your Registration is Successfull' , 'success').then(result =>{
                window.location.href='/'
            })
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
            swal.fire('Oops' , 'Something went wrong' , 'error')
        }
    }
    else {
        swal.fire('Oops' , 'Password Not Matched' , 'error')
    }
    }
  return (
    <div>
        {loading && (<Loader/>)}
    <div className='signup_container'>
        <div className='signup_form'>
        {success && (<Success message='Registration successfull'/>)}
            <h2>Register</h2>
            <br />
            <form onSubmit={(e) => {
                e.preventDefault();
                register();
            }}>
                <div>
                    <label htmlFor="Username">Username:</label> <br />
                    <input type="text" id="Username" placeholder='Enter Username'
                    onChange={e => setUsername(e.target.value)} autoComplete="Username" />
                </div>
                
                <div>
                    <label htmlFor="email">Email:</label> <br />
                    <input type="email" id="email" placeholder='Enter email'
                    onChange={e => setEmail(e.target.value)} autoComplete="email" />
                </div>
                
                <div>
                    <label htmlFor="password">Password:</label> <br />
                    <input type="password" id="password" placeholder='******'
                    onChange={e => setPassword(e.target.value)} autoComplete="new-password" />
                </div>

                <div>
                    <label htmlFor="confirmpassword">Confirm Password:</label> <br />
                    <input type="password" id="confirmpassword" placeholder='******'
                    onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" />
                </div>
                
                <button type="submit" className="signup_btn">Register</button>
            </form>
           
        </div>
    </div>
    </div>
  )
}

export default Register;