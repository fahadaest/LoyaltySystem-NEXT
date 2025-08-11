import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';
import { getApiBaseUrl } from 'utils/api';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '',
        prepareHeaders: (headers, { endpoint, forced, type }) => {
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
        login: builder.mutation({
            query: (credentials) => ({
                url: `${getApiBaseUrl()}/auth/login`,
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),
        verifyToken: builder.query({
            query: () => `${getApiBaseUrl()}/users/profile`,
            providesTags: ['Auth'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${getApiBaseUrl()}/auth/logout`,
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
        adminSignup: builder.mutation({
            query: (signupData) => ({
                url: `${getApiBaseUrl()}/admins/signup`,
                method: 'POST',
                body: signupData,
            }),
            invalidatesTags: ['Auth'],
        }),
        verifySignupOtp: builder.mutation({
            query: (otpData) => ({
                url: `${getApiBaseUrl()}/admins/verify-signup-otp`,
                method: 'POST',
                body: otpData,
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const {
    useLoginMutation,
    useVerifyTokenQuery,
    useLogoutMutation,
    useLazyVerifyTokenQuery,
    useAdminSignupMutation,
    useVerifySignupOtpMutation
} = authApi;