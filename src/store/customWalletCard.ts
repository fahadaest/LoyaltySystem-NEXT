import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'utils/getCookies';

// Types for Custom Wallet Cards
export interface WalletCardField {
    key: string;
    label: string;
    value: string;
    changeMessage?: string;
    textAlignment?: 'PKTextAlignmentLeft' | 'PKTextAlignmentCenter' | 'PKTextAlignmentRight';
    dateStyle?: 'PKDateStyleNone' | 'PKDateStyleShort' | 'PKDateStyleMedium' | 'PKDateStyleLong' | 'PKDateStyleFull';
    timeStyle?: 'PKDateStyleNone' | 'PKDateStyleShort' | 'PKDateStyleMedium' | 'PKDateStyleLong' | 'PKDateStyleFull';
    isRelative?: boolean;
    ignoresTimeZone?: boolean;
    currencyCode?: string;
    numberStyle?: 'PKNumberStyleDecimal' | 'PKNumberStylePercent' | 'PKNumberStyleScientific' | 'PKNumberStyleSpellOut';
}

export interface WalletCardLocation {
    latitude: number;
    longitude: number;
    altitude?: number;
    relevantText?: string;
}

export interface WalletCardBeacon {
    uuid: string;
    major: number;
    minor: number;
    relevantText?: string;
}

export interface CustomWalletCard {
    id: number;
    cardName: string;
    cardType: 'point' | 'product';
    description?: string;
    passTypeIdentifier: string;
    teamIdentifier: string;
    organizationName: string;
    logoText?: string;
    logoImage?: string;
    iconImage?: string;
    stripImage?: string;
    thumbnailImage?: string;
    backgroundImage?: string;
    foregroundColor?: string;
    backgroundColor?: string;
    labelColor?: string;
    headerFields?: WalletCardField[];
    primaryFields?: WalletCardField[];
    secondaryFields?: WalletCardField[];
    auxiliaryFields?: WalletCardField[];
    backFields?: WalletCardField[];
    rewardsTier?: string;
    pointsLabel?: string;
    barcodeMessage?: string;
    barcodeFormat?: 'QR' | 'PDF417' | 'Aztec' | 'Code128';
    barcodeMessageEncoding?: string;
    barcodeAltText?: string;
    locations?: WalletCardLocation[];
    beacons?: WalletCardBeacon[];
    relevantDate?: string;
    expirationDate?: string;
    voided?: boolean;
    webServiceURL?: string;
    authenticationToken?: string;
    associatedStoreIdentifiers?: string[];
    appLaunchURL?: string;
    userInfo?: Record<string, any>;
    sharingProhibited?: boolean;
    groupingIdentifier?: string;
    maxDistance?: number;
    isActive: boolean;
    customCSS?: string;
    adminId: number;
    createdAt: string;
    updatedAt: string;
    admin?: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
    walletPasses?: AppleWalletPass[];
}

export interface AppleWalletPass {
    id: number;
    customerId: number;
    customerLoyaltyId?: number;
    customWalletCardId: number;
    serialNumber: string;
    passTypeIdentifier: string;
    loyaltyType: 'PRODUCT' | 'POINT';
    status: 'active' | 'expired' | 'revoked';
    passData?: Record<string, any>;
    dynamicFields?: Record<string, any>;
    lastUpdated?: string;
    updateTag?: string;
    createdAt: string;
    updatedAt: string;
    customer?: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
    customerLoyalty?: {
        id: number;
        points?: number;
        visits?: number;
        totalSpent?: number;
    };
}

export interface CreateWalletCardRequest {
    cardName: string;
    cardType: 'point' | 'product';
    description?: string;
    passTypeIdentifier: string;
    teamIdentifier: string;
    organizationName: string;
    logoText?: string;
    foregroundColor?: string;
    backgroundColor?: string;
    labelColor?: string;
    headerFields?: WalletCardField[];
    primaryFields?: WalletCardField[];
    secondaryFields?: WalletCardField[];
    auxiliaryFields?: WalletCardField[];
    backFields?: WalletCardField[];
    rewardsTier?: string;
    pointsLabel?: string;
    barcodeMessage?: string;
    barcodeFormat?: 'QR' | 'PDF417' | 'Aztec' | 'Code128';
    barcodeMessageEncoding?: string;
    barcodeAltText?: string;
    locations?: WalletCardLocation[];
    beacons?: WalletCardBeacon[];
    relevantDate?: string;
    expirationDate?: string;
    webServiceURL?: string;
    authenticationToken?: string;
    associatedStoreIdentifiers?: string[];
    appLaunchURL?: string;
    userInfo?: Record<string, any>;
    sharingProhibited?: boolean;
    groupingIdentifier?: string;
    maxDistance?: number;
    customCSS?: string;
}

export interface UpdateWalletCardRequest extends Partial<CreateWalletCardRequest> { }

export interface WalletCardsResponse {
    message: string;
    data: {
        cards: CustomWalletCard[];
        totalCards: number;
        currentPage: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export interface GeneratePassRequest {
    customerId: number;
    customerLoyaltyId?: number;
    dynamicValues?: Record<string, any>;
}

export interface GeneratePassResponse {
    message: string;
    data: {
        passData: Record<string, any>;
        cardInfo: {
            id: number;
            name: string;
            type: string;
        };
        pass?: AppleWalletPass;
    };
}

export interface DuplicateCardRequest {
    cardName?: string;
}

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
        createWalletCard: builder.mutation<{
            message: string;
            data: CustomWalletCard;
        }, FormData>({
            query: (formData) => ({
                url: '/api/custom-wallet-card',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['WalletCard'],
        }),

        // Get all wallet cards with filtering and pagination
        getWalletCards: builder.query<WalletCardsResponse, {
            search?: string;
            cardType?: 'point' | 'product';
            isActive?: boolean;
            page?: number;
            limit?: number;
        }>({
            query: (params = {}) => {
                const searchParams = new URLSearchParams();

                if (params.search) searchParams.append('search', params.search);
                if (params.cardType) searchParams.append('cardType', params.cardType);
                if (params.isActive !== undefined) searchParams.append('isActive', params.isActive.toString());
                if (params.page) searchParams.append('page', params.page.toString());
                if (params.limit) searchParams.append('limit', params.limit.toString());

                return `/api/custom-wallet-card?${searchParams.toString()}`;
            },
            providesTags: ['WalletCard'],
        }),

        // Get a specific wallet card by ID
        getWalletCardById: builder.query<{
            message: string;
            data: CustomWalletCard;
        }, number>({
            query: (id) => `/api/custom-wallet-card/${id}`,
            providesTags: (result, error, id) => [{ type: 'WalletCard', id }],
        }),

        // Update an existing wallet card
        updateWalletCard: builder.mutation<{
            message: string;
            data: CustomWalletCard;
        }, { id: number; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `/api/custom-wallet-card/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'WalletCard', id },
                'WalletCard',
            ],
        }),

        // Delete a wallet card
        deleteWalletCard: builder.mutation<{
            message: string;
        }, number>({
            query: (id) => ({
                url: `/api/custom-wallet-card/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'WalletCard', id },
                'WalletCard',
            ],
        }),

        // Generate Apple Wallet pass for a customer
        generateWalletPass: builder.mutation<GeneratePassResponse, {
            cardId: number;
            passData: GeneratePassRequest;
        }>({
            query: ({ cardId, passData }) => ({
                url: `/api/custom-wallet-card/${cardId}/generate-pass`,
                method: 'POST',
                body: passData,
            }),
            invalidatesTags: ['WalletPass'],
        }),

        // Toggle wallet card active/inactive status
        toggleWalletCardStatus: builder.mutation<{
            message: string;
            data: {
                id: number;
                cardName: string;
                isActive: boolean;
            };
        }, number>({
            query: (id) => ({
                url: `/api/custom-wallet-card/${id}/toggle-status`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'WalletCard', id },
                'WalletCard',
            ],
        }),

        // Duplicate a wallet card
        duplicateWalletCard: builder.mutation<{
            message: string;
            data: CustomWalletCard;
        }, { id: number; cardName?: string }>({
            query: ({ id, cardName }) => ({
                url: `/api/custom-wallet-card/${id}/duplicate`,
                method: 'POST',
                body: { cardName },
            }),
            invalidatesTags: ['WalletCard'],
        }),

        // Get all wallet passes for a specific card
        getWalletPasses: builder.query<{
            message: string;
            data: AppleWalletPass[];
        }, number>({
            query: (cardId) => `/api/custom-wallet-card/${cardId}/passes`,
            providesTags: ['WalletPass'],
        }),

        // Get wallet pass by ID
        getWalletPassById: builder.query<{
            message: string;
            data: AppleWalletPass;
        }, number>({
            query: (passId) => `/api/wallet-passes/${passId}`,
            providesTags: (result, error, passId) => [{ type: 'WalletPass', id: passId }],
        }),

        // Update wallet pass (for dynamic content updates)
        updateWalletPass: builder.mutation<{
            message: string;
            data: AppleWalletPass;
        }, { passId: number; dynamicFields: Record<string, any> }>({
            query: ({ passId, dynamicFields }) => ({
                url: `/api/wallet-passes/${passId}`,
                method: 'PUT',
                body: { dynamicFields },
            }),
            invalidatesTags: (result, error, { passId }) => [
                { type: 'WalletPass', id: passId },
                'WalletPass',
            ],
        }),

        // Revoke a wallet pass
        revokeWalletPass: builder.mutation<{
            message: string;
        }, number>({
            query: (passId) => ({
                url: `/api/wallet-passes/${passId}/revoke`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, passId) => [
                { type: 'WalletPass', id: passId },
                'WalletPass',
            ],
        }),

        // Get wallet card analytics
        getWalletCardAnalytics: builder.query<{
            message: string;
            data: {
                totalCards: number;
                activeCards: number;
                inactiveCards: number;
                totalPasses: number;
                activePasses: number;
                revokedPasses: number;
                expiredPasses: number;
                cardsByType: {
                    point: number;
                    product: number;
                };
                recentActivity: Array<{
                    date: string;
                    passesGenerated: number;
                    passesRevoked: number;
                }>;
            };
        }, void>({
            query: () => '/api/custom-wallet-card/analytics',
            providesTags: ['WalletCard', 'WalletPass'],
        }),

        // Bulk operations
        bulkUpdateWalletCards: builder.mutation<{
            message: string;
            data: {
                updated: number;
                failed: number;
                errors: string[];
            };
        }, {
            cardIds: number[];
            updates: Partial<CustomWalletCard>;
        }>({
            query: ({ cardIds, updates }) => ({
                url: '/api/custom-wallet-card/bulk-update',
                method: 'PATCH',
                body: { cardIds, updates },
            }),
            invalidatesTags: ['WalletCard'],
        }),

        // Export wallet card data
        exportWalletCardData: builder.mutation<{
            message: string;
            data: {
                downloadUrl: string;
                fileName: string;
            };
        }, {
            cardIds?: number[];
            format?: 'csv' | 'xlsx' | 'json';
        }>({
            query: (params) => ({
                url: '/api/custom-wallet-card/export',
                method: 'POST',
                body: params,
            }),
        }),

        // Import wallet card template
        importWalletCardTemplate: builder.mutation<{
            message: string;
            data: CustomWalletCard;
        }, FormData>({
            query: (formData) => ({
                url: '/api/custom-wallet-card/import',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['WalletCard'],
        }),

        // Get wallet card templates
        getWalletCardTemplates: builder.query<{
            message: string;
            data: Array<{
                id: string;
                name: string;
                description: string;
                cardType: 'point' | 'product';
                preview: string;
                fields: WalletCardField[];
                colors: {
                    foreground: string;
                    background: string;
                    label: string;
                };
            }>;
        }, void>({
            query: () => '/api/custom-wallet-card/templates',
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