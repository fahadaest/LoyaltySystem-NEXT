import { createApi } from '@reduxjs/toolkit/query/react';
import { createDynamicBaseQuery } from '@/hooks/dynamicBaseQuery';

export const productSizesApis = createApi({
    reducerPath: 'productSizesApi',
    baseQuery: createDynamicBaseQuery(),
    tagTypes: ['ProductSize'],
    endpoints: (builder) => ({
        createProductSize: builder.mutation({
            query: (sizeData) => ({
                url: '/product-sizes',
                method: 'POST',
                body: sizeData,
            }),
            invalidatesTags: ['ProductSize'],
        }),

        getAllProductSizes: builder.query({
            query: () => '/product-sizes',
            providesTags: ['ProductSize'],
        }),

        getProductSizeById: builder.query({
            query: (id) => `/product-sizes/${id}`,
            providesTags: (result, error, id) => [{ type: 'ProductSize', id }],
        }),

        updateProductSize: builder.mutation({
            query: ({ id, ...sizeData }) => ({
                url: `/product-sizes/${id}`,
                method: 'PUT',
                body: sizeData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'ProductSize', id }, 'ProductSize'],
        }),

        deleteProductSize: builder.mutation({
            query: (id) => ({
                url: `/product-sizes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ProductSize'],
        }),
    }),
});

export const {
    useCreateProductSizeMutation,
    useGetAllProductSizesQuery,
    useGetProductSizeByIdQuery,
    useLazyGetProductSizeByIdQuery,
    useUpdateProductSizeMutation,
    useDeleteProductSizeMutation,
} = productSizesApis;