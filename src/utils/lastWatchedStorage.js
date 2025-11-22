import { STORAGE_KEYS } from '../constants/storage.js';
import { normalizeFilm } from './filmNormalizer.js';

export const saveLastWatchedFilm = (film) => {
    if (!film) {
        return;
    }
    
    try {
        const normalizedFilm = normalizeFilm(film);
        if (normalizedFilm) {
            const filmData = {
                ...normalizedFilm,
                watchedAt: new Date().toISOString(),
            };
            localStorage.setItem(STORAGE_KEYS.LAST_WATCHED_FILM, JSON.stringify(filmData));
        }
    } catch (error) {
        console.error('Помилка збереження останнього переглянутого фільму:', error);
    }
};

export const getLastWatchedFilm = () => {
    try {
        const filmData = localStorage.getItem(STORAGE_KEYS.LAST_WATCHED_FILM);
        if (filmData) {
            return JSON.parse(filmData);
        }
    } catch (error) {
        console.error('Помилка отримання останнього переглянутого фільму:', error);
    }
    return null;
};

export const removeLastWatchedFilm = () => {
    localStorage.removeItem(STORAGE_KEYS.LAST_WATCHED_FILM);
};

