import React, { useState } from 'react';
import { ChevronDown, Upload, RefreshCw, Info, Eye } from 'lucide-react';
import InputField from '../input-fields/InputField';
import ColorPicker from '../input-fields/ColorPicker';
import Button from '../buttons/Button';
import BannerPreview from './BannerPreview';
import FileUploadArea from '../ui/FileUploadArea';
import ImageCropperComponent from '../ui/ImageCropperComponent';
import { createBannerSetting } from '@/utils/loyaltyFormData';

const BannerCreator = ({ formData, updateFormData, resetFormData }) => {
    const [dropdowns, setDropdowns] = useState({
        purchasingProduct: false,
        rewardProduct: false
    });

    const handleImageCropped = (field, file, previewUrl) => {
        if (file && previewUrl) {
            // Store the actual File object for API submission
            updateFormData(field, file, 'bannerSetting');
            // Store preview URL separately
            updateFormData(`${field}Preview`, previewUrl, 'bannerSetting');
        } else {
            // Handle image removal
            updateFormData(field, null, 'bannerSetting');
            updateFormData(`${field}Preview`, null, 'bannerSetting');
        }
    };

    const handleBannerUpdate = (field, value) => {
        updateFormData(field, value, 'bannerSetting');
    };

    const toggleDropdown = (field) => {
        setDropdowns(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    // Get banner settings from the nested structure
    const bannerSettings = formData?.bannerSetting || {};

    // Provide default values if bannerSetting is not available
    const safeFormData = {
        bannerTitle: '',
        titleColor: '#2F45F2',
        backgroundColor: '#4F45E3',
        backgroundImage: null,
        backgroundImg: null, // Logo
        icon1: null,
        icon2: null,
        icon3: null,
        text1: '',
        text2: '',
        text3: '',
        ...bannerSettings
    };

    const handleResetBanner = () => {
        if (resetFormData) {
            resetFormData();
        } else {
            const resetData = createBannerSetting();
            Object.keys(resetData).forEach(key => {
                handleBannerUpdate(key, resetData[key]);
            });
        }
    };

    return (
        <div className="w-full mx-auto bg-gray-50">
            {/* Main Content Area */}
            <div className="bg-gray-100 border border-gray-300 rounded-3xl p-3 pt-5">

                <div className="flex w-[100%] lg:flex-row gap-5 ">

                    {/* Banner Settings */}
                    <div className="w-[84%] space-y-5">

                        <div className="flex items-center justify-between">
                            <h2 className="text-[0.9rem] font-semibold text-black">Banner Setting</h2>

                            <Button
                                text={"Reset All"}
                                onClick={handleResetBanner}
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

                        {/* Banner Title and Colors */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InputField
                                label="Banner Title*"
                                name="bannerTitle"
                                type="text"
                                placeholder="Enter title"
                                value={safeFormData.bannerTitle}
                                onChange={(e) => handleBannerUpdate('bannerTitle', e.target.value)}
                                labelSize="0.675rem"
                                placeholderSize="0.575rem"
                                fieldHeight="0.8rem"
                            />

                            <ColorPicker
                                label="Top Background*"
                                name="backgroundColor"
                                value={safeFormData.backgroundColor}
                                onChange={(e) => handleBannerUpdate('backgroundColor', e.target.value)}
                                placeholder="Choose background color"
                                labelSize="0.675rem"
                                placeholderSize="0.575rem"
                                fieldHeight="0.8rem"
                                colorPreviewSize="1.875rem"
                                iconSize="0.875rem"
                            />

                            <ColorPicker
                                label="Title Colour*"
                                field="titleColor"
                                value={safeFormData.titleColor}
                                onChange={(e) => handleBannerUpdate('backgroundColor', e.target.value)}
                                placeholder="Choose background color"
                                labelSize="0.675rem"
                                placeholderSize="0.575rem"
                                fieldHeight="0.8rem"
                                colorPreviewSize="1.875rem"
                                iconSize="0.875rem"
                            />

                        </div>

                        {/* Logo and Banner Image */}
                        <div className="grid grid-cols-1">
                            <ImageCropperComponent
                                label="Banner Image"
                                required={false}
                                aspectRatio={16 / 9}  // Landscape ratio
                                width="100%"
                                height="7rem"
                                placeholder="Click to Upload banner image"
                                initialImage={safeFormData.backgroundImagePreview || safeFormData.backgroundImage}
                                onImageCropped={(file, previewUrl) => handleImageCropped('backgroundImage', file, previewUrl)}
                                className=""
                            />
                        </div>

                        {/* Icons */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <ImageCropperComponent
                                label="Icon 1"
                                aspectRatio={1}  // Square ratio
                                width="100%"
                                height="7rem"
                                placeholder="Upload Icon"
                                initialImage={safeFormData.icon1Preview || safeFormData.icon1}
                                onImageCropped={(file, previewUrl) => handleImageCropped('icon1', file, previewUrl)}
                            />
                            <ImageCropperComponent
                                label="Icon 2"
                                aspectRatio={1}
                                width="100%"
                                height="7rem"
                                placeholder="Upload Icon"
                                initialImage={safeFormData.icon2Preview || safeFormData.icon2}
                                onImageCropped={(file, previewUrl) => handleImageCropped('icon2', file, previewUrl)}
                            />
                            <ImageCropperComponent
                                label="Icon 3"
                                aspectRatio={1}
                                width="100%"
                                height="7rem"
                                placeholder="Upload Icon"
                                initialImage={safeFormData.icon3Preview || safeFormData.icon3}
                                onImageCropped={(file, previewUrl) => handleImageCropped('icon3', file, previewUrl)}
                            />
                        </div>

                        {/* Text Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField
                                label="Text 1*"
                                name="text1"
                                type="text"
                                placeholder="Enter Text"
                                value={safeFormData.text1}
                                onChange={(e) => handleBannerUpdate('text1', e.target.value)}
                                labelSize="0.675rem"
                                placeholderSize="0.575rem"
                                fieldHeight="0.8rem"
                            />

                            <InputField
                                label="Text 2*"
                                name="text2"
                                type="text"
                                placeholder="Enter Text"
                                value={safeFormData.text2}
                                onChange={(e) => handleBannerUpdate('text2', e.target.value)}
                                labelSize="0.675rem"
                                placeholderSize="0.575rem"
                                fieldHeight="0.8rem"
                            />

                            <InputField
                                label="Text 3*"
                                name="text3"
                                type="text"
                                placeholder="Enter Text"
                                value={safeFormData.text3}
                                onChange={(e) => handleBannerUpdate('text3', e.target.value)}
                                labelSize="0.675rem"
                                placeholderSize="0.575rem"
                                fieldHeight="0.8rem"
                            />
                        </div>
                    </div>

                    {/* Banner Preview - Using the separate component */}
                    <div className="w-[16%] lg:w-auto p-5 bg-white rounded-3xl bg-green-100">
                        <div className="flex items-center space-x-2 mb-6">
                            <h3 className="text-[0.9rem] font-semibold text-black">Banner Preview</h3>
                            <Info className="w-5 h-5 text-gray-500" />
                        </div>

                        {/* Using the BannerPreview component */}
                        <BannerPreview
                            bannerTitle={safeFormData.bannerTitle}
                            titleColor={safeFormData.titleColor}
                            backgroundColor={safeFormData.backgroundColor}
                            backgroundImage={safeFormData.backgroundImagePreview || safeFormData.backgroundImage}
                            backgroundImg={safeFormData.backgroundImg}
                            icon1={safeFormData.icon1Preview || safeFormData.icon1}
                            icon2={safeFormData.icon2Preview || safeFormData.icon2}
                            icon3={safeFormData.icon3Preview || safeFormData.icon3}
                            text1={safeFormData.text1}
                            text2={safeFormData.text2}
                            text3={safeFormData.text3}
                            showContainer={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerCreator;