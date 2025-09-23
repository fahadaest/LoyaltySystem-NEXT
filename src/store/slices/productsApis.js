import { createApi } from '@reduxjs/toolkit/query/react';
import { createDynamicBaseQuery } from '@/hooks/dynamicBaseQuery';

export const productsApis = createApi({
    reducerPath: 'productsApi',
    baseQuery: createDynamicBaseQuery(),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (productData) => {
                const formData = new FormData();

                Object.keys(productData).forEach(key => {
                    if (productData[key] !== null && productData[key] !== undefined) {
                        formData.append(key, productData[key]);
                    }
                });

                return {
                    url: '/products',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Product'],
        }),

        getAllProducts: builder.query({
            query: () => '/products',
            providesTags: ['Product'],
        }),

        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),

        updateProduct: builder.mutation({
            query: ({ id, ...productData }) => {
                const formData = new FormData();

                Object.keys(productData).forEach(key => {
                    if (productData[key] !== null && productData[key] !== undefined) {
                        formData.append(key, productData[key]);
                    }
                });

                return {
                    url: `/products/${id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }, 'Product'],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    useCreateProductMutation,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useLazyGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApis;