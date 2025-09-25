import { createApi } from '@reduxjs/toolkit/query/react';
import { createDynamicBaseQuery } from '@/hooks/dynamicBaseQuery';

export const customerApis = createApi({
    reducerPath: 'customerApi',
    baseQuery: createDynamicBaseQuery(),
    tagTypes: ['Customer'],
    endpoints: (builder) => ({
        createOrUpdateCustomer: builder.mutation({
            query: (customerData) => ({
                url: '/customers',
                method: 'POST',
                body: customerData,
            }),
            invalidatesTags: ['Customer'],
        }),

        getAllCustomers: builder.query({
            query: ({ search = '', limit } = {}) => {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (limit) params.append('limit', limit.toString());

                return `/customers${params.toString() ? `?${params.toString()}` : ''}`;
            },
            providesTags: ['Customer'],
        }),

        getCustomerById: builder.query({
            query: (customerId) => `/customers/${customerId}`,
            providesTags: (result, error, customerId) => [
                { type: 'Customer', id: customerId }
            ],
        }),

        updateCustomer: builder.mutation({
            query: ({ customerId, customerData }) => ({
                url: `/customers/${customerId}`,
                method: 'PUT',
                body: customerData,
            }),
            invalidatesTags: (result, error, { customerId }) => [
                { type: 'Customer', id: customerId },
                'Customer'
            ],
        }),

        deleteCustomer: builder.mutation({
            query: (customerId) => ({
                url: `/customers/${customerId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, customerId) => [
                { type: 'Customer', id: customerId },
                'Customer'
            ],
        }),
    }),
});

export const {
    useCreateOrUpdateCustomerMutation,
    useGetAllCustomersQuery,
    useLazyGetAllCustomersQuery,
    useGetCustomerByIdQuery,
    useLazyGetCustomerByIdQuery,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = customerApis;