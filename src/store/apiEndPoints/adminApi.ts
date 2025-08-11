import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';
import { getApiBaseUrl } from 'utils/api';

export const adminApi = createApi({
    reducerPath: 'adminApi',
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
    tagTypes: ['Admins'],
    endpoints: (builder) => ({
        createAdmin: builder.mutation({
            query: (newAdmin) => ({
                url: '/admins',
                method: 'POST',
                body: newAdmin,
            }),
            invalidatesTags: ['Admins'],
        }),
        listAdmins: builder.query({
            query: () => '/admins',
            providesTags: ['Admins'],
        }),
        getAdminById: builder.query({
            query: (id) => `/admins/${id}`,
            providesTags: (result, error, id) => [{ type: 'Admins', id }],
        }),
        updateAdmin: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admins/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Admins', id },
                { type: 'Admins' }
            ],
        }),
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `/admins/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Admins', id },
                { type: 'Admins' },
            ],
        }),
    }),
});

export const {
    useCreateAdminMutation,
    useListAdminsQuery,
    useGetAdminByIdQuery,
    useUpdateAdminMutation,
    useDeleteAdminMutation
} = adminApi;