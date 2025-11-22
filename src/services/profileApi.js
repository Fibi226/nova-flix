import { API_ENDPOINTS, RESOURCES_BASE_URL } from '../constants/api.js';
import { apiGet, apiPut, createHeaders, handleResponse } from '../utils/apiClient.js';

export const getUserAsync = async () => {
    try {
        return await apiGet(API_ENDPOINTS.PROFILE);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const uploadAvatarAsync = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('ImageUrl', imageFile);

        const headers = createHeaders(false);
        
        const response = await fetch(`${API_ENDPOINTS.PROFILE}/avatar`, {
            method: 'POST',
            headers: headers,
            body: formData,
        });

        const data = await handleResponse(response);
        const fileName = data.imageUrl || data.fileName?.imageUrl || '';
        const imageUrl = fileName ? `${RESOURCES_BASE_URL}/${fileName}` : '';
        
        return { imageUrl, fileName: data };
    } catch (error) {
        console.error('Error uploading avatar:', error);
        throw error;
    }
};

export const updateProfileAsync = async (email, name, password, imageUrl) => {
    try {
        await apiPut(API_ENDPOINTS.PROFILE, {
            email,
            name,
            password,
            imageUrl,
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

