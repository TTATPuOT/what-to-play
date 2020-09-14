import perspectiveData from "./perspectiveData";
import multiplayerData from "./multiplayerData";
import platformsData from "./platformsData";
import ratingData from "./ratingData";
import releaseDateData from "./releaseDateData";
import timeToBeatData from "./timeToBeatData";
import ageRatingData from "./ageRatingData";
import genresData from "./genresData";
import themesData from "./themesData";

const re = (array, limit) => array.sort(() => Math.random() - Math.random()).slice(0, limit);

export default [
    null,
    { type: "genre", question: "What genre do you want to play?", component: "baseTextfit", change: true, search: true, data: async (l) => re(genresData, l) },
    { type: "theme", question: "What topic should the in game?", component: "baseTextfit", change: true, search: true, data: async (l) => re(themesData, l) },
    { type: "perspective", question: "What perspective do you like best in games?", component: "base", change: false, data: async () => perspectiveData },
    { type: "multiplayer", question: "Do you like multiplayer games?", component: "two", change: false, data: async () => multiplayerData },
    { type: "platform", question: "What platform do you want to play on?", component: "child", change: false, data: async () => platformsData },
    { type: "rating", question: "What critic's rating are you want?", component: "big", change: false, data: async () => ratingData },
    { type: "releaseDate", question: "When was the game release?", component: "base", change: false, data: async () => releaseDateData },
    { type: "timeToBeat", question: "How fast you want to beat a game?", component: "base", change: false, data: async () => timeToBeatData },
    { type: "ageRating", question: "What age rating should there be?", component: "image", change: false, data: async () => ageRatingData },
];
