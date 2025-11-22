export const formatDuration = (duration) => {
    if (!duration && duration !== 0) {
        return '';
    }
    
    if (typeof duration === 'string') {
        const parts = duration.split(':');
        if (parts.length >= 2) {
            const hours = parseInt(parts[0], 10) || 0;
            const minutes = parseInt(parts[1], 10) || 0;
            
            if (hours > 0) {
                return `${hours} год. ${minutes} хв.`;
            }
            return `${minutes} хв.`;
        }
        return duration;
    }
    
    if (typeof duration === 'object' && duration !== null) {
        const hours = duration.hour || duration.hours || 0;
        const minutes = duration.minute || duration.minutes || 0;
        
        if (hours > 0) {
            return `${hours} год. ${minutes} хв.`;
        }
        return `${minutes} хв.`;
    }
    
    if (typeof duration === 'number') {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        
        if (hours > 0) {
            return `${hours} год. ${minutes} хв.`;
        }
        return `${minutes} хв.`;
    }
    
    return String(duration);
};

