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
        // Create a new customer with Apple Wallet integration
        createCustomer: builder.mutation<{
            success: boolean;
            customer: {
                id: number;
                firstName: string;
                lastName: string;
                email: string;
                phoneNumber: string;
                adminId: number;
                createdAt: string;
                updatedAt: string;
                loyaltyPrograms: Array<{
                    id: number;
                    customerId: number;
                    loyaltyId: number;
                    type: 'PRODUCT' | 'POINT';
                    createdAt: string;
                    updatedAt: string;
                    pointLoyalty?: any;
                    productLoyalty?: any;
                }>;
            };
            appleWalletPass: {
                available: boolean;
                downloadUrl?: string;
                fileName?: string;
                passId?: number;
                error?: string;
                reason?: string;
            };
        }, {
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            type: 'PRODUCT' | 'POINT';
            loyaltyId: number;
            adminId: number;
        }>({
            query: (formData) => ({
                url: '/api/customers',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Customer'],
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
} = customersApi;