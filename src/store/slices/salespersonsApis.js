import { createApi } from '@reduxjs/toolkit/query/react';
import { createDynamicBaseQuery } from '@/hooks/dynamicBaseQuery';

export const salespersonsApis = createApi({
    reducerPath: 'salespersonsApi',
    baseQuery: createDynamicBaseQuery(),
    tagTypes: ['Salesperson'],
    endpoints: (builder) => ({
        createSalesperson: builder.mutation({
            query: (salespersonData) => ({
                url: '/salespersons',
                method: 'POST',
                body: salespersonData,
            }),
            invalidatesTags: ['Salesperson'],
        }),

        getAllSalespersons: builder.query({
            query: () => '/salespersons',
            providesTags: ['Salesperson'],
        }),

        getSalespersonById: builder.query({
            query: (id) => `/salespersons/${id}`,
            providesTags: (result, error, id) => [{ type: 'Salesperson', id }],
        }),

        updateSalesperson: builder.mutation({
            query: ({ id, ...salespersonData }) => ({
                url: `/salespersons/${id}`,
                method: 'PUT',
                body: salespersonData,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Salesperson', id },
                'Salesperson'
            ],
        }),

        deleteSalesperson: builder.mutation({
            query: (id) => ({
                url: `/salespersons/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Salesperson'],
        }),
    }),
});

export const {
    useCreateSalespersonMutation,
    useGetAllSalespersonsQuery,
    useGetSalespersonByIdQuery,
    useLazyGetSalespersonByIdQuery,
    useUpdateSalespersonMutation,
    useDeleteSalespersonMutation,
} = salespersonsApis;