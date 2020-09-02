import React from 'react';
import "./Result.sass";
import igdb from "../../api/igdb";
import Loader from "../Loader";
import Game from "./components/Game";
import List from "./components/List";
import {connect} from "react-redux";
import choicesSet from "../../actions/choicesSet";

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            games: []
        };

        this.selectGame = this.selectGame.bind(this);
    }

    componentDidMount() {
        igdb.getGames(this.props.choices, 5, 0)
            .then(result => this.setState({ loading: false, games: result }, this.selectGame));
    }

    selectGame(index = 0) {
        const games = this.state.games;
        games.forEach(item => item.selected = false);
        games[index].selected = true;

        return this.setState({ games });
    }

    render() {
        const selectedGame = this.state.games.find(game => game.selected);

        if (this.state.loading || !this.state.games || !selectedGame) return <Loader />;

        const background = selectedGame.cover?.image_id ? igdb.getImagePath(selectedGame.cover.image_id, "1080p") : "";

        return (
            <section className="result" style={{backgroundImage: `url(${background})`}}>
                <div className="content">
                    <Game data={selectedGame} />
                    <List games={this.state.games} selectGame={this.selectGame} />
                </div>
            </section>
        )
    }
}


export default connect(
    state => ({
        choices: state.choices
    })
)(Result);
