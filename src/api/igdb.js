import apicalypse from 'apicalypse';

const requestOptions = {
    queryMethod: 'body',
    method: 'post',
};

export default {
    /**
     * Получает список самый популярных жанров из самых популярных игр
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

        return result.data[0].result
            .map(game => game.genres)
            .flat(1)
            .filter((genre, index, self) =>
                self.findIndex(g => g.id === genre.id) === index
            )
            .filter(genre => genre.id !== 32);
    }
}
