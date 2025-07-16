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
            headers.set('ngrok-skip-browser-warning', 'true');
            return headers;
        },
    }),
    tagTypes: ['Address', 'SocialLinks', 'Beacons', 'SupportDetails', 'Terms'],
    endpoints: (builder) => ({
        // Address API endpoints
        createAddress: builder.mutation({
            query: (formData) => ({
                url: '/settings/address',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Address'],
        }),
        getAllAddresses: builder.query({
            query: () => '/settings/address',
            providesTags: ['Address'],
        }),
        getAddressById: builder.query({
            query: (id) => `/settings/address/${id}`,
        }),
        updateAddress: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/settings/address/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Address'],
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/settings/address/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Address'],
        }),

        // Social Links API endpoints
        getAllSocialLinks: builder.query({
            query: () => '/settings/social-links',
            providesTags: ['SocialLinks'],
        }),
        updateSocialLinks: builder.mutation({
            query: ({ formData }) => ({
                url: `/settings/social-links`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['SocialLinks'],
        }),

        // Beacons API endpoints
        createBeacon: builder.mutation({
            query: (formData) => ({
                url: '/settings/beacons',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Beacons'],
        }),
        getAllBeacons: builder.query({
            query: () => '/settings/beacons',
            providesTags: ['Beacons'],
        }),
        getBeaconById: builder.query({
            query: (id) => `/settings/beacons/${id}`,
        }),
        updateBeacon: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/settings/beacons/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Beacons'],
        }),
        deleteBeacon: builder.mutation({
            query: (id) => ({
                url: `/settings/beacons/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Beacons'],
        }),

        // Support Details API endpoints
        getSupportDetails: builder.query({
            query: () => '/settings/support-details',
            providesTags: ['SupportDetails'],
        }),
        updateSupportDetails: builder.mutation({
            query: ({ formData }) => ({
                url: `/settings/support-details`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['SupportDetails'],
        }),

        // Terms API endpoints
        getAllTerms: builder.query({
            query: () => '/settings/terms',
            providesTags: ['Terms'],
        }),
        updateTerms: builder.mutation({
            query: ({ formData }) => ({
                url: `/settings/terms`,
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
    useGetAllSocialLinksQuery,
    useUpdateSocialLinksMutation,
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