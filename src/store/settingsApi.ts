import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export const settingsApi = createApi({
    reducerPath: 'settingsApi',
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
    tagTypes: ['Address', 'SocialLinks', 'Beacons', 'SupportDetails', 'Terms'],
    endpoints: (builder) => ({
        // Address API endpoints
        createAddress: builder.mutation({
            query: (formData) => ({
                url: '/api/settings/address',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Address'],
        }),
        getAllAddresses: builder.query({
            query: () => '/api/settings/address',
            providesTags: ['Address'],
        }),
        getAddressById: builder.query({
            query: (id) => `/api/settings/address/${id}`,
        }),
        updateAddress: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/api/settings/address/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Address'],
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/api/settings/address/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Address'],
        }),

        // Social Links API endpoints
        createSocialLinks: builder.mutation({
            query: (formData) => ({
                url: '/api/settings/social-links',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['SocialLinks'],
        }),
        getAllSocialLinks: builder.query({
            query: () => '/api/settings/social-links',
            providesTags: ['SocialLinks'],
        }),
        getSocialLinksById: builder.query({
            query: (id) => `/api/settings/social-links/${id}`,
        }),
        updateSocialLinks: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/api/settings/social-links/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['SocialLinks'],
        }),
        deleteSocialLinks: builder.mutation({
            query: (id) => ({
                url: `/api/settings/social-links/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SocialLinks'],
        }),

        // Beacons API endpoints
        createBeacon: builder.mutation({
            query: (formData) => ({
                url: '/api/settings/beacons',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Beacons'],
        }),
        getAllBeacons: builder.query({
            query: () => '/api/settings/beacons',
            providesTags: ['Beacons'],
        }),
        getBeaconById: builder.query({
            query: (id) => `/api/settings/beacons/${id}`,
        }),
        updateBeacon: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/api/settings/beacons/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Beacons'],
        }),
        deleteBeacon: builder.mutation({
            query: (id) => ({
                url: `/api/settings/beacons/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Beacons'],
        }),

        // Support Details API endpoints
        getSupportDetails: builder.query({
            query: () => '/api/settings/support-details',
            providesTags: ['SupportDetails'],
        }),
        updateSupportDetails: builder.mutation({
            query: ({ formData }) => ({
                url: `/api/settings/support-details`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['SupportDetails'],
        }),

        // Terms API endpoints
        getAllTerms: builder.query({
            query: () => '/api/settings/terms',
            providesTags: ['Terms'],
        }),
        updateTerms: builder.mutation({
            query: ({ formData }) => ({
                url: `/api/settings/terms`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Terms'],
        }),
    }),
});

export const {
    useCreateAddressMutation,
    useGetAllAddressesQuery,
    useGetAddressByIdQuery,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useCreateSocialLinksMutation,
    useGetAllSocialLinksQuery,
    useGetSocialLinksByIdQuery,
    useUpdateSocialLinksMutation,
    useDeleteSocialLinksMutation,
    useCreateBeaconMutation,
    useGetAllBeaconsQuery,
    useGetBeaconByIdQuery,
    useUpdateBeaconMutation,
    useDeleteBeaconMutation,
    useGetSupportDetailsQuery,
    useUpdateSupportDetailsMutation,
    useGetAllTermsQuery,
    useUpdateTermsMutation,
} = settingsApi;