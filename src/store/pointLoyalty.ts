import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export const pointLoyaltyApi = createApi({
    reducerPath: 'pointLoyaltyApi',
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
    tagTypes: ['PointLoyalty'],
    endpoints: (builder) => ({
        createPointLoyaltyCampaign: builder.mutation({
            query: (formData) => ({
                url: '/api/point-loyalty',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['PointLoyalty'],
        }),
        getAllPointLoyaltyCampaigns: builder.query({
            query: (search) => `/api/point-loyalty?search=${search}`,
            providesTags: ['PointLoyalty'],
        }),
        getPointLoyaltyCampaignById: builder.query({
            query: (id) => `/api/point-loyalty/${id}`,
        }),
        updatePointLoyaltyCampaign: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/api/point-loyalty/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['PointLoyalty'],
        }),
        deletePointLoyaltyCampaign: builder.mutation({
            query: (id) => ({
                url: `/api/point-loyalty/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PointLoyalty'],
        }),
    }),
});

export const {
    useCreatePointLoyaltyCampaignMutation,
    useGetAllPointLoyaltyCampaignsQuery,
    useGetPointLoyaltyCampaignByIdQuery,
    useUpdatePointLoyaltyCampaignMutation,
    useDeletePointLoyaltyCampaignMutation,
} = pointLoyaltyApi;