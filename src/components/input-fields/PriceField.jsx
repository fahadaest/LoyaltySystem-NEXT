import React, { useState, useRef, useEffect } from "react";

const PriceField = ({ label, name, value, onChange, placeholder, required = false, error = "" }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("AED");
    const dropdownRef = useRef(null);

    const currencies = [
        { code: "AED", name: "UAE Dirham" },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency.code);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <label className="text-[10px] font-medium text-black mb-2 block">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative" ref={dropdownRef}>
                <div
                    className="absolute left-1 top-1 bottom-1 bg-gray-200 rounded-full pl-3 pr-1.5 flex items-center z-20 cursor-pointer"
                    onClick={toggleDropdown}
                >
                    <span className="text-[10px] font-medium text-black">{selectedCurrency}</span>
                    <div
                        className="ml-4 w-4 h-4 bg-black rounded-full flex items-center justify-center transition-transform duration-200"
                        style={{
                            transform: isDropdownOpen ? 'rotate(-90deg)' : 'rotate(90deg)'
                        }}
                    >
                        <img
                            src="/img/general/arrow_right_white.svg"
                            alt="Arrow"
                            className="w-[5px] h-[7px]"
                        />
                    </div>
                </div>

                {/* Dropdown Menu - Made smaller with scrolling */}
                {isDropdownOpen && (
                    <div className="absolute top-full left-1 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 w-[100px] max-h-[120px] overflow-y-auto">
                        {currencies.map((currency) => (
                            <div
                                key={currency.code}
                                className="px-2 py-1.5 text-[9px] hover:bg-gray-50 cursor-pointer flex flex-col border-b border-gray-100 last:border-b-0"
                                onClick={() => handleCurrencySelect(currency)}
                            >
                                <span className="font-medium text-black">{currency.code}</span>
                                <span className="text-gray-500 text-[8px] leading-tight">{currency.name}</span>
                            </div>
                        ))}
                    </div>
                )}

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