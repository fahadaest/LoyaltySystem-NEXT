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
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 
                        ${hasError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-200 focus:border-brandGreen focus:ring-brandGreen dark:border-gray-600 group-hover:border-gray-300'
                        }  
                        focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white
                        transform ${disabled ? 'bg-gray-50 dark:bg-navy-700 cursor-not-allowed opacity-60' : 'cursor-pointer'}
                        text-gray-900 dark:text-white
                        
                        [&::-webkit-calendar-picker-indicator]:cursor-pointer
                        [&::-webkit-calendar-picker-indicator]:opacity-60
                        [&::-webkit-calendar-picker-indicator]:hover:opacity-100
                        [&::-webkit-calendar-picker-indicator]:transition-opacity
                        [&::-webkit-calendar-picker-indicator]:duration-200
                        [&::-webkit-calendar-picker-indicator]:w-5
                        [&::-webkit-calendar-picker-indicator]:h-5
                        
                        [&::-webkit-datetime-edit]:text-gray-900
                        [&::-webkit-datetime-edit]:dark:text-white
                        [&::-webkit-datetime-edit-text]:text-gray-400
                        [&::-webkit-datetime-edit-month-field]:text-gray-900
                        [&::-webkit-datetime-edit-month-field]:dark:text-white
                        [&::-webkit-datetime-edit-day-field]:text-gray-900
                        [&::-webkit-datetime-edit-day-field]:dark:text-white
                        [&::-webkit-datetime-edit-year-field]:text-gray-900
                        [&::-webkit-datetime-edit-year-field]:dark:text-white
                        
                        ${!hasValue ? '[&::-webkit-datetime-edit-text]:text-gray-400 [&::-webkit-datetime-edit-month-field]:text-gray-400 [&::-webkit-datetime-edit-day-field]:text-gray-400 [&::-webkit-datetime-edit-year-field]:text-gray-400' : ''}
                    `}
                    {...props}
                />

                {/* Focus Ring Animation */}
                <div className="absolute inset-0 rounded-xl bg-brandGreen opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
            </div>

            {/* Helper text when no value is selected */}
            {!hasValue && placeholder && (
                <div className="text-xs text-gray-500 dark:text-gray-400 animate-fadeIn">
                    {placeholder}
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

export default AnimatedDateInput;