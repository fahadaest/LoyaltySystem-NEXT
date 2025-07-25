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

interface TopCustomersParams {
    filter?: 'today' | 'week' | 'month' | 'year';
    startDate?: string;
    endDate?: string;
    isPointCustomers?: boolean;
    isProductCustomers?: boolean;
    isAllCustomers?: boolean;
    limit?: number;
}

interface WidgetDataResponse {
    data: any;
    totalCustomers: number;
    totalProducts: number;
    totalLoyaltyPrograms: number;
    totalCustomWalletCards: number;
}

interface Customer {
    customerId: number;
    customerName: string;
    email: string;
    phoneNumber: string;
    spendingAmount: number;
    totalCollectedStamps: number;
    currentAvailableReward: number;
    totalRewardsEarned: number;
    loyaltyPrograms: Array<{
        type: "POINT" | "PRODUCT";
        loyaltyId: number;
    }>;
}

type TopCustomersResponse = Customer[];

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
    tagTypes: ['DashboardGrowth', 'DashboardWidgets', 'TopCustomers'],
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
        getTopCustomers: builder.query<Customer[], TopCustomersParams>({
            query: (params: TopCustomersParams = {}) => ({
                url: '/dashboard/top-customers',
                params: {
                    ...Object.fromEntries(
                        Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
                    )
                }
            }),
            providesTags: ['TopCustomers'],
        }),
    }),
});

export const {
    useGetGrowthAnalyticsQuery,
    useGetWidgetDataQuery,
    useGetTopCustomersQuery,
} = dashboardApi;