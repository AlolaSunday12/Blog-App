import {useEffect , useState, useContext} from 'react'
import {Link , useNavigate , useParams} from 'react-router-dom'
import axios from 'axios'
import { userContext } from './App.jsx';

function Blog() {
    const {id} = useParams()
    const [blog, setBlog] = useState({})
    const navigate = useNavigate()
   const user = useContext( userContext );

    useEffect(() => {
    
        axios.get(`http://localhost:5000/getblogbyid/${id}`)
        .then(result => setBlog(result.data))
        .catch(err => console.log(err))
    
    },  [id])
    console.log('User:', user);

    const handleDelete = (id) => {
      axios.delete(`http://localhost:5000/deleteBlog/${id}`)
        .then(result => {
          console.log('Response data:', result.data);
          navigate('/')
        })
        .catch(err => console.log(err))
    }
    console.log('Comparing emails:', user && user.email, blog.email);
    

  return (
    <div className='blog_container'>
       <div className='blog_blog'>
       {blog.file && <img src={`http://localhost:5000/Images/${blog.file}`} alt="" />}
        <div className="blog_blog_text">
        <h1>{blog.title}</h1>
        <p>{blog.description}</p>
        </div>
        <div>
         { user.email === blog.email ?
            <>
            <Link to ={`/updateblog/${blog._id}`} className="update_btn">Update</Link>
           <button onClick={e => handleDelete (blog._id)} className="delete_btn">Delete</button>
            </> : <></>
           }      
           
        </div>
       </div>
    </div>
  )
}

export default Blog;