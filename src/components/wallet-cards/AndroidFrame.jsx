import React from 'react';
import WalletCard from './WalletCard';

const AndroidFrame = ({ cardData }) => (
    <div className="w-62 h-[500px] bg-black rounded-[1.5rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-black rounded-[1rem] relative overflow-hidden">
            {/* Android Status Bar */}
            <div className="bg-black px-4 py-1">
                <div className="flex justify-between items-center text-xs text-white">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                            <div className="w-1 h-3 bg-white rounded-full" />
                            <div className="w-1 h-3 bg-white rounded-full" />
                            <div className="w-1 h-3 bg-white rounded-full opacity-50" />
                            <div className="w-1 h-3 bg-white rounded-full opacity-30" />
                        </div>
                        <span>100%</span>
                    </div>
                </div>
            </div>

            {/* Screen Content */}
            <div className="pt-12 px-5 h-full bg-white">
                {/* Google Pay Header */}
                <div className="flex items-center justify-center mb-4">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-bold">G</span>
                    </div>
                    <h1 className="text-lg font-bold text-gray-900">Google Wallet</h1>
                </div>

                {/* Android Card */}
                <WalletCard cardData={cardData} platform="android" />
            </div>
        </div>
    </div>
);

export default AndroidFrame;