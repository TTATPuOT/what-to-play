import React from 'react';
import {connect} from "react-redux";

import "./Start.sass";
import changeStage from "../../actions/changeStage";

class Start extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <section className="start">
                <h1>Hi there!</h1>
                <div className="cards">
                    <div className="card">
                        <h4>Ask the questions</h4>
                        <p>Мы зададим Вам всего 10 вопросов о игровых предпочтениях</p>
                    </div>
                    <div className="card">
                        <h4>Change asks</h4>
                        <p>Если Вам не подходят ответы, вы можете их обновить.</p>
                    </div>
                    <div className="card">
                        <h4>Get games recommendations</h4>
                        <p>Исходя из ваших ответов, мы выберем для вас несколько игр. Они вам точно понравятся!</p>
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
