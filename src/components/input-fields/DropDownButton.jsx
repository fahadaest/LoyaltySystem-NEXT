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
    placeholder = "Select an option",

    // Icon styling options
    iconWidth = '8px',
    iconHeight = '8px',
    circleWidth = '20px',
    circleHeight = '20px',

    // Padding options
    paddingX = '4px', // horizontal padding (left/right)
    paddingY = '4px',  // vertical padding (top/bottom)
    paddingLeft = null,
    paddingRight = null,
    paddingTop = null,
    paddingBottom = null,

    // Margin options
    margin = '0',
    marginX = null,
    marginY = null,
    marginLeft = null,
    marginRight = null,
    marginTop = null,
    marginBottom = null,

    // Border options
    borderRadius = '36px',
    borderWidth = '1px',
    borderColor = '#D1D5DB',

    // Dropdown options styling
    dropdownBorderRadius = '16px',
    dropdownMaxHeight = '240px',
    optionPaddingX = '16px',
    optionPaddingY = '8px',

    // Gap between text and icon
    iconGap = '20px'
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

    // Calculate padding styles
    const paddingStyle = {
        paddingLeft: paddingLeft || paddingX,
        paddingRight: paddingRight || paddingX,
        paddingTop: paddingTop || paddingY,
        paddingBottom: paddingBottom || paddingY,
    };

    // Calculate margin styles
    const marginStyle = {
        margin: marginX !== null || marginY !== null ?
            `${marginY || '0'} ${marginX || '0'}` : margin,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
        marginBottom: marginBottom,
    };

    // Filter out null values from margin style
    Object.keys(marginStyle).forEach(key => {
        if (marginStyle[key] === null) {
            delete marginStyle[key];
        }
    });

    return (
        <div
            className="relative w-full"
            ref={dropdownRef}
            style={marginStyle}
        >
            <button
                onClick={handleButtonClick}
                className="rounded-full text-xs font-medium flex items-center justify-between border focus:border-black focus:outline-none hover:bg-gray-50 transition-colors"
                style={{
                    background: backgroundColor,
                    color: textColor,
                    borderRadius: borderRadius,
                    borderWidth: borderWidth,
                    borderColor: borderColor,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: fontSize,
                    width: width,
                    height: height,
                    minHeight: height === 'auto' ? 'auto' : height,
                    gap: iconGap,
                    ...paddingStyle
                }}
            >
                <span>{displayText}</span>
                <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                        background: circleColor,
                        width: circleWidth,
                        height: circleHeight,
                        minWidth: circleWidth,
                        minHeight: circleHeight
                    }}
                >
                    <ChevronDown
                        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        style={{
                            color: iconColor,
                            width: iconWidth,
                            height: iconHeight
                        }}
                    />
                </div>
            </button>

            {/* Dropdown Options */}
            {isOpen && options.length > 0 && (
                <div
                    className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 shadow-lg z-50 overflow-y-auto"
                    style={{
                        borderRadius: dropdownBorderRadius,
                        maxHeight: dropdownMaxHeight,
                        borderColor: borderColor
                    }}
                >
                    {options.map((option, index) => {
                        const optionValue = option.value || option.name || option;
                        const optionLabel = option.label || option.name || option;
                        const isFirst = index === 0;
                        const isLast = index === options.length - 1;

                        return (
                            <button
                                key={option.id || index}
                                onClick={() => handleOptionSelect(option)}
                                className="w-full text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
                                style={{
                                    fontSize: fontSize,
                                    color: textColor,
                                    paddingLeft: optionPaddingX,
                                    paddingRight: optionPaddingX,
                                    paddingTop: optionPaddingY,
                                    paddingBottom: optionPaddingY,
                                    borderTopLeftRadius: isFirst ? dropdownBorderRadius : '0',
                                    borderTopRightRadius: isFirst ? dropdownBorderRadius : '0',
                                    borderBottomLeftRadius: isLast ? dropdownBorderRadius : '0',
                                    borderBottomRightRadius: isLast ? dropdownBorderRadius : '0'
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