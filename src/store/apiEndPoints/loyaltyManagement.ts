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
    tagTypes: ['LoyaltyCard', 'CustomerLoyalty'],
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
    useGetLoyaltyHistoryQuery,
    useGetWalletPassStatusQuery,
} = loyaltyApi;