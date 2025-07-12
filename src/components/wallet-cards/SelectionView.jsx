import React from 'react';
import { ChevronLeft, Plus, CreditCard } from 'lucide-react';

const SelectionView = ({ isModal, onCreateFromScratch }) => (
    <div className={`${isModal ? 'h-full' : 'min-h-screen'} bg-white flex items-center justify-center p-4`}>
        <div className="max-w-lg w-full py-14">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Wallet Card</h1>
                <p className="text-sm text-gray-600">Choose how you'd like to get started</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Create from Scratch */}
                <div
                    onClick={onCreateFromScratch}
                    className="group bg-white rounded-xl p-4 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-brandGreen"
                >
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-brandGreenGradient5 to-brandGreen rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Plus className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Create from Scratch</h3>
                    <p className="text-gray-600 text-sm mb-3">Start with a blank canvas and design your wallet card</p>
                    <div className="flex items-center text-brandGreen font-semibold text-sm group-hover:text-brandGreen">
                        Get Started
                        <ChevronLeft className="w-3 h-3 ml-1 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* Choose from Template */}
                <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-200 opacity-75">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl mb-3">
                        <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Choose from Template</h3>
                    <p className="text-gray-600 text-sm mb-3">Select from pre-designed templates to get started quickly</p>
                    <div className="flex items-center text-gray-400 font-semibold text-sm">Coming Soon</div>
                </div>
            </div>
        </div>
    </div>
);

export default SelectionView;