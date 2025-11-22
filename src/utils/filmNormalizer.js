export const normalizeFilm = (film) => {
    if (!film || typeof film !== 'object') {
        return null;
    }

    return {
        id: film.id || film.Id || film.ID || film.filmId || film.FilmId || null,
        title: film.title || film.Title || film.name || film.Name || '',
        originalTitle: film.originalTitle || film.OriginalTitle || '',
        imageUrl: film.imageUrl || film.ImageUrl || film.posterUrl || film.PosterUrl || '',
        posterUrl: film.imageUrl || film.ImageUrl || film.posterUrl || film.PosterUrl || '',
        description: film.filmDescription || film.FilmDescription || film.description || film.Description || '',
        filmDescription: film.filmDescription || film.FilmDescription || film.description || film.Description || '',
        release: film.release || film.Release || null,
        duration: film.duration || film.Duration || null,
        rating: film.rating !== undefined ? film.rating : (film.Rating !== undefined ? film.Rating : null),
        genres: film.genres || film.Genres || null,
        producer: film.producer || film.Producer || null,
        franchise: film.franchise || film.Franchise || null,
        studio: film.studio || film.Studio || null,
        view: film.view !== undefined ? film.view : (film.View !== undefined ? film.View : null),
        linkToTheUkrainianversion: film.linkToTheUkrainianversion || film.LinkToTheUkrainianversion || '',
        linkToTheOriginal: film.linkToTheOriginal || film.LinkToTheOriginal || '',
    };
};

export const normalizeFilms = (films) => {
    if (!Array.isArray(films)) {
        return [];
    }
    
    return films.map(normalizeFilm).filter(film => film !== null);
};

