"use client";

import React from 'react';
import { Check } from 'lucide-react';

export default function SelectBox({
    label,
    name,
    options = [],
    values = [],
    onChange,
    required = false,
    className = "",
    labelSize = "1rem",
    optionSize = "0.875rem",
    fieldHeight = "0.75rem",
    multiple = true,
    columns = 2,
}) {
    const id = name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const handleOptionClick = (optionValue) => {
        if (!onChange) return;

        let newValues;

        if (multiple) {
            // Multiple selection mode
            if (values.includes(optionValue)) {
                // Remove from selection
                newValues = values.filter(val => val !== optionValue);
            } else {
                // Add to selection
                newValues = [...values, optionValue];
            }
        } else {
            // Single selection mode
            newValues = [optionValue];
        }

        // Create a synthetic event object similar to other input components
        onChange({
            target: {
                name: name,
                value: multiple ? newValues : newValues[0] || ''
            }
        });
    };

    const isSelected = (optionValue) => {
        return values.includes(optionValue);
    };

    // Calculate grid columns class
    const gridColsClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4'
    }[columns] || 'grid-cols-2';

    // Calculate dynamic height based on fieldHeight
    const calculateHeight = () => {
        if (fieldHeight === "8px" || fieldHeight === "0.5rem") {
            return "32px"; // 2rem equivalent
        }
        // Convert rem to approximate px for consistent sizing
        const remValue = parseFloat(fieldHeight);
        if (!isNaN(remValue)) {
            return `${(remValue * 16) + 16}px`; // Convert rem to px and add padding
        }
        return fieldHeight;
    };

    const optionHeight = calculateHeight();

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

            <div className={`grid ${gridColsClass} gap-3`}>
                {options.map((option, index) => {
                    const optionValue = option.value || option;
                    const optionLabel = option.label || option;
                    const selected = isSelected(optionValue);

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleOptionClick(optionValue)}
                            className="px-4 bg-white border border-gray-300 rounded-full text-gray-700 flex items-center justify-between focus:outline-none focus:border-black hover:bg-gray-50 transition-colors"
                            style={{
                                height: optionHeight,
                                fontSize: optionSize
                            }}
                        >
                            <span>{optionLabel}</span>
                            <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors ${selected
                                ? 'bg-black'
                                : 'bg-gray-200 border border-gray-300'
                                }`}>
                                {selected && <Check className="w-2 h-2 text-white" />}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}