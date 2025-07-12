'use client';
import { useState, useEffect } from 'react';
import { Palette, AlertCircle, Pipette } from 'lucide-react';

const ColorPicker = ({
    value,
    onChange,
    colorOption = [],
    label,
    error,
    required = false
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showCustomPicker, setShowCustomPicker] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const hasValue = value && value.trim() !== '';

    // Convert hex to valid color input value (remove any extra formatting)
    const getColorInputValue = () => {
        if (!value) return '#000000';
        // If it's a valid hex color, return it, otherwise return default
        const hexMatch = value.match(/#[0-9A-Fa-f]{6}/);
        return hexMatch ? hexMatch[0] : '#000000';
    };

    const handleColorInputChange = (e) => {
        onChange(e.target.value);
    };

    const handleTextInputChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className={`transform transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {/* Label with Icon */}
            <div className="flex items-center gap-2 mb-2">
                <Palette size={16} className="text-brandGreen" />
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

            <div className="space-y-3">
                {/* Color Input Section */}
                <div className="flex gap-2">
                    {/* Text Input */}
                    <div className="relative group flex-1">
                        <input
                            type="text"
                            value={value}
                            onChange={handleTextInputChange}
                            className={`
                                w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                                ${error
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                    : 'border-gray-200 hover:border-gray-300 focus:border-brandGreen focus:ring-brandGreen dark:border-gray-600'
                                }
                                focus:outline-none focus:ring-2 focus:ring-opacity-50 
                                bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                                group-hover:border-gray-300
                            `}
                            placeholder="Enter hex color (e.g., #4F46E5)"
                        />

                        {/* Color Preview */}
                        {hasValue && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div
                                    className="w-6 h-6 rounded border border-gray-300"
                                    style={{ background: value }}
                                    title="Color preview"
                                />
                            </div>
                        )}

                        {/* Focus Ring Animation */}
                        <div className="absolute inset-0 rounded-xl bg-brandGreen opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
                    </div>

                    {/* Color Picker Button */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowCustomPicker(!showCustomPicker)}
                            className={`
                                w-12 h-12 rounded-xl border-2 transition-all duration-200 hover:scale-105
                                ${showCustomPicker
                                    ? 'border-brandGreen bg-brandGreen/10'
                                    : 'border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-700'
                                }
                                flex items-center justify-center group
                            `}
                            title="Open color picker"
                        >
                            <Pipette className={`w-5 h-5 ${showCustomPicker ? 'text-brandGreen' : 'text-gray-500 group-hover:text-gray-700'}`} />
                        </button>

                        {/* Custom Color Picker Dropdown */}
                        {showCustomPicker && (
                            <div className="absolute top-14 right-0 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg p-4">
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Custom Color</p>

                                    {/* Native Color Input */}
                                    <div className="relative">
                                        <input
                                            type="color"
                                            value={getColorInputValue()}
                                            onChange={handleColorInputChange}
                                            className="w-20 h-10 rounded-lg border border-gray-300 cursor-pointer"
                                            title="Pick a custom color"
                                        />
                                    </div>

                                    {/* Close Button */}
                                    <button
                                        type="button"
                                        onClick={() => setShowCustomPicker(false)}
                                        className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Select Color Options */}
                {colorOption.length > 0 && (
                    <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick select colors:</p>
                        <div className="grid grid-cols-12 gap-2">
                            {colorOption.map((color, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => onChange(color.value)}
                                    className={`
                                        h-10 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-md
                                        ${value === color.value
                                            ? 'border-brandGreen shadow-md ring-2 ring-brandGreen/30'
                                            : 'border-gray-200 hover:border-gray-400'
                                        }
                                        group relative
                                    `}
                                    style={{ background: color.value }}
                                    title={color.name}
                                >
                                    {/* Selection Indicator */}
                                    {value === color.value && (
                                        <div className="absolute inset-0 rounded-md flex items-center justify-center">
                                            <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-2 animate-slideDown">
                    <p className="text-sm text-red-500 flex items-center gap-2">
                        <AlertCircle size={14} className="animate-bounce" />
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ColorPicker;