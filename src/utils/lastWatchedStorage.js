const LAST_WATCHED_KEY = 'novaflix_last_watched_film';

export const saveLastWatchedFilm = (film) => {
    if (film) {
        try {
            const filmData = {
                id: film.id || film.Id || film.filmId || film.FilmId,
                name: film.title || film.Title || film.name || film.Name,
                title: film.title || film.Title || film.name || film.Name,
                originalTitle: film.originalTitle || film.OriginalTitle,
                posterUrl: film.imageUrl || film.ImageUrl || film.posterUrl || film.PosterUrl,
                imageUrl: film.imageUrl || film.ImageUrl || film.posterUrl || film.PosterUrl,
                description: film.filmDescription || film.FilmDescription || film.description || film.Description,
                filmDescription: film.filmDescription || film.FilmDescription || film.description || film.Description,
                watchedAt: new Date().toISOString(),
            };
            localStorage.setItem(LAST_WATCHED_KEY, JSON.stringify(filmData));
        } catch (error) {
            console.error('Помилка збереження останнього переглянутого фільму:', error);
        }
    }
};

export const getLastWatchedFilm = () => {
    try {
        const filmData = localStorage.getItem(LAST_WATCHED_KEY);
        if (filmData) {
            return JSON.parse(filmData);
        }
    } catch (error) {
        console.error('Помилка отримання останнього переглянутого фільму:', error);
    }
    return null;
};

export const removeLastWatchedFilm = () => {
    localStorage.removeItem(LAST_WATCHED_KEY);
};

