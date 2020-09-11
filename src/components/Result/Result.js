import React from 'react';
import "./Result.sass";
import igdb from "../../api/igdb";
import Loader from "../Loader";
import Game from "./components/Game";
import List from "./components/List";
import {connect} from "react-redux";
import {
    FacebookShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    VKShareButton,
    FacebookIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    VKIcon,
} from "react-share";
import choicesSetIds from "../../actions/choicesSetIds";
import ym from "react-yandex-metrika";

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: undefined,
            games: [],
            choices: this.props.choices,
            limit: 5,
            offset: 0
        };

        this.selectGame = this.selectGame.bind(this);
        this.showMoreResults = this.showMoreResults.bind(this);
        this.showThoseGames = this.showThoseGames.bind(this);
        this.restartQuest = this.restartQuest.bind(this);
    }

    componentDidMount() {
        this.getGames();
    }

    getGames() {
        const choices = this.state.choices;

        igdb.getGames(this.state.choices, this.state.limit, this.state.offset)
            .then(result => {
                ym('reachGoal', 'result', {
                    resultGames: result.map(g => g.name)
                });

                return this.setState({
                    loading: false,
                    games: result,
                    error: undefined
                }, this.selectGame);
            })
            .catch(error => {
                const oneMoreTry = this.willOneMoreTry();

                const errorEnd = oneMoreTry
                    ? "But we little bit change your answers and try again..."
                    : "Sorry, error is real serious, we can't do this. Maybe you try again?";

                if (choices.ids.length) choices.ids = [];
                else if (choices.timeToBeat.length) choices.timeToBeat = [];
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

    showMoreResults() {
        const selectedGame = this.state.games.find(game => game.selected);

        ym('reachGoal', 'show_other', {
            showOther: selectedGame ? selectedGame.name : ""
        });

        this.setState({
            offset: this.state.offset + this.state.limit,
            loading: true,
            games: []
        }, this.getGames);
    }

    willOneMoreTry() {
        for (const key in this.state.choices) {
            if (this.state.choices.hasOwnProperty(key) && this.state.choices[key].length)
                return true;
        }
        return false;
    }

    showThoseGames(ids = []) {
        return this.props.showThoseGames(ids);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.choices !== this.state.choices) {
            return this.setState({
                offset: -this.state.limit,
                choices: this.props.choices
            }, this.showMoreResults);
        }
    }

    restartQuest() {
        ym('reachGoal', 'restart', {});
        window.location.reload();
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
                {!oneMoreTry && <div className="error">IGDB API Error: {this.state.error}</div>}
                {oneMoreTry && <div><Loader text={this.state.error} /></div>}
            </>;
        }

        const background = selectedGame.cover?.image_id ? igdb.getImagePath(selectedGame.cover.image_id, "1080p") : "";

        return <section className="result" style={{backgroundImage: `url(${background})`}}>
            <div className="content">
                <Game data={selectedGame} showThoseGames={this.showThoseGames} />
                <List games={this.state.games} selectGame={this.selectGame} />
                <div className="buttons">
                    <button onClick={this.showMoreResults}>Show other results</button>
                    <div className="share">
                        <p>If you like those games, please, share site with friends:</p>
                        <FacebookShareButton
                            quote={`${process.env.REACT_APP_TITLE} Find a nice games by answering for simple questions.`}
                            url="https://whattoplay.fun/"
                        >
                            <FacebookIcon size={32} borderRadius={5} />
                        </FacebookShareButton>
                        <RedditShareButton title={process.env.REACT_APP_TITLE} url={process.env.REACT_APP_URL}>
                            <RedditIcon size={32} borderRadius={5} />
                        </RedditShareButton>
                        <TelegramShareButton title={process.env.REACT_APP_TITLE} url={process.env.REACT_APP_URL}>
                            <TelegramIcon size={32} borderRadius={5} />
                        </TelegramShareButton>
                        <TwitterShareButton title={process.env.REACT_APP_TITLE} url={process.env.REACT_APP_URL}>
                            <TwitterIcon size={32} borderRadius={5} />
                        </TwitterShareButton>
                        <VKShareButton title={process.env.REACT_APP_TITLE} url={process.env.REACT_APP_URL}>
                            <VKIcon size={32} borderRadius={5} />
                        </VKShareButton>
                    </div>
                    <button className="red" onClick={this.restartQuest}>Restart quest</button>
                </div>
            </div>
        </section>
    }
}


export default connect(
    state => ({
        choices: state.choices
    }),
    dispatch => ({
        showThoseGames: ids => dispatch(choicesSetIds(ids))
    })
)(Result);
