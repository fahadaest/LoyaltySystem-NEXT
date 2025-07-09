import React from 'react';
import { ChevronLeft, Plus, CreditCard } from 'lucide-react';

const SelectionView = ({ isModal, onCreateFromScratch }) => (
    <div className={`${isModal ? 'h-[80vh]' : 'min-h-screen'} bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6`}>
        <div className="max-w-2xl w-full">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Wallet Card</h1>
                <p className="text-xl text-gray-600">Choose how you'd like to get started</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Create from Scratch */}
                <div
                    onClick={onCreateFromScratch}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-brandGreen"
                >
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-brandGreenGradient5 to-brandGreen rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                        <Plus className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Create from Scratch</h3>
                    <p className="text-gray-600 mb-5">Start with a blank canvas and design your wallet card exactly how you want it</p>
                    <div className="flex items-center text-brandGreen font-semibold group-hover:text-brandGreen">
                        Get Started
                        <ChevronLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* Choose from Template */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 opacity-75">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl mb-5">
                        <CreditCard className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Choose from Template</h3>
                    <p className="text-gray-600 mb-5">Select from pre-designed templates to get started quickly</p>
                    <div className="flex items-center text-gray-400 font-semibold">Coming Soon</div>
                </div>
            </div>
        </div>
    </div>
);

export default SelectionView;