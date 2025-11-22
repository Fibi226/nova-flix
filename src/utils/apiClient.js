import { getToken } from './tokenStorage.js';

export const createHeaders = (includeContentType = true) => {
    const headers = {};
    
    if (includeContentType) {
        headers['Content-Type'] = 'application/json';
    }
    
    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};

export const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
        }
        
        throw new Error(errorMessage);
    }
    
    return await response.json();
};

export const apiGet = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: createHeaders(),
            ...options,
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        throw error;
    }
};

export const apiPost = async (url, body = null, options = {}) => {
    try {
        const fetchOptions = {
            method: 'POST',
            headers: createHeaders(body !== null && !(body instanceof FormData)),
            ...options,
        };
        
        if (body !== null && !(body instanceof FormData)) {
            fetchOptions.body = JSON.stringify(body);
        } else if (body instanceof FormData) {
            fetchOptions.body = body;
        }
        
        const response = await fetch(url, fetchOptions);
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error posting to ${url}:`, error);
        throw error;
    }
};

export const apiPut = async (url, body = null, options = {}) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: createHeaders(body !== null && !(body instanceof FormData)),
            body: body !== null ? JSON.stringify(body) : undefined,
            ...options,
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error putting to ${url}:`, error);
        throw error;
    }
};

