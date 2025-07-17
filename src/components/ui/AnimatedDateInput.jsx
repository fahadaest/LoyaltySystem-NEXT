'use client';

import React from 'react';

const AnimatedDateInput = ({
    label,
    icon: Icon,
    error,
    value,
    onChange,
    placeholder = '',
    required = false,
    disabled = false,
    className = '',
    min,
    max,
    ...props
}) => {
    const hasError = !!error;
    const hasValue = value !== undefined && value !== null && value !== '';

    const handleChange = (e) => {
        onChange(e.target.value);
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

            {/* Date Input Field */}
            <div className="relative group">
                <input
                    type="date"
                    value={value || ''}
                    onChange={handleChange}
                    disabled={disabled}
                    min={min}
                    max={max}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 
                        ${hasError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-200 focus:border-brandGreen focus:ring-brandGreen dark:border-gray-600 group-hover:border-gray-300'
                        }  
                        focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white
                        transform ${disabled ? 'bg-gray-50 dark:bg-navy-700 cursor-not-allowed opacity-60' : 'cursor-pointer'}
                        
                        [&::-webkit-calendar-picker-indicator]:cursor-pointer
                        [&::-webkit-calendar-picker-indicator]:bg-brandGreen
                        [&::-webkit-calendar-picker-indicator]:rounded-md
                        [&::-webkit-calendar-picker-indicator]:p-1
                        [&::-webkit-calendar-picker-indicator]:hover:bg-brandGreenDark
                        [&::-webkit-calendar-picker-indicator]:transition-colors
                        [&::-webkit-calendar-picker-indicator]:duration-200
                        
                        ${!hasValue ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}
                    `}
                    {...props}
                />

                {/* Custom placeholder when no value */}
                {!hasValue && placeholder && (
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none text-sm">
                        {placeholder}
                    </div>
                )}

                {/* Focus Ring Animation */}
                <div className="absolute inset-0 rounded-xl bg-brandGreen opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>

                {/* Custom calendar icon overlay */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                        className={`w-5 h-5 transition-colors duration-200 ${hasValue ? 'text-brandGreen' : 'text-gray-400 dark:text-gray-500'
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </div>
            </div>

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

export default AnimatedDateInput;