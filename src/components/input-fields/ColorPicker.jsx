"use client";

import React, { useRef } from 'react';

export default function ColorPicker({
    label,
    name,
    value = "#4F45E3",
    onChange,
    placeholder = "Select color",
    required = false,
    className = "",
    labelSize = "1rem",
    placeholderSize = "0.875rem",
    fieldHeight = "0.75rem", // This will be used for padding like InputField
    colorPreviewSize = "2.25rem", // 36px = 2.25rem
    iconSize = "1rem", // 16px = 1rem
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

    // Calculate dynamic sizes (convert rem to numeric for calculations)
    const previewSizeRem = parseFloat(colorPreviewSize);
    const iconButtonSizeRem = Math.min(previewSizeRem + 0.0625, 2.3125); // Keep icon button reasonable size (37px = 2.3125rem)
    const paddingLeftRem = previewSizeRem + 1; // 16px = 1rem

    return (
        <div className={className}>
            {/* Label */}
            {label && (
                <label
                    htmlFor={id}
                    className="mb-2 block font-semibold text-black"
                    style={{ fontSize: labelSize }}
                >
                    {label}
                </label>
            )}

            {/* Input Field with Color Display */}
            <div className="relative">
                <div
                    className="bg-white border border-gray-300 rounded-full flex items-center cursor-pointer"
                    onClick={handleColorPickerClick}
                    style={{
                        paddingTop: fieldHeight,
                        paddingBottom: fieldHeight,
                        paddingLeft: `${paddingLeftRem}rem`,
                        paddingRight: `${iconButtonSizeRem + 0.5}rem` // Dynamic right padding based on icon size
                    }}
                >
                    <span
                        className="text-gray-500"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '400',
                            fontSize: placeholderSize,
                            lineHeight: '140%',
                            color: '#636363'
                        }}
                    >
                        {value || placeholder}
                    </span>
                </div>

                {/* Left Color Preview Circle */}
                <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: '0.5rem' }}>
                    <div
                        className="rounded-full"
                        style={{
                            backgroundColor: value,
                            width: colorPreviewSize,
                            height: colorPreviewSize,
                            border: value === '#FFFFFF' || value === '#ffffff' ? '1px solid #E2E2E2' : 'none'
                        }}
                    />
                </div>

                {/* Color Picker Button - Positioned absolutely on the right */}
                <div className="absolute top-1/2 transform -translate-y-1/2" style={{ right: '0.5rem' }}>
                    <input
                        ref={colorInputRef}
                        type="color"
                        id={id}
                        name={name}
                        value={value}
                        onChange={handleColorChange}
                        className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
                        style={{
                            width: `${iconButtonSizeRem}rem`,
                            height: `${iconButtonSizeRem}rem`
                        }}
                    />
                    <button
                        type="button"
                        onClick={handleColorPickerClick}
                        className="rounded-full cursor-pointer flex items-center justify-center transition-all"
                        style={{
                            backgroundColor: '#000000',
                            width: `${iconButtonSizeRem}rem`,
                            height: `${iconButtonSizeRem}rem`
                        }}
                        title="Select color"
                    >
                        <img
                            src="/img/general/color_selector_white.svg"
                            alt="Color picker"
                            style={{
                                width: iconSize,
                                height: iconSize
                            }}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}