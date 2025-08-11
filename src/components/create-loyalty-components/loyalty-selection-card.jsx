import React from 'react';
import { MdAdd } from "react-icons/md";

const LoyaltySelectionCard = ({
    type,
    title,
    description,
    icon,
    iconBgColor,
    buttonColor,
    buttonHoverColor,
    onClick,
    status
}) => {
    const isComingSoon = status === 'coming soon';

    return (
        <div className="relative">
            <div
                onClick={!isComingSoon ? () => onClick(type) : undefined}
                className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-300 ${isComingSoon
                    ? 'blur-sm cursor-not-allowed opacity-60'
                    : 'cursor-pointer hover:shadow-xl hover:scale-105'
                    }`}
            >
                <div className={`flex items-center justify-center w-16 h-16 ${iconBgColor} rounded-full mb-4 mx-auto`}>
                    {icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
                <p className="text-gray-600 text-center">
                    {description}
                </p>
                <div className="mt-4 flex justify-center">
                    <button
                        disabled={isComingSoon}
                        className={`flex items-center gap-2 px-4 py-2 ${buttonColor} text-white rounded-lg ${buttonHoverColor} transition-colors ${isComingSoon ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        <MdAdd />
                        {title}
                    </button>
                </div>
            </div>

            {isComingSoon && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 px-6 py-3 rounded-lg shadow-lg border-2 border-orange-400">
                        <span className="text-orange-600 font-bold text-lg">Coming Soon</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoyaltySelectionCard;