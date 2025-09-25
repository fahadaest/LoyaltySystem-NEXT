import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const DropdownButton = ({
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
    onSelect, // Callback when option is selected
    value, // Selected value
    placeholder = "Select an option"
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

    const handleOptionSelect = (option) => {
        const selectedValue = option.value || option.name || option;
        const selectedLabel = option.label || option.name || option;

        if (onSelect) {
            onSelect(selectedValue, selectedLabel);
        }
        setIsOpen(false);
    };

    const displayText = value || text || placeholder;

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                onClick={handleButtonClick}
                className="pr-2 pl-4 py-1 rounded-full text-xs font-medium flex items-center justify-between border border-gray-300 focus:border-black focus:outline-none hover:bg-gray-50 transition-colors"
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
                <span>{displayText}</span>
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

            {/* Dropdown Options */}
            {isOpen && options.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-2xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    {options.map((option, index) => {
                        const optionValue = option.value || option.name || option;
                        const optionLabel = option.label || option.name || option;

                        return (
                            <button
                                key={option.id || index}
                                onClick={() => handleOptionSelect(option)}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-2xl last:rounded-b-2xl transition-colors"
                                style={{
                                    fontSize: fontSize,
                                    color: textColor
                                }}
                            >
                                {optionLabel}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DropdownButton;