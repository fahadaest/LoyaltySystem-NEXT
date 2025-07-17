'use client';

import React from 'react';

const AnimatedTextarea = ({
    label,
    icon: Icon,
    error,
    value,
    onChange,
    placeholder = '',
    required = false,
    disabled = false,
    className = '',
    rows = 4,
    maxLength,
    ...props
}) => {
    const hasError = !!error;
    const hasValue = value !== undefined && value !== null && value !== '' && value.trim() !== '';
    const characterCount = value ? value.length : 0;

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {/* Label with Icon */}
            <div className="flex items-center justify-between">
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

                {/* Character Counter */}
                {maxLength && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        <span className={`${characterCount > maxLength ? 'text-red-500' : characterCount > maxLength * 0.8 ? 'text-yellow-500' : 'text-gray-500'}`}>
                            {characterCount}
                        </span>
                        /{maxLength}
                    </div>
                )}
            </div>

            {/* Textarea Field */}
            <div className="relative group">
                <textarea
                    value={value || ''}
                    onChange={handleChange}
                    disabled={disabled}
                    rows={rows}
                    maxLength={maxLength}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 resize-y
                        ${hasError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-200 focus:border-brandGreen focus:ring-brandGreen dark:border-gray-600 group-hover:border-gray-300'
                        }  
                        focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white
                        transform ${disabled ? 'bg-gray-50 dark:bg-navy-700 cursor-not-allowed opacity-60' : ''}
                        placeholder:text-gray-400 dark:placeholder:text-gray-500
                    `}
                    placeholder={placeholder}
                    {...props}
                />

                {/* Focus Ring Animation */}
                <div className="absolute inset-0 rounded-xl bg-brandGreen opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>

                {/* Expanding Animation Effect */}
                <div className={`absolute bottom-0 left-0 h-1 bg-brandGreen rounded-b-xl transition-all duration-300 ${hasValue ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}></div>
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

            {/* Helper Text */}
            {!hasError && hasValue && (
                <div className="text-xs text-gray-500 dark:text-gray-400 animate-fadeIn">
                    {characterCount > 0 && (
                        <span>
                            {characterCount} character{characterCount !== 1 ? 's' : ''} entered
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default AnimatedTextarea;