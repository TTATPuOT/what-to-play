import apicalypse from 'apicalypse';

const requestOptions = {
    queryMethod: 'body',
    method: 'post',
};

const flatAndUniqueArray = (array, field) => array
    .map(game => game[field])
    .flat(1)
    .filter((value, index, self) =>
        self.findIndex(v => v.id === value.id) === index
    );

export default {
    /**
     * Получает список жанров из самых популярных игр
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<T[]|*>}
     */
    getGenres: async (limit = 5, offset = 0) => {
        const result = await apicalypse(requestOptions)
            .multi([
                apicalypse()
                    .query("games", "Popular genres")
                    .fields("genres.name")
                    .sort("popularity desc")
                    .limit(limit)
                    .offset(offset)
            ])
            .request(process.env.REACT_APP_ENDPOINT + 'multiquery');

        return flatAndUniqueArray(result.data[0].result, "genres")
            .filter(genre => genre.id !== 32);
    },
    /**
     * Получает список тем из самых популярных игр
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<T[]|*>}
     */
    getThemes: async (limit = 5, offset = 0) => {
        const result = await apicalypse(requestOptions)
            .multi([
                apicalypse()
                    .query("games", "Popular themes")
                    .fields("themes.name")
                    .sort("popularity desc")
                    .limit(limit)
                    .offset(offset)
            ])
            .request(process.env.REACT_APP_ENDPOINT + 'multiquery');

        return flatAndUniqueArray(result.data[0].result, "themes");
    },
    /**
     * Получает список игр
     * @param {Object} choices
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<T[]|*>}
     */
    getGames: async (choices, limit = 5, offset = 0) => {
        const request = apicalypse();

        request.query("games", "Games")
            .fields(["name", "summary", "similar_games", "aggregated_rating", "screenshots.image_id", "cover.image_id", "platforms.name"])
            .sort("popularity desc")
            .limit(limit)
            .offset(offset);
        const query = [];

        query.push("category = 0")

        if (choices.ids.length) {
            query.push(`id = (${choices.ids.join(",")})`);
        } else{
            query.push("popularity > 0")
            query.push("aggregated_rating > 0")

            if (choices.ageRating.length)
                query.push(`age_ratings.rating = (${choices.ageRating.join(",")})`);
            if (choices.genre.length)
                query.push(`genres = (${choices.genre.join(",")})`);
            if (choices.perspective.length)
                query.push(`player_perspectives = (${choices.perspective.join(",")})`);
            if (choices.platform.length)
                query.push(`platforms = (${choices.platform.join(",")})`);
            if (choices.theme.length)
                query.push(`themes = (${choices.theme.join(",")})`);


            if (choices.multiplayer.length === 1) {
                const q = choices.multiplayer[0] === 1 ? "!= null" : "= null";
                query.push(`multiplayer_modes ${q}`);
            }
            if (choices.rating.length) {
                const q = [];
                for (const ratings of choices.rating) {
                    q.push(`(aggregated_rating >= ${ratings[0]} & aggregated_rating <= ${ratings[1]})`);
                }
                query.push("(" + q.join(" | ") + ")");
            }
            if (choices.timeToBeat.length) {
                const q = [];
                for (const timeToBeat of choices.timeToBeat) {
                    q.push(`(time_to_beat >= ${timeToBeat[0]} & time_to_beat <= ${timeToBeat[1]})`);
                }
                query.push("(" + q.join(" | ") + ")");
            }


            if (choices.releaseDate.length) {
                const lastDate = choices.releaseDate[choices.releaseDate.length - 1];
                query.push(`first_release_date >= ${lastDate}`);
            }
        }

        query.map(item => `(${item})`);
        request.where(query.join(" & "));

        const result = await apicalypse(requestOptions)
            .multi([request])
            .request(process.env.REACT_APP_ENDPOINT + 'multiquery');

        if (result.data[0].result.length) return result.data[0].result;
        else throw new Error("No one game found");
    },
    getImagePath: (imageId, size = "logo_med") => `//images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`,
}
