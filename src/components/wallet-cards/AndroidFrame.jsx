import React from 'react';
import WalletCard from './WalletCard';

const AndroidFrame = ({ cardData }) => (
    <div className="w-62 h-full max-h-full bg-black rounded-[1.5rem] p-2 shadow-2xl">
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

                {/* Android Card */}
                <WalletCard cardData={cardData} platform="android" />
            </div>
        </div>
    </div>
);

export default AndroidFrame;