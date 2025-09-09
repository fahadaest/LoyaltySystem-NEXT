"use client";

import React from 'react';
import { Upload } from 'lucide-react';

export default function FileUploadArea({
    label,
    name,
    onChange,
    accept = "image/*",
    placeholder = "Click to upload",
    required = false,
    className = "",
    labelSize = "1rem",
    placeholderSize = "0.75rem",
    containerHeight = "7rem", // 112px = 7rem
    iconSize = "1.75rem", // 28px = 1.75rem
    borderRadius = "1rem", // 16px = 1rem
    borderStyle = "dashed",
    borderColor = "#D1D5DB", // gray-300
    backgroundColor = "#FFFFFF",
    hoverBackgroundColor = "#F9FAFB", // gray-50
    textColor = "#6B7280", // gray-500
    iconColor = "#9CA3AF", // gray-400
    ...restProps
}) {
    const id = name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const handleFileChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };

    const containerStyle = {
        height: containerHeight,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderRadius: borderRadius,
        borderStyle: borderStyle,
        borderWidth: '1px'
    };

    const iconStyle = {
        width: iconSize,
        height: iconSize,
        color: iconColor,
        marginBottom: '0.5rem'
    };

    const textStyle = {
        fontSize: placeholderSize,
        color: textColor,
        textAlign: 'center',
        fontFamily: 'inherit'
    };

    return (
        <div className={`w-full ${className}`}>
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

            {/* Upload Area */}
            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    required={required}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    {...restProps}
                />
                <div
                    className="w-full border flex flex-col items-center justify-center cursor-pointer transition-colors duration-200"
                    style={{
                        ...containerStyle,
                        ':hover': {
                            backgroundColor: hoverBackgroundColor
                        }
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = hoverBackgroundColor;
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = backgroundColor;
                    }}
                >
                    <Upload style={iconStyle} />
                    <span style={textStyle}>
                        {placeholder}
                    </span>
                </div>
            </div>
        </div>
    );
}