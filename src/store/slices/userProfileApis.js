import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookieUtils';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token || getCookie('token');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const userProfileApis = createApi({
    reducerPath: 'userProfileApi',
    baseQuery,
    tagTypes: ['UserProfile'],
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => '/users/profile',
            providesTags: ['UserProfile'],
        }),

        updateMyProfile: builder.mutation({
            query: (profileData) => {
                // Create FormData if profileData contains files
                if (profileData instanceof FormData) {
                    return {
                        url: '/users/profile',
                        method: 'PUT',
                        body: profileData,
                    };
                }

                // Handle regular object data
                const formData = new FormData();
                Object.keys(profileData).forEach(key => {
                    if (profileData[key] !== null && profileData[key] !== undefined) {
                        formData.append(key, profileData[key]);
                    }
                });

                return {
                    url: '/users/profile',
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['UserProfile'],
        }),
    }),
});

export const {
    useGetMyProfileQuery,
    useLazyGetMyProfileQuery,
    useUpdateMyProfileMutation,
} = userProfileApis;