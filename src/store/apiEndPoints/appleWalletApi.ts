import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export const appleWalletApi = createApi({
    reducerPath: 'appleWalletApi',
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
    tagTypes: ['AppleWalletPass'],
    endpoints: (builder) => ({
        // Download Apple Wallet pass by serial number
        downloadAppleWalletPass: builder.query<Blob, string>({
            query: (serialNumber) => ({
                url: `/apple-wallet/download/${serialNumber}`,
                responseHandler: (response) => response.blob(),
            }),
        }),

        // Download Apple Wallet pass as mutation (for triggering downloads)
        downloadAppleWalletPassMutation: builder.mutation<Blob, string>({
            query: (serialNumber) => ({
                url: `/apple-wallet/download/${serialNumber}`,
                method: 'GET',
                responseHandler: (response) => response.blob(),
            }),
        }),

        // Get Apple Wallet pass status
        getAppleWalletPassStatus: builder.query<{
            success: boolean;
            pass: {
                serialNumber: string;
                status: 'active' | 'expired' | 'revoked';
                loyaltyType: 'PRODUCT' | 'POINT';
                customer: {
                    firstName: string;
                    lastName: string;
                    email: string;
                };
                loyalty: {
                    type: 'PRODUCT' | 'POINT';
                    loyaltyId: number;
                };
                createdAt: string;
                updatedAt: string;
            };
        }, string>({
            query: (serialNumber) => `/apple-wallet/status/${serialNumber}`,
            providesTags: (result, error, serialNumber) => [
                { type: 'AppleWalletPass', id: serialNumber }
            ],
        }),

        // Get all Apple Wallet passes for a customer
        getCustomerAppleWalletPasses: builder.query<{
            success: boolean;
            count: number;
            passes: Array<{
                id: number;
                serialNumber: string;
                loyaltyType: 'PRODUCT' | 'POINT';
                status: 'active' | 'expired' | 'revoked';
                downloadUrl: string;
                loyaltyProgram: {
                    rewardTitle: string;
                    spendingAmount?: number;
                    rewardPoints?: number;
                    purchaseQuantity?: number;
                };
                createdAt: string;
            }>;
        }, number>({
            query: (customerId) => `/apple-wallet/customer/${customerId}`,
            providesTags: (result, error, customerId) => [
                { type: 'AppleWalletPass', id: `customer-${customerId}` }
            ],
        }),

        // Revoke an Apple Wallet pass (admin only)
        revokeAppleWalletPass: builder.mutation<{
            success: boolean;
            message: string;
            pass: {
                serialNumber: string;
                status: string;
                updatedAt: string;
            };
        }, string>({
            query: (serialNumber) => ({
                url: `/apple-wallet/revoke/${serialNumber}`,
                method: 'PUT',
            }),
            invalidatesTags: (result, error, serialNumber) => [
                { type: 'AppleWalletPass', id: serialNumber },
                'AppleWalletPass'
            ],
        }),
    }),
});

export const {
    useDownloadAppleWalletPassQuery,
    useGetAppleWalletPassStatusQuery,
    useGetCustomerAppleWalletPassesQuery,
    useDownloadAppleWalletPassMutationMutation,
    useRevokeAppleWalletPassMutation,

    // Lazy queries
    useLazyDownloadAppleWalletPassQuery,
    useLazyGetAppleWalletPassStatusQuery,
    useLazyGetCustomerAppleWalletPassesQuery,
} = appleWalletApi;