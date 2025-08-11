import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';
import { getApiBaseUrl } from 'utils/api';

export const subscriptionApi = createApi({
    reducerPath: 'subscriptionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: getApiBaseUrl(),
        prepareHeaders: (headers) => {
            const token = getCookie('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('ngrok-skip-browser-warning', 'true');
            return headers;
        },
    }),
    tagTypes: ['Subscriptions'],
    endpoints: (builder) => ({
        createSubscription: builder.mutation({
            query: (body) => ({
                url: '/subscriptions',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Subscriptions'],
        }),

        listSubscriptions: builder.query({
            query: () => '/subscriptions',
            providesTags: ['Subscriptions'],
        }),

        getSubscriptionById: builder.query({
            query: (id) => `/subscriptions/${id}`,
            providesTags: (result, error, id) => [{ type: 'Subscriptions', id }],
        }),

        updateSubscription: builder.mutation({
            query: ({ id, data }) => ({
                url: `/subscriptions/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Subscriptions', id },
                { type: 'Subscriptions' },
            ],
        }),

        deleteSubscription: builder.mutation({
            query: (id) => ({
                url: `/subscriptions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Subscriptions', id },
                { type: 'Subscriptions' },
            ],
        }),
    }),
});

export const {
    useCreateSubscriptionMutation,
    useListSubscriptionsQuery,
    useGetSubscriptionByIdQuery,
    useUpdateSubscriptionMutation,
    useDeleteSubscriptionMutation,
} = subscriptionApi;