"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import LoyaltyCard from '@/components/loyalty/LoyaltyCard';
import ComponentHeader from '@/components/ui/ComponentHeader';
import LoyaltyDetails from '@/components/loyalty/LoyaltyDetails';
import { createPointFormData, createProductFormData, LOYALTY_TYPES } from '@/utils/loyaltyFormData';
import BannerCreator from '@/components/loyalty/BannerCreater';
import WalletCardCustomizer from '@/components/wallet-cards/WalletCardCustomizer';
import { useCreateLoyaltyWithFilesMutation } from '@/store/slices/loyaltyApis';
import { toast } from 'react-toastify';

const LoyaltyManagementPage = () => {
    const params = useParams();
    const router = useRouter();
    const [formData, setFormData] = useState(null);
    const [selectedLoyaltyType, setSelectedLoyaltyType] = useState(null);
    const [createLoyalty, { isLoading: isCreating }] = useCreateLoyaltyWithFilesMutation();

    // Handle route parameters
    useEffect(() => {
        const routeType = params?.type?.[0]; // Get the first segment from the dynamic route

        if (routeType === 'product') {
            initializeForm(LOYALTY_TYPES.PRODUCT);
        } else if (routeType === 'points') {
            initializeForm(LOYALTY_TYPES.POINT);
        } else {
            // If no valid route type, reset to show selection cards
            resetForm();
        }
    }, [params]);

    const initializeFormWithRoute = (type) => {
        const routePath = type === LOYALTY_TYPES.PRODUCT ? '/manage-loyalty/product' : '/manage-loyalty/points';
        router.push(routePath);
        // The form will be initialized by the useEffect when the route changes
    };

    const resetFormWithRoute = () => {
        router.push('/manage-loyalty');
        // The form will be reset by the useEffect when the route changes
    };

    const initializeForm = (type) => {
        setFormData(type === LOYALTY_TYPES.PRODUCT ? createProductFormData() : createPointFormData());
        setSelectedLoyaltyType(type);
    };

    const updateFormData = (field, value, section = null) => {
        setFormData(prev => {
            if (!prev) return prev;
            return section
                ? { ...prev, [section]: { ...prev[section], [field]: value } }
                : { ...prev, [field]: value };
        });
    };

    const resetForm = () => {
        setFormData(null);
        setSelectedLoyaltyType(null);
    };

    const resetBannerData = () => {
        setFormData(prev => ({
            ...prev,
            bannerSetting: {
                bannerTitle: '',
                titleColor: '#2F45F2',
                backgroundColor: '#4F45E3',
                backgroundImage: null,
                text1: '',
                text2: '',
                text3: '',
                icon1: null,
                icon2: null,
                icon3: null,
            }
        }));
    };

    const validateFormData = (data, loyaltyType) => {
        const errors = [];

        if (!data.rewardTitle?.trim()) {
            errors.push('Reward Title is required');
        }

        const { loyaltyDetail } = data;
        if (loyaltyType === LOYALTY_TYPES.POINT) {
            const { spendingAmount, rewardPoints, rewardPointsAmount } = loyaltyDetail || {};
            if (!spendingAmount || spendingAmount <= 0) errors.push('Spending Amount must be greater than 0');
            if (!rewardPoints || rewardPoints <= 0) errors.push('Reward Points must be greater than 0');
            if (!rewardPointsAmount || rewardPointsAmount <= 0) errors.push('Reward Points Amount must be greater than 0');
        } else if (loyaltyType === LOYALTY_TYPES.PRODUCT) {
            const { purchaseQuantity, purchasingProduct, rewardQuantity, rewardProduct } = loyaltyDetail || {};
            if (!purchaseQuantity || purchaseQuantity <= 0) errors.push('Purchase Quantity must be greater than 0');
            if (!purchasingProduct?.trim()) errors.push('Purchasing Product is required');
            if (!rewardQuantity || rewardQuantity <= 0) errors.push('Reward Quantity must be greater than 0');
            if (!rewardProduct?.trim()) errors.push('Reward Product is required');
        }

        return errors;
    };

    const handleCreateLoyalty = async () => {
        if (!formData || !selectedLoyaltyType) {
            toast.error('Please complete the form');
            return;
        }

        const validationErrors = validateFormData(formData, selectedLoyaltyType);
        if (validationErrors.length > 0) {
            toast.error(`Please fix the following errors:\n${validationErrors.join('\n')}`);
            return;
        }

        try {
            await createLoyalty({ ...formData, loyaltyType: selectedLoyaltyType }).unwrap();
            toast.success(`${selectedLoyaltyType === LOYALTY_TYPES.PRODUCT ? 'Product' : 'Points'} loyalty program created successfully!`);

            // Redirect to appropriate listing page based on loyalty type
            const redirectPath = selectedLoyaltyType === LOYALTY_TYPES.PRODUCT
                ? '/products-loyalty'
                : '/points-loyalty';
            router.push(redirectPath);
        } catch (error) {
            console.error('Error creating loyalty program:', error);
            const errorMessage = error?.data?.message || error?.message || 'Failed to create loyalty program. Please try again.';
            toast.error(`Error: ${errorMessage}`);
        }
    };

    const loyaltyCards = [
        {
            id: 1,
            title: "Product Loyalty",
            description: "Create loyalty programs based on product purchases",
            iconSrc: "/img/loyalty/product.svg",
            buttonText: "Add Product Loyalty",
            onButtonClick: () => initializeFormWithRoute(LOYALTY_TYPES.PRODUCT)
        },
        {
            id: 2,
            title: "Point Loyalty",
            description: "Create loyalty programs based on point purchases",
            iconSrc: "/img/loyalty/point.svg",
            buttonText: "Add Point Loyalty",
            onButtonClick: () => initializeFormWithRoute(LOYALTY_TYPES.POINT)
        }
    ];

    const formButtons = [
        {
            text: "Back",
            onClick: resetFormWithRoute,
            backgroundColor: "#EDEDED",
            textColor: "#000000",
            icon: "/img/general/arrow_back.svg",
            showIcon: true,
            iconPosition: "left",
            className: "border border-gray-300",
            disabled: isCreating,
            height: '32px',
            fontSize: '10px',
            padding: '0 15px 0px 3px',
            iconWidth: '20px',
            iconHeight: '20px',
            iconImageWidth: '17px',
            iconImageHeight: '17px',
            iconBackgroundColor: '#000000'
        },
        {
            text: isCreating ? "Creating..." : "Create Loyalty",
            onClick: handleCreateLoyalty,
            backgroundColor: isCreating ? "#9CA3AF" : "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), #000000",
            textColor: "#FFFFFF",
            icon: isCreating ? null : "/img/general/plus_black.svg",
            showIcon: !isCreating,
            iconPosition: "right",
            disabled: isCreating,
            height: '32px',
            fontSize: '10px',
            padding: '0 5px 0px 15px',
            iconWidth: '20px',
            iconHeight: '20px',
            iconImageWidth: '12px',
            iconImageHeight: '12px',
            gap: '8px'
        }
    ];

    const isProductLoyalty = selectedLoyaltyType === LOYALTY_TYPES.PRODUCT;
    const formTitle = !formData ? "Manage Loyalty Programs" : `Add ${isProductLoyalty ? 'Product' : 'Point'} Loyalty Form`;
    const formSubtitle = !formData ? "Manage your loyalty programs" : `Configure your ${isProductLoyalty ? 'product' : 'point'}-based loyalty program details`;

    return (
        <main className="min-h-[78vh] flex flex-col">
            <div className="w-full">
                <div className="mb-6">
                    <ComponentHeader
                        title={formTitle}
                        subtitle={formSubtitle}
                        infoMessage={formData ? null : "This page allows you to add your loyalty programs. Select the loyalty type to get started."}
                        buttons={formData ? formButtons : []}
                    />
                </div>

                {!formData ? (
                    <div className="h-[calc(100vh-13rem)] overflow-y-auto bg-white border border-gray-200 rounded-3xl p-4 shadow-sm"
                        style={{ boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)', background: '#FCFCFC' }}
                    >
                        <div className="flex gap-6 justify-start">
                            {loyaltyCards.map((card) => (
                                <LoyaltyCard key={card.id} {...card} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="mb-5 h-0 border-t border-[#E2E2E2]"></div>
                        <div className='flex flex-col overflow-y-auto max-h-[calc(100vh-14rem)]'>
                            <div className="space-y-6 mb-5">
                                <LoyaltyDetails
                                    formData={formData}
                                    updateFormData={updateFormData}
                                    loyaltyType={selectedLoyaltyType}
                                />
                            </div>
                            <div className="space-y-6 mt-0">
                                <BannerCreator
                                    formData={formData}
                                    updateFormData={updateFormData}
                                    resetFormData={resetBannerData}
                                />
                            </div>
                            <div className="space-y-6 mt-8">
                                <WalletCardCustomizer
                                    formData={formData}
                                    updateFormData={updateFormData}
                                    loyaltyType={selectedLoyaltyType}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default LoyaltyManagementPage;