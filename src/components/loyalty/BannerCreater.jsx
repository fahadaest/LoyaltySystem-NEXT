import React, { useState } from 'react';
import { ChevronDown, Upload, RefreshCw, Info, Eye } from 'lucide-react';
import InputField from '../input-fields/InputField';
import ColorPicker from '../input-fields/ColorPicker';
import Button from '../buttons/Button';
import BannerPreview from './BannerPreview'; // Import the separate banner component

const BannerCreator = ({ formData, updateFormData, resetFormData }) => {
    const [dropdowns, setDropdowns] = useState({
        purchasingProduct: false,
        rewardProduct: false
    });

    const handleFileUpload = (field, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                updateFormData(field, e.target.result, 'bannerSetting');
            };
            reader.readAsDataURL(file);
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

    const FileUploadArea = ({ label, field, accept = "image/*" }) => (
        <div className="w-full">
            <label className="block text-sm font-medium text-black mb-2">{label}</label>
            <div className="relative">
                <input
                    type="file"
                    accept={accept}
                    onChange={(e) => handleFileUpload(field, e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full h-28 bg-white border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                    <Upload className="w-7 h-7 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500 text-center">
                        {field === 'backgroundImage' && 'Click to Upload product image'}
                        {field === 'backgroundImg' && 'Click to Upload product image'}
                        {(field === 'icon1' || field === 'icon2' || field === 'icon3') && 'Upload'}
                    </span>
                </div>
            </div>
        </div>
    );

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
            // Fallback reset for banner settings only
            const resetData = {
                bannerTitle: '',
                titleColor: '#2F45F2',
                backgroundColor: '#4F45E3',
                backgroundImage: null,
                backgroundImg: null,
                icon1: null,
                icon2: null,
                icon3: null,
                text1: '',
                text2: '',
                text3: ''
            };
            Object.keys(resetData).forEach(key => {
                handleBannerUpdate(key, resetData[key]);
            });
        }
    };

    return (
        <div className="w-full mx-auto bg-gray-50">
            {/* Main Content Area */}
            <div className="bg-gray-100 border border-gray-300 rounded-3xl p-3 pt-5">

                <div className="flex w-[100%] lg:flex-row gap-5 bg-yellow-100">
                    {/* Banner Settings */}
                    <div className="w-[84%] space-y-8 bg-pink-100">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[0.9rem] font-semibold text-black">Banner Setting</h2>

                            <Button
                                text={"Reset All"}
                                onClick={handleResetBanner}
                                backgroundColor={'#000000'}
                                textColor={'#FFFFFF'}
                                icon={"/img/general/color_selector_white.svg"}
                                showIcon={true}
                                iconPosition={'right'}
                                disabled={false}
                                size={'small'} 
                                className={''}
                            />
                        </div>

                        <div className="border-b border-gray-300"></div>

                        {/* Banner Title and Colors */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField
                                label="Banner Title*"
                                name="bannerTitle"
                                type="text"
                                placeholder="Enter title"
                                value={safeFormData.bannerTitle}
                                onChange={(e) => handleBannerUpdate('bannerTitle', e.target.value)}
                                labelSize="0.875rem"
                                placeholderSize="0.875rem"
                                fieldHeight="0.6rem"
                            />

                            <ColorPicker
                                label="Top Background*"
                                field="backgroundColor"
                                value={safeFormData.backgroundColor}
                            />

                            <ColorPicker
                                label="Title Colour*"
                                field="titleColor"
                                value={safeFormData.titleColor}
                            />
                        </div>

                        {/* Logo and Banner Image */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FileUploadArea label="Logo" field="backgroundImg" />
                            <FileUploadArea label="Banner Image" field="backgroundImage" />
                        </div>

                        {/* Bottom Colors */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ColorPicker
                                label="Bottom Background"
                                name="bottomBackground"
                                value={safeFormData.backgroundColor}
                                onChange={(e) => handleBannerUpdate('backgroundColor', e.target.value)}
                                labelSize="0.875rem"
                            />

                            <ColorPicker
                                label="Bottom Text Colour"
                                name="bottomTextColor"
                                value={safeFormData.titleColor}
                                onChange={(e) => handleBannerUpdate('titleColor', e.target.value)}
                                labelSize="0.875rem"
                            />
                        </div>

                        {/* Icons */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FileUploadArea label="Icon 1" field="icon1" />
                            <FileUploadArea label="Icon 2" field="icon2" />
                            <FileUploadArea label="Icon 3" field="icon3" />
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
                                labelSize="0.875rem"
                                placeholderSize="0.875rem"
                                fieldHeight="0.6rem"
                            />

                            <InputField
                                label="Text 2*"
                                name="text2"
                                type="text"
                                placeholder="Enter Text"
                                value={safeFormData.text2}
                                onChange={(e) => handleBannerUpdate('text2', e.target.value)}
                                labelSize="0.875rem"
                                placeholderSize="0.875rem"
                                fieldHeight="0.6rem"
                            />

                            <InputField
                                label="Text 3*"
                                name="text3"
                                type="text"
                                placeholder="Enter Text"
                                value={safeFormData.text3}
                                onChange={(e) => handleBannerUpdate('text3', e.target.value)}
                                labelSize="0.875rem"
                                placeholderSize="0.875rem"
                                fieldHeight="0.6rem"
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
                            backgroundImage={safeFormData.backgroundImage}
                            backgroundImg={safeFormData.backgroundImg}
                            icon1={safeFormData.icon1}
                            icon2={safeFormData.icon2}
                            icon3={safeFormData.icon3}
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