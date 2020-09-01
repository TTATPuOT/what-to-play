import igdb from "../api/igdb";
import platformsData from "./platformsData";

export default [
    null,
    { type: "genre", question: "What genre do you want to play?", component: "base", data: igdb.getGenres },
    { type: "platform", question: "What platform do you want to play on?", component: "child", data: async () => platformsData },
];
