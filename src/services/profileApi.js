import { getToken } from '../utils/tokenStorage.js';

const API_BASE_URL = 'https://localhost:7108/api/Profile';

const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    
    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};


export const getUserAsync = async () => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
        console.log(data);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};


export const uploadAvatarAsync = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('ImageUrl', imageFile);

        const token = getToken();
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/avatar`, {
            method: 'POST',
            headers: headers,
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fileName = await response.json();
        console.log(fileName);
        const imageUrl = `https://localhost:7108/Resources/${fileName.imageUrl}`;
        return { imageUrl, fileName };
    } catch (error) {
        console.error('Error uploading avatar:', error);
        throw error;
    }
};


export const updateProfileAsync = async (email, name, password, imageUrl) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({
                email,
                name,
                password,
                imageUrl,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

