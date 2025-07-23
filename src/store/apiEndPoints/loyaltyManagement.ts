import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export const loyaltyApi = createApi({
    reducerPath: 'loyaltyApi',
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
    tagTypes: ['LoyaltyCard', 'CustomerLoyalty', 'PointLoyalty'],
    endpoints: (builder) => ({
        scanLoyaltyCard: builder.mutation({
            query: (scanData) => ({
                url: '/loyaltyManagement/scan',
                method: 'POST',
                body: scanData,
            }),
            invalidatesTags: ['LoyaltyCard'],
        }),
        addStamp: builder.mutation({
            query: (stampData) => ({
                url: '/loyaltyManagement/add-stamp',
                method: 'POST',
                body: stampData,
            }),
            invalidatesTags: ['LoyaltyCard', 'CustomerLoyalty'],
        }),
        removeStamp: builder.mutation({
            query: (stampData) => ({
                url: '/loyaltyManagement/remove-stamp',
                method: 'POST',
                body: stampData,
            }),
            invalidatesTags: ['LoyaltyCard', 'CustomerLoyalty'],
        }),
        redeemReward: builder.mutation({
            query: (rewardData) => ({
                url: '/loyaltyManagement/redeem-reward',
                method: 'POST',
                body: rewardData,
            }),
            invalidatesTags: ['LoyaltyCard', 'CustomerLoyalty'],
        }),
        logSpending: builder.mutation({
            query: (spendingData) => ({
                url: '/loyaltyManagement/logSpending',
                method: 'POST',
                body: spendingData,
            }),
            invalidatesTags: ['LoyaltyCard', 'CustomerLoyalty', 'PointLoyalty'],
        }),
        redeemPoints: builder.mutation({
            query: (redeemData) => ({
                url: '/loyaltyManagement/redeem-points',
                method: 'POST',
                body: redeemData,
            }),
            invalidatesTags: ['LoyaltyCard', 'CustomerLoyalty', 'PointLoyalty'],
        }),
        getLoyaltyHistory: builder.query({
            query: (customerLoyaltyId) => `/loyaltyManagement/${customerLoyaltyId}/history`,
            providesTags: (result, error, customerLoyaltyId) => [
                { type: 'CustomerLoyalty', id: customerLoyaltyId },
            ],
        }),
        getWalletPassStatus: builder.query({
            query: (serialNumber) => `/apple-wallet/status/${serialNumber}`,
            providesTags: ['LoyaltyCard'],
        }),
    }),
});

export const {
    useScanLoyaltyCardMutation,
    useAddStampMutation,
    useRemoveStampMutation,
    useRedeemRewardMutation,
    useLogSpendingMutation,
    useRedeemPointsMutation,
    useGetLoyaltyHistoryQuery,
    useGetWalletPassStatusQuery,
} = loyaltyApi;