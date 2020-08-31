import React from 'react';

import "./Loader.sass";

class Loader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="loader">
                <div /><div /><div /><div />
            </div>
        )
    }
}


export default Loader;
