import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export const productSizesApi = createApi({
    reducerPath: 'productSizesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers) => {
            const token = getCookie('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['ProductSizes'],
    endpoints: (builder) => ({
        createProductSize: builder.mutation({
            query: (formData) => ({
                url: '/api/product-sizes',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['ProductSizes'],
        }),
        getAllProductSizes: builder.query({
            query: () => '/api/product-sizes',
            providesTags: ['ProductSizes'],
        }),
        getProductSizeById: builder.query({
            query: (id) => `/api/product-sizes/${id}`,
        }),
        updateProductSize: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/api/product-sizes/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['ProductSizes'],
        }),
        deleteProductSize: builder.mutation({
            query: (id) => ({
                url: `/api/product-sizes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ProductSizes'],
        }),
    }),
});

export const {
    useCreateProductSizeMutation,
    useGetAllProductSizesQuery,
    useGetProductSizeByIdQuery,
    useUpdateProductSizeMutation,
    useDeleteProductSizeMutation,
} = productSizesApi;