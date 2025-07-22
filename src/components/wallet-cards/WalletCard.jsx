import React from 'react';
import QRCode from 'react-qr-code';
import { getStampLayout } from 'utils/stampLayout';
import { getImageUrl } from 'utils/imageUtils';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const WalletCard = ({ cardData, platform = 'ios' }) => {
    const isIOS = platform === 'ios';

    const getBackgroundStyle = () => {
        const backgroundColor = cardData.backgroundColor || '#000000';
        return {
            background: backgroundColor
        };
    };

    const stampLayout = getStampLayout(cardData.rewardQuantity);
    const collectedStampsCount = cardData.collectedStamps || cardData.currentStamps || 3;

    const renderStamp = (index, isCollected) => {
        const hasCustomStamps = cardData.stampCollectedImgUrl || cardData.noStampCollectedImgUrl;

        if (hasCustomStamps) {
            // Use custom stamp images with getImageUrl
            const stampImageUrl = isCollected
                ? getImageUrl(cardData.stampCollectedImgUrl || cardData.stampCollectedImg)
                : getImageUrl(cardData.noStampCollectedImgUrl || cardData.noStampCollectedImg);

            if (stampImageUrl) {
                return (
                    <div
                        key={index}
                        className="rounded-full flex items-center justify-center shadow-sm overflow-hidden"
                        style={{
                            width: `${stampLayout.stampSize}px`,
                            height: `${stampLayout.stampSize}px`,
                            flexShrink: 0,
                            backgroundColor: isCollected ? 'transparent' : 'rgba(255,255,255,0.3)'
                        }}
                    >
                        <img
                            src={stampImageUrl}
                            alt={isCollected ? "Collected stamp" : "Uncollected stamp"}
                            className="w-full h-full object-cover rounded-full"
                            style={{
                                opacity: isCollected ? 1 : 0.5
                            }}
                        />
                    </div>
                );
            }
        }

        return (
            <div
                key={index}
                className="rounded-full flex items-center justify-center shadow-sm"
                style={{
                    width: `${stampLayout.stampSize}px`,
                    height: `${stampLayout.stampSize}px`,
                    flexShrink: 0,
                    backgroundColor: isCollected ? '#ffffff' : 'rgba(255,255,255,0.3)'
                }}
            >
                <svg
                    width={stampLayout.iconSize}
                    height={stampLayout.iconSize}
                    viewBox="0 0 24 24"
                    fill={isCollected ? "#666" : "rgba(102,102,102,0.5)"}
                    className="opacity-80"
                >
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M12 6C14.21 6 16 7.79 16 10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10C8 7.79 9.79 6 12 6M12 14C15.31 14 18 16.69 18 20H6C6 16.69 8.69 14 12 14Z" />
                </svg>
            </div>
        );
    };

    if (isIOS) {
        return (
            <div className="relative transform hover:scale-105 transition-transform duration-300 max-w-[320px] mx-auto">
                <div
                    className="rounded-xl shadow-xl text-white relative overflow-hidden w-full aspect-[5/7]"
                    style={getBackgroundStyle()}
                >
                    {/* Header */}
                    <div className="px-4 py-2 flex items-center justify-between">
                        <div className='flex gap-2 items-center'>
                            <div className="text-xs">
                                {(cardData.logoImageUrl || cardData.logoImage) ? (
                                    <img
                                        src={getImageUrl(cardData.logoImageUrl || cardData.logoImage)}
                                        alt="Logo"
                                        className="w-6 h-6 object-contain rounded"
                                    />
                                ) : (
                                    'logo'
                                )}
                            </div>
                            <h1 className="text-sm font-semibold">
                                {cardData.organizationName || cardData.title || 'Barber Shop'}
                            </h1>
                        </div>

                        <div className='text-right'>
                            <p className='text-xs'>Stamps</p>
                            <p>3/10</p>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="relative mb-3">
                        {(cardData.backgroundImageUrl || cardData.backgroundImage) ? (
                            <div className="w-full h-24 relative overflow-hidden">
                                {/* Background image */}
                                <img
                                    src={getImageUrl(cardData.backgroundImageUrl || cardData.backgroundImage)}
                                    alt="Card background"
                                    className="w-full h-full object-cover"
                                />

                                {/* Content overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                                {cardData.cardType === 'point' ? (
                                    /* Points earning message */
                                    <div className="absolute inset-0 flex items-center justify-center p-4">
                                        <div className="text-center bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
                                            <p className="text-xs font-semibold text-white">
                                                Spend {cardData.pointsSpendAmount} AED get {cardData.pointsReward} AED
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    /* Stamp grid overlay */
                                    <div className="absolute inset-0 p-2 flex items-center justify-center">
                                        <div
                                            className={`grid ${stampLayout.gap} place-items-center`}
                                            style={{
                                                gridTemplateColumns: `repeat(${stampLayout.cols}, ${stampLayout.stampSize}px)`,
                                                gridTemplateRows: `repeat(${Math.min(stampLayout.rows, 4)}, ${stampLayout.stampSize}px)`
                                            }}
                                        >
                                            {[...Array(stampLayout.quantity)].map((_, i) => {
                                                const isCollected = i < collectedStampsCount;
                                                return renderStamp(i, isCollected);
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : cardData.headerImage ? (
                            <img
                                src={getImageUrl(cardData.headerImage)}
                                alt="Card content"
                                className="w-full h-24 object-cover"
                            />
                        ) : (
                            <div className="w-full h-24 bg-gray-800 relative overflow-hidden">
                                {/* Background effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800"></div>

                                {cardData.cardType === 'point' ? (
                                    /* Points earning message for default background */
                                    <div className="absolute inset-0 flex items-center justify-center p-4">
                                        <div className="text-center">
                                            <p className="text-xs font-semibold text-white">
                                                Spend {cardData.pointsSpendAmount} AED get {cardData.pointsReward} AED
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    /* Stamp grid for default background */
                                    <div className="absolute inset-0 p-2 flex items-center justify-center">
                                        <div
                                            className={`grid ${stampLayout.gap} place-items-center`}
                                            style={{
                                                gridTemplateColumns: `repeat(${stampLayout.cols}, ${stampLayout.stampSize}px)`,
                                                gridTemplateRows: `repeat(${stampLayout.rows}, ${stampLayout.stampSize}px)`
                                            }}
                                        >
                                            {[...Array(stampLayout.quantity)].map((_, i) => {
                                                const isCollected = i < collectedStampsCount;
                                                return renderStamp(i, isCollected);
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Stats Section */}
                    <div className="px-2 pb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-[8px] opacity-70 tracking-wide uppercase">
                                    {cardData.cardType === 'point' ? 'CURRENT POINTS' : 'STAMPS UNTIL REWARD'}
                                </div>
                                <div className="text-sm font-bold">
                                    {cardData.cardType === 'point'
                                        ? (cardData.pointsAmount)
                                        : (cardData.stampsCount || `${collectedStampsCount}/${cardData.rewardQuantity || stampLayout.quantity} stamps`)
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="text-[8px] text-right opacity-70 tracking-wide uppercase">
                                    AVAILABLE REWARDS
                                </div>
                                <div className="text-sm text-right font-bold">
                                    {cardData.cardType === 'point'
                                        ? (`${cardData.pointsRewardAmount} AED`)
                                        : (`${cardData.rewardsCount} rewards`)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="px-4 pb-4 flex justify-center">
                        <div className="bg-white rounded-2xl p-4 text-center">
                            <QRCode
                                value={cardData.barcodeMessage || baseUrl}
                                size={48}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Android/Generic version with background image support
    return (
        <div className="relative transform hover:scale-105 transition-transform duration-300">
            <div
                className="rounded-xl p-4 shadow-xl text-white relative overflow-hidden"
                style={getBackgroundStyle()}
            >
                {/* Background overlay for better text readability when image is present */}
                {(cardData.backgroundImageUrl || cardData.backgroundImage) && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl"></div>
                )}

                {/* Card content with relative positioning to stay above overlay */}
                <div className="relative z-10">
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-base font-bold drop-shadow-lg">
                                {cardData.organizationName || cardData.title || 'Card Title'}
                            </h2>
                            <p className="text-xs opacity-90 drop-shadow">
                                {cardData.logoText || cardData.subtitle || 'Subtitle'}
                            </p>
                        </div>
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded backdrop-blur-sm flex items-center justify-center">
                            {(cardData.logoImageUrl || cardData.logoImage) ? (
                                <img
                                    src={getImageUrl(cardData.logoImageUrl || cardData.logoImage)}
                                    alt="Logo"
                                    className="w-6 h-6 object-contain rounded"
                                />
                            ) : (
                                <div className="w-3 h-3 bg-white bg-opacity-60 rounded"></div>
                            )}
                        </div>
                    </div>

                    {/* Points earning message for Android */}
                    {cardData.cardType === 'point' && (
                        <div className="mb-4 bg-black bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
                            <p className="text-xs opacity-90 drop-shadow mb-2">Earning Rule</p>
                            <p className="text-sm font-semibold text-center">
                                Spend {cardData.spendAmount || '100'} AED get {cardData.earnPoints || '100'} points
                            </p>
                        </div>
                    )}

                    {/* Stamp Collection Area for Android */}
                    {cardData.cardType !== 'point' && (
                        <div className="mb-4 bg-black bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
                            <p className="text-xs opacity-90 drop-shadow mb-2">Stamp Progress</p>
                            <div className="flex flex-wrap gap-1 justify-center">
                                {[...Array(Math.min(stampLayout.quantity, 10))].map((_, i) => {
                                    const isCollected = i < collectedStampsCount;
                                    return (
                                        <div key={i} className="w-6 h-6">
                                            {renderStamp(i, isCollected)}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Primary Field */}
                    {(cardData.primaryFields?.[0] || cardData.primaryField) && (
                        <div className="mb-4 bg-black bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
                            <p className="text-xs opacity-90 drop-shadow">
                                {cardData.primaryFields?.[0]?.label || cardData.primaryField}
                            </p>
                            <p className="text-lg font-bold drop-shadow-lg">
                                {cardData.primaryFields?.[0]?.value || cardData.primaryValue}
                            </p>
                        </div>
                    )}

                    {/* Secondary Fields */}
                    {(cardData.secondaryFields?.length > 0) && (
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            {cardData.secondaryFields.slice(0, 2).map((field, index) => (
                                <div key={index} className="bg-black bg-opacity-20 rounded-lg p-2 backdrop-blur-sm">
                                    <p className="text-xs opacity-90 drop-shadow">{field.label}</p>
                                    <p className="text-xs font-semibold drop-shadow">{field.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Auxiliary Fields */}
                    {(cardData.auxiliaryFields?.length > 0) && (
                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                            {cardData.auxiliaryFields.slice(0, 2).map((field, index) => (
                                <div key={index} className="bg-black bg-opacity-20 rounded-lg p-2 backdrop-blur-sm">
                                    <p className="opacity-90 drop-shadow">{field.label}</p>
                                    <p className="font-semibold drop-shadow">{field.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Barcode */}
                    <div className="mt-3 pt-2 border-t border-white border-opacity-30">
                        <div className="flex justify-center">
                            <div className="bg-white bg-opacity-95 rounded-lg p-3 shadow-lg backdrop-blur-sm">
                                {cardData.barcodeFormat === 'QR' || !cardData.barcodeFormat ? (
                                    <QRCode
                                        value={cardData.barcodeMessage || baseUrl}
                                        size={40}
                                    />
                                ) : (
                                    <div className="w-10 h-6 bg-gray-800 rounded grid grid-cols-4 gap-0.5 p-1">
                                        {[...Array(12)].map((_, i) => (
                                            <div key={i} className="bg-white rounded-sm" />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletCard;