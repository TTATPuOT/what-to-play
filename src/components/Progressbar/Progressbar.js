import React from 'react';

import "./Progressbar.sass";

class Progressbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <section className="progressbar">Вопрос 1 из 10</section>
        )
    }
}


export default Progressbar;
