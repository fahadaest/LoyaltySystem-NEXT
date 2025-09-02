import React from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/buttons/Button';

const LoyaltyCard = ({
    title,
    description,
    iconSrc,
    buttonText,
    onButtonClick
}) => {
    return (
        <div
            className="bg-gray-100 border border-gray-200 rounded-[20px] p-3 flex flex-col"
            style={{
                width: '220px',
                height: '280px',
                background: '#F2F2F2'
            }}
        >
            {/* Icon Container */}
            <div
                className="bg-white rounded-[18px] mb-3 flex items-center justify-center flex-shrink-0"
                style={{
                    width: '100%',
                    height: '140px'
                }}
            >
                <img
                    src={iconSrc}
                    alt={`${title} icon`}
                    className="w-20 h-20"
                    style={{
                        width: '88px',
                        height: '88px'
                    }}
                />
            </div>

            {/* Content */}
            <div className="mb-3 flex-grow">
                <h3
                    className="text-black mb-1"
                    style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '11px',
                        fontWeight: '500',
                        lineHeight: '140%'
                    }}
                >
                    {title}
                </h3>
                <p
                    className="text-gray-600"
                    style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '10px',
                        fontWeight: '400',
                        lineHeight: '140%',
                        color: '#636363'
                    }}
                >
                    {description}
                </p>
            </div>

            {/* Divider */}
            <div
                className="border-t mb-3"
                style={{ borderColor: '#E2E2E2' }}
            />

            {/* Button */}
            <div className="flex justify-center">
                <Button
                    text={buttonText}
                    onClick={onButtonClick}
                    backgroundColor="#000000"
                    textColor="#FFFFFF"
                    showIcon={true}
                    iconPosition="right"
                    icon={<Plus className="w-2.5 h-2.5" />}
                    className="w-full"
                    style={{
                        height: '32px',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '10px',
                        fontWeight: '600'
                    }}
                />
            </div>
        </div>
    );
};

export default LoyaltyCard;