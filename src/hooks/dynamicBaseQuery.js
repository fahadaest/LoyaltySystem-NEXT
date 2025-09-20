import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookieUtils';

const getDynamicApiUrl = () => {
    if (typeof window === 'undefined') {
        return process.env.NEXT_PUBLIC_API_URL || '/api';
    }

    const hostname = window.location.hostname;
    const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

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

    if (!subdomain) {
        return baseApiUrl;
    }

    try {
        const url = new URL(baseApiUrl);

        if (url.hostname === 'localhost') {
            return `${url.protocol}//${subdomain}.localhost:${url.port}/api`;
        }

        const hostParts = url.hostname.split('.');
        const newHostname = `${subdomain}.${hostParts.join('.')}`;

        return `${url.protocol}//${newHostname}${url.port ? ':' + url.port : ''}/api`;

    } catch (error) {
        console.warn('Failed to parse API URL:', error);
        return baseApiUrl;
    }
};

export const createDynamicBaseQuery = () => {
    return fetchBaseQuery({
        baseUrl: getDynamicApiUrl(),
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token || getCookie('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });
};

// Export helper function for debugging
export const getCurrentApiUrl = getDynamicApiUrl;