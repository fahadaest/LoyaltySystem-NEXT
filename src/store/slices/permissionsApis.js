import { createApi } from '@reduxjs/toolkit/query/react';
import { createDynamicBaseQuery } from '@/hooks/dynamicBaseQuery';

export const permissionsApis = createApi({
    reducerPath: 'permissionsApi',
    baseQuery: createDynamicBaseQuery(),
    tagTypes: ['Permission', 'UserPermission'],
    endpoints: (builder) => ({
        getAllPermissions: builder.query({
            query: () => '/permissions',
            providesTags: ['Permission'],
        }),

        getUserPermissions: builder.query({
            query: (userId) => `/permissions/user/${userId}`,
            providesTags: (result, error, userId) => [
                { type: 'UserPermission', id: userId }
            ],
        }),

        updateUserPermissions: builder.mutation({
            query: ({ userId, permissionIds }) => ({
                url: `/permissions/user/${userId}`,
                method: 'PUT',
                body: { permissionIds },
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: 'UserPermission', id: userId },
                'UserPermission'
            ],
        }),
    }),
});

export const {
    useGetAllPermissionsQuery,
    useGetUserPermissionsQuery,
    useLazyGetUserPermissionsQuery,
    useUpdateUserPermissionsMutation,
} = permissionsApis;