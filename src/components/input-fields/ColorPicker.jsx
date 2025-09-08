"use client";

import React, { useRef } from 'react';
import { Eye } from 'lucide-react';

export default function ColorPicker({
    label,
    name,
    value = "#4F45E3",
    onChange,
    required = false,
    className = "",
    labelSize = "0.875rem",
    showEyeIcon = true,
}) {
    const colorInputRef = useRef(null);
    const id = name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        if (onChange) {
            // Create a synthetic event object similar to other input components
            onChange({
                target: {
                    name: name,
                    value: newColor
                }
            });
        }
    };

    const handleColorPickerClick = () => {
        colorInputRef.current?.click();
    };

    return (
        <div className="relative">
            {/* Input Field with Color Display */}
            <div
                className="bg-white border border-gray-300 rounded-full pr-12 pl-16 py-3 flex items-center cursor-pointer"
                onClick={handleColorPickerClick}
                style={{ height: '52px' }}
            >
                <span
                    className="text-gray-500"
                    style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '400',
                        fontSize: '12px',
                        lineHeight: '140%',
                        color: '#636363'
                    }}
                >
                    {value}
                </span>
            </div>

            {/* Left Color Preview Circle */}
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <div
                    className="rounded-full"
                    style={{
                        backgroundColor: value,
                        width: '36px',
                        height: '35px',
                        border: value === '#FFFFFF' || value === '#ffffff' ? '1px solid #E2E2E2' : 'none'
                    }}
                />
            </div>

            {/* Color Picker Button - Positioned absolutely on the right */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <input
                    ref={colorInputRef}
                    type="color"
                    id={id}
                    name={name}
                    value={value}
                    onChange={handleColorChange}
                    className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
                    style={{ width: '37px', height: '35px' }}
                />
                <button
                    type="button"
                    onClick={handleColorPickerClick}
                    className="rounded-full cursor-pointer flex items-center justify-center transition-all"
                    style={{
                        backgroundColor: '#000000',
                        width: '37px',
                        height: '35px'
                    }}
                    title="Select color"
                >
                    <img
                        src="/img/general/color_selector_white.svg"
                        alt="Color picker"
                        className="w-4 h-4"
                    />
                </button>
            </div>
        </div>
    );
}