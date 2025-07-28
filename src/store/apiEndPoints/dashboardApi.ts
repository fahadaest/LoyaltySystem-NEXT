import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
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
    tagTypes: ['DashboardGrowth', 'DashboardWidgets', 'TopCustomers', 'TopProducts', 'TotalRewards'],
    endpoints: (builder) => ({
        getGrowthAnalytics: builder.query({
            query: (params = {}) => ({
                url: '/dashboard/growth',
                params: {
                    ...Object.fromEntries(
                        Object.entries(params).filter(([_, value]) => value !== undefined)
                    )
                }
            }),
            providesTags: ['DashboardGrowth'],
        }),
        getWidgetData: builder.query({
            query: () => ({
                url: '/dashboard/widget-data',
            }),
            providesTags: ['DashboardWidgets'],
        }),
        getTopCustomers: builder.query({
            query: (params = {}) => ({
                url: '/dashboard/top-customers',
                params: {
                    ...Object.fromEntries(
                        Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
                    )
                }
            }),
            providesTags: ['TopCustomers'],
        }),
        getTopProducts: builder.query({
            query: (params = {}) => ({
                url: '/dashboard/top-products',
                params: {
                    ...Object.fromEntries(
                        Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
                    )
                }
            }),
            providesTags: ['TopProducts'],
        }),
        getTotalRewards: builder.query({
            query: (params = {}) => ({
                url: '/dashboard/total-rewards',
                params: {
                    ...Object.fromEntries(
                        Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
                    )
                }
            }),
            providesTags: ['TotalRewards'],
        }),
    }),
});

export const {
    useGetGrowthAnalyticsQuery,
    useGetWidgetDataQuery,
    useGetTopCustomersQuery,
    useGetTopProductsQuery,
    useGetTotalRewardsQuery,
} = dashboardApi;