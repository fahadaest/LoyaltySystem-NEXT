"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function DropdownField({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select",
    required = false,
    className = "",
    labelSize = "1rem",
    placeholderSize = "0.875rem",
    fieldHeight = "0.75rem",
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const id = name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {label && (
                <label
                    htmlFor={id}
                    className="mb-2 block font-semibold text-black"
                    style={{ fontSize: labelSize }}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <button
                type="button"
                id={id}
                name={name}
                onClick={toggleDropdown}
                className="w-full rounded-full border border-gray-300 bg-white px-5 text-left flex items-center justify-between focus:border-black focus:outline-none hover:bg-gray-50 transition-colors"
                style={{
                    fontSize: placeholderSize,
                    paddingTop: fieldHeight,
                    paddingBottom: fieldHeight
                }}
            >
                <span className="text-gray-700 font-normal">
                    {value || placeholder}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-black transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
                    {options.length > 0 ? (
                        options.map((option, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleSelect(option.value || option)}
                                className="w-full px-5 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-2xl last:rounded-b-2xl transition-colors"
                                style={{
                                    fontSize: placeholderSize,
                                    paddingTop: fieldHeight,
                                    paddingBottom: fieldHeight
                                }}
                            >
                                <span className="text-gray-700 font-normal">
                                    {option.label || option}
                                </span>
                            </button>
                        ))
                    ) : (
                        <div
                            className="px-5 text-gray-500"
                            style={{
                                fontSize: placeholderSize,
                                paddingTop: fieldHeight,
                                paddingBottom: fieldHeight
                            }}
                        >
                            No options available
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}