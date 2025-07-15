const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getImageUrl = (imagePath, defaultImage) => {
    return imagePath ? baseUrl + imagePath : defaultImage;
};