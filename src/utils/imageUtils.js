const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const imageBaseUrl = baseUrl?.replace('/api', '');

export const getImageUrl = (imagePath, defaultImage) => {

    if (!imagePath) {
        return defaultImage;
    }

    if (imagePath instanceof File || imagePath instanceof Blob) {
        return URL.createObjectURL(imagePath);
    }

    const pathString = String(imagePath);

    if (pathString.startsWith('blob:') ||
        pathString.startsWith('http://') ||
        pathString.startsWith('https://') ||
        pathString.startsWith('data:')) {
        return pathString;
    }

    return imageBaseUrl + pathString;
};

export const getPreviewImageUrl = (blobUrl, serverUrl, fallback) => {
    if (blobUrl) {
        if (blobUrl instanceof File || blobUrl instanceof Blob) {
            return URL.createObjectURL(blobUrl);
        }
        if (typeof blobUrl === 'string' && blobUrl.startsWith('blob:')) {
            return blobUrl;
        }
    }

    if (serverUrl) {
        return getImageUrl(serverUrl, fallback);
    }
    return fallback;
};