import React from "react";
import igdb from "../../../api/igdb";

function List(props) {
    const games = props.games.map((game, index) => {
        const background = game.cover?.image_id ? igdb.getImagePath(game.cover.image_id, "cover_big") : "";

        return <div
            key={game.id}
            className={game.selected ? "item active" : "item"}
            style={{backgroundImage: `url(${background})`}}
            onClick={() => props.selectGame(index)}
        />;
    });
    return <div className="list">{games}</div>;
}

export default List;
