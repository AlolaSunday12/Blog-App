import { useState , useContext } from 'react';
import axios from 'axios';
import { userContext } from './App.jsx'


function CreatePost ()
{
    const [ title, setTitle ] = useState();
    const [ description, setDescription ] = useState();
    const [ file, setFile ] = useState();
    const [ loading, setLoading ] = useState( false );
    const [ success, setSuccess ] = useState( false );
    const [ error, setError ] = useState( false );
    const { user, setUser } = useContext(userContext);


    async function createPost ()
    {
        try
        {
            setLoading( true );
            const formData = new FormData();
            formData.append( 'title', title );
            formData.append( 'description', description );
            formData.append( 'file', file );
            

            if (user && user.email) {
                formData.append('email', user.email);
              } else {
                console.log('User email is not available');
                // Handle this case as needed (e.g., show an error message)
              }

            const result = await axios.post( 'http://localhost:5000/api/blog/create', formData );
            setLoading( false );
            setSuccess( true );
            setTitle( '' );
            setDescription( '' );
            setFile( null );

            window.location.href = '/'
        } catch ( error )
        {
            console.error( 'Error creating post:', error );
            setLoading( false );
            setError( true );
        }
    }

    return (
        <div className="post_container">
            <div className="post_form">
                <form onSubmit={ ( e ) =>
                {
                    e.preventDefault();
                    createPost();
                } }>
                    <h2>Create Post</h2>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Title"
                        value={ title }
                        onChange={ ( e ) => setTitle( e.target.value ) }
                    />
                    <textarea
                        name="desc"
                        id="desc"
                        cols="30"
                        rows="10"
                        placeholder="Enter Description"
                        value={ description }
                        onChange={ ( e ) => setDescription( e.target.value ) }
                    ></textarea>
                    <input
                        type="file"
                        name="file"
                        className="file"
                        placeholder="Select Image"
                        onChange={ ( e ) => setFile( e.target.files[ 0 ] ) }
                    />
                    <button type="submit">Post</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
