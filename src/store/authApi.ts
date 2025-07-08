import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    role: string;
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('ngrok-skip-browser-warning', 'true');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/api/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
