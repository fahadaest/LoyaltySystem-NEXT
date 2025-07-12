import React from 'react';
import WalletCard from './WalletCard';

const IPhoneFrame = ({ cardData }) => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full max-w-[280px] max-h-[600px] aspect-[11/19.5] bg-black rounded-[2.5rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-gray-900 rounded-[2rem] relative overflow-hidden">
                {/* iPhone Notch */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10 shadow-inner" />

                {/* Screen Content */}
                <div className="pt-3 px-5 h-full bg-gray-100">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center mb-12 text-xs text-gray-900">
                        <span>9:41 AM</span>
                        <span>100%</span>
                    </div>

                    {/* Apple Wallet Card */}
                    <WalletCard cardData={cardData} platform="ios" />
                </div>
            </div>
        </div>
    </div>
);

export default IPhoneFrame;