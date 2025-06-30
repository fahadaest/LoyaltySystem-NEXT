import React, { useState, useEffect } from 'react';
import InputField from 'components/fields/InputField';
import ImageUploaderAndCropper from 'components/imageUploader/ImageUploaderAndCropper';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const LoyaltyAdditionalDetails = ({ bannnerTitle, setBannnerTitle, color, setColor, logoSize, setLogoSize, qrSize, setQrSize, logo, setLogo, logoBlob, setLogoBlob, templateImage, setTemplateImage, templateImageBlob, setTemplateImageBlob, icon1Text, setIcon1Text, icon2Text, setIcon2Text, icon3Text, setIcon3Text, icon1TextSize, setIcon1TextSize, icon2TextSize, setIcon2TextSize, icon3TextSize, setIcon3TextSize, icon1, setIcon1, icon2, setIcon2, icon3, setIcon3, icon1Blob, setIcon1Blob, icon2Blob, setIcon2Blob, icon3Blob, setIcon3Blob, selectedLoyaltyData }) => {
    useEffect(() => {
        if (templateImageBlob) {
            const objectUrl = URL.createObjectURL(templateImageBlob);
            setTemplateImage(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [templateImageBlob]);

    useEffect(() => {
        if (logoBlob) {
            const objectUrl = URL.createObjectURL(logoBlob);
            setLogo(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [logoBlob]);

    useEffect(() => {
        if (icon1Blob) setIcon1(URL.createObjectURL(icon1Blob));
    }, [icon1Blob]);

    useEffect(() => {
        if (icon2Blob) setIcon2(URL.createObjectURL(icon2Blob));
    }, [icon2Blob]);

    useEffect(() => {
        if (icon3Blob) setIcon3(URL.createObjectURL(icon3Blob));
    }, [icon3Blob]);

    useEffect(() => {
        if (selectedLoyaltyData) {
            setTemplateImage(baseUrl + selectedLoyaltyData.templateImage || null);
        }
    }, [selectedLoyaltyData]);


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
                            <div>
                                <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">Title</label>
                                <InputField
                                    variant="auth"
                                    extra="mb-0"
                                    placeholder="Enter title"
                                    id="banner-title"
                                    type="text"
                                    value={bannnerTitle}
                                    onChange={(e) => setBannnerTitle(e.target.value)} label={''} />
                            </div>
                            <div>
                                <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">Select Color</label>
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="h-10 w-full cursor-pointer rounded border border-gray-300 px-2 dark:border-gray-600 dark:bg-navy-900"
                                />
                                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    Selected: {color}
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">Logo Size</label>
                                <input
                                    type="range"
                                    min="30"
                                    max="120"
                                    step="4"
                                    value={logoSize}
                                    onChange={(e) => setLogoSize(parseInt(e.target.value))}
                                    className="w-full accent-brandGreen"
                                />
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Logo Size: {logoSize}px
                                </span>
                            </div>

                            <div>
                                <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">QR Code Size</label>
                                <input
                                    type="range"
                                    min="40"
                                    max="160"
                                    step="4"
                                    value={qrSize}
                                    onChange={(e) => setQrSize(parseInt(e.target.value))}
                                    className="w-full accent-brandGreen"
                                />
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Current Size: {qrSize}px
                                </span>
                            </div>

                        </div>

                        <div className="flex flex-col space-y-4">
                            <div >
                                <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">Upload Logo</label>
                                <ImageUploaderAndCropper
                                    previewImage={logo}
                                    setPreviewImage={setLogo}
                                    onCropComplete={(blob) => setLogoBlob(blob)}
                                    removeImage={() => setLogo(null)}
                                />
                            </div>
                            <div>
                                <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">Template Image</label>
                                <ImageUploaderAndCropper
                                    previewImage={templateImage}
                                    setPreviewImage={setTemplateImage}
                                    onCropComplete={(blob) => setTemplateImageBlob(blob)}
                                    removeImage={() => setTemplateImage(null)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {[icon1Text, icon2Text, icon3Text].map((value, i) => (
                            <div className="flex flex-col space-y-2" key={i}>
                                <InputField
                                    variant="auth"
                                    extra="mb-0"
                                    label={`Icon ${i + 1} Text`}
                                    placeholder={`Enter text for Icon ${i + 1}`}
                                    id={`icon${i + 1}-text`}
                                    type="text"
                                    value={value}
                                    onChange={(e) => {
                                        [setIcon1Text, setIcon2Text, setIcon3Text][i](e.target.value);
                                    }}
                                />
                                <label className="text-xs text-gray-500 dark:text-gray-400">Text Size: {[icon1TextSize, icon2TextSize, icon3TextSize][i]}px</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="24"
                                    step="1"
                                    value={[icon1TextSize, icon2TextSize, icon3TextSize][i]}
                                    onChange={(e) => {
                                        [setIcon1TextSize, setIcon2TextSize, setIcon3TextSize][i](parseInt(e.target.value));
                                    }}
                                    className="w-full accent-brandGreen"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {[icon1, icon2, icon3].map((icon, i) => (
                            <div className="flex flex-col" key={i}>
                                <label className="mb-2 text-sm font-medium text-gray-700 dark:text-white">
                                    Icon {i + 1}
                                </label>
                                <ImageUploaderAndCropper
                                    previewImage={icon}
                                    setPreviewImage={[setIcon1, setIcon2, setIcon3][i]}
                                    onCropComplete={(blob) => [setIcon1Blob, setIcon2Blob, setIcon3Blob][i](blob)}
                                    removeImage={() => [setIcon1, setIcon2, setIcon3][i](null)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full flex justify-center bg-pink-200">
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
                            <div className="absolute top-[25%] left-1/2 -translate-x-1/2 z-10">
                                <img
                                    src="/img/loyaltyBannerIcons/Qrcode.png"
                                    alt="QR Code"
                                    style={{ height: `${qrSize}px`, width: `${qrSize}px` }}
                                    className="object-contain"
                                />
                            </div>

                            <div
                                className="h-[30%] relative flex flex-col items-center pt-16 text-center px-4 gap-2"
                                style={{ backgroundColor: color }}
                            >
                                {logo && (
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        style={{ height: `${logoSize}px`, width: `${logoSize}px` }}
                                        className="object-contain mb-1"
                                    />
                                )}
                                <h1 className="text-white text-lg font-semibold">
                                    {bannnerTitle}
                                </h1>
                            </div>

                            <div className="h-[40%] flex items-center justify-center">
                                {templateImage ? (
                                    <img
                                        src={templateImage}
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
                                        {[icon1, icon2, icon3].map((icon, index) => {
                                            const defaultIcons = [
                                                '/img/loyaltyBannerIcons/scanQR.png',
                                                '/img/loyaltyBannerIcons/downloadPoints.png',
                                                '/img/loyaltyBannerIcons/promotion.png',
                                            ];
                                            const imageSrc =
                                                typeof icon === 'string' && icon.trim() !== ''
                                                    ? icon
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
                                        {[icon1Text, icon2Text, icon3Text].map((text, index) => {
                                            const sizes = [icon1TextSize, icon2TextSize, icon3TextSize];
                                            return (
                                                <span
                                                    key={index}
                                                    className="text-center flex-1"
                                                    style={{ fontSize: `${sizes[index]}px` }}
                                                >
                                                    {text.trim() !== '' ? text : `Default ${index + 1}`}
                                                </span>
                                            );
                                        })}
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