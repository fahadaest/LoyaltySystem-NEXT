import React from 'react';
import Button from '@/components/buttons/Button';

const SubscriptionCard = ({
    planName,
    price,
    features,
    onView,
    onEdit,
    onDelete
}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-3xl p-4 w-64 shadow-sm">
            {/* Header with plan name */}
            <div className="bg-black rounded-full px-4 py-2 mb-4 flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                    <span className="text-white font-medium text-sm">{planName}</span>
                </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                <div className="text-2xl font-semibold text-center text-black">
                    {price}
                </div>
            </div>

            {/* Features */}
            <div className="border border-gray-200 rounded-xl p-3 mb-4">
                <div className="space-y-2">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-600 text-xs">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-3"></div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
                <Button
                    text="View"
                    onClick={onView}
                    backgroundColor="#EDEDED"
                    textColor="#000000"
                    height="28px"
                    fontSize="10px"
                    padding="0 18px"
                    borderRadius="81px"
                    border="1px solid #E2E2E2"
                />
                <Button
                    text="Edit"
                    onClick={onEdit}
                    backgroundColor="#41CC40"
                    textColor="#000000"
                    height="28px"
                    fontSize="10px"
                    padding="0 18px"
                    borderRadius="81px"
                    border="1px solid #E2E2E2"
                />
                <Button
                    text=""
                    onClick={onDelete}
                    backgroundColor="#000000"
                    textColor="#FFFFFF"
                    height="28px"
                    fontSize="12px"
                    padding="0"
                    borderRadius="50%"
                    className="w-7 h-7 min-w-7"
                    showIcon={true}
                    icon="/img/general/delete_icon.svg"
                    iconWidth="28px"
                    iconHeight="28px"
                    iconImageWidth="12px"
                    iconImageHeight="12px"
                    iconBackgroundColor="transparent"
                />
            </div>
        </div>
    );
};

export default SubscriptionCard;