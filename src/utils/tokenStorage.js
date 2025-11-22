import { STORAGE_KEYS } from '../constants/storage.js';

export const saveToken = (token) => {
    if (token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    }
};

export const getToken = () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

export const removeToken = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

export const hasToken = () => {
    return !!getToken();
};

