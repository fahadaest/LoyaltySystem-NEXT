import React from 'react';

const WalletCard = ({ cardData, platform = 'ios' }) => {
    const isIOS = platform === 'ios';

    if (isIOS) {
        return (
            <div className="relative transform hover:scale-105 transition-transform duration-300 max-w-sm mx-auto">
                <div
                    className="rounded-2xl shadow-xl text-white relative overflow-hidden"
                    style={{ background: cardData.backgroundColor || '#4F46E5' }}
                >
                    {/* Header with Logo/Brand */}
                    <div className="px-4 pt-4 pb-2">
                        <div className="flex justify-between items-center">
                            {/* <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-brandGreen dark:!border-navy-700">
                                <Image
                                    width="20"
                                    height="20"
                                    className="h-full w-full rounded-full"
                                    src={profileImg}
                                    alt="Profile Avatar"
                                />
                            </div> */}
                            <h1 className="text-sm font-semibold tracking-wide">
                                {cardData.organizationName || cardData.title || 'LOYALTY PROGRAM'}
                            </h1>
                            <div className="text-sm font-medium opacity-90">
                                {cardData.logoText || 'BALANCE'}
                            </div>
                        </div>
                        <div className="text-2xl font-bold mt-1">
                            {cardData.primaryFields?.[0]?.value || cardData.primaryValue || '100'}
                        </div>
                    </div>

                    {/* Illustration/Header Image Area */}
                    <div className="relative px-4 py-6 flex justify-center items-center min-h-[120px]">
                        {cardData.headerImage ? (
                            <img
                                src={cardData.headerImage}
                                alt="Card illustration"
                                className="max-w-full h-auto"
                            />
                        ) : (
                            <div className="w-full h-24 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
                                <div className="text-white text-opacity-60 text-sm font-medium">
                                    {cardData.organizationName || 'BRAND LOGO'}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Customer Info Section */}
                    <div className="px-4 pb-4">
                        <div className="text-xs font-medium opacity-75 mb-1 tracking-wide">
                            {cardData.customerLabel || 'NAME'}
                        </div>
                        <div className="text-lg font-semibold">
                            {cardData.customerName || cardData.secondaryFields?.[0]?.value || 'Customer Name'}
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="px-4 pb-6 flex justify-center">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            {cardData.qrCode ? (
                                <img
                                    src={cardData.qrCode}
                                    alt="QR Code"
                                    className="w-24 h-24"
                                />
                            ) : (
                                <div className="w-24 h-24 bg-gray-900 rounded grid grid-cols-8 gap-px p-2">
                                    {[...Array(64)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Member ID */}
                    <div className="px-4 pb-4 text-center">
                        <div className="text-sm font-mono tracking-wider">
                            {cardData.memberId || cardData.barcodeMessage || cardData.barcode || '000548702'}
                        </div>
                    </div>

                    {/* Bottom stripe pattern (like Apple Wallet) */}
                    <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"></div>
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