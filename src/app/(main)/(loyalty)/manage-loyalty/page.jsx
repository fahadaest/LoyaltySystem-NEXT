"use client";
import React, { useState } from 'react';
import LoyaltyCard from '@/components/loyalty/LoyaltyCard';
import ComponentHeader from '@/components/ui/ComponentHeader';
import LoyaltyDetails from '@/components/loyalty/LoyaltyDetails';
import { createPointFormData, createProductFormData, LOYALTY_TYPES } from '@/utils/loyaltyFormData';
import BannerCreator from '@/components/loyalty/BannerCreater';
import WalletCardCustomizer from '@/components/wallet-cards/WalletCardCustomizer';

const LoyaltyManagementComponent = () => {
    const [formData, setFormData] = useState(null);
    const [selectedLoyaltyType, setSelectedLoyaltyType] = useState(null);

    const handleAddProductLoyalty = () => {
        setFormData(createProductFormData());
        setSelectedLoyaltyType(LOYALTY_TYPES.PRODUCT);
    };

    const handleAddPointLoyalty = () => {
        setFormData(createPointFormData());
        setSelectedLoyaltyType(LOYALTY_TYPES.POINT);
    };

    const updateFormData = (field, value, section = null) => {
        setFormData(prev => {
            if (!prev) return prev;

            if (section) {
                return {
                    ...prev,
                    [section]: { ...prev[section], [field]: value }
                };
            }
            return { ...prev, [field]: value };
        });
    };

    const resetForm = () => {
        setFormData(null);
        setSelectedLoyaltyType(null);
    };

    // Reset function specifically for BannerCreator
    const resetBannerData = () => {
        setFormData(prev => ({
            ...prev,
            bannerTitle: '',
            topBackground: '#4F45E3',
            titleColor: '#2F45F2',
            bottomBackground: '#4F45E3',
            bottomTextColor: '#4F45E3',
            text1: '',
            text2: '',
            text3: '',
            logo: null,
            bannerImage: null,
            icon1: null,
            icon2: null,
            icon3: null
        }));
    };

    const handleSelectWalletCard = () => {
        // Add your wallet card selection logic here
        console.log('Select Wallet Card clicked');
    };

    const loyaltyCards = [
        {
            id: 1,
            title: "Product Loyalty",
            description: "Create loyalty programs based on product purchases",
            iconSrc: "/img/loyalty/product.svg",
            buttonText: "Add Product Loyalty",
            onButtonClick: handleAddProductLoyalty
        },
        {
            id: 2,
            title: "Point Loyalty",
            description: "Create loyalty programs based on point purchases",
            iconSrc: "/img/loyalty/point.svg",
            buttonText: "Add Point Loyalty",
            onButtonClick: handleAddPointLoyalty
        }
    ];

    // Define buttons for when form is active
    const formButtons = [
        {
            text: "Back",
            onClick: resetForm,
            backgroundColor: "#EDEDED",
            textColor: "#000000",
            icon: "/img/icons/arrow-small-left.svg", // You'll need to add this icon
            showIcon: true,
            iconPosition: "left",
            className: "border border-gray-300"
        },
        {
            text: "Create Loyalty",
            onClick: handleSelectWalletCard,
            backgroundColor: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), #000000",
            textColor: "#FFFFFF",
            icon: "/img/icons/plus.svg", // You'll need to add this icon
            showIcon: true,
            iconPosition: "right"
        }
    ];

    return (
        <div className="w-full">
            <div className="mb-6">
                <ComponentHeader
                    title={formData ? "Add Product Loyalty Form" : "Manage Loyalty Programs"}
                    subtitle={formData ? "Configure your loyalty program details" : "Manage your loyalty programs"}
                    infoMessage={formData ? null : "This page allows you to add your loyalty programs. Select the loyalty type to get started."}
                    buttons={formData ? formButtons : []}
                />
            </div>

            {!formData ? (
                <div className="bg-white border border-gray-200 rounded-[40px] p-6"
                    style={{ boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)', background: '#FCFCFC' }}
                >
                    <div className="flex gap-6 justify-start">
                        {loyaltyCards.map((card) => (
                            <LoyaltyCard key={card.id} {...card} />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className="mb-5 h-0  border-t border-[#E2E2E2]"></div>
                    <div className="space-y-6 mb-5">
                        <LoyaltyDetails
                            formData={formData}
                            updateFormData={updateFormData}
                            loyaltyType={selectedLoyaltyType}
                        />
                    </div>
                    <div className="space-y-6 mt-8">
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
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default LoyaltyManagementComponent;