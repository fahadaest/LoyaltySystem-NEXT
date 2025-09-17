import React from 'react';
import { ChevronDown } from 'lucide-react';

const DropdownButton = ({
    text,
    backgroundColor = '#EDEDED',
    textColor = 'black',
    circleColor = 'black',
    iconColor = 'white',
    onClick,
    width = 'auto',
    height = 'auto',
    fontSize = '12px'
}) => {
    return (
        <button
            onClick={onClick}
            className="px-4 py-1 rounded-full text-xs font-medium flex items-center space-x-2"
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
            <span>{text}</span>
            <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: circleColor }}
            >
                <ChevronDown
                    className="w-2 h-2 rotate-90"
                    style={{ color: iconColor }}
                />
            </div>
        </button>
    );
};

export default DropdownButton;