import React from 'react';

import "./Footer.sass";

class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return <footer>
            <p>
                Developed by&nbsp;<a href="https://patriotovsky.ru/" target="_blank" rel="noopener noreferrer">Anton Neverov</a>.
                Huge games database by&nbsp;<a href="https://www.igdb.com/" target="_blank" rel="noopener noreferrer">IGDB</a>&nbsp;API.
            </p>
        </footer>;
    }
}


export default Footer;
