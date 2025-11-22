export const convertToYouTubeEmbed = (url) => {
    if (!url || typeof url !== 'string') {
        return '';
    }
    
    if (url.includes('/embed/')) {
        return url;
    }
    
    let videoId = null;
    
    const watchMatch = url.match(/(?:youtube\.com\/watch\?v=)([^&\n?#]+)/i);
    if (watchMatch) {
        videoId = watchMatch[1];
    }
    
    if (!videoId) {
        const shortMatch = url.match(/(?:youtu\.be\/)([^&\n?#]+)/i);
        if (shortMatch) {
            videoId = shortMatch[1];
        }
    }
    
    if (videoId) {
        videoId = videoId.split('&')[0].split('?')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
};

