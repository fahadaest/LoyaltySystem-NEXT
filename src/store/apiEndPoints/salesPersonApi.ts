import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export const salespersonsApi = createApi({
    reducerPath: 'salespersonsApi',
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
    tagTypes: ['Salespersons'],
    endpoints: (builder) => ({
        createSalesperson: builder.mutation({
            query: (salespersonData) => ({
                url: '/api/salespersons',
                method: 'POST',
                body: salespersonData,
            }),
            invalidatesTags: ['Salespersons'],
        }),
        getAllSalespersons: builder.query({
            query: () => '/api/salespersons',
            providesTags: ['Salespersons'],
        }),
        getSalespersonById: builder.query({
            query: (id: number | string) => `/api/salespersons/${id}`,
        }),
        updateSalesperson: builder.mutation({
            query: ({ id, salespersonData }) => ({
                url: `/api/salespersons/${id}`,
                method: 'PUT',
                body: salespersonData,
            }),
            invalidatesTags: ['Salespersons'],
        }),
        deleteSalesperson: builder.mutation({
            query: (id: number | string) => ({
                url: `/api/salespersons/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Salespersons'],
        }),
    }),
});

export const {
    useCreateSalespersonMutation,
    useGetAllSalespersonsQuery,
    useGetSalespersonByIdQuery,
    useUpdateSalespersonMutation,
    useDeleteSalespersonMutation,
} = salespersonsApi;