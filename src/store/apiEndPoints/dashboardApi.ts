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
    tagTypes: ['DashboardGrowth', 'DashboardWidgets', 'TopCustomers', 'TopProducts', 'TotalRewards', 'RewardsAnalytics'],
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
        getRewardsAnalytics: builder.query({
            query: (params) => {
                const searchParams = new URLSearchParams();

                if (params.filter) searchParams.append('filter', params.filter);
                if (params.limit) searchParams.append('limit', params.limit);
                if (params.startDate) searchParams.append('startDate', params.startDate);
                if (params.endDate) searchParams.append('endDate', params.endDate);

                return {
                    url: `/dashboard/total-rewards?${searchParams.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['RewardsAnalytics'],
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
    useGetRewardsAnalyticsQuery,
} = dashboardApi;