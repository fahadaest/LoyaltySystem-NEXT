import React, { useState } from 'react';
import { ChevronDown, Upload, RefreshCw, Info, Eye } from 'lucide-react';
import InputField from '../input-fields/InputField';
import ColorPicker from '../input-fields/ColorPicker';
import BannerPreview from '../loyalty/BannerPreview';
import FileUploadArea from '../ui/FileUploadArea';
import Button from '../buttons/Button';
import WalletCardPreview from './WalletCardPreview';
import { LOYALTY_TYPES } from '@/utils/loyaltyFormData';
import ComponentHeader from '../ui/ComponentHeader';

const WalletCardCustomizer = ({
    formData,
    updateFormData,
    loyaltyType,
    resetFormData
}) => {

    const handleFileUpload = (field, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                updateFormData(field, e.target.result, 'customCard');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCardUpdate = (field, value) => {
        updateFormData(field, value, 'customCard');
    };

    const handleResetCard = () => {
        if (resetFormData) {
            resetFormData();
        } else {
            // Fallback reset for custom card settings only
            const resetData = loyaltyType === LOYALTY_TYPES.PRODUCT
                ? {
                    backgroundColor: '#FFFFFF',
                    backgroundImg: null,
                    collectedStampImg: null,
                    uncollectedStampImg: null
                }
                : {
                    backgroundColor: '#FFFFFF',
                    backgroundImg: null,
                    backgroundTitle: ''
                };

            Object.keys(resetData).forEach(key => {
                handleCardUpdate(key, resetData[key]);
            });
        }
    };

    const customCardSettings = formData?.customCard || {};

    const getDefaultCardData = () => {
        if (loyaltyType === LOYALTY_TYPES.PRODUCT) {
            return {
                backgroundColor: '#FFFFFF',
                backgroundImg: null,
                collectedStampImg: null,
                uncollectedStampImg: null,
                ...customCardSettings
            };
        } else {
            return {
                backgroundColor: '#FFFFFF',
                backgroundImg: null,
                backgroundTitle: '',
                ...customCardSettings
            };
        }
    };

    const safeCardData = getDefaultCardData();


    return (
        <div className="w-full mx-auto bg-gray-50">
            {/* Main Content Area */}
            <div className="bg-gray-100 border border-gray-300 rounded-3xl">

                <div className="flex w-[100%] gap-5 ">

                    {/* Custom card Settings */}
                    <div className=" p-3 pt-5 w-[70%] space-y-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[0.9rem] font-semibold text-black">Wallet Cards</h2>

                            <Button
                                text={"Reset All"}
                                onClick={handleResetCard}
                                backgroundColor={'#000000'}
                                textColor={'#FFFFFF'}
                                icon={"/img/general/reset_black.svg"}
                                showIcon={true}
                                iconPosition={'right'}
                                disabled={false}
                                height={'1.6rem'}
                                fontSize={'0.6rem'}
                                padding={'0px 4px 0px 8px'}
                                iconWidth={'0.9rem'}
                                iconHeight={'0.9rem'}
                                className={''}
                            />
                        </div>

                        <div className="border-b border-gray-300"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className='flex flex-col gap-3'>
                                <ColorPicker
                                    label="Background Color*"
                                    name="backgroundColor"
                                    value={safeCardData.backgroundColor}
                                    onChange={(e) => handleCardUpdate('backgroundColor', e.target.value)}
                                    placeholder="Choose background color"
                                    labelSize="0.675rem"
                                    placeholderSize="0.575rem"
                                    fieldHeight="0.8rem"
                                    colorPreviewSize="1.875rem"
                                    iconSize="0.875rem"
                                />
                                <FileUploadArea
                                    label="Card Background Image"
                                    name="backgroundImage"
                                    onChange={(e) => handleFileUpload('backgroundImage', e)}
                                    placeholder="Click to Upload product image"
                                    labelSize="0.675rem"
                                    placeholderSize="0.575rem"
                                    containerHeight="10.2rem"
                                    iconSize="1.75rem"
                                    borderRadius="1rem"
                                />
                            </div>

                            <FileUploadArea
                                label="Stamp Collected"
                                name="backgroundImage"
                                onChange={(e) => handleFileUpload('backgroundImage', e)}
                                placeholder="Click to Upload product image"
                                labelSize="0.675rem"
                                placeholderSize="0.575rem"
                                containerHeight="15rem"
                                iconSize="1.75rem"
                                borderRadius="1rem"
                            />

                            <FileUploadArea
                                label="Uncollected Stamp"
                                name="backgroundImage"
                                onChange={(e) => handleFileUpload('backgroundImage', e)}
                                placeholder="Click to Upload product image"
                                labelSize="0.675rem"
                                placeholderSize="0.575rem"
                                containerHeight="15rem"
                                iconSize="1.75rem"
                                borderRadius="1rem"
                            />
                        </div>
                    </div>

                    {/* Card Preview */}
                    <div className="w-[30%] p-5 bg-white">
                        <div className="flex items-center space-x-2 mb-6">
                            <h3 className="text-sm font-semibold text-black">Card Preview</h3>
                            <Info className="w-4 h-4 text-gray-500" />
                        </div>

                        <WalletCardPreview
                            loyaltyType={loyaltyType}
                            backgroundColor={safeCardData.backgroundColor}
                            backgroundImg={safeCardData.backgroundImg}
                            backgroundTitle={safeCardData.backgroundTitle}
                            collectedStampImg={safeCardData.collectedStampImg}
                            uncollectedStampImg={safeCardData.uncollectedStampImg}
                            rewardTitle={formData?.rewardTitle || 'Sample Reward'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletCardCustomizer;