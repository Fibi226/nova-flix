export const extractAccessToken = (response) => {
    if (!response || typeof response !== 'object') {
        return null;
    }
    
    return response.accessToken || 
           response.AccessToken || 
           response.acesToken || 
           response.AcesToken || 
           null;
};

