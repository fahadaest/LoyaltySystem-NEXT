import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookieUtils';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token || getCookie('token');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const adminApis = createApi({
    reducerPath: 'adminApi',
    baseQuery,
    tagTypes: ['Admin'],
    endpoints: (builder) => ({
        createAdmin: builder.mutation({
            query: (adminData) => ({
                url: '/admins',
                method: 'POST',
                body: adminData,
            }),
            invalidatesTags: ['Admin'],
        }),

        getAllAdmins: builder.query({
            query: () => '/admins',
            providesTags: ['Admin'],
        }),

        getAdminById: builder.query({
            query: (id) => `/admins/${id}`,
            providesTags: (result, error, id) => [{ type: 'Admin', id }],
        }),

        updateAdmin: builder.mutation({
            query: ({ id, ...adminData }) => ({
                url: `/admins/${id}`,
                method: 'PUT',
                body: adminData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Admin', id }, 'Admin'],
        }),
    }),
});

export const {
    useCreateAdminMutation,
    useGetAllAdminsQuery,
    useGetAdminByIdQuery,
    useLazyGetAdminByIdQuery,
    useUpdateAdminMutation,
} = adminApis;