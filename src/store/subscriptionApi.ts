import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}

export interface Subscription {
    createdAt: string;
    updatedAt: string;
    id: number;
    name: string;
    price: string;
    billingCycle: 'monthly' | 'yearly' | string;
    status: 'active' | 'inactive' | string;
    description?: string;
}

export interface CreateSubscriptionRequest {
    name: string;
    price: string;
    billingCycle: string;
    status: string;
    description?: string;
}

export interface UpdateSubscriptionRequest {
    name?: string;
    price?: string;
    billingCycle?: string;
    status?: string;
    description?: string;
}

export const subscriptionApi = createApi({
    reducerPath: 'subscriptionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers) => {
            const token = getCookie('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Subscriptions'],
    endpoints: (builder) => ({
        createSubscription: builder.mutation<Subscription, CreateSubscriptionRequest>({
            query: (body) => ({
                url: '/api/subscriptions',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Subscriptions'],
        }),

        listSubscriptions: builder.query<Subscription[], void>({
            query: () => '/api/subscriptions',
            providesTags: ['Subscriptions'],
        }),

        getSubscriptionById: builder.query<Subscription, number>({
            query: (id) => `/api/subscriptions/${id}`,
            providesTags: (result, error, id) => [{ type: 'Subscriptions', id }],
        }),

        updateSubscription: builder.mutation<Subscription, { id: number; data: UpdateSubscriptionRequest }>({
            query: ({ id, data }) => ({
                url: `/api/subscriptions/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Subscriptions', id },
                { type: 'Subscriptions' },
            ],
        }),

        deleteSubscription: builder.mutation<{ message: string }, number>({
            query: (id) => ({
                url: `/api/subscriptions/${id}`,
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