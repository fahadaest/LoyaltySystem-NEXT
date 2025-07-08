import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export const productsApi = createApi({
    reducerPath: 'productsApi',
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
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (formData) => ({
                url: '/api/products',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Products'],
        }),
        getAllProducts: builder.query({
            query: () => '/api/products',
            providesTags: ['Products'],
        }),
        getProductById: builder.query({
            query: (id: number | string) => `/api/products/${id}`,
        }),
        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/api/products/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation({
            query: (id: number | string) => ({
                url: `/api/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {
    useCreateProductMutation,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;