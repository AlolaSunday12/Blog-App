import { useState } from 'react'
import './index.css';
import axios from 'axios'
import Loader from './Components/Loader.jsx';
import Error from './Components/Error.jsx'


axios.defaults.withCredentials = true;

function Login() {
    //const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    //const navigate = useNavigate()
    
   axios.defaults.withCredentials = true;
    async function login() {
        const user = {
            email,
            password,
        }
        try {
            setLoading(true)
            const response = await axios.post('http://localhost:5000/login', user);
            const result = response.data;
            setLoading(false)
            setError(false)

            setEmail('');
            setPassword('');

            // Redirect to home page after successful login
            //useNavigate.push('/');

            localStorage.setItem('currentUser', JSON.stringify(result)); // Set currentUser in localStorage
            window.location.href = '/';
            
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
        }

}
  return (
    <div>
        {error && (<Error/>)}
        {loading && (<Loader/>)}
    <div className='signup_container'>
        <div className='signup_form'>
            <h2>Login</h2>
            <br />
            <form onSubmit={(e) => {
                e.preventDefault();
                login();
            }}>
                
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
                <button type="submit" className="signup_btn">Login</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Login;