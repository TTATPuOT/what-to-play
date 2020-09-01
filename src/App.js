import React from 'react';
import { connect } from "react-redux";
import Start from "./components/Start";
import Progressbar from "./components/Progressbar";
import Vote from "./components/Vote";

class App extends React.Component {
    render() {
        return <section className="screen">
            <div className="content">
                {this.props.app.stage === 0 && <Start />}
                {this.props.app.stage > 0 &&
                    <>
                        <Progressbar />
                        <Vote />
                    </>
                }
            </div>
        </section>
    }
}


export default connect(
    state => ({
        app: state.app
    })
)(App);
