import React from "react";
import igdb from "../../../api/igdb";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedScreenshot: 0
        };

        this.toggleScreenshot = this.toggleScreenshot.bind(this);
    }

    toggleScreenshot(next = true) {
        let newIndex = this.state.selectedScreenshot;
        const maxIndex = this.props.data.screenshots.length - 1;

        if (next) newIndex++;
        else newIndex--;

        if (newIndex < 0) newIndex = maxIndex;
        if (newIndex > maxIndex) newIndex = 0;

        this.setState({ selectedScreenshot: newIndex });
    }

    render() {
        const data = this.props.data;
        const screenshotUrl = data.screenshots
            ? igdb.getImagePath(data.screenshots[this.state.selectedScreenshot].image_id, "screenshot_med")
            : "";

        const maxLength = 170;

        const text = data.summary ? data.summary.slice(0, maxLength) : false;
        const commas = text.length > maxLength ? "..." : "";
        const rating = data.aggregated_rating || data.aggregated_rating === 0 ? Math.round(data.aggregated_rating) : "N";
        const ratingType = rating > 74 ? "good" : rating > 49 ? "normal" : "bad";
        const platforms = data.platforms ? data.platforms.map(p => p.name).join(", ") : false;

        return <div className="game">
            <div className="description">
                <div className="title">{data.name}</div>
                {!!(text) &&
                <div className="text">{data.summary.slice(0, maxLength)}{commas}</div>
                }
                {!!(platforms) &&
                <div className="platforms">
                    Released on {data.platforms.map(p => p.name).join(", ")}
                </div>
                }
            </div>
            {!!(screenshotUrl) &&
            <div className="media">
                <div className={`rating rating-${ratingType}`}>{rating}</div>
                <div className="image" style={{backgroundImage: `url(${screenshotUrl})`}}>
                    <button className="left" onClick={() => this.toggleScreenshot(false)} />
                    <button className="right" onClick={() => this.toggleScreenshot(true)} />
                </div>
            </div>
            }
        </div>;
    }
}

export default Game;
