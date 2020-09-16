import React from "react";
import igdb from "../../../api/igdb";
import { Textfit } from "react-textfit";
import ym from "react-yandex-metrika";
import FsLightbox from 'fslightbox-react';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMedia: 0,
            lightbox: false
        };

        this.toggleScreenshot = this.toggleScreenshot.bind(this);
        this.showMoreLikeThis = this.showMoreLikeThis.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data.id !== this.props.data.id) {
            this.setState({ selectedMedia: 0 });
        }
    }

    toggleScreenshot(next = true) {
        let newIndex = this.state.selectedMedia;
        const maxIndex = this.props.data.screenshots.length + this.props.data.videos.length - 1;

        if (next) newIndex++;
        else newIndex--;

        if (newIndex < 0) newIndex = maxIndex;
        if (newIndex > maxIndex) newIndex = 0;

        this.setState({ selectedMedia: newIndex });
    }

    showMoreLikeThis() {
        ym('reachGoal', 'show_more', {
            showMore: this.props.data.name
        });

        this.props.showThoseGames(this.props.data.similar_games);
    }

    render() {
        const data = this.props.data;
        const selectedMedia = this.state.selectedMedia;

        let screenshotUrl, videoId;

        if (data.videos && data.videos[selectedMedia]) {
            videoId = data.videos[selectedMedia]?.video_id;
        } else{
            const realIndex = selectedMedia - data.videos?.length;
            if (data.screenshots && data.screenshots[realIndex]) {
                screenshotUrl = igdb.getImagePath(data.screenshots[realIndex]?.image_id, "screenshot_med");
            }
        }

        const mediaSources = [].concat(data.videos, data.screenshots).filter(i => i).map(item => {
            if (item.video_id) {
                return {
                    type: "youtube",
                    link: `https://www.youtube.com/watch?v=${item.video_id}`
                };
            } else{
                return {
                    type: "image",
                    link: igdb.getImagePath(item.image_id, "1080p")
                };
            }
        });

        const maxLength = 170;

        const text = data.summary ? data.summary.slice(0, maxLength) : false;
        const commas = text.length > maxLength ? "..." : "";
        const rating = data.aggregated_rating || data.aggregated_rating === 0 ? Math.round(data.aggregated_rating) : "N";
        const ratingType = rating > 74 ? "good" : rating > 49 ? "normal" : "bad";
        const platforms = data.platforms ? data.platforms.map(p => p.name).join(", ") : false;

        return <div className="game">
            <div className="description">
                <div className="main">
                    <Textfit mode="single" max={36} style={{height: 41}} className="title desktop">{data.name}</Textfit>
                    <div className="title mobile">{data.name}</div>
                    {!!(text) &&
                    <div className="text">
                        {data.summary.slice(0, maxLength)}{commas}
                    </div>
                    }
                    {!!(data.similar_games) &&
                    <div className="more">
                        <button onClick={this.showMoreLikeThis}>Show more like this</button>
                    </div>
                    }
                </div>
                {!!(platforms) &&
                <div className="platforms">
                    Released on {data.platforms.map(p => p.name).join(", ")}
                </div>
                }
            </div>
            {!!(screenshotUrl || videoId) &&
            <div className="media">
                <FsLightbox
                    toggler={this.state.lightbox}
                    sourceIndex={selectedMedia}
                    sources={mediaSources.map(i => i.link)}
                    types={mediaSources.map(i => i.type)}
                    key={data.id}
                />
                <div className={`rating rating-${ratingType}`}>{rating}</div>
                <div className={!!(screenshotUrl) ? "image" : "image video"}>
                    <button className="left" onClick={() => this.toggleScreenshot(false)} />
                    <button className="right" onClick={() => this.toggleScreenshot(true)} />
                    {!!(videoId) &&
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    }
                    {!!(screenshotUrl) &&
                    <img
                        src={screenshotUrl}
                        alt={data.name}
                        onClick={() => this.setState({ lightbox: !this.state.lightbox })}
                    />
                    }
                </div>
            </div>
            }
        </div>;
    }
}

export default Game;
