import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';
import { getApiBaseUrl } from 'utils/api';

export const salespersonsApi = createApi({
    reducerPath: 'salespersonsApi',
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
    tagTypes: ['Salespersons'],
    endpoints: (builder) => ({
        createSalesperson: builder.mutation({
            query: (salespersonData) => ({
                url: '/salespersons',
                method: 'POST',
                body: salespersonData,
            }),
            invalidatesTags: ['Salespersons'],
        }),
        getAllSalespersons: builder.query({
            query: () => '/salespersons',
            providesTags: ['Salespersons'],
        }),
        getSalespersonById: builder.query({
            query: (id) => `/salespersons/${id}`,
        }),
        updateSalesperson: builder.mutation({
            query: ({ id, salespersonData }) => ({
                url: `/salespersons/${id}`,
                method: 'PUT',
                body: salespersonData,
            }),
            invalidatesTags: ['Salespersons'],
        }),
        deleteSalesperson: builder.mutation({
            query: (id) => ({
                url: `/salespersons/${id}`,
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