import { createApi } from '@reduxjs/toolkit/query/react';
import { createDynamicBaseQuery } from '@/hooks/dynamicBaseQuery';

export const adminSettingsApis = createApi({
    reducerPath: 'adminSettingsApi',
    baseQuery: createDynamicBaseQuery(),
    tagTypes: ['Address', 'SocialLinks', 'Beacon', 'SupportDetails', 'Terms'],
    endpoints: (builder) => ({
        // ADDRESS ENDPOINTS
        createAddress: builder.mutation({
            query: (addressData) => ({
                url: '/settings/address',
                method: 'POST',
                body: addressData,
            }),
            invalidatesTags: ['Address'],
        }),

        getAllAddresses: builder.query({
            query: () => '/settings/address',
            providesTags: ['Address'],
        }),

        getAddressById: builder.query({
            query: (addressId) => `/settings/address/${addressId}`,
            providesTags: (result, error, addressId) => [
                { type: 'Address', id: addressId }
            ],
        }),

        updateAddress: builder.mutation({
            query: ({ addressId, addressData }) => ({
                url: `/settings/address/${addressId}`,
                method: 'PUT',
                body: addressData,
            }),
            invalidatesTags: (result, error, { addressId }) => [
                { type: 'Address', id: addressId },
                'Address'
            ],
        }),

        deleteAddress: builder.mutation({
            query: (addressId) => ({
                url: `/settings/address/${addressId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, addressId) => [
                { type: 'Address', id: addressId },
                'Address'
            ],
        }),

        // SOCIAL LINKS ENDPOINTS
        createOrUpdateSocialLinks: builder.mutation({
            query: (socialLinksData) => ({
                url: '/settings/social-links',
                method: 'POST',
                body: socialLinksData,
            }),
            invalidatesTags: ['SocialLinks'],
        }),

        getSocialLinks: builder.query({
            query: () => '/settings/social-links',
            providesTags: ['SocialLinks'],
        }),

        deleteSocialLinks: builder.mutation({
            query: (socialLinksId) => ({
                url: `/settings/social-links/${socialLinksId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SocialLinks'],
        }),

        // BEACONS ENDPOINTS
        createBeacon: builder.mutation({
            query: (beaconData) => ({
                url: '/settings/beacons',
                method: 'POST',
                body: beaconData,
            }),
            invalidatesTags: ['Beacon'],
        }),

        getAllBeacons: builder.query({
            query: () => '/settings/beacons',
            providesTags: ['Beacon'],
        }),

        getBeaconById: builder.query({
            query: (beaconId) => `/settings/beacons/${beaconId}`,
            providesTags: (result, error, beaconId) => [
                { type: 'Beacon', id: beaconId }
            ],
        }),

        updateBeacon: builder.mutation({
            query: ({ beaconId, beaconData }) => ({
                url: `/settings/beacons/${beaconId}`,
                method: 'PUT',
                body: beaconData,
            }),
            invalidatesTags: (result, error, { beaconId }) => [
                { type: 'Beacon', id: beaconId },
                'Beacon'
            ],
        }),

        deleteBeacon: builder.mutation({
            query: (beaconId) => ({
                url: `/settings/beacons/${beaconId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, beaconId) => [
                { type: 'Beacon', id: beaconId },
                'Beacon'
            ],
        }),

        // SUPPORT DETAILS ENDPOINTS
        createOrUpdateSupportDetails: builder.mutation({
            query: (supportDetailsData) => ({
                url: '/settings/support-details',
                method: 'POST',
                body: supportDetailsData,
            }),
            invalidatesTags: ['SupportDetails'],
        }),

        getAllSupportDetails: builder.query({
            query: () => '/settings/support-details',
            providesTags: ['SupportDetails'],
        }),

        deleteSupportDetails: builder.mutation({
            query: (supportDetailsId) => ({
                url: `/settings/support-details/${supportDetailsId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SupportDetails'],
        }),

        // TERMS AND CONDITIONS ENDPOINTS
        createTermsAndConditions: builder.mutation({
            query: (termsData) => ({
                url: '/settings/terms',
                method: 'POST',
                body: termsData,
            }),
            invalidatesTags: ['Terms'],
        }),

        getAllTermsAndConditions: builder.query({
            query: () => '/settings/terms',
            providesTags: ['Terms'],
        }),

        deleteTermsAndConditions: builder.mutation({
            query: (termsId) => ({
                url: `/settings/terms/${termsId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Terms'],
        }),
    }),
});

export const {
    // Address hooks
    useCreateAddressMutation,
    useGetAllAddressesQuery,
    useLazyGetAllAddressesQuery,
    useGetAddressByIdQuery,
    useLazyGetAddressByIdQuery,
    useUpdateAddressMutation,
    useDeleteAddressMutation,

    // Social Links hooks
    useCreateOrUpdateSocialLinksMutation,
    useGetSocialLinksQuery,
    useLazyGetSocialLinksQuery,
    useDeleteSocialLinksMutation,

    // Beacons hooks
    useCreateBeaconMutation,
    useGetAllBeaconsQuery,
    useLazyGetAllBeaconsQuery,
    useGetBeaconByIdQuery,
    useLazyGetBeaconByIdQuery,
    useUpdateBeaconMutation,
    useDeleteBeaconMutation,

    // Support Details hooks
    useCreateOrUpdateSupportDetailsMutation,
    useGetAllSupportDetailsQuery,
    useLazyGetAllSupportDetailsQuery,
    useDeleteSupportDetailsMutation,

    // Terms and Conditions hooks
    useCreateTermsAndConditionsMutation,
    useGetAllTermsAndConditionsQuery,
    useLazyGetAllTermsAndConditionsQuery,
    useDeleteTermsAndConditionsMutation,
} = adminSettingsApis;