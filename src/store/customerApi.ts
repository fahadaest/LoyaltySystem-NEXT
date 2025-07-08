import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export const customersApi = createApi({
    reducerPath: 'customersApi',
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
    tagTypes: ['Customer'],
    endpoints: (builder) => ({
        // Create a new customer
        createCustomer: builder.mutation<{
            customer: any;
            walletPassUrl?: string;
            isNewCustomer: boolean;
        }, any>({
            query: (formData) => ({
                url: '/api/customers',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Customer'],
        }),

        // Download wallet pass
        downloadWalletPass: builder.query<Blob, string>({
            query: (filename) => ({
                url: `/api/wallet-passes/${filename}`,
                responseHandler: (response) => response.blob(),
            }),
        }),


        // Get all customers
        getAllCustomers: builder.query({
            query: () => '/api/customers',
            providesTags: ['Customer'],
        }),

        // Get a customer by ID
        getCustomerById: builder.query({
            query: (id) => `/api/customers/${id}`,
        }),

        // Update an existing customer
        updateCustomer: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/api/customers/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Customer'],
        }),

        // Delete a customer by ID
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `/api/customers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Customer'],
        }),
    }),
});

export const {
    useCreateCustomerMutation,
    useGetAllCustomersQuery,
    useGetCustomerByIdQuery,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useDownloadWalletPassQuery
} = customersApi;