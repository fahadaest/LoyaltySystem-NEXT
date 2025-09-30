import { createApi } from '@reduxjs/toolkit/query/react';
import { createDynamicBaseQuery } from '@/hooks/dynamicBaseQuery';

export const loyaltyManagementApis = createApi({
    reducerPath: 'loyaltyManagementApi',
    baseQuery: createDynamicBaseQuery(),
    tagTypes: ['LoyaltyCard', 'LoyaltyHistory'],
    endpoints: (builder) => ({
        scanLoyaltyCard: builder.mutation({
            query: (qrData) => ({
                url: '/loyaltyManagement/scan',
                method: 'POST',
                body: { qrData },
            }),
            invalidatesTags: ['LoyaltyCard'],
        }),

        addStamp: builder.mutation({
            query: (customerLoyaltyId) => ({
                url: '/loyaltyManagement/add-stamp',
                method: 'POST',
                body: { customerLoyaltyId },
            }),
            invalidatesTags: (result, error, customerLoyaltyId) => [
                { type: 'LoyaltyCard', id: customerLoyaltyId },
                'LoyaltyCard',
                'LoyaltyHistory'
            ],
        }),

        removeStamp: builder.mutation({
            query: ({ customerLoyaltyId, reason }) => ({
                url: '/loyaltyManagement/remove-stamp',
                method: 'POST',
                body: { customerLoyaltyId, reason },
            }),
            invalidatesTags: (result, error, { customerLoyaltyId }) => [
                { type: 'LoyaltyCard', id: customerLoyaltyId },
                'LoyaltyCard',
                'LoyaltyHistory'
            ],
        }),

        redeemReward: builder.mutation({
            query: (customerLoyaltyId) => ({
                url: '/loyaltyManagement/redeem-reward',
                method: 'POST',
                body: { customerLoyaltyId },
            }),
            invalidatesTags: (result, error, customerLoyaltyId) => [
                { type: 'LoyaltyCard', id: customerLoyaltyId },
                'LoyaltyCard',
                'LoyaltyHistory'
            ],
        }),

        logSpending: builder.mutation({
            query: ({ customerLoyaltyId, amountUserSpent, productIds, comment }) => ({
                url: '/loyaltyManagement/logSpending',
                method: 'POST',
                body: { customerLoyaltyId, amountUserSpent, productIds, comment },
            }),
            invalidatesTags: (result, error, { customerLoyaltyId }) => [
                { type: 'LoyaltyCard', id: customerLoyaltyId },
                'LoyaltyCard',
                'LoyaltyHistory'
            ],
        }),

        redeemPoints: builder.mutation({
            query: ({ customerLoyaltyId, pointsToRedeem }) => ({
                url: '/loyaltyManagement/redeem-points',
                method: 'POST',
                body: { customerLoyaltyId, pointsToRedeem },
            }),
            invalidatesTags: (result, error, { customerLoyaltyId }) => [
                { type: 'LoyaltyCard', id: customerLoyaltyId },
                'LoyaltyCard',
                'LoyaltyHistory'
            ],
        }),

        getLoyaltyHistory: builder.query({
            query: (customerLoyaltyId) => `/loyalty/${customerLoyaltyId}/history`,
            providesTags: (result, error, customerLoyaltyId) => [
                { type: 'LoyaltyHistory', id: customerLoyaltyId }
            ],
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
    useLazyGetLoyaltyHistoryQuery,
} = loyaltyManagementApis;