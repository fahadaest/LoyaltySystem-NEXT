'use client';
import { countries } from "utils/countryCode";
import React, { useState, useRef, useEffect } from 'react';
import { MdExpandMore, MdExpandLess, MdPhone } from 'react-icons/md';

const AnimatedPhoneInput = ({
    label = 'Phone Number',
    icon: Icon = MdPhone,
    error,
    value = '',
    onChange,
    countryCode = '+971',
    onCountryChange,
    placeholder = 'Enter phone number',
    required = false,
    className = '',
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(
        countries.find(c => c.code === countryCode) || countries[0]
    );
    const dropdownRef = useRef(null);
    const containerRef = useRef(null);

    const hasError = !!error;
    const hasValue = value !== undefined && value !== null && value !== '';

    // Check if phone number length is valid (9, 10, or 11 digits)
    const isValidLength = value && /^\d{9}$|^\d{10}$|^\d{11}$/.test(value);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsOpen(false);
        if (onCountryChange) {
            onCountryChange(country.code);
        }
    };
    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        // Remove all non-numeric characters
        const numericValue = inputValue.replace(/\D/g, '');
        // Limit to maximum 11 digits
        const limitedValue = numericValue.slice(0, 11);
        onChange(limitedValue);
    };

    // Handle paste events to filter out non-numeric characters
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        const numericText = pastedText.replace(/\D/g, '');
        const limitedText = numericText.slice(0, 11);
        onChange(limitedText);
    };

    // Prevent non-numeric key input
    const handleKeyPress = (e) => {
        // Allow backspace, delete, tab, escape, enter
        if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
            // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true)) {
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Format phone number display
    const formatPhoneNumber = (number) => {
        // Only format if it's a valid length
        if (!number || !/^\d{9}$|^\d{10}$|^\d{11}$/.test(number)) {
            return number;
        }

        if (number.length === 11) {
            return number.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
        } else if (number.length === 10) {
            return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
        } else if (number.length === 9) {
            return number.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
        }
        return number;
    };

    return (
        <div className={`space-y-2 relative ${className}`} ref={containerRef}>
            {/* Label with Icon */}
            <div className="flex items-center gap-2">
                {Icon && <Icon size={16} className="text-brandGreen" />}
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {isValidLength && (
                    <div className="flex items-center animate-fadeIn">
                        <div className="w-2 h-2 bg-brandGreen rounded-full mr-1 animate-pulse"></div>
                        <span className="text-xs text-brandGreen font-medium">✓</span>
                    </div>
                )}
            </div>

            {/* Phone Input Container */}
            <div className="relative group" style={{ zIndex: 1000 }}>
                <div className={`flex rounded-xl border-2 transition-all duration-200 relative
                    ${hasError
                        ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500'
                        : 'border-gray-200 focus-within:border-brandGreen focus-within:ring-brandGreen dark:border-gray-600 group-hover:border-gray-300'
                    }  
                    focus-within:outline-none focus-within:ring-2 focus-within:ring-opacity-50 dark:bg-gray-700
                    transform`} data-phone-input>

                    {/* Country Code Selector */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2 px-3 py-3 bg-gray-50 dark:bg-gray-600 border-r border-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors duration-200 rounded-l-xl"
                        >
                            <span className="text-lg">{selectedCountry.flag}</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {selectedCountry.code}
                            </span>
                            {isOpen ? <MdExpandLess size={16} /> : <MdExpandMore size={16} />}
                        </button>

                        {/* Country Dropdown */}
                        {isOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-[99999]"
                                style={{
                                    // Fallback positioning
                                    position: 'absolute',
                                }}
                            >
                                {countries.map((country) => (
                                    <button
                                        key={country.iso}
                                        type="button"
                                        onClick={() => handleCountrySelect(country)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl ${selectedCountry.iso === country.iso ? 'bg-brandGreen bg-opacity-10 border-r-2 border-brandGreen' : ''
                                            }`}
                                    >
                                        <span className="text-lg">{country.flag}</span>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[3rem]">
                                            {country.code}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {country.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Phone Number Input */}
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={value}
                        onChange={handlePhoneChange}
                        onPaste={handlePaste}
                        onKeyDown={handleKeyPress}
                        placeholder={placeholder}
                        maxLength={11}
                        className="flex-1 px-4 py-3 bg-transparent focus:outline-none dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-r-xl"
                        {...props}
                    />
                </div>

                {/* Focus Ring Animation */}
                <div className="absolute inset-0 rounded-xl bg-brandGreen opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
            </div>

            {/* Single feedback section to avoid overlapping */}
            {hasValue && (
                <div className="mt-2 space-y-1">
                    {/* Character count */}
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">
                            {value.length}/11 digits
                        </span>
                        {isValidLength ? (
                            <span className="text-brandGreen">✓ Valid</span>
                        ) : value.length > 0 ? (
                            <span className="text-orange-500">Must be 9, 10, or 11 digits</span>
                        ) : null}
                    </div>

                    {/* Phone Format Preview or Length Guide */}
                    {isValidLength && !hasError ? (
                        <div className="animate-fadeIn">
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <span className="text-brandGreen">📞</span>
                                Full number: {selectedCountry.code} {formatPhoneNumber(value)}
                            </p>
                        </div>
                    ) : !isValidLength && !hasError ? (
                        <div className="animate-fadeIn">
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <span className="text-orange-500">ℹ️</span>
                                Phone number should be 9-11 digits (9: some mobile, 10: standard, 11: with country prefix)
                            </p>
                        </div>
                    ) : null}
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
        </div>
    );
};

export default AnimatedPhoneInput;