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
    countryCode = '+971', // UAE default
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

    const hasError = !!error;
    const hasValue = value !== undefined && value !== null && value !== '';

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsOpen(false);
        if (onCountryChange) {
            onCountryChange(country.code);
        }
    };

    const handlePhoneChange = (e) => {
        const phoneNumber = e.target.value;
        onChange(phoneNumber);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Format phone number display
    const formatPhoneNumber = (number) => {
        // Remove all non-digits
        const cleaned = number.replace(/\D/g, '');

        // Add basic formatting based on length
        if (cleaned.length >= 10) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
        } else if (cleaned.length >= 6) {
            return cleaned.replace(/(\d{3})(\d{3})/, '$1 $2');
        } else if (cleaned.length >= 3) {
            return cleaned.replace(/(\d{3})/, '$1');
        }
        return cleaned;
    };

    return (
        <div className={`space-y-2 ${className}`}>
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

            {/* Phone Input Container */}
            <div className="relative group">
                <div className={`flex rounded-xl border-2 transition-all duration-200 overflow-hidden
                    ${hasError
                        ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500'
                        : 'border-gray-200 focus-within:border-brandGreen focus-within:ring-brandGreen dark:border-gray-600 group-hover:border-gray-300'
                    }  
                    focus-within:outline-none focus-within:ring-2 focus-within:ring-opacity-50 dark:bg-gray-700
                    transform`}>

                    {/* Country Code Selector */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2 px-3 py-3 bg-gray-50 dark:bg-gray-600 border-r border-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors duration-200"
                        >
                            <span className="text-lg">{selectedCountry.flag}</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {selectedCountry.code}
                            </span>
                            {isOpen ? <MdExpandLess size={16} /> : <MdExpandMore size={16} />}
                        </button>

                        {/* Country Dropdown */}
                        {isOpen && (
                            <div className="absolute top-full left-0 z-50 w-72 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                {countries.map((country) => (
                                    <button
                                        key={country.iso}
                                        type="button"
                                        onClick={() => handleCountrySelect(country)}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors duration-150"
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
                        type="tel"
                        value={value}
                        onChange={handlePhoneChange}
                        placeholder={placeholder}
                        className="flex-1 px-4 py-3 bg-transparent focus:outline-none dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        {...props}
                    />
                </div>

                {/* Focus Ring Animation */}
                <div className="absolute inset-0 rounded-xl bg-brandGreen opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
            </div>

            {/* Phone Format Preview */}
            {value && !hasError && (
                <div className="animate-fadeIn">
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <span className="text-brandGreen">📞</span>
                        Full number: {selectedCountry.code} {formatPhoneNumber(value)}
                    </p>
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
