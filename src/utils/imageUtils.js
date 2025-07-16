// utils/imageUtils.js
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const imageBaseUrl = baseUrl?.replace('/api', '');

export const getImageUrl = (imagePath, defaultImage) => {
    console.log("baseUrl------>", baseUrl);
    console.log("imageBaseUrl------>", imageBaseUrl);
    console.log("imagePath------>", imagePath);
    console.log("defaultImage------>", defaultImage);

    // Handle different types of image paths
    if (!imagePath) {
        return defaultImage;
    }

    // If imagePath is a File or Blob object, create a blob URL
    if (imagePath instanceof File || imagePath instanceof Blob) {
        return URL.createObjectURL(imagePath);
    }

    // Ensure imagePath is a string before using string methods
    const pathString = String(imagePath);

    // If it's already a complete URL (blob, http, https, data), return as-is
    if (pathString.startsWith('blob:') ||
        pathString.startsWith('http://') ||
        pathString.startsWith('https://') ||
        pathString.startsWith('data:')) {
        return pathString;
    }

    // If it's a relative path from API, prepend the base URL
    return imageBaseUrl + pathString;
};

// Helper function to get the best available image URL for preview
export const getPreviewImageUrl = (blobUrl, serverUrl, fallback) => {
    // Priority: blob URL (for new uploads) > server URL (for saved images) > fallback
    if (blobUrl) {
        // Handle File/Blob objects
        if (blobUrl instanceof File || blobUrl instanceof Blob) {
            return URL.createObjectURL(blobUrl);
        }
        // Handle blob URL strings
        if (typeof blobUrl === 'string' && blobUrl.startsWith('blob:')) {
            return blobUrl;
        }
    }

    if (serverUrl) {
        return getImageUrl(serverUrl, fallback);
    }

    return fallback;
};