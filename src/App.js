import React from 'react';
import { connect } from "react-redux";
import Start from "./components/Start";
import Progressbar from "./components/Progressbar";
import Vote from "./components/Vote";
import stageTypes from "./constants/stageTypes";
import Result from "./components/Result";
import Footer from "./components/Footer";

class App extends React.Component {
    render() {
        return <>
            <section className="screen">
                {this.props.app.stage < stageTypes.length &&
                <div className="content">
                    {this.props.app.stage === 0 && <Start />}
                    {this.props.app.stage > 0 &&
                    <>
                        <Progressbar />
                        <Vote />
                    </>
                    }
                </div>
                }
                {this.props.app.stage >= stageTypes.length &&
                <Result />
                }
            </section>
            <Footer />
        </>
    }
}


export default connect(
    state => ({
        app: state.app
    })
)(App);
