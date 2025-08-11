import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';
import { getApiBaseUrl } from 'utils/api';

export const productLoyaltyApi = createApi({
    reducerPath: 'productLoyaltyApi',
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
    tagTypes: ['ProductLoyalty'],
    endpoints: (builder) => ({
        createProductLoyaltyCampaign: builder.mutation({
            query: (formData) => ({
                url: '/product-loyalty',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['ProductLoyalty'],
        }),
        getAllProductLoyaltyCampaigns: builder.query({
            query: () => '/product-loyalty',
            providesTags: ['ProductLoyalty'],
        }),
        getProductLoyaltyCampaignById: builder.query({
            query: (id) => `/product-loyalty/${id}`,
        }),
        updateProductLoyaltyCampaign: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/product-loyalty/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['ProductLoyalty'],
        }),
        deleteProductLoyaltyCampaign: builder.mutation({
            query: (id) => ({
                url: `/product-loyalty/${id}`,
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