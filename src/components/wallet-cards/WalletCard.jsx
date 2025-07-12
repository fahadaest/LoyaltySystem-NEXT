import React from 'react';
import QRCode from 'react-qr-code';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const WalletCard = ({ cardData, platform = 'ios' }) => {
    const isIOS = platform === 'ios';

    if (isIOS) {
        return (
            <div className="relative transform hover:scale-105 transition-transform duration-300 max-w-[280px] mx-auto">
                <div
                    className="rounded-xl shadow-xl text-white relative overflow-hidden w-full aspect-[5/8]"
                    style={{ background: cardData.backgroundColor || '#000000' }}
                >
                    {/* Header */}
                    <div className="px-4 pt-4 pb-3 flex items-center justify-between">
                        <h1 className="text-sm font-semibold">
                            {cardData.organizationName || cardData.title || 'Barber Shop'}
                        </h1>

                        <h1 className="text-xs">
                            {'logo'}
                        </h1>
                    </div>

                    {/* Stamp Collection Image Area */}
                    <div className="relative bg-pink-200 mb-3">
                        {cardData.headerImage ? (
                            <img
                                src={cardData.headerImage}
                                alt="Stamp collection"
                                className="w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-24 bg-gray-800 relative overflow-hidden">
                                {/* Background barber image effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800"></div>

                                {/* Stamp grid overlay */}
                                <div className="absolute inset-0 p-3">
                                    <div className="grid grid-cols-5 gap-2 h-full">
                                        {[...Array(10)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="bg-white rounded-full flex items-center justify-center aspect-square"
                                            >
                                                {/* Barber head silhouette icon */}
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#666" className="opacity-80">
                                                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M12 6C14.21 6 16 7.79 16 10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10C8 7.79 9.79 6 12 6M12 14C15.31 14 18 16.69 18 20H6C6 16.69 8.69 14 12 14Z" />
                                                </svg>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats Section */}
                    <div className="px-2 pb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-[8px] opacity-70 mb-1 tracking-wide uppercase">
                                    STAMPS UNTIL THE REWAARD
                                </div>
                                <div className="text-sm font-bold">
                                    {cardData.stampsCount || '8 stamps'}
                                </div>
                            </div>
                            <div>
                                <div className="text-[8px] text-right opacity-70 mb-1 tracking-wide uppercase">
                                    AVAILABLE REWARDS
                                </div>
                                <div className="text-sm text-right font-bold">
                                    {cardData.rewardsCount || '0 rewards'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="px-4 pb-4 flex justify-center">
                        <div className="bg-white rounded-2xl p-4 text-center">
                            <QRCode value={baseUrl} size={48} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Android/Generic version (your original design)
    return (
        <div className="relative transform hover:scale-105 transition-transform duration-300">
            <div
                className="rounded-xl p-4 shadow-xl text-white relative overflow-hidden"
                style={{ background: cardData.backgroundColor || '#4F46E5' }}
            >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-base font-bold">
                            {cardData.organizationName || cardData.title || 'Card Title'}
                        </h2>
                        <p className="text-xs opacity-90">
                            {cardData.logoText || cardData.subtitle || 'Subtitle'}
                        </p>
                    </div>
                    <div className="w-5 h-5 bg-white bg-opacity-20 rounded" />
                </div>

                {/* Primary Field */}
                {(cardData.primaryFields?.[0] || cardData.primaryField) && (
                    <div className="mb-4">
                        <p className="text-xs opacity-80">
                            {cardData.primaryFields?.[0]?.label || cardData.primaryField}
                        </p>
                        <p className="text-lg font-bold">
                            {cardData.primaryFields?.[0]?.value || cardData.primaryValue}
                        </p>
                    </div>
                )}

                {/* Secondary Fields */}
                {(cardData.secondaryFields?.length > 0) && (
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        {cardData.secondaryFields.slice(0, 2).map((field, index) => (
                            <div key={index}>
                                <p className="text-xs opacity-80">{field.label}</p>
                                <p className="text-xs font-semibold">{field.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Auxiliary Fields */}
                {(cardData.auxiliaryFields?.length > 0) && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        {cardData.auxiliaryFields.slice(0, 2).map((field, index) => (
                            <div key={index}>
                                <p className="opacity-80">{field.label}</p>
                                <p className="font-semibold">{field.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Barcode */}
                <div className="mt-3 pt-2 border-t border-white border-opacity-20">
                    <div className="flex justify-center">
                        <div className="w-10 h-10 bg-white bg-opacity-90 rounded flex items-center justify-center">
                            <div className="w-6 h-6 bg-gray-800 rounded grid grid-cols-3 gap-0.5 p-1">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-sm" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletCard;