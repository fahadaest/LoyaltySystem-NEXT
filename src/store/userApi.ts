import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImage?: string;
    coverImage?: string;
}

export interface UpdateUserProfileRequest {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    profileImage?: File;
    coverImage?: File;
}

export const userProfileApi = createApi({
    reducerPath: 'userProfileApi',
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
    tagTypes: ['UserProfile'],
    endpoints: (builder) => ({
        getMyProfile: builder.query<UserProfile, void>({
            query: () => '/api/users/profile',
            providesTags: ['UserProfile'],
        }),
        updateMyProfile: builder.mutation({
            query: (data) => ({
                url: '/api/users/profile',
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