import React, { useState, useEffect } from 'react';
import AnimatedInput from 'components/ui/AnimatedInput';
import AnimatedSelect from 'components/ui/AnimatedSelect';
import ImageSelector from 'components/ui/ImageSelector';
import QRCode from 'react-qr-code';
import { MdTitle, MdPalette, MdPhotoSizeSelectActual, MdQrCode, MdTextFields } from 'react-icons/md';
import { Type, Palette, Image, Settings } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const LoyaltyAdditionalDetails = ({
    formData,
    updateFormField,
    selectedLoyaltyData
}) => {
    // Handle blob URL creation for preview
    useEffect(() => {
        if (formData.templateImageBlob) {
            const objectUrl = URL.createObjectURL(formData.templateImageBlob);
            updateFormField('templateImage', objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [formData.templateImageBlob, updateFormField]);

    useEffect(() => {
        if (formData.logoBlob) {
            const objectUrl = URL.createObjectURL(formData.logoBlob);
            updateFormField('logo', objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [formData.logoBlob, updateFormField]);

    useEffect(() => {
        if (formData.icon1Blob) {
            const objectUrl = URL.createObjectURL(formData.icon1Blob);
            updateFormField('icon1', objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [formData.icon1Blob, updateFormField]);

    useEffect(() => {
        if (formData.icon2Blob) {
            const objectUrl = URL.createObjectURL(formData.icon2Blob);
            updateFormField('icon2', objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [formData.icon2Blob, updateFormField]);

    useEffect(() => {
        if (formData.icon3Blob) {
            const objectUrl = URL.createObjectURL(formData.icon3Blob);
            updateFormField('icon3', objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [formData.icon3Blob, updateFormField]);

    useEffect(() => {
        if (selectedLoyaltyData?.templateImage) {
            updateFormField('templateImage', baseUrl + selectedLoyaltyData.templateImage);
        }
    }, [selectedLoyaltyData, updateFormField]);

    // Size options for logo and QR code
    const logoSizeOptions = Array.from({ length: 23 }, (_, i) => ({
        value: (30 + i * 4).toString(),
        label: `${30 + i * 4}px`
    }));

    const qrSizeOptions = Array.from({ length: 31 }, (_, i) => ({
        value: (40 + i * 4).toString(),
        label: `${40 + i * 4}px`
    }));

    const textSizeOptions = Array.from({ length: 15 }, (_, i) => ({
        value: (10 + i).toString(),
        label: `${10 + i}px`
    }));

    // Icon configuration array to reduce repetition
    const iconConfigs = [
        {
            textField: 'icon1Text',
            sizeField: 'icon1TextSize',
            imageField: 'icon1',
            blobField: 'icon1Blob'
        },
        {
            textField: 'icon2Text',
            sizeField: 'icon2TextSize',
            imageField: 'icon2',
            blobField: 'icon2Blob'
        },
        {
            textField: 'icon3Text',
            sizeField: 'icon3TextSize',
            imageField: 'icon3',
            blobField: 'icon3Blob'
        }
    ];

    return (
        <div className="w-full col-span-12 flex flex-col gap-6">
            <div className="border-t border-gray-300 dark:border-gray-600 my-4 col-span-12" />
            <div className="text-lg font-bold text-gray-800 dark:text-white col-span-12 mb-2">
                Loyalty Additional Details
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-4">
                            <AnimatedInput
                                label="Banner Title"
                                icon={MdTitle}
                                placeholder="Enter banner title"
                                value={formData.bannerTitle}
                                onChange={(value) => updateFormField('bannerTitle', value)}
                                required
                                error={undefined}
                            />

                            <div>
                                <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white flex items-center gap-2">
                                    <Palette className="w-4 h-4" />
                                    Select Color
                                </label>
                                <input
                                    type="color"
                                    value={formData.templateColor}
                                    onChange={(e) => updateFormField('templateColor', e.target.value)}
                                    className="h-10 w-full cursor-pointer rounded border border-gray-300 px-2 dark:border-gray-600 dark:bg-navy-900"
                                />
                                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    Selected: {formData.templateColor}
                                </div>
                            </div>

                            <AnimatedSelect
                                label="Logo Size"
                                icon={MdPhotoSizeSelectActual}
                                placeholder="Select logo size"
                                options={logoSizeOptions}
                                value={formData.logoSize?.toString()}
                                onChange={(value) => updateFormField('logoSize', parseInt(value))}
                                error={undefined}
                            />

                            <AnimatedSelect
                                label="QR Code Size"
                                icon={MdQrCode}
                                placeholder="Select QR code size"
                                options={qrSizeOptions}
                                value={formData.qrSize?.toString()}
                                onChange={(value) => updateFormField('qrSize', parseInt(value))}
                                error={undefined}
                            />
                        </div>

                        <div className="flex flex-col space-y-4">
                            <ImageSelector
                                label="Upload Logo"
                                value={formData.logo}
                                onChange={(value) => updateFormField('logo', value)}
                                onBlobChange={(blob) => updateFormField('logoBlob', blob)}
                                aspectRatio={1 / 1}
                                placeholder="Upload logo image"
                                maxHeight={200}
                                error={undefined}
                            />

                            <ImageSelector
                                label="Template Image"
                                value={formData.templateImage}
                                onChange={(value) => updateFormField('templateImage', value)}
                                onBlobChange={(blob) => updateFormField('templateImageBlob', blob)}
                                aspectRatio={16 / 9}
                                placeholder="Upload template image"
                                maxHeight={200}
                                error={undefined}
                            />
                        </div>
                    </div>

                    {/* Icon configuration section */}
                    <div className="grid grid-cols-3 gap-4">
                        {iconConfigs.map((config, i) => (
                            <div className="flex flex-col space-y-2" key={i}>
                                <AnimatedInput
                                    label={`Icon ${i + 1} Text`}
                                    icon={MdTextFields}
                                    placeholder={`Enter text for Icon ${i + 1}`}
                                    value={formData[config.textField]}
                                    onChange={(value) => updateFormField(config.textField, value)}
                                    error={undefined}
                                />
                                <AnimatedSelect
                                    label={`Text Size`}
                                    icon={Type}
                                    placeholder="Select text size"
                                    options={textSizeOptions}
                                    value={formData[config.sizeField]?.toString()}
                                    onChange={(value) => updateFormField(config.sizeField, parseInt(value))}
                                    error={undefined}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {iconConfigs.map((config, i) => (
                            <ImageSelector
                                key={i}
                                label={`Icon ${i + 1}`}
                                value={formData[config.imageField]}
                                onChange={(value) => updateFormField(config.imageField, value)}
                                onBlobChange={(blob) => updateFormField(config.blobField, blob)}
                                aspectRatio={1}
                                placeholder={`Upload icon ${i + 1}`}
                                maxHeight={150}
                                error={undefined}
                            />
                        ))}
                    </div>
                </div>

                {/* Real-time preview section */}
                <div className="w-full flex justify-center">
                    <div
                        className="bg-white dark:bg-navy-900 shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
                        style={{
                            aspectRatio: '210 / 297',
                            width: '100%',
                        }}
                    >
                        <div className="text-sm font-semibold text-gray-700 dark:text-white p-2 border-b border-gray-200 dark:border-gray-700">
                            Real-Time Banner Preview
                        </div>

                        <div className="flex flex-col h-full relative">
                            <div className="absolute bg-brandGreen top-[25%] left-1/2 -translate-x-1/2 z-10 p-1">
                                <QRCode value={"https://codehive.ae/"} size={formData.qrSize} />
                            </div>

                            <div
                                className="h-[30%] relative flex flex-col items-center pt-16 text-center px-4 gap-2"
                                style={{ backgroundColor: formData.templateColor }}
                            >
                                {formData.logo && (
                                    <img
                                        src={formData.logo}
                                        alt="Logo"
                                        style={{ height: `${formData.logoSize}px`, width: `${formData.logoSize}px` }}
                                        className="object-contain mb-1"
                                    />
                                )}
                                <h1 className="text-white text-lg font-semibold">
                                    {formData.bannerTitle}
                                </h1>
                            </div>

                            <div className="h-[40%] flex items-center justify-center">
                                {formData.templateImage ? (
                                    <img
                                        src={formData.templateImage}
                                        alt="Template Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xs text-gray-400 dark:text-gray-500">
                                        No Image Selected
                                    </span>
                                )}
                            </div>

                            <div className="h-[27%] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white text-sm font-medium px-2 py-2 flex flex-col">
                                <div className="flex-1 flex flex-col justify-center gap-2">
                                    <div className="flex justify-around items-center w-full">
                                        {iconConfigs.map((config, index) => {
                                            const defaultIcons = [
                                                '/img/loyaltyBannerIcons/scanQR.png',
                                                '/img/loyaltyBannerIcons/downloadPoints.png',
                                                '/img/loyaltyBannerIcons/promotion.png',
                                            ];
                                            const imageSrc =
                                                typeof formData[config.imageField] === 'string' && formData[config.imageField].trim() !== ''
                                                    ? formData[config.imageField]
                                                    : defaultIcons[index];
                                            return (
                                                <img
                                                    key={index}
                                                    src={imageSrc}
                                                    alt={`Icon ${index + 1}`}
                                                    className="h-8 w-8 object-contain"
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className="flex justify-between items-center w-full gap-4 px-5">
                                        {iconConfigs.map((config, index) => (
                                            <span
                                                key={index}
                                                className="text-center flex-1"
                                                style={{ fontSize: `${formData[config.sizeField]}px` }}
                                            >
                                                {formData[config.textField].trim() !== ''
                                                    ? formData[config.textField]
                                                    : `Default ${index + 1}`}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-xs text-gray-600 dark:text-gray-400 text-center py-2 border-t border-gray-200 dark:border-gray-700">
                                    <p>
                                        Powered by RewardHive{' '}
                                        <a href="https://www.codehive.com" className="underline">
                                            www.codehive.com
                                        </a>
                                    </p>
                                    <p>Compatible with iPhone and Android — users need to download Apple Pass and Google Wallet</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoyaltyAdditionalDetails;