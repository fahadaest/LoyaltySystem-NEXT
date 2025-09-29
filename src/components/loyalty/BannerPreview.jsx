import React, { useRef, useEffect, useState } from 'react';

const BannerPreview = ({
    bannerTitle = '',
    titleColor = '#2F45F2',
    backgroundColor = '#4F45E3',
    backgroundImage = null,
    backgroundImg = null,
    icon1 = null,
    icon2 = null,
    icon3 = null,
    text1 = '',
    text2 = '',
    text3 = '',
    showContainer = true,
    containerClassName = '',
    bannerClassName = '',
    defaultTitle = 'Your Loyalty Program title here',
    defaultText1 = 'Scan QR with your mobile phone',
    defaultText2 = 'Download the Point Pass to your mobile',
    defaultText3 = 'Enter your promotion code',
    footerTitle = 'Powered by RewardHive www.codehive.com',
    footerText = 'Compatible with iPhone and Android devices. Apple users will need to download Apple Wallet, and Android users will need the supporting app'
}) => {
    const titleRef = useRef(null);
    const [fontSize, setFontSize] = useState('1.2rem');

    useEffect(() => {
        if (titleRef.current && bannerTitle) {
            const element = titleRef.current;
            let currentSize = 1.3; // Initial bara size: 1rem se start

            element.style.fontSize = `${currentSize}rem`;

            const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
            const maxHeight = lineHeight * 2;

            while (element.scrollHeight > maxHeight && currentSize > 0.5) {
                currentSize -= 0.05;
                element.style.fontSize = `${currentSize}rem`;
            }

            setFontSize(`${currentSize}rem`);
        }
    }, [bannerTitle]);

    const BannerContent = () => (
        <div className={`bg-black rounded-3xl border-4 overflow-hidden shadow-2xl ${bannerClassName}`} style={{ borderColor: backgroundColor, width: '100%', maxWidth: '433px', aspectRatio: '433/615', minWidth: '200px', overflow: 'hidden' }}>
            {/* Top Section - Proportional height */}
            <div className="px-3 py-3 text-white overflow-hidden" style={{ backgroundColor: backgroundColor, height: '25.7%' }}>

                <div className="flex justify-between items-start h-full gap-2">
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                        <img
                            src="/img/general/profile_green.svg"
                            alt="Profile image"
                            style={{
                                width: '35px',
                                height: '35px',
                                minWidth: '35px',
                                minHeight: '35px',
                                flexShrink: 0
                            }}
                            className="object-contain rounded-lg"
                        />
                        <h2
                            ref={titleRef}
                            className="font-bold leading-tight"
                            style={{
                                color: titleColor,
                                fontSize: fontSize,
                                lineHeight: '1.2',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,  // Maximum 2 lines
                                WebkitBoxOrient: 'vertical',
                                wordBreak: 'break-word',
                                maxWidth: '100%'
                            }}
                        >
                            {bannerTitle || defaultTitle}
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl p-2 flex-shrink-0"
                        style={{
                            width: '5.5rem',
                            height: '5.5rem',
                            minWidth: '5.5rem',
                            minHeight: '5.5rem'
                        }}>
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                            <img
                                src="/img/general/QR.png"
                                alt="QR Code"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Middle Image Section - Proportional height */}
            <div className="bg-gray-200 relative w-full" style={{ height: '42.3%' }}>
                {backgroundImage ? (
                    <img
                        src={backgroundImage}
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <img
                        src="/img/loyalty/banner_placeholder.png"
                        alt="QR Code"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* Bottom Section - Proportional height */}
            <div className="" style={{
                backgroundColor: "#FFFFFF",
                height: '32%'
            }} >

                <div className="flex gap-2 w-full p-4">
                    {/* First Step */}
                    <div className="flex flex-col items-center flex-1 h-16 border border-black rounded-xl p-2 bg-white relative overflow-hidden">
                        <div className="flex flex-col gap-1 items-start justify-center h-full w-full">
                            <div className="w-4 h-4 mb-1 flex items-center justify-center flex-shrink-0">
                                {icon1 ? (
                                    <img src={icon1} alt="QR Scan" className="w-full h-full object-contain" />
                                ) : (
                                    <img
                                        src="/img/loyalty/banner_scan.svg"
                                        alt="QR Code"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <p className="text-black text-left font-normal font-['Poppins'] overflow-hidden"
                                style={{
                                    fontSize: 'clamp(7px, 1.5vw, 0.5rem)',
                                    lineHeight: '1.2',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                }}>
                                {text1 || defaultText1}
                            </p>
                        </div>
                    </div>

                    {/* Second Step */}
                    <div className="flex flex-col items-center flex-1 h-16 border border-black rounded-xl p-2 bg-white relative overflow-hidden">
                        <div className="flex flex-col gap-1 items-start justify-center h-full w-full">
                            <div className="w-4 h-4 mb-1 flex items-center justify-center flex-shrink-0">
                                {icon2 ? (
                                    <img src={icon2} alt="Star" className="w-full h-full object-contain" />
                                ) : (
                                    <img
                                        src="/img/loyalty/banner_star.svg"
                                        alt="QR Code"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <p className="text-black text-left font-normal font-['Poppins'] overflow-hidden"
                                style={{
                                    fontSize: 'clamp(7px, 1.5vw, 0.4rem)',
                                    lineHeight: '1.2',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                }}>
                                {text2 || defaultText2}
                            </p>
                        </div>
                    </div>

                    {/* Third Step */}
                    <div className="flex flex-col items-center flex-1 h-16 border border-black rounded-xl p-2 bg-white relative overflow-hidden">
                        <div className="flex flex-col gap-1 items-start justify-center h-full w-full">
                            <div className="w-4 h-4 mb-1 flex items-center justify-center flex-shrink-0">
                                {icon3 ? (
                                    <img src={icon3} alt="Coffee" className="w-full h-full object-contain" />
                                ) : (
                                    <img
                                        src="/img/loyalty/banner_promotion.svg"
                                        alt="QR Code"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <p className="text-black text-left font-normal font-['Poppins'] overflow-hidden"
                                style={{
                                    fontSize: 'clamp(7px, 1.5vw, 0.5rem)',
                                    lineHeight: '1.2',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                }}>
                                {text3 || defaultText3}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center flex flex-col justify-center">
                    <p
                        className="font-semibold text-black mb-1"
                        style={{
                            fontSize: 'clamp(0.5rem, 2.3vw, 0.525rem)',
                            lineHeight: '1.3'
                        }}
                    >
                        {footerTitle}
                    </p>
                    <p
                        className="w-[90%] mx-auto text-black opacity-90 overflow-hidden"
                        style={{
                            fontSize: 'clamp(0.5rem, 2.3vw, 0.30rem)',
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