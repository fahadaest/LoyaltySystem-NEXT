import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookieUtils';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token || getCookie('token');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const subscriptionApis = createApi({
    reducerPath: 'subscriptionApi',
    baseQuery,
    tagTypes: ['Subscription'],
    endpoints: (builder) => ({
        createSubscription: builder.mutation({
            query: (subscriptionData) => ({
                url: '/subscriptions',
                method: 'POST',
                body: subscriptionData,
            }),
            invalidatesTags: ['Subscription'],
        }),

        getAllSubscriptions: builder.query({
            query: () => '/subscriptions',
            providesTags: ['Subscription'],
        }),

        getSubscriptionById: builder.query({
            query: (id) => `/subscriptions/${id}`,
            providesTags: (result, error, id) => [{ type: 'Subscription', id }],
        }),

        updateSubscription: builder.mutation({
            query: ({ id, ...subscriptionData }) => ({
                url: `/subscriptions/${id}`,
                method: 'PUT',
                body: subscriptionData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Subscription', id }, 'Subscription'],
        }),

        deleteSubscription: builder.mutation({
            query: (id) => ({
                url: `/subscriptions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Subscription'],
        }),
    }),
});

export const {
    useCreateSubscriptionMutation,
    useGetAllSubscriptionsQuery,
    useGetSubscriptionByIdQuery,
    useLazyGetSubscriptionByIdQuery,
    useUpdateSubscriptionMutation,
    useDeleteSubscriptionMutation,
} = subscriptionApis;