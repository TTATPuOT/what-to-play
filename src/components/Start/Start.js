import React from 'react';
import {connect} from "react-redux";
import ym from "react-yandex-metrika";
import changeStage from "../../actions/changeStage";
import stageTypes from "../../constants/stageTypes";

import "./Start.sass";

class Start extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        ym('reachGoal', 'start', {});
        return this.props.start();
    }

    render() {
        return (
            <section className="start">
                <h2>Hi there!</h2>
                <h1>Find nice games for play tonight by answer simple questions</h1>
                <div className="cards">
                    <div className="card">
                        <h4>Answer questions</h4>
                        <p>We will ask you just {stageTypes.length - 1} questions about your gaming preferences.</p>
                    </div>
                    <div className="card">
                        <h4>Change answers or skip questions</h4>
                        <p>If the answers do not suit you, you can change them. Also, you can just skip stupid question.</p>
                    </div>
                    <div className="card">
                        <h4>Get games recommendations</h4>
                        <p>Based on your answers, we will find several games for you. You will definitely like it!</p>
                    </div>
                </div>

                <button onClick={this.handleClick}>Start</button>
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
