import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    _id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    token: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

export interface VerifyTokenResponse {
    user: User;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers) => {
            const token = getCookie('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('ngrok-skip-browser-warning', 'true');
            return headers;
        },
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/api/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),
        verifyToken: builder.query<VerifyTokenResponse, void>({
            query: () => '/api/users/profile',
            providesTags: ['Auth'],
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const {
    useLoginMutation,
    useVerifyTokenQuery,
    useLogoutMutation,
    useLazyVerifyTokenQuery
} = authApi;