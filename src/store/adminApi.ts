import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}

export interface Admin {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface CreateAdminRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UpdateAdminRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export const adminApi = createApi({
    reducerPath: 'adminApi',
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
    tagTypes: ['Admins'],
    endpoints: (builder) => ({
        createAdmin: builder.mutation<Admin, CreateAdminRequest>({
            query: (newAdmin) => ({
                url: '/api/admins',
                method: 'POST',
                body: newAdmin,
            }),
            invalidatesTags: ['Admins'],
        }),
        listAdmins: builder.query<Admin[], void>({
            query: () => '/api/admins',
            providesTags: ['Admins'],
        }),
        getAdminById: builder.query<Admin, string>({
            query: (id) => `/api/admins/${id}`,
            providesTags: (result, error, id) => [{ type: 'Admins', id }],
        }),
        updateAdmin: builder.mutation<Admin, { id: string; data: UpdateAdminRequest }>({
            query: ({ id, data }) => ({
                url: `/api/admins/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Admins', id }],
        }),
    }),
});

export const {
    useCreateAdminMutation,
    useListAdminsQuery,
    useGetAdminByIdQuery,
    useUpdateAdminMutation,
} = adminApi;
