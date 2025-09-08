import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import InputField from '../input-fields/InputField';
import DropdownField from '../input-fields/Dropdown';
import { LOYALTY_TYPES } from '@/utils/loyaltyFormData';

const LoyaltyDetails = ({ formData, updateFormData, loyaltyType }) => {
    const [dropdowns, setDropdowns] = useState({
        purchasingProduct: false,
        rewardProduct: false
    });

    const productOptions = [
        { value: 'product1', label: 'Product 1' },
        { value: 'product2', label: 'Product 2' },
    ];

    const handleInputChange = (field, value, section = null) => {
        updateFormData(field, value, section);
    };

    const toggleDropdown = (field) => {
        setDropdowns(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    if (!formData) return <div>Loading...</div>;

    return (
        <div className="w-full mx-auto">
            {/* Header Section */}
            <div className="mb-3">
                <h1 className=" font-semibold text-[1rem] text-black mb-4">Reward</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-3">
                    <InputField
                        label="Reward Title*"
                        name="rewardTitle"
                        value={formData.rewardTitle || ''}
                        onChange={(e) => handleInputChange('rewardTitle', e.target.value)}
                        placeholder="Enter your product name"
                        required
                        labelSize="0.675rem"
                        placeholderSize="0.55rem"
                        fieldHeight="0.7rem"
                        className="lg:col-span-1"
                    />

                    <InputField
                        label="Reward Description"
                        name="rewardDescription"
                        value={formData.rewardDescription || ''}
                        onChange={(e) => handleInputChange('rewardDescription', e.target.value)}
                        placeholder="Enter loyalty description"
                        labelSize="0.675rem"
                        placeholderSize="0.55rem"
                        fieldHeight="0.7rem"
                        className="lg:col-span-3"
                    />
                </div>

                {/* Dynamic sections based on loyalty type */}
                {loyaltyType === LOYALTY_TYPES.PRODUCT ? (
                    <>
                        <h2 className=" font-semibold text-[1rem] text-black mb-4">Purchases</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
                            <InputField
                                label="Purchase Quantity*"
                                name="purchaseQuantity"
                                value={formData.loyaltyDetail?.purchaseQuantity || ''}
                                onChange={(e) => handleInputChange('purchaseQuantity', e.target.value, 'loyaltyDetail')}
                                placeholder="Enter quantity to purchase"
                                required
                                labelSize="0.675rem"
                                placeholderSize="0.55rem"
                                fieldHeight="0.7rem"
                            />

                            <DropdownField
                                label="Select Purchasing Product*"
                                name="purchasingProduct"
                                value={formData.loyaltyDetail?.purchasingProduct || ''}
                                onChange={(value) => handleInputChange('purchasingProduct', value, 'loyaltyDetail')}
                                options={productOptions}
                                placeholder="Select"
                                required
                                size="xs"
                                labelSize="0.675rem"
                                placeholderSize="0.55rem"
                                fieldHeight="0.6rem"
                            />

                            <InputField
                                label="Reward Quantity*"
                                name="rewardQuantity"
                                value={formData.loyaltyDetail?.rewardQuantity || ''}
                                onChange={(e) => handleInputChange('rewardQuantity', e.target.value, 'loyaltyDetail')}
                                placeholder="Enter reward quantity"
                                required
                                labelSize="0.675rem"
                                placeholderSize="0.55rem"
                                fieldHeight="0.7rem"
                            />

                            <DropdownField
                                label="Select Reward Product*"
                                name="rewardProduct"
                                value={formData.loyaltyDetail?.rewardProduct || ''}
                                onChange={(value) => handleInputChange('rewardProduct', value, 'loyaltyDetail')}
                                options={productOptions}
                                placeholder="Select a reward product"
                                required
                                size="xs"
                                labelSize="0.675rem"
                                placeholderSize="0.55rem"
                                fieldHeight="0.6rem"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-sm font-normal text-black mb-2">Point Settings</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                            <InputField
                                label="Spending Amount*"
                                name="spendingAmount"
                                value={formData.loyaltyDetail?.spendingAmount || ''}
                                onChange={(e) => handleInputChange('spendingAmount', e.target.value, 'loyaltyDetail')}
                                placeholder="Enter spending amount"
                                required
                                labelSize="0.675rem"
                                placeholderSize="0.55rem"
                                fieldHeight="0.6rem"
                            />

                            <InputField
                                label="Reward Points*"
                                name="rewardPoints"
                                value={formData.loyaltyDetail?.rewardPoints || ''}
                                onChange={(e) => handleInputChange('rewardPoints', e.target.value, 'loyaltyDetail')}
                                placeholder="Enter reward points"
                                required
                                labelSize="0.675rem"
                                placeholderSize="0.55rem"
                                fieldHeight="0.6rem"
                            />

                            <InputField
                                label="Reward Points Amount*"
                                name="rewardPointsAmount"
                                value={formData.loyaltyDetail?.rewardPointsAmount || ''}
                                onChange={(e) => handleInputChange('rewardPointsAmount', e.target.value, 'loyaltyDetail')}
                                placeholder="Enter points amount"
                                required
                                labelSize="0.675rem"
                                placeholderSize="0.55rem"
                                fieldHeight="0.6rem"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoyaltyDetails;