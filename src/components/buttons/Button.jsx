import React from 'react';

const Button = ({
    text,
    onClick,
    backgroundColor = '#000000',
    textColor = '#FFFFFF',
    icon,
    showIcon = false,
    iconPosition = 'right',
    disabled = false,
    height = '35px', // New height prop with default value
    className = ''
}) => {
    const isGradient = backgroundColor.includes('linear-gradient');

    const buttonStyle = {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '12px',
        fontWeight: '600',
        lineHeight: '140%',
        height: height, // Use dynamic height
        borderRadius: '36px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        color: textColor,
        ...(isGradient ? {
            background: backgroundColor
        } : {
            backgroundColor: backgroundColor
        })
    };

    const iconElement = showIcon && icon && (
        <div className="flex items-center justify-center w-[18px] h-[18px] bg-white rounded-full">
            <img
                src={icon}
                alt=""
                className="w-[8px] h-[8px]"
                style={iconPosition === 'left' ? { transform: 'rotate(0deg)' } : { transform: 'rotate(90deg)' }}
            />
        </div>
    );

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center gap-2 px-4 transition-opacity hover:opacity-90 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
            style={buttonStyle}
        >
            {iconPosition === 'left' && iconElement}
            <span>{text}</span>
            {iconPosition === 'right' && iconElement}
        </button>
    );
};

export default Button;