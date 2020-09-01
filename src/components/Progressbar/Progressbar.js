import React from 'react';
import {connect} from "react-redux";

import "./Progressbar.sass";

class Progressbar extends React.Component {
    render() {
        return (
            <section className="progressbar">Question {this.props.stage} of 10</section>
        )
    }
}


export default connect(
    state => ({
        stage: state.app.stage
    })
)(Progressbar);
