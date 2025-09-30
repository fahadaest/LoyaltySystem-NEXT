import { createApi } from '@reduxjs/toolkit/query/react';
import { createDynamicBaseQuery } from '@/hooks/dynamicBaseQuery';

export const appleWalletApis = createApi({
    reducerPath: 'appleWalletApi',
    baseQuery: createDynamicBaseQuery(),
    tagTypes: ['AppleWalletPass'],
    endpoints: (builder) => ({
        downloadPass: builder.query({
            query: (serialNumber) => ({
                url: `/api/apple-wallet/download/${serialNumber}`,
                method: 'GET',
                responseHandler: (response) => response.blob(),
            }),
        }),

        getPassStatus: builder.query({
            query: (serialNumber) => `/api/apple-wallet/status/${serialNumber}`,
            providesTags: (result, error, serialNumber) => [
                { type: 'AppleWalletPass', id: serialNumber }
            ],
        }),

        getAllPassesForCustomer: builder.query({
            query: (customerId) => `/api/apple-wallet/customer/${customerId}`,
            providesTags: (result, error, customerId) => [
                { type: 'AppleWalletPass', id: `customer-${customerId}` }
            ],
        }),

        revokePass: builder.mutation({
            query: (serialNumber) => ({
                url: `/api/apple-wallet/revoke/${serialNumber}`,
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
    useLazyDownloadPassQuery,
    useGetPassStatusQuery,
    useLazyGetPassStatusQuery,
    useGetAllPassesForCustomerQuery,
    useLazyGetAllPassesForCustomerQuery,
    useRevokePassMutation,
} = appleWalletApis;