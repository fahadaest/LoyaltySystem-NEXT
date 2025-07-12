'use client';
import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

const CardTypeSelector = ({
    value,
    onChange,
    options = [],
    error,
    required = false
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const selectedOption = options.find(option => option.value === value);

    return (
        <div className={`transform transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="space-y-4">
                {/* Card Type Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {options.map((option) => {
                        const isSelected = value === option.value;
                        const IconComponent = option.icon;

                        return (
                            <div
                                key={option.value}
                                onClick={() => onChange(option.value)}
                                className={`
                                    relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-md group
                                    ${isSelected
                                        ? 'border-brandGreen bg-green-50 dark:bg-green-900/20 shadow-sm'
                                        : 'border-gray-200 bg-white dark:bg-gray-800 hover:border-gray-300'
                                    }
                                `}
                            >
                                {/* Selection Indicator */}
                                <div className={`
                                    absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all duration-200
                                    ${isSelected
                                        ? 'border-brandGreen bg-brandGreen'
                                        : 'border-gray-300 group-hover:border-gray-400'
                                    }
                                `}>
                                    {isSelected && (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                    )}
                                </div>

                                {/* Card Content */}
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={`
                                        w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200
                                        ${isSelected
                                            ? 'bg-brandGreen/10'
                                            : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200'
                                        }
                                    `}>
                                        <IconComponent className={`w-6 h-6 ${isSelected ? 'text-brandGreen' : 'text-gray-600 dark:text-gray-400'}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h4 className={`font-semibold mb-1 transition-colors duration-200 ${isSelected ? 'text-gray-900 dark:text-gray-100' : 'text-gray-800 dark:text-gray-200'
                                            }`}>
                                            {option.label}
                                        </h4>
                                        <p className={`text-sm transition-colors duration-200 ${isSelected ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'
                                            }`}>
                                            {option.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 rounded-xl bg-brandGreen opacity-0 group-hover:opacity-5 transition-opacity duration-200 pointer-events-none"></div>
                            </div>
                        );
                    })}
                </div>

                {/* Selected Type Summary */}
                {selectedOption && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 animate-fadeIn">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-brandGreen/10 rounded-lg flex items-center justify-center">
                                {React.createElement(selectedOption.icon, {
                                    className: "w-4 h-4 text-brandGreen"
                                })}
                            </div>
                            <div>
                                <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                    {selectedOption.label} Card Selected
                                </h5>
                                <p className="text-xs text-green-600 dark:text-green-400">
                                    Your wallet card will be configured for {selectedOption.value} tracking
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="animate-slideDown">
                        <p className="text-sm text-red-500 flex items-center gap-2">
                            <AlertCircle size={14} className="animate-bounce" />
                            {error}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardTypeSelector;