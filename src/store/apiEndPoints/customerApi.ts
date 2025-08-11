import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';
import { getApiBaseUrl } from 'utils/api';

export const customersApi = createApi({
    reducerPath: 'customersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: getApiBaseUrl(),
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
        createCustomer: builder.mutation({
            query: (formData) => ({
                url: '/customers',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Customer'],
        }),

        // Get all customers
        getAllCustomers: builder.query({
            query: () => '/customers',
            providesTags: ['Customer'],
        }),

        // Get a customer by ID
        getCustomerById: builder.query({
            query: (id) => `/customers/${id}`,
        }),

        // Update an existing customer
        updateCustomer: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/customers/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Customer'],
        }),

        // Delete a customer by ID
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `/customers/${id}`,
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