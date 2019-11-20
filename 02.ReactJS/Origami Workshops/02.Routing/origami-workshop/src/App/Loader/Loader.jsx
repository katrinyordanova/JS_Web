import React from 'react';

function Loader({ isLoading, local }) {
    const className =  `Loader${local ? ' local' : ''}`;
    return isLoading ? <div className={className}>Loading...</div> : null;
}

export default Loader;