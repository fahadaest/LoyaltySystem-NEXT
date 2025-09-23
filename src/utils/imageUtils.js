export const getImageUrl = (imagePath) => {
    if (!imagePath) return null;


    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

    try {
        const url = new URL(baseApiUrl);

        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;

            const getSubdomain = () => {
                if (hostname.includes('.localhost') && !hostname.startsWith('localhost')) {
                    return hostname.split('.')[0];
                }
                const parts = hostname.split('.');
                if (parts.length >= 3) {
                    return parts[0];
                }
                return null;
            };

            const subdomain = getSubdomain();

            if (subdomain && url.hostname === 'localhost') {
                const baseUrl = `${url.protocol}//${subdomain}.localhost:${url.port}`;
                const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
                return `${baseUrl}${cleanPath}`;
            }
        }

        const baseUrl = baseApiUrl.replace('/api', '');
        const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
        return `${baseUrl}${cleanPath}`;

    } catch (error) {
        console.warn('Failed to parse Image URL:', error);
        const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
        return `${baseApiUrl.replace('/api', '')}${cleanPath}`;
    }
};