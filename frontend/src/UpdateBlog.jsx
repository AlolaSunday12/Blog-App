import { useState , useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

function UpdatePost() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate()

    const {id} = useParams()
    


    async function updatePost() {
        try {
            setLoading(true);
            const result = await axios.put('http://localhost:5000/updateBlog/'+id, {title , description});
            setLoading(false);
            setSuccess(true);
            setTitle('');
            setDescription('');           
             
            navigate('/')
            //window.location.href='/'
        } catch (error) {
            console.error('Error creating post:', error);
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
    
        axios.get(`http://localhost:5000/getblogbyid/${id}`)
        .then(result => {
            setTitle(result.data.title)
            setDescription(result.data.description)
        })
        .catch(err => console.log(err))
    
    },  [id])

    return (
        <div className="post_container">
            <div className="post_form">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    updatePost();
                }}>
                    <h2>Update Post</h2>
                    <input
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        name="desc"
                        id="desc"
                        cols="30"
                        rows="10"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePost;