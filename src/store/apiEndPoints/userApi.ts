import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';
import { getApiBaseUrl } from 'utils/api';

export const userProfileApi = createApi({
    reducerPath: 'userProfileApi',
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
    tagTypes: ['UserProfile'],
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => '/users/profile',
            providesTags: ['UserProfile'],
        }),
        updateMyProfile: builder.mutation({
            query: (data) => ({
                url: '/users/profile',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['UserProfile'],
        }),
    }),
});

export const {
    useGetMyProfileQuery,
    useUpdateMyProfileMutation
} = userProfileApi;