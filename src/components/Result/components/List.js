import React from "react";
import igdb from "../../../api/igdb";

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedGame: this.props.games.find(g => g.selected)
        };

        this.scrollBlock = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const nextSelectedGame = this.props.games.find(g => g.selected);
        if (this.state.selectedGame !== nextSelectedGame) {
            const block = this.scrollBlock.current;

            const anchor = block.querySelector(`div[data-id="${nextSelectedGame.id}"]`);
            const scrollWidth = anchor.offsetLeft - 30;
            const anchorWidth = anchor.clientWidth * 1.15; //Так как будет увеличение
            const scrollTo = scrollWidth - anchorWidth / 2;

            let start = block.scrollLeft,
                change = scrollTo - block.scrollLeft,
                currentTime = 0,
                increment = 20,
                duration = 300;

            Math.easeInOutQuad = (t, b, c, d) => {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            };

            const animateScroll = () => {
                currentTime += increment;
                block.scrollLeft = Math.easeInOutQuad(currentTime, start, change, duration);
                if(currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }
            };
            animateScroll();

            console.log(anchor, scrollWidth, anchorWidth);

            return this.setState({ selectedGame: nextSelectedGame });
        }
    }

    render() {
        const games = this.props.games.map((game, index) => {
            const background = game.cover?.image_id ? igdb.getImagePath(game.cover.image_id, "cover_big") : "";

            return <div
                key={game.id}
                className={game.selected ? "item active" : "item"}
                style={{backgroundImage: `url(${background})`}}
                onClick={() => this.props.selectGame(index)}
                data-id={game.id}
            />;
        });

        return <div ref={this.scrollBlock} className="list">
            {games}
        </div>;
    }
}


export default List;
