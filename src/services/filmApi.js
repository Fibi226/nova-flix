import { API_ENDPOINTS } from '../constants/api.js';
import { apiGet } from '../utils/apiClient.js';
import { normalizeFilm, normalizeFilms } from '../utils/filmNormalizer.js';

export const getFilms = async () => {
    try {
        const data = await apiGet(API_ENDPOINTS.FILM);
        return normalizeFilms(data);
    } catch (error) {
        console.error('Error fetching films:', error);
        throw error;
    }
};

export const getFilmById = async (id) => {
    try {
        const data = await apiGet(`${API_ENDPOINTS.FILM}/${id}`);
        return normalizeFilm(data);
    } catch (error) {
        console.error('Error fetching film by id:', error);
        throw error;
    }
};