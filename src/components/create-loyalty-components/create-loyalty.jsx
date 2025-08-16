'use client';
import React from 'react';
import { FaGift } from "react-icons/fa";
import LoyaltySelectionCard from './loyalty-selection-card';

const CreateLoyaltyComponent = ({
    setLoyaltyType,
    setFormData
}) => {

    const handleLoyaltyTypeSelect = (type) => {
        setLoyaltyType(type);
        const loyaltyTemplateValue = type === 'products' ? 'general' : 'point';

        setFormData(prevData => ({
            ...prevData,
            loyaltyTemplates: loyaltyTemplateValue
        }));

    };

    const loyaltySelectionCardData = [
        {
            type: 'products',
            title: 'Product Loyalty',
            description: 'Create loyalty programs based on product purchases (e.g., buy 10 cups, get 1 free)',
            icon: <FaGift className="text-2xl text-blue-600" />,
            iconBgColor: 'bg-blue-100',
            buttonColor: 'bg-brandGreen',
            buttonHoverColor: 'hover:bg-brandGreen',
        },
        {
            type: 'points',
            title: 'Points Loyalty',
            description: 'Create points-based loyalty programs (e.g., spend AED 100, earn 10 points)',
            icon: <span className="text-2xl">⭐</span>,
            iconBgColor: 'bg-green-100',
            buttonColor: 'bg-brandGreen',
            buttonHoverColor: 'hover:bg-brandGreen'
        },
        {
            type: 'tiers',
            title: 'Tier Based Loyalty',
            description: 'Create tier based loyalty programs (e.g., Silver, Gold, Platinum tiers)',
            icon: <span className="text-2xl">⭐</span>,
            iconBgColor: 'bg-green-100',
            buttonColor: 'bg-brandGreen',
            buttonHoverColor: 'hover:bg-brandGreen',
            status: 'coming soon'
        },
    ];

    return (
        <div className="mt-3 grid h-full grid-cols-1 gap-5">
            <div className="col-span-1 h-fit w-full">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {loyaltySelectionCardData.map((card) => (
                            <LoyaltySelectionCard
                                key={card.type}
                                type={card.type}
                                title={card.title}
                                description={card.description}
                                icon={card.icon}
                                iconBgColor={card.iconBgColor}
                                buttonColor={card.buttonColor}
                                buttonHoverColor={card.buttonHoverColor}
                                onClick={handleLoyaltyTypeSelect}
                                status={card.status}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateLoyaltyComponent;