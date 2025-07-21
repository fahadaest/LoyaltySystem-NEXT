import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

interface GrowthAnalyticsParams {
    isAllCustomers?: boolean;
    isPointCustomers?: boolean;
    isProductCustomers?: boolean;
    filter?: 'today' | 'week' | 'month' | 'year';
    startDate?: string;
    endDate?: string;
}

interface WidgetDataResponse {
    data: any;
    totalCustomers: number;
    totalProducts: number;
    totalLoyaltyPrograms: number;
    totalCustomWalletCards: number;
}

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
    tagTypes: ['DashboardGrowth', 'DashboardWidgets'],
    endpoints: (builder) => ({
        getGrowthAnalytics: builder.query({
            query: (params: GrowthAnalyticsParams = {}) => ({
                url: '/dashboard/growth',
                params: {
                    ...Object.fromEntries(
                        Object.entries(params).filter(([_, value]) => value !== undefined)
                    )
                }
            }),
            providesTags: ['DashboardGrowth'],
        }),
        getWidgetData: builder.query<WidgetDataResponse, void>({
            query: () => ({
                url: '/dashboard/widget-data',
            }),
            providesTags: ['DashboardWidgets'],
        }),
    }),
});

export const {
    useGetGrowthAnalyticsQuery,
    useGetWidgetDataQuery,
} = dashboardApi;