import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const MultiSelectDropdown = ({
    label,
    text,
    backgroundColor = '#FFFFFF',
    textColor = '#374151',
    circleColor = 'black',
    iconColor = 'white',
    onClick,
    width = 'auto',
    height = 'auto',
    fontSize = '12px',
    options = [], // Array of options to display
    onSelectionChange, // Callback when selection changes
    selectedValues = [], // Array of selected values
    placeholder = "Select options",
    showSelectedCount = true,
    required = false,
    labelSize = "12px",
    customStyles = {}
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
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

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
        if (onClick) {
            onClick();
        }
    };

    const handleCheckboxChange = (option, event) => {
        // Prevent the dropdown from closing when clicking checkbox
        event.stopPropagation();

        const optionValue = option.value || option.name || option;
        let newSelectedValues;

        if (selectedValues.includes(optionValue)) {
            // Remove from selection
            newSelectedValues = selectedValues.filter(val => val !== optionValue);
        } else {
            // Add to selection
            newSelectedValues = [...selectedValues, optionValue];
        }

        if (onSelectionChange) {
            onSelectionChange(newSelectedValues);
        }
    };

    const isSelected = (option) => {
        const optionValue = option.value || option.name || option;
        return selectedValues.includes(optionValue);
    };

    // Generate display text
    const getDisplayText = () => {
        if (selectedValues.length === 0) {
            return text || placeholder;
        }

        if (showSelectedCount) {
            return selectedValues.length === 1
                ? `${selectedValues.length} item selected`
                : `${selectedValues.length} items selected`;
        }

        // Show first few selected items
        const selectedLabels = options
            .filter(option => isSelected(option))
            .map(option => option.label || option.name || option)
            .slice(0, 2);

        if (selectedLabels.length > 2) {
            return `${selectedLabels.join(', ')} +${selectedValues.length - 2} more`;
        }

        return selectedLabels.join(', ');
    };

    const id = name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
        <div className="relative w-full" ref={dropdownRef}>
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
                onClick={handleButtonClick}
                className={customStyles.button || "pr-2 pl-4 py-1 rounded-full text-xs font-medium flex items-center justify-between border border-gray-300 focus:border-black focus:outline-none hover:bg-gray-50 transition-colors"}
                style={{
                    background: backgroundColor,
                    color: textColor,
                    borderRadius: '36px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: fontSize,
                    width: width,
                    height: height,
                    minHeight: height === 'auto' ? 'auto' : height
                }}
            >
                <span className="truncate">{getDisplayText()}</span>
                <div
                    className="w-5 h-5 rounded-full flex items-center justify-center ml-2"
                    style={{ background: circleColor }}
                >
                    <ChevronDown
                        className={`w-2 h-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        style={{ color: iconColor }}
                    />
                </div>
            </button>

            {/* Dropdown Options with Checkboxes */}
            {isOpen && options.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-2xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    {options.map((option, index) => {
                        const optionValue = option.value || option.name || option;
                        const optionLabel = option.label || option.name || option;
                        const selected = isSelected(option);

                        return (
                            <div
                                key={option.id || index}
                                onClick={(e) => handleCheckboxChange(option, e)}
                                className="w-full px-4 py-3 flex items-center hover:bg-gray-50 focus:bg-gray-50 cursor-pointer first:rounded-t-2xl last:rounded-b-2xl transition-colors"
                            >
                                {/* Custom Checkbox */}
                                <div className="flex items-center">
                                    <div
                                        className={`w-4 h-4 rounded border-2 flex items-center justify-center mr-3 transition-colors ${selected
                                            ? 'bg-black border-black'
                                            : 'bg-white border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        {selected && (
                                            <Check className="w-2.5 h-2.5 text-white" />
                                        )}
                                    </div>
                                    <span
                                        className="text-left"
                                        style={{
                                            fontSize: fontSize,
                                            color: textColor
                                        }}
                                    >
                                        {optionLabel}
                                    </span>
                                </div>
                            </div>
                        );
                    })}

                    {/* Optional: Clear All / Select All buttons */}
                    <div className="border-t border-gray-200 px-4 py-2 flex justify-between">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectionChange) {
                                    onSelectionChange([]);
                                }
                            }}
                            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const allValues = options.map(option => option.value || option.name || option);
                                if (onSelectionChange) {
                                    onSelectionChange(allValues);
                                }
                            }}
                            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Select All
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;