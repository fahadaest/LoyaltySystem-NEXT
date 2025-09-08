import React from 'react';

const BannerPreview = ({
    bannerTitle = '',
    titleColor = '#2F45F2',
    backgroundColor = '#4F45E3',
    backgroundImage = null,
    backgroundImg = null, // Logo
    icon1 = null,
    icon2 = null,
    icon3 = null,
    text1 = '',
    text2 = '',
    text3 = '',
    showContainer = true,
    containerClassName = '',
    bannerClassName = '',
    // Default text values
    defaultTitle = 'Buy 4 Matcha Latte and get 2 FREE',
    defaultText1 = 'Scan QR with your mobile phone',
    defaultText2 = 'Download the Point Pass to your mobile',
    defaultText3 = 'Enter your promotion code',
    // Footer text customization
    footerTitle = 'Powered by RewardHive www.codehive.com',
    footerText = 'Compatible with iPhone and Android devices. Apple users will need to download Apple Wallet, and Android users will need the supporting app'
}) => {
    const BannerContent = () => (
        <div
            className={`bg-black rounded-3xl overflow-hidden shadow-2xl ${bannerClassName}`}
            style={{
                width: '100%',
                maxWidth: '433px',
                aspectRatio: '433/615',
                minWidth: '200px' // Minimum width to prevent too small on mobile
            }}
        >
            {/* Top Section - Proportional height */}
            <div
                className="px-6 py-8 text-white relative"
                style={{
                    backgroundColor: backgroundColor,
                    height: '25.7%' // 158px out of 615px = 25.7%
                }}
            >
                <div className="flex justify-between items-start h-full">
                    <div className="flex-1">
                        {backgroundImg && (
                            <img
                                src={backgroundImg}
                                alt="Logo"
                                className="rounded"
                                style={{
                                    width: 'clamp(30px, 11.5%, 50px)', // Responsive width
                                    height: 'auto',
                                    aspectRatio: '50/46',
                                    objectFit: 'contain'
                                }}
                            />
                        )}
                        <h2
                            className="font-bold leading-tight mb-2 mt-2"
                            style={{
                                color: titleColor,
                                fontSize: 'clamp(0.875rem, 5.5vw, 1.5rem)', // Responsive font size
                                lineHeight: '1.45',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical'
                            }}
                        >
                            {bannerTitle || defaultTitle}
                        </h2>
                    </div>
                    <div className="bg-white rounded-2xl p-3 ml-4 flex-shrink-0">
                        <div
                            className="bg-gray-200 rounded-lg flex items-center justify-center"
                            style={{
                                width: 'clamp(60px, 24.7%, 107px)', // Responsive QR code size
                                aspectRatio: '1/1'
                            }}
                        >
                            <div className="grid grid-cols-3 gap-1">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Image Section - Proportional height */}
            <div
                className="bg-gray-200 relative"
                style={{
                    height: '42.3%' // 260px out of 615px = 42.3%
                }}
            >
                {backgroundImage ? (
                    <img
                        src={backgroundImage}
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
                        <div className="text-green-800 text-center">
                            <div
                                className="bg-white rounded-full mx-auto mb-2 shadow-lg flex items-center justify-center"
                                style={{
                                    width: 'clamp(48px, 20%, 96px)',
                                    aspectRatio: '1/1'
                                }}
                            >
                                <div
                                    className="bg-green-500 rounded-full"
                                    style={{
                                        width: '66.7%',
                                        aspectRatio: '1/1'
                                    }}
                                ></div>
                            </div>
                            <p style={{ fontSize: 'clamp(0.625rem, 3vw, 0.875rem)' }} className="font-medium">Matcha Latte</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Section - Proportional height */}
            <div
                className="px-6 py-6"
                style={{
                    backgroundColor: backgroundColor,
                    height: '32%' // 197px out of 615px = 32%
                }}
            >
                <div className="grid grid-cols-3 gap-4 mb-4 h-3/5">
                    <div className="text-center flex flex-col items-center">
                        <div
                            className="bg-white rounded-lg mx-auto mb-2 flex items-center justify-center flex-shrink-0"
                            style={{
                                width: 'clamp(16px, 4.8%, 21px)',
                                aspectRatio: '21/20'
                            }}
                        >
                            {icon1 ? (
                                <img src={icon1} alt="Icon 1" className="w-4/5 h-4/5 object-contain" />
                            ) : (
                                <div className="w-4/5 h-4/5 bg-gray-600 rounded"></div>
                            )}
                        </div>
                        <p
                            className="text-white text-center flex-1 overflow-hidden"
                            style={{
                                fontSize: 'clamp(0.5rem, 2.3vw, 0.625rem)',
                                lineHeight: '1.3',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical'
                            }}
                        >
                            {text1 || defaultText1}
                        </p>
                    </div>
                    <div className="text-center flex flex-col items-center">
                        <div
                            className="bg-white rounded-lg mx-auto mb-2 flex items-center justify-center flex-shrink-0"
                            style={{
                                width: 'clamp(16px, 4.6%, 20px)',
                                aspectRatio: '1/1'
                            }}
                        >
                            {icon2 ? (
                                <img src={icon2} alt="Icon 2" className="w-4/5 h-4/5 object-contain" />
                            ) : (
                                <div className="w-4/5 h-4/5 bg-yellow-500 rounded-full"></div>
                            )}
                        </div>
                        <p
                            className="text-white text-center flex-1 overflow-hidden"
                            style={{
                                fontSize: 'clamp(0.5rem, 2.3vw, 0.625rem)',
                                lineHeight: '1.3',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical'
                            }}
                        >
                            {text2 || defaultText2}
                        </p>
                    </div>
                    <div className="text-center flex flex-col items-center">
                        <div
                            className="bg-white rounded-lg mx-auto mb-2 flex items-center justify-center flex-shrink-0"
                            style={{
                                width: 'clamp(16px, 4.6%, 20px)',
                                aspectRatio: '1/1'
                            }}
                        >
                            {icon3 ? (
                                <img src={icon3} alt="Icon 3" className="w-4/5 h-4/5 object-contain" />
                            ) : (
                                <div className="w-4/5 h-4/5 bg-orange-500 rounded"></div>
                            )}
                        </div>
                        <p
                            className="text-white text-center flex-1 overflow-hidden"
                            style={{
                                fontSize: 'clamp(0.5rem, 2.3vw, 0.625rem)',
                                lineHeight: '1.3',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical'
                            }}
                        >
                            {text3 || defaultText3}
                        </p>
                    </div>
                </div>

                <div className="text-center h-2/5 flex flex-col justify-center">
                    <p
                        className="font-semibold text-black mb-1"
                        style={{
                            fontSize: 'clamp(0.5rem, 2.3vw, 0.625rem)',
                            lineHeight: '1.3'
                        }}
                    >
                        {footerTitle}
                    </p>
                    <p
                        className="text-black opacity-90 overflow-hidden"
                        style={{
                            fontSize: 'clamp(0.5rem, 2.3vw, 0.625rem)',
                            lineHeight: '1.3',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}
                    >
                        {footerText}
                    </p>
                </div>
            </div>
        </div>
    );

    // If showContainer is false, return just the banner content
    if (!showContainer) {
        return <BannerContent />;
    }

    // Return banner with container
    return (
        <div className={`bg-white border border-gray-300 rounded-3xl shadow-lg flex items-center justify-center ${containerClassName}`}>
            <BannerContent />
        </div>
    );
};

export default BannerPreview;