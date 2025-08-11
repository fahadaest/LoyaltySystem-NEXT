export const getApiBaseUrl = () => {
    if (typeof window === 'undefined') {
        return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';
    }

    const hostname = window.location.hostname;
    const envBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';
    const envUrl = new URL(envBaseUrl);

    const subdomain = hostname.split('.')[0];
    const domain = hostname.split('.').slice(1).join('.') || 'localhost';

    return `${envUrl.protocol}//${subdomain}.${domain}:${envUrl.port}${envUrl.pathname}`;
};