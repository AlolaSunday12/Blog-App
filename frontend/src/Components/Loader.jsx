import {useState} from 'react';
import GridLoader from "react-spinners/GridLoader";

function Loader() {
    let [loading, setLoading] = useState(true);
   
    return (
        <div style={{marginTop:'150px'}}>
            <div className="sweet-loading text-center">
            <GridLoader
        color='#000'
        loading={loading}
        cssOverride={undefined}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader" />
        </div>
        </div>
    )
}

export default Loader;