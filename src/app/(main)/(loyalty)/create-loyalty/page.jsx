"use client";
import React from 'react';
import LoyaltyCard from '@/components/loyalty/LoyaltyCard';
import ComponentHeader from '@/components/ui/ComponentHeader';

const LoyaltyManagementComponent = () => {
    const handleAddProductLoyalty = () => {
        console.log("Add Product Loyalty clicked");
    };

    const handleAddPointLoyalty = () => {
        console.log("Add Point Loyalty clicked");
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

    return (
        <div className="w-full">
            {/* Component Header */}
            <div className="mb-6">
                <ComponentHeader
                    title="Manage Loyalty Programs"
                    subtitle="Manage your loyalty programs"
                    infoMessage="This page allows you to add your loyalty programs. Select the loyalty type to get started."
                />
            </div>

            {/* Main Container */}
            <div
                className="bg-white border border-gray-200 rounded-[40px] p-6"
                style={{
                    boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
                    background: '#FCFCFC'
                }}
            >
                {/* Cards Grid */}
                <div className="flex gap-6 justify-start">
                    {loyaltyCards.map((card) => (
                        <LoyaltyCard
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            iconSrc={card.iconSrc}
                            buttonText={card.buttonText}
                            onButtonClick={card.onButtonClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoyaltyManagementComponent;