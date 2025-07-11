'use client';
import { useState, useRef, useEffect } from 'react';

const AnimatedMultiSelect = ({
    label,
    icon: Icon,
    error,
    value = [],
    onChange,
    options = [],
    placeholder = 'Select options',
    required = false,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState('bottom');
    const containerRef = useRef(null);
    const dropdownRef = useRef(null);

    const hasError = !!error;
    const hasValue = value.length > 0;

    // Calculate dropdown position when opening
    useEffect(() => {
        if (isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const dropdownHeight = 240; // max-h-60 = 240px
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;

            // If there's not enough space below but enough space above, flip it
            if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
                setDropdownPosition('top');
            } else {
                setDropdownPosition('bottom');
            }
        }
    }, [isOpen]);

    const handleToggle = (optionValue) => {
        const newValue = value.includes(optionValue)
            ? value.filter(v => v !== optionValue)
            : [...value, optionValue];
        onChange(newValue);
    };

    const selectedLabels = options
        .filter(option => value.includes(option.value))
        .map(option => option.label);

    return (
        <div className={`space-y-2 ${className}`} ref={containerRef}>
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
                        <span className="text-xs text-brandGreen font-medium">
                            {value.length} selected
                        </span>
                    </div>
                )}
            </div>

            {/* MultiSelect Field */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left bg-white dark:bg-gray-700
                        ${hasError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-200 focus:border-brandGreen focus:ring-brandGreen dark:border-gray-600 hover:border-gray-300'
                        }  
                        focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:text-white`}
                >
                    <span className="block truncate">
                        {selectedLabels.length > 0
                            ? selectedLabels.join(', ')
                            : placeholder}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                </button>

                {/* Dropdown Options */}
                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className={`absolute z-20 w-full bg-white dark:bg-gray-700 shadow-lg max-h-60 rounded-xl py-2 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none animate-slideDown
                            ${dropdownPosition === 'top'
                                ? 'bottom-full mb-1'
                                : 'top-full mt-1'
                            }`}
                    >
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className="cursor-pointer select-none relative py-3 pl-4 pr-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150"
                                onClick={() => handleToggle(option.value)}
                            >
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-brandGreen focus:ring-brandGreen border-gray-300 rounded transition-colors duration-150 checked:bg-brandGreen checked:border-brandGreen"
                                        checked={value.includes(option.value)}
                                        onChange={() => { }}
                                    />
                                    <span className="ml-3 block font-normal truncate text-gray-900 dark:text-gray-100">
                                        {option.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

export default AnimatedMultiSelect;