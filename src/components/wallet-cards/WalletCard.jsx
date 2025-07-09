import React from 'react';

const WalletCard = ({ cardData, platform = 'ios' }) => {
    const isIOS = platform === 'ios';

    return (
        <div className="relative transform hover:scale-105 transition-transform duration-300">
            <div
                className={`${isIOS ? 'rounded-2xl p-5' : 'rounded-xl p-4'} shadow-xl text-white relative overflow-hidden`}
                style={{ background: cardData.backgroundColor || '#4F46E5' }}
            >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className={`${isIOS ? 'text-lg' : 'text-base'} font-bold`}>
                            {cardData.organizationName || cardData.title || 'Card Title'}
                        </h2>
                        <p className={`${isIOS ? 'text-sm' : 'text-xs'} opacity-90`}>
                            {cardData.logoText || cardData.subtitle || 'Subtitle'}
                        </p>
                    </div>
                    <div className={`${isIOS ? 'w-6 h-6' : 'w-5 h-5'} bg-white bg-opacity-20 ${isIOS ? 'rounded-full' : 'rounded'}`} />
                </div>

                {/* Primary Field */}
                {(cardData.primaryFields?.[0] || cardData.primaryField) && (
                    <div className="mb-4">
                        <p className="text-xs opacity-80">
                            {cardData.primaryFields?.[0]?.label || cardData.primaryField}
                        </p>
                        <p className={`${isIOS ? 'text-xl' : 'text-lg'} font-bold`}>
                            {cardData.primaryFields?.[0]?.value || cardData.primaryValue}
                        </p>
                    </div>
                )}

                {/* Secondary Fields */}
                {(cardData.secondaryFields?.length > 0) && (
                    <div className={`grid grid-cols-2 gap-3 ${isIOS ? 'mb-3' : 'mb-2'}`}>
                        {cardData.secondaryFields.slice(0, 2).map((field, index) => (
                            <div key={index}>
                                <p className="text-xs opacity-80">{field.label}</p>
                                <p className={`${isIOS ? 'text-sm' : 'text-xs'} font-semibold`}>{field.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Auxiliary Fields */}
                {(cardData.auxiliaryFields?.length > 0) && (
                    <div className={`grid grid-cols-2 gap-${isIOS ? '3' : '2'} text-xs`}>
                        {cardData.auxiliaryFields.slice(0, 2).map((field, index) => (
                            <div key={index}>
                                <p className="opacity-80">{field.label}</p>
                                <p className="font-semibold">{field.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Barcode */}
                <div className={`${isIOS ? 'mt-4 pt-3' : 'mt-3 pt-2'} border-t border-white border-opacity-20`}>
                    <div className="flex justify-center">
                        {isIOS ? (
                            <div className="text-xs font-mono">
                                {cardData.barcodeMessage || cardData.barcode || '123456789'}
                            </div>
                        ) : (
                            <div className="w-10 h-10 bg-white bg-opacity-90 rounded flex items-center justify-center">
                                <div className="w-6 h-6 bg-gray-800 rounded grid grid-cols-3 gap-0.5 p-1">
                                    {[...Array(9)].map((_, i) => (
                                        <div key={i} className="bg-white rounded-sm" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletCard;