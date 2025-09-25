import { createApi } from '@reduxjs/toolkit/query/react';
import { createDynamicBaseQuery } from '@/hooks/dynamicBaseQuery';

export const managersApis = createApi({
    reducerPath: 'managersApi',
    baseQuery: createDynamicBaseQuery(),
    tagTypes: ['Manager'],
    endpoints: (builder) => ({
        createManager: builder.mutation({
            query: (managerData) => ({
                url: '/managers',
                method: 'POST',
                body: managerData,
            }),
            invalidatesTags: ['Manager'],
        }),

        getAllManagers: builder.query({
            query: () => '/managers',
            providesTags: ['Manager'],
        }),

        getManagerById: builder.query({
            query: (id) => `/managers/${id}`,
            providesTags: (result, error, id) => [{ type: 'Manager', id }],
        }),

        updateManager: builder.mutation({
            query: ({ id, ...managerData }) => ({
                url: `/managers/${id}`,
                method: 'PUT',
                body: managerData,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Manager', id },
                'Manager'
            ],
        }),

        deleteManager: builder.mutation({
            query: (id) => ({
                url: `/managers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Manager'],
        }),
    }),
});

export const {
    useCreateManagerMutation,
    useGetAllManagersQuery,
    useGetManagerByIdQuery,
    useLazyGetManagerByIdQuery,
    useUpdateManagerMutation,
    useDeleteManagerMutation,
} = managersApis;