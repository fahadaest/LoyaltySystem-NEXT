import { createApi } from '@reduxjs/toolkit/query/react';
import { createDynamicBaseQuery } from '@/hooks/dynamicBaseQuery';

export const loyaltyApis = createApi({
    reducerPath: 'loyaltyApi',
    baseQuery: createDynamicBaseQuery(),
    tagTypes: ['Loyalty'],
    endpoints: (builder) => ({

        createLoyaltyWithFiles: builder.mutation({
            query: (loyaltyData) => {
                const formData = new FormData();

                // Add basic fields
                formData.append('loyaltyType', loyaltyData.loyaltyType || '');
                formData.append('rewardTitle', loyaltyData.rewardTitle || '');
                formData.append('rewardDescription', loyaltyData.rewardDescription || '');

                // Add loyaltyDetail fields individually based on loyalty type
                if (loyaltyData.loyaltyDetail) {
                    if (loyaltyData.loyaltyType === 'point') {
                        formData.append('spendingAmount', loyaltyData.loyaltyDetail.spendingAmount || '');
                        formData.append('rewardPoints', loyaltyData.loyaltyDetail.rewardPoints || '');
                        formData.append('rewardPointsAmount', loyaltyData.loyaltyDetail.rewardPointsAmount || '');
                    } else if (loyaltyData.loyaltyType === 'product') {
                        formData.append('purchaseQuantity', loyaltyData.loyaltyDetail.purchaseQuantity || '');
                        formData.append('purchasingProduct', loyaltyData.loyaltyDetail.purchasingProduct || '');
                        formData.append('rewardQuantity', loyaltyData.loyaltyDetail.rewardQuantity || '');
                        formData.append('rewardProduct', loyaltyData.loyaltyDetail.rewardProduct || '');
                    }
                }

                // Add banner setting fields individually
                if (loyaltyData.bannerSetting) {
                    formData.append('bannerTitle', loyaltyData.bannerSetting.bannerTitle || '');
                    formData.append('bannerTitleColor', loyaltyData.bannerSetting.titleColor || '#FFFFFF');
                    formData.append('bannerBackgroundColor', loyaltyData.bannerSetting.backgroundColor || '#4A90E2');
                    formData.append('bannerIconText1', loyaltyData.bannerSetting.text1 || '');
                    formData.append('bannerIconText2', loyaltyData.bannerSetting.text2 || '');
                    formData.append('bannerIconText3', loyaltyData.bannerSetting.text3 || '');
                }

                // Add custom card fields individually
                if (loyaltyData.customCard) {
                    formData.append('cardBackgroundColor', loyaltyData.customCard.backgroundColor || '#FFFFFF');
                    if (loyaltyData.customCard.backgroundTitle) {
                        formData.append('cardBackgroundTitle', loyaltyData.customCard.backgroundTitle);
                    }
                }

                // Add banner binary files
                if (loyaltyData.bannerSetting?.backgroundImage && loyaltyData.bannerSetting.backgroundImage instanceof File) {
                    formData.append('bannerBackgroundImage', loyaltyData.bannerSetting.backgroundImage);
                }
                if (loyaltyData.bannerSetting?.icon1 && loyaltyData.bannerSetting.icon1 instanceof File) {
                    formData.append('bannerIcon1', loyaltyData.bannerSetting.icon1);
                }
                if (loyaltyData.bannerSetting?.icon2 && loyaltyData.bannerSetting.icon2 instanceof File) {
                    formData.append('bannerIcon2', loyaltyData.bannerSetting.icon2);
                }
                if (loyaltyData.bannerSetting?.icon3 && loyaltyData.bannerSetting.icon3 instanceof File) {
                    formData.append('bannerIcon3', loyaltyData.bannerSetting.icon3);
                }

                // Add custom card binary files
                if (loyaltyData.customCard?.backgroundImg && loyaltyData.customCard.backgroundImg instanceof File) {
                    formData.append('cardBackgroundImg', loyaltyData.customCard.backgroundImg);
                } else if (loyaltyData.customCard?.backgroundImage && loyaltyData.customCard.backgroundImage instanceof File) {
                    formData.append('cardBackgroundImg', loyaltyData.customCard.backgroundImage);
                }

                // Handle product-specific stamp files
                if (loyaltyData.loyaltyType === 'product') {
                    if (loyaltyData.customCard?.collectedStampImg && loyaltyData.customCard.collectedStampImg instanceof File) {
                        formData.append('cardCollectedStampImg', loyaltyData.customCard.collectedStampImg);
                    }
                    if (loyaltyData.customCard?.uncollectedStampImg && loyaltyData.customCard.uncollectedStampImg instanceof File) {
                        formData.append('cardUncollectedStampImg', loyaltyData.customCard.uncollectedStampImg);
                    }
                }

                // Use appropriate endpoint
                const endpoint = '/loyalties';

                return {
                    url: endpoint,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Loyalty'],
        }),

        // Get All Loyalty Programs
        getAllLoyaltyPrograms: builder.query({
            query: (params = {}) => {
                const queryParams = new URLSearchParams();
                if (params.search) queryParams.append('search', params.search);
                if (params.loyaltyType) queryParams.append('loyaltyType', params.loyaltyType);

                const queryString = queryParams.toString();
                return `/loyalties${queryString ? `?${queryString}` : ''}`;
            },
            providesTags: ['Loyalty'],
        }),

        // Get Loyalty Program by ID
        getLoyaltyProgramById: builder.query({
            query: (id) => `/loyalties/${id}`,
            providesTags: (result, error, id) => [{ type: 'Loyalty', id }],
        }),

        // Update Loyalty Program (FormData for file uploads)
        updateLoyaltyProgram: builder.mutation({
            query: ({ id, ...updateData }) => {
                // Create FormData for file uploads
                const formData = new FormData();

                // Add text fields
                Object.keys(updateData).forEach(key => {
                    if (updateData[key] !== null && updateData[key] !== undefined) {
                        // Handle nested objects (flatten them)
                        if (typeof updateData[key] === 'object' && !(updateData[key] instanceof File)) {
                            Object.keys(updateData[key]).forEach(nestedKey => {
                                if (updateData[key][nestedKey] !== null && updateData[key][nestedKey] !== undefined) {
                                    formData.append(nestedKey, updateData[key][nestedKey]);
                                }
                            });
                        } else {
                            formData.append(key, updateData[key]);
                        }
                    }
                });

                return {
                    url: `/loyalties/${id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Loyalty', id }, 'Loyalty'],
        }),

        // Delete Loyalty Program
        deleteLoyaltyProgram: builder.mutation({
            query: (id) => ({
                url: `/loyalties/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Loyalty'],
        }),

    }),
});

export const {
    useCreateLoyaltyWithFilesMutation,
    useGetAllLoyaltyProgramsQuery,
    useGetLoyaltyProgramByIdQuery,
    useLazyGetLoyaltyProgramByIdQuery,
    useUpdateLoyaltyProgramMutation,
    useDeleteLoyaltyProgramMutation,
} = loyaltyApis;