import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export const managersApi = createApi({
    reducerPath: 'managersApi',
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
    tagTypes: ['Managers'],
    endpoints: (builder) => ({
        createManager: builder.mutation({
            query: (managerData) => ({
                url: '/api/managers',
                method: 'POST',
                body: managerData,
            }),
            invalidatesTags: ['Managers'],
        }),
        getAllManagers: builder.query({
            query: () => '/api/managers',
            providesTags: ['Managers'],
        }),
        getManagerById: builder.query({
            query: (id: number | string) => `/api/managers/${id}`,
        }),
        updateManager: builder.mutation({
            query: ({ id, managerData }) => ({
                url: `/api/managers/${id}`,
                method: 'PUT',
                body: managerData,
            }),
            invalidatesTags: ['Managers'],
        }),
        deleteManager: builder.mutation({
            query: (id: number | string) => ({
                url: `/api/managers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Managers'],
        }),
    }),
});

export const {
    useCreateManagerMutation,
    useGetAllManagersQuery,
    useGetManagerByIdQuery,
    useUpdateManagerMutation,
    useDeleteManagerMutation,
} = managersApi;