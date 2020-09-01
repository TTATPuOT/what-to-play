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

        return flatAndUniqueArray(result.data[0].result, "genre")
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
    getImagePath: (imageId, size = "logo_med") => `//images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`,
}
