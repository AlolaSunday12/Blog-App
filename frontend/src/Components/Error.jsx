import React from 'react';
import PropTypes from 'prop-types';

function Error({message}) {
    return (
        <div>
            <div className="alert alert-danger" role="alert">
                {message}
            </div>
        </div>
    )
}

Error.propTypes = {
    message: PropTypes.string.isRequired, // Define message prop as a required string
};

export default Error;