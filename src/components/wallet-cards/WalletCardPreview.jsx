import React from 'react';

const LOYALTY_TYPES = {
    PRODUCT: 'product',
    POINTS: 'points'
};

const WalletCardPreview = ({
    loyaltyType = LOYALTY_TYPES.PRODUCT,
    backgroundColor = '#007042',
    backgroundImg = null,
    backgroundTitle = '',
    collectedStampImg = null,
    uncollectedStampImg = null,
    rewardTitle = 'Reward Hive'
}) => {
    const sampleData = {
        customerName: 'CUSTOMER NAME',
        businessName: 'STARBUCKS',
        stampsText: 'STAMPS',
        currentStamps: 6,
        totalStamps: 10,
        rewardText: 'AVAILABLE REWARD',
        pointsEarned: 0
    };

    return (
        <div className="w-full flex justify-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div
                className="relative overflow-hidden shadow-lg border border-gray-200"
                style={{
                    backgroundColor: backgroundColor,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '350px',
                    width: '250px',
                    borderRadius: '18px',
                    transform: 'scale(1)',
                }}
            >
                {/* Header Section */}
                <div className="absolute top-[10px] left-[10px] right-[10px] flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                            <img
                                src="/img/general/profile_green.svg"
                                alt="Profile image"
                                className="w-8 h-8 object-contain rounded-lg"
                            />
                        </div>
                        <div className="text-white font-medium text-[13px] tracking-wider">
                            {sampleData.businessName}
                        </div>
                    </div>

                    <div className="text-right text-white">
                        <div
                            className="leading-[15px] opacity-100"
                            style={{ fontSize: '10px', fontWeight: 400 }}
                        >
                            {sampleData.stampsText}
                        </div>
                        <div
                            className="leading-[18px]"
                            style={{ fontSize: '13px', fontWeight: 400 }}
                        >
                            {sampleData.currentStamps}/{sampleData.totalStamps}
                        </div>
                    </div>
                </div>

                {/* Stamps Grid - Single Row */}
                <div className="absolute bg-pink-100 top-[55px] left-0 right-0 overflow-hidden"
                    style={{
                        backgroundImage: backgroundImg ? `url(${backgroundImg})` : 'url(/img/loyalty/card_background_image.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>

                    <div className="relative z-10 px-2 py-6 flex items-center justify-center" style={{ height: '100px' }}>
                        <div className="grid grid-cols-5 gap-[8px]">
                            {Array.from({ length: sampleData.totalStamps }, (_, index) => (
                                <div
                                    key={index}
                                    className="relative"
                                    style={{
                                        width: '32px',
                                        height: '32px'
                                    }}
                                >
                                    <div
                                        className="w-full h-full rounded-full flex items-center justify-center"
                                        style={{
                                            border: index < sampleData.currentStamps ? '2px solid #FFFFFF' : '2px solid rgba(255, 255, 255, 0.3)',
                                        }}
                                    >
                                        {index < sampleData.currentStamps ? (
                                            collectedStampImg ? (
                                                <img
                                                    src={collectedStampImg}
                                                    alt="Collected stamp"
                                                    className="w-5 h-5 object-cover rounded-full"
                                                />
                                            ) : (
                                                <div className="w-5 h-5 bg-white rounded-full opacity-90 flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                                                </div>
                                            )
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>



                {/* Footer Section */}
                <div className="absolute bottom-[150px] left-[12px] right-[12px]">
                    <div className="flex justify-between items-end text-white">
                        <div>
                            <div
                                className="text-white opacity-100 leading-[15px]"
                                style={{ fontSize: '10px', fontWeight: 400 }}
                            >
                                {sampleData.customerName}
                            </div>
                            <div
                                className="text-white leading-[18px]"
                                style={{ fontSize: '13px', fontWeight: 500 }}
                            >
                                {rewardTitle}
                            </div>
                        </div>
                        <div className="text-right">
                            <div
                                className="text-white opacity-100 leading-[15px]"
                                style={{ fontSize: '10px', fontWeight: 400 }}
                            >
                                {sampleData.rewardText}
                            </div>
                            <div
                                className="text-white leading-[18px]"
                                style={{ fontSize: '13px', fontWeight: 500 }}
                            >
                                {sampleData.pointsEarned}
                            </div>
                        </div>
                    </div>
                </div>

                {/* QR Code */}
                <div className="absolute bottom-[25px] left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col items-center">
                        <div
                            className="bg-white flex flex-col items-center justify-center"
                            style={{
                                width: '95px',
                                height: '105px',
                                borderRadius: '4px'
                            }}
                        >
                            <div className="w-full h-full flex items-center justify-center rounded-[14px]">
                                <div className="w-[5rem] h-[5rem] rounded-sm">
                                    <img
                                        src="/img/general/QR.png"
                                        alt="QR Code"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            <div className=" text-center text-gray-700 text-[0.6rem] font-mono">
                                00_00_00
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default WalletCardPreview;