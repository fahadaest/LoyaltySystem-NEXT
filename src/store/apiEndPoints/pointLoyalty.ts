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
            headers.set('ngrok-skip-browser-warning', 'true');
            return headers;
        },
    }),
    tagTypes: ['PointLoyalty'],
    endpoints: (builder) => ({
        createPointLoyaltyCampaign: builder.mutation({
            query: (formData) => ({
                url: '/point-loyalty',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['PointLoyalty'],
        }),
        getAllPointLoyaltyCampaigns: builder.query({
            query: (search) => `/point-loyalty?search=${search}`,
            providesTags: ['PointLoyalty'],
        }),
        getPointLoyaltyCampaignById: builder.query({
            query: (id) => `/point-loyalty/${id}`,
        }),
        updatePointLoyaltyCampaign: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/point-loyalty/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['PointLoyalty'],
        }),
        deletePointLoyaltyCampaign: builder.mutation({
            query: (id) => ({
                url: `/point-loyalty/${id}`,
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