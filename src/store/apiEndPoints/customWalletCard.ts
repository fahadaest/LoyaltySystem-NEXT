import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

export const customWalletCardsApi = createApi({
    reducerPath: 'customWalletCardsApi',
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
    tagTypes: ['WalletCard', 'WalletPass'],
    endpoints: (builder) => ({
        // Create a new custom wallet card
        createWalletCard: builder.mutation({
            query: (formData) => ({
                url: '/custom-wallet-card',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['WalletCard'],
        }),

        // Get all wallet cards with filtering and pagination
        getWalletCards: builder.query({
            query: (params = {}) => {
                const searchParams = new URLSearchParams();

                if (params.search) searchParams.append('search', params.search);
                if (params.cardType) searchParams.append('cardType', params.cardType);
                if (params.isActive !== undefined) searchParams.append('isActive', params.isActive.toString());
                if (params.page) searchParams.append('page', params.page.toString());
                if (params.limit) searchParams.append('limit', params.limit.toString());

                return `/custom-wallet-card?${searchParams.toString()}`;
            },
            providesTags: ['WalletCard'],
        }),

        // Get a specific wallet card by ID
        getWalletCardById: builder.query({
            query: (id) => `/custom-wallet-card/${id}`,
            providesTags: (result, error, id) => [{ type: 'WalletCard', id }],
        }),

        // Update an existing wallet card
        updateWalletCard: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/custom-wallet-card/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'WalletCard', id },
                'WalletCard',
            ],
        }),

        // Delete a wallet card
        deleteWalletCard: builder.mutation({
            query: (id) => ({
                url: `/custom-wallet-card/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'WalletCard', id },
                'WalletCard',
            ],
        }),

        // Generate Apple Wallet pass for a customer
        generateWalletPass: builder.mutation({
            query: ({ cardId, passData }) => ({
                url: `/custom-wallet-card/${cardId}/generate-pass`,
                method: 'POST',
                body: passData,
            }),
            invalidatesTags: ['WalletPass'],
        }),

        // Toggle wallet card active/inactive status
        toggleWalletCardStatus: builder.mutation({
            query: (id) => ({
                url: `/custom-wallet-card/${id}/toggle-status`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'WalletCard', id },
                'WalletCard',
            ],
        }),

        // Duplicate a wallet card
        duplicateWalletCard: builder.mutation({
            query: ({ id, cardName }) => ({
                url: `/custom-wallet-card/${id}/duplicate`,
                method: 'POST',
                body: { cardName },
            }),
            invalidatesTags: ['WalletCard'],
        }),

        // Get all wallet passes for a specific card
        getWalletPasses: builder.query({
            query: (cardId) => `/custom-wallet-card/${cardId}/passes`,
            providesTags: ['WalletPass'],
        }),

        // Get wallet pass by ID
        getWalletPassById: builder.query({
            query: (passId) => `/wallet-passes/${passId}`,
            providesTags: (result, error, passId) => [{ type: 'WalletPass', id: passId }],
        }),

        // Update wallet pass (for dynamic content updates)
        updateWalletPass: builder.mutation({
            query: ({ passId, dynamicFields }) => ({
                url: `/wallet-passes/${passId}`,
                method: 'PUT',
                body: { dynamicFields },
            }),
            invalidatesTags: (result, error, { passId }) => [
                { type: 'WalletPass', id: passId },
                'WalletPass',
            ],
        }),

        // Revoke a wallet pass
        revokeWalletPass: builder.mutation({
            query: (passId) => ({
                url: `/wallet-passes/${passId}/revoke`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, passId) => [
                { type: 'WalletPass', id: passId },
                'WalletPass',
            ],
        }),

        // Get wallet card analytics
        getWalletCardAnalytics: builder.query({
            query: () => '/custom-wallet-card/analytics',
            providesTags: ['WalletCard', 'WalletPass'],
        }),

        // Bulk operations
        bulkUpdateWalletCards: builder.mutation({
            query: ({ cardIds, updates }) => ({
                url: '/custom-wallet-card/bulk-update',
                method: 'PATCH',
                body: { cardIds, updates },
            }),
            invalidatesTags: ['WalletCard'],
        }),

        // Export wallet card data
        exportWalletCardData: builder.mutation({
            query: (params) => ({
                url: '/custom-wallet-card/export',
                method: 'POST',
                body: params,
            }),
        }),

        // Import wallet card template
        importWalletCardTemplate: builder.mutation({
            query: (formData) => ({
                url: '/custom-wallet-card/import',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['WalletCard'],
        }),

        // Get wallet card templates
        getWalletCardTemplates: builder.query({
            query: () => '/custom-wallet-card/templates',
        }),
    }),
});

export const {
    // Wallet Card operations
    useCreateWalletCardMutation,
    useGetWalletCardsQuery,
    useGetWalletCardByIdQuery,
    useUpdateWalletCardMutation,
    useDeleteWalletCardMutation,
    useToggleWalletCardStatusMutation,
    useDuplicateWalletCardMutation,

    // Wallet Pass operations
    useGenerateWalletPassMutation,
    useGetWalletPassesQuery,
    useGetWalletPassByIdQuery,
    useUpdateWalletPassMutation,
    useRevokeWalletPassMutation,

    // Analytics and bulk operations
    useGetWalletCardAnalyticsQuery,
    useBulkUpdateWalletCardsMutation,

    // Import/Export
    useExportWalletCardDataMutation,
    useImportWalletCardTemplateMutation,
    useGetWalletCardTemplatesQuery,
} = customWalletCardsApi;