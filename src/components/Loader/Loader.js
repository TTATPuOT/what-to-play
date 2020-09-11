import React from 'react';

import "./Loader.sass";

function Loader(props) {
    return <div className="loading">
        <div className="loader">
            <div /><div /><div /><div />
        </div>
        <div className="title">Loading...</div>
        {!!(props.text) && <div className="text">{props.text}</div>}
    </div>
}


export default Loader;
