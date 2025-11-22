import { API_ENDPOINTS } from '../constants/api.js';
import { apiPost } from '../utils/apiClient.js';

export const login = async (email, password) => {
    try {
        return await apiPost(`${API_ENDPOINTS.AUTH}/login`, {
            email,
            password,
        });
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const register = async (email, name, password, confirmPassword) => {
    try {
        return await apiPost(`${API_ENDPOINTS.AUTH}/register`, {
            email,
            name,
            password,
            confirmPassword,
        });
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

