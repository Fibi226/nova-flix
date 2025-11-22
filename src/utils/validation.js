export const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

export const validateImageFile = (file, maxSizeMB = 5) => {
    if (!file) {
        return { valid: false, error: 'Файл не вибрано' };
    }
    
    if (!file.type.startsWith('image/')) {
        return { valid: false, error: 'Будь ласка, виберіть зображення' };
    }
    
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        return { valid: false, error: `Розмір зображення не повинен перевищувати ${maxSizeMB}MB` };
    }
    
    return { valid: true };
};

