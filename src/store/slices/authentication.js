import { createApi } from '@reduxjs/toolkit/query/react';
import { createDynamicBaseQuery } from '@/hooks/dynamicBaseQuery';

export const authenticationApis = createApi({
    reducerPath: 'api',
    baseQuery: createDynamicBaseQuery(),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),

        adminSignup: builder.mutation({
            query: (data) => ({
                url: '/admins/signup',
                method: 'POST',
                body: data,
            }),
        }),

        verifySignupOtp: builder.mutation({
            query: (data) => ({
                url: '/admins/verify-signup-otp',
                method: 'POST',
                body: data,
            }),
        }),

        checkDomain: builder.query({
            query: (domain) => `/admins/check-domain?domain=${domain}`,
        }),

        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: data,
            }),
        }),

        resendOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/resend-otp',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    // Auth hooks
    useLoginMutation,
    useAdminSignupMutation,
    useVerifySignupOtpMutation,
    useCheckDomainQuery,
    useLazyCheckDomainQuery,
    useVerifyOtpMutation,
    useResendOtpMutation,
} = authenticationApis;