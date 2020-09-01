import React from 'react';
import {connect} from "react-redux";
import changeStage from "../../actions/changeStage";

import "./Start.sass";

class Start extends React.Component {
    render() {

        return (
            <section className="start">
                <h1>Hi there!</h1>
                <div className="cards">
                    <div className="card">
                        <h4>Answer questions</h4>
                        <p>We will ask you just 10 questions about your gaming preferences.</p>
                    </div>
                    <div className="card">
                        <h4>Change answers</h4>
                        <p>If the answers do not suit you, you can change them.</p>
                    </div>
                    <div className="card">
                        <h4>Get games recommendations</h4>
                        <p>Based on your answers, we will find several games for you. You will definitely like it!</p>
                    </div>
                </div>

                <button onClick={this.props.start}>Start</button>
            </section>
        )
    }
}


export default connect(
    state => ({
        app: state.app
    }),
    dispatch => ({
        start: () => dispatch(changeStage(1))
    })
)(Start);
