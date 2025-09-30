import { createApi } from '@reduxjs/toolkit/query/react';
import { createDynamicBaseQuery } from '@/hooks/dynamicBaseQuery';

export const dashboardApis = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: createDynamicBaseQuery(),
    tagTypes: ['Dashboard', 'Analytics', 'Retention', 'ROI'],
    endpoints: (builder) => ({
        getWidgetData: builder.query({
            query: () => '/dashboard/widget-data',
            providesTags: ['Dashboard'],
        }),

        getGenderDistribution: builder.query({
            query: () => '/dashboard/gender-distribution',
            providesTags: ['Dashboard'],
        }),

        getTopCustomers: builder.query({
            query: (params) => ({
                url: '/dashboard/top-customers',
                params: {
                    filter: params?.filter,
                    startDate: params?.startDate,
                    endDate: params?.endDate,
                    isPointCustomers: params?.isPointCustomers,
                    isProductCustomers: params?.isProductCustomers,
                    limit: params?.limit,
                },
            }),
            providesTags: ['Analytics'],
        }),

        getTopProducts: builder.query({
            query: (params) => ({
                url: '/dashboard/top-products',
                params: {
                    filter: params?.filter,
                    startDate: params?.startDate,
                    endDate: params?.endDate,
                    isPointProducts: params?.isPointProducts,
                    isProductProducts: params?.isProductProducts,
                    limit: params?.limit,
                },
            }),
            providesTags: ['Analytics'],
        }),

        getCustomerGrowth: builder.query({
            query: (params) => ({
                url: '/dashboard/growth',
                params: {
                    filter: params?.filter,
                    isAllCustomers: params?.isAllCustomers,
                    isPointCustomers: params?.isPointCustomers,
                    isProductCustomers: params?.isProductCustomers,
                    startDate: params?.startDate,
                    endDate: params?.endDate,
                },
            }),
            providesTags: ['Analytics'],
        }),

        getIssuedCards: builder.query({
            query: (params) => ({
                url: '/dashboard/issued-cards',
                params: {
                    filter: params?.filter,
                    startDate: params?.startDate,
                    endDate: params?.endDate,
                },
            }),
            providesTags: ['Analytics'],
        }),

        getTotalRewards: builder.query({
            query: (params) => ({
                url: '/dashboard/total-rewards',
                params: {
                    filter: params?.filter,
                    startDate: params?.startDate,
                    endDate: params?.endDate,
                },
            }),
            providesTags: ['Analytics'],
        }),

        getSuperAdminDashboard: builder.query({
            query: () => '/superadmin/dashboard',
            providesTags: ['Dashboard'],
        }),

        getRetentionAnalytics: builder.query({
            query: (params) => ({
                url: '/dashboard/retention',
                params: {
                    filter: params?.filter,
                    startDate: params?.startDate,
                    endDate: params?.endDate,
                },
            }),
            providesTags: ['Retention'],
        }),

        getRetentionTrend: builder.query({
            query: (params) => ({
                url: '/dashboard/retention-trend',
                params: {
                    filter: params?.filter,
                },
            }),
            providesTags: ['Retention'],
        }),

        getCostBreakdown: builder.query({
            query: () => '/dashboard/cost-breakdown',
            providesTags: ['Analytics'],
        }),

        getROIAnalytics: builder.query({
            query: (params) => ({
                url: '/dashboard/roi',
                params: {
                    filter: params?.filter,
                    startDate: params?.startDate,
                    endDate: params?.endDate,
                },
            }),
            providesTags: ['ROI'],
        }),
    }),
});

export const {
    useGetWidgetDataQuery,
    useLazyGetWidgetDataQuery,
    useGetGenderDistributionQuery,
    useLazyGetGenderDistributionQuery,
    useGetTopCustomersQuery,
    useLazyGetTopCustomersQuery,
    useGetTopProductsQuery,
    useLazyGetTopProductsQuery,
    useGetCustomerGrowthQuery,
    useLazyGetCustomerGrowthQuery,
    useGetIssuedCardsQuery,
    useLazyGetIssuedCardsQuery,
    useGetTotalRewardsQuery,
    useLazyGetTotalRewardsQuery,
    useGetSuperAdminDashboardQuery,
    useLazyGetSuperAdminDashboardQuery,
    useGetRetentionAnalyticsQuery,
    useLazyGetRetentionAnalyticsQuery,
    useGetRetentionTrendQuery,
    useLazyGetRetentionTrendQuery,
    useGetCostBreakdownQuery,
    useLazyGetCostBreakdownQuery,
    useGetROIAnalyticsQuery,
    useLazyGetROIAnalyticsQuery,
} = dashboardApis;