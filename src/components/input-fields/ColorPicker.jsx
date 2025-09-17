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
    fieldHeight = "0.75rem",
    colorPreviewSize = "2.25rem",
    iconSize = "1rem",
    showEyeIcon = true,
}) {
    const colorInputRef = useRef(null);
    const id = name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        if (onChange) {
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

    const previewSizeRem = parseFloat(colorPreviewSize);
    const iconButtonSizeRem = Math.min(previewSizeRem + 0.0625, 2.3125);
    const paddingLeftRem = previewSizeRem + 1;

    return (
        <div className={className}>
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

            <div className="relative">
                <div
                    className="bg-white border border-gray-300 rounded-full flex items-center cursor-pointer focus-within:border-black transition-colors"
                    onClick={handleColorPickerClick}
                    style={{
                        paddingTop: fieldHeight,
                        paddingBottom: fieldHeight,
                        paddingLeft: `${paddingLeftRem}rem`,
                        paddingRight: `${iconButtonSizeRem + 0.5}rem`
                    }}
                >
                    <span
                        className="text-gray-700"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '400',
                            fontSize: placeholderSize,
                            lineHeight: '140%'
                        }}
                    >
                        {value || placeholder}
                    </span>
                </div>

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