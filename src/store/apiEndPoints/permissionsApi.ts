import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export const permissionsApi = createApi({
    reducerPath: 'permissionsApi',
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
    tagTypes: ['Permissions', 'UserPermissions'],
    endpoints: (builder) => ({
        getAllPermissions: builder.query({
            query: () => '/permissions',
            providesTags: ['Permissions'],
            transformResponse: (response: any) => {
                // Transform the grouped permissions into a flat array for easier use in forms
                const flatPermissions = [];
                Object.keys(response).forEach(module => {
                    response[module].forEach(permission => {
                        flatPermissions.push({
                            value: permission.id,
                            label: permission.description,
                            module: permission.module,
                            name: permission.name
                        });
                    });
                });
                return {
                    grouped: response,
                    flat: flatPermissions
                };
            }
        }),
        getUserPermissions: builder.query({
            query: (userId: number | string) => `/permissions/user/${userId}`,
            providesTags: (result, error, userId) => [{ type: 'UserPermissions', id: userId }],
        }),
        updateUserPermissions: builder.mutation({
            query: ({ userId, permissionIds }) => ({
                url: `/permissions/user/${userId}`,
                method: 'PUT',
                body: { permissionIds },
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: 'UserPermissions', id: userId },
                'UserPermissions'
            ],
        }),
    }),
});

export const {
    useGetAllPermissionsQuery,
    useGetUserPermissionsQuery,
    useUpdateUserPermissionsMutation,
} = permissionsApi;