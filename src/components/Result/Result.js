import React from 'react';
import "./Result.sass";
import igdb from "../../api/igdb";
import Loader from "../Loader";
import Game from "./components/Game";
import List from "./components/List";
import {connect} from "react-redux";

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: undefined,
            games: [],
            choices: this.props.choices
        };

        this.selectGame = this.selectGame.bind(this);
    }

    componentDidMount() {
        this.getGames();
    }

    getGames() {
        const choices = this.state.choices;

        igdb.getGames(this.state.choices, 5, 0)
            .then(result => this.setState({ loading: false, games: result, error: undefined }, this.selectGame))
            .catch(error => {
                const oneMoreTry = this.willOneMoreTry();

                const errorEnd = oneMoreTry
                    ? "But we little bit change your answers and try again..."
                    : "Sorry, error is real serious, we can't do this. Maybe you try again?";

                if (choices.timeToBeat.length) choices.timeToBeat = [];
                else if (choices.releaseDate.length) choices.releaseDate = [];
                else if (choices.rating.length) choices.rating = [];
                else if (choices.perspective.length) choices.perspective = [];
                else if (choices.multiplayer.length) choices.multiplayer = [];
                else if (choices.genre.length) choices.genre = [];
                else if (choices.theme.length) choices.theme = [];
                else if (choices.ageRating.length) choices.ageRating = [];
                else if (choices.platform.length) choices.platform = [];

                this.setState({
                    error: error.message + ". " + errorEnd,
                    choices: choices,
                    loading: oneMoreTry
                }, () => oneMoreTry ? this.getGames() : null);
            });
    }

    willOneMoreTry() {
        for (const key in this.state.choices) {
            if (this.state.choices.hasOwnProperty(key) && this.state.choices[key].length)
                return true;
        }
        return false;
    }

    selectGame(index = 0) {
        const games = this.state.games;
        if (games.length) {
            games.forEach(item => item.selected = false);
            games[index].selected = true;

            return this.setState({ games });
        } else{
            return this.setState({ error: "Sorry, we cant find games form your specific taste" });
        }
    }

    render() {
        const selectedGame = this.state.games.find(game => game.selected);

        if (this.state.loading || !this.state.games || !selectedGame || this.state.error) {
            const oneMoreTry = this.willOneMoreTry();
            return <>
                {!!(this.state.error) && <div className="error">IGDB API Error: {this.state.error}</div>}
                {oneMoreTry && <div><Loader /></div>}
            </>;
        }

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
