import React from 'react';
import QRCode from 'react-qr-code';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const LoyaltyBannerPreview = ({
    registerCustomerLink,
    bannerTitle,
    color,
    logoSize,
    qrSize,
    logo,
    templateImage,
    icon1Text,
    icon2Text,
    icon3Text,
    icon1,
    icon2,
    icon3,
    icon1TextSize,
    icon2TextSize,
    icon3TextSize
}) => {
    const logoImage = baseUrl + logo;
    const mainImage = baseUrl + templateImage;
    return (
        <div className="w-full flex justify-center bg-black-900">
            <div
                className="bg-white dark:bg-navy-900 shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
                style={{
                    aspectRatio: '210 / 297',
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    margin: 0,
                }}
            >

                <div className="flex flex-col h-full relative">
                    <div className="absolute top-[25%] left-1/2 -translate-x-1/2 z-10">
                        <QRCode value={registerCustomerLink} size={qrSize} />
                    </div>

                    <div
                        className="h-[30%] relative flex flex-col items-center pt-16 text-center px-4 gap-2"
                        style={{ backgroundColor: color }}
                    >
                        {logo && (
                            <img
                                src={logoImage}
                                alt="Logo"
                                style={{ height: `${logoSize}px`, width: `${logoSize}px` }}
                                className="object-contain mb-1"
                            />
                        )}
                        <h1 className="text-white text-lg font-semibold">
                            {bannerTitle}
                        </h1>
                    </div>

                    <div className="h-[40%] flex items-center justify-center">
                        {templateImage ? (
                            <img
                                src={mainImage}
                                alt="Template Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                                No Image Selected
                            </span>
                        )}
                    </div>

                    <div className="h-[30%] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white text-sm font-medium px-2 py-2 flex flex-col">
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
    );
};

export default LoyaltyBannerPreview;