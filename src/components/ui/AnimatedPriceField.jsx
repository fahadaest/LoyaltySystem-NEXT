'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { createPortal } from 'react-dom';

const AnimatedPriceField = ({
    label,
    icon: Icon,
    error,
    value,
    currency = 'AED',
    onPriceChange,
    onCurrencyChange,
    placeholder = '0.00',
    required = false,
    disabled = false,
    className = '',
    step = '0.01',
    min = '0',
    ...props
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const dropdownRef = useRef(null);
    const hasError = !!error;
    const hasValue = value !== undefined && value !== null && value !== '';

    // Common currencies with their symbols
    const currencies = [
        { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'GBP', symbol: '£', name: 'British Pound' },
        { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
        { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal' },
        { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
        { code: 'BHD', symbol: 'د.ب', name: 'Bahraini Dinar' },
        { code: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial' },
        { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
        { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
        { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
        { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
        { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
        { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    ];

    const selectedCurrency = currencies.find(curr => curr.code === currency) || currencies[0];

    const handlePriceChange = (e) => {
        const newValue = e.target.value;
        onPriceChange(newValue);
    };

    const handleCurrencySelect = (currencyCode) => {
        onCurrencyChange(currencyCode);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        if (!disabled) {
            if (!isDropdownOpen && dropdownRef.current) {
                const rect = dropdownRef.current.getBoundingClientRect();
                setDropdownPosition({
                    top: rect.bottom + window.scrollY + 4,
                    left: rect.left + window.scrollX,
                    width: 256 // w-64 = 16rem = 256px
                });
            }
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    return (
        <div className={`space-y-2 relative ${className}`}>
            {/* Label with Icon */}
            <div className="flex items-center gap-2">
                {Icon && <Icon size={16} className="text-brandGreen" />}
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {hasValue && (
                    <div className="flex items-center animate-fadeIn">
                        <div className="w-2 h-2 bg-brandGreen rounded-full mr-1 animate-pulse"></div>
                        <span className="text-xs text-brandGreen font-medium">✓</span>
                    </div>
                )}
            </div>

            {/* Combined Currency and Price Input */}
            <div className="relative group">
                <div className={`flex w-full rounded-xl border-2 transition-all duration-200 overflow-hidden
                    ${hasError
                        ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500'
                        : 'border-gray-200 focus-within:border-brandGreen focus-within:ring-brandGreen dark:border-gray-600 group-hover:border-gray-300'
                    }
                    focus-within:outline-none focus-within:ring-2 focus-within:ring-opacity-50
                    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
                `}>

                    {/* Currency Selector */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={toggleDropdown}
                            disabled={disabled}
                            className={`flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-600 border-r border-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors duration-200 min-w-[100px]
                                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                            `}
                        >
                            <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                                {selectedCurrency.symbol}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {selectedCurrency.code}
                            </span>
                            <ChevronDown
                                size={16}
                                className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Price Input */}
                    <input
                        type="number"
                        value={value || ''}
                        onChange={handlePriceChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        step={step}
                        min={min}
                        className="flex-1 px-4 py-3 bg-transparent focus:outline-none dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        {...props}
                    />
                </div>

                {/* Focus Ring Animation */}
                <div className="absolute inset-0 rounded-xl bg-brandGreen opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
            </div>

            {/* Formatted Price Display */}
            {hasValue && value && (
                <div className="text-xs text-gray-600 dark:text-gray-400 animate-fadeIn">
                    <span className="font-medium">
                        {selectedCurrency.symbol} {parseFloat(value).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })} {selectedCurrency.code}
                    </span>
                </div>
            )}

            {/* Error Message */}
            {hasError && (
                <div className="animate-slideDown">
                    <p className="text-sm text-red-500 flex items-center gap-2">
                        <svg className="w-4 h-4 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                </div>
            )}

            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-[9998]"
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}

            {isDropdownOpen && !disabled && typeof window !== 'undefined' && createPortal(
                <div
                    className="fixed bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl z-[9999] max-h-60 overflow-y-auto"
                    style={{
                        top: dropdownPosition.top,
                        left: dropdownPosition.left,
                        width: dropdownPosition.width
                    }}
                >
                    {currencies.map((curr) => (
                        <button
                            key={curr.code}
                            type="button"
                            onClick={() => handleCurrencySelect(curr.code)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150
                                ${currency === curr.code ? 'bg-brandGreen/10 text-brandGreen dark:bg-brandGreen/20' : 'text-gray-700 dark:text-gray-200'}
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-medium text-sm">{curr.symbol}</span>
                                <div>
                                    <div className="text-sm font-medium">{curr.code}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{curr.name}</div>
                                </div>
                            </div>
                            {currency === curr.code && (
                                <span className="text-brandGreen">✓</span>
                            )}
                        </button>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
};

export default AnimatedPriceField;