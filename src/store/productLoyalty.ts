import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export const productLoyaltyApi = createApi({
    reducerPath: 'productLoyaltyApi',
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
    tagTypes: ['ProductLoyalty'],
    endpoints: (builder) => ({
        createProductLoyaltyCampaign: builder.mutation({
            query: (formData) => ({
                url: '/api/product-loyalty',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['ProductLoyalty'],
        }),
        getAllProductLoyaltyCampaigns: builder.query({
            query: () => '/api/product-loyalty',
            providesTags: ['ProductLoyalty'],
        }),
        getProductLoyaltyCampaignById: builder.query({
            query: (id) => `/api/product-loyalty/${id}`,
        }),
        updateProductLoyaltyCampaign: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/api/product-loyalty/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['ProductLoyalty'],
        }),
        deleteProductLoyaltyCampaign: builder.mutation({
            query: (id) => ({
                url: `/api/product-loyalty/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ProductLoyalty'],
        }),
    }),
});

export const {
    useCreateProductLoyaltyCampaignMutation,
    useGetAllProductLoyaltyCampaignsQuery,
    useGetProductLoyaltyCampaignByIdQuery,
    useUpdateProductLoyaltyCampaignMutation,
    useDeleteProductLoyaltyCampaignMutation,
} = productLoyaltyApi;