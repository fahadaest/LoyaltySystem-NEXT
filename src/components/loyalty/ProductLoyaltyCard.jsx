import React from "react";
import Button from "@/components/buttons/Button";

const ProductLoyaltyCard = ({
    title,
    product,
    purchaseQuantity,
    rewardProductId,
    rewardProduct,
    onView,
    onEdit,
    onCopy,
    onDelete
}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            {/* Card Title */}
            <div className="bg-gray-100 border border-gray-200 rounded-2xl mx-5 mt-5 p-2 mb-4">
                <h3 className="text-sm font-medium text-black text-center leading-tight">
                    {title}
                </h3>
            </div>

            {/* Card Content */}
            <div className="px-5 space-y-1 mb-3">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Product:</span>
                    <span className="text-xs text-gray-500">{product}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Purchase Quantity:</span>
                    <span className="text-xs text-gray-500">{purchaseQuantity}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Reward Product:</span>
                    <span className="text-xs text-gray-500">{rewardProduct}</span>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mx-5 mb-3"></div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 px-5 pb-3">
                <Button
                    text={"View"}
                    onClick={onView}
                    backgroundColor={'#EDEDED'}
                    textColor={'#000000'}
                    disabled={false}
                    height={'1.5rem'}
                    fontSize={'0.55rem'}
                    padding={'0px 12px'}
                    borderRadius={'81px'}
                    className="flex-1"  // Full width flex
                />

                <Button
                    text={"Edit"}
                    onClick={onEdit}
                    backgroundColor={'#41CC40'}
                    textColor={'#000000'}
                    disabled={false}
                    height={'1.5rem'}
                    fontSize={'0.55rem'}
                    padding={'0px 12px'}
                    borderRadius={'81px'}
                    className="flex-1"  // Full width flex
                />

                <Button
                    text={"Copy"}
                    onClick={onCopy}
                    backgroundColor={'#FFFFFF'}
                    textColor={'#000000'}
                    disabled={false}
                    height={'1.5rem'}
                    fontSize={'0.55rem'}
                    padding={'0px 12px'}
                    borderRadius={'81px'}
                    border={'1px solid #E2E2E2'}
                    className="flex-1"  // Full width flex
                />

                <Button
                    text={""}
                    onClick={onDelete}
                    backgroundColor={'#000000'}
                    textColor={'#FFFFFF'}
                    icon={"/img/general/delete_icon_white.svg"}
                    showIcon={true}
                    iconPosition={'center'}
                    disabled={false}
                    height={'1.5rem'}
                    width={'1.5rem'}  // Fixed width - circle rahega
                    fontSize={'0.55rem'}
                    padding={'0px'}
                    iconWidth={'1rem'}
                    iconHeight={'1rem'}
                    iconImageWidth={'1.5rem'}
                    iconImageHeight={'1.5rem'}
                    borderRadius={'50%'}
                    iconBackgroundColor="black"
                    className="flex-shrink-0"
                />
            </div>
        </div>
    );
};

export default ProductLoyaltyCard;