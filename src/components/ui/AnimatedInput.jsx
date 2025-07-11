'use client';
import { useState } from 'react';

const AnimatedInput = ({
    label,
    icon: Icon,
    error,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    required = false,
    className = '',
    ...props
}) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const hasError = !!error;
    const hasValue = value && value.trim() !== '';

    const handleChange = (e) => {
        onChange(e.target.value);

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 150);
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

            {/* Input Field */}
            <div className="relative group">
                <input
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 
                        ${hasError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-200 focus:border-brandGreen focus:ring-brandGreen dark:border-gray-600 group-hover:border-gray-300'
                        }  
                        focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                        ${isAnimating ? 'scale-105' : 'scale-100'}
                        transform`}
                    {...props}
                />

                {/* Input Icon */}
                {Icon && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-150">
                        <Icon
                            size={18}
                            className={`${hasError ? 'text-red-500' : hasValue ? 'text-brandGreen' : 'text-gray-400'} 
                                ${isAnimating ? 'scale-110' : 'scale-100'} transform transition-all duration-150`}
                        />
                    </div>
                )}

                {/* Focus Ring Animation */}
                <div className="absolute inset-0 rounded-xl bg-brandGreen opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
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

export default AnimatedInput;