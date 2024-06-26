import React from 'react';
import PropTypes from 'prop-types';

function Success({message}) {
    return (
        <div>
            <div className="alert alert-success" role="alert">
                {message}
            </div>
        </div>
    )
}

Success.propTypes = {
    message: PropTypes.string.isRequired, 
};

export default Success;