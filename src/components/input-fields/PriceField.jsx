import React from "react";

const PriceField = ({ label, name, value, onChange, placeholder, required = false, error = "" }) => {
    return (
        <div>
            <label className="text-[10px] font-medium text-black mb-2 block">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                <div className="absolute left-1 top-1 bottom-1 bg-gray-200 rounded-full px-3 flex items-center z-10">
                    <span className="text-[10px] font-medium text-black">AED</span>
                    <div className="ml-1 w-4 h-4 bg-black rounded-full flex items-center justify-center">
                        <svg width="5" height="7" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5.5 4.5L1 8" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full h-[32px] bg-white border border-gray-200 rounded-full pl-20 pr-3 text-[10px] text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            {error && (
                <span className="text-red-500 text-[9px] mt-1 block">{error}</span>
            )}
        </div>
    );
};

export default PriceField;