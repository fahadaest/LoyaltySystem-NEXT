import React from 'react';
import Button from '@/components/buttons/Button';

const SubscriptionCard = ({ planName, price, features = [], onView, onEdit, onDelete }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow w-full">
            {/* Plan Name Header */}
            <div className="bg-black rounded-2xl mx-5 mt-5 px-4 py-2 mb-4 flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white font-medium text-sm text-center">{planName}</span>
                </div>
            </div>

            {/* Price Section */}
            <div className="px-5 mb-4">
                <div className="bg-gray-100 border border-gray-200 rounded-2xl p-3">
                    <div className="text-xl font-semibold text-center text-black">{price}</div>
                </div>
            </div>

            {/* Features Section */}
            <div className="px-5 mb-3">
                <div className="border border-gray-200 rounded-xl p-3 min-h-[60px]">
                    {features?.length > 0 ? (
                        <div className="space-y-2">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0 mt-1"></div>
                                    <span className="text-gray-600 text-xs leading-tight">{feature}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <span className="text-center text-gray-500 text-xs">No features specified</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mx-5 mb-3"></div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 px-5 pb-3">
                <button
                    onClick={onView}
                    className="bg-[#EDEDED] text-black h-7 text-[10px] px-[18px] rounded-[81px] border border-[#E2E2E2] hover:bg-gray-300 transition-colors"
                >
                    View
                </button>
                <button
                    onClick={onEdit}
                    className="bg-[#41CC40] text-black h-7 text-[10px] px-[18px] rounded-[81px] border border-[#E2E2E2] hover:bg-green-500 transition-colors"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="bg-black text-white w-7 h-7 min-w-7 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                    <img
                        src="/img/general/delete_icon.svg"
                        alt="Delete"
                        className="w-3 h-3"
                    />
                </button>
            </div>
        </div>
    );
};

export default SubscriptionCard;