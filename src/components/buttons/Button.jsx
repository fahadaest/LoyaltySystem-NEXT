import React, { useState } from 'react';

const Button = ({
    text,
    onClick,
    backgroundColor = '#000000',
    textColor = '#FFFFFF',
    icon,
    showIcon = false,
    iconPosition = 'right',
    disabled = false,
    height = '35px',
    className = '',
    fontSize = '12px',
    fontWeight = '600',
    fontFamily = 'Poppins, sans-serif',
    lineHeight = '140%',
    borderRadius = '36px',
    border = '1px solid rgba(0, 0, 0, 0.1)',
    padding = '0 16px',
    gap = '8px',
    iconWidth = '18px',
    iconHeight = '18px',
    iconImageWidth = '8px',
    iconImageHeight = '8px',
    iconBackgroundColor = 'white',
    iconBorderRadius = '50%',
    hoverOpacity = '0.9',
    transitionDuration = '200ms',
    ...restProps
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const isGradient = backgroundColor.includes('linear-gradient');

    const buttonStyle = {
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontWeight: fontWeight,
        lineHeight: lineHeight,
        height: height,
        borderRadius: borderRadius,
        border: border,
        color: textColor,
        padding: padding,
        gap: gap,
        transition: `opacity ${transitionDuration}`,
        ...(isGradient ? {
            background: backgroundColor
        } : {
            backgroundColor: backgroundColor
        })
    };

    const iconContainerStyle = {
        width: iconWidth,
        height: iconHeight,
        backgroundColor: iconBackgroundColor,
        borderRadius: iconBorderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const baseRotation = iconPosition === 'left' ? 0 : 90;
    const iconImageStyle = {
        width: iconImageWidth,
        height: iconImageHeight,
        transform: `rotate(${baseRotation + (isHovered ? 360 : 0)}deg)`,
        transition: 'transform 0.5s ease-in-out'
    };

    const iconElement = showIcon && icon && (
        <div style={iconContainerStyle}>
            <img
                src={icon}
                alt=""
                style={iconImageStyle}
            />
        </div>
    );

    const handleMouseEnter = (e) => {
        if (!disabled) {
            setIsHovered(true);
            e.target.style.opacity = hoverOpacity;
        }
    };

    const handleMouseLeave = (e) => {
        if (!disabled) {
            setIsHovered(false);
            e.target.style.opacity = '1';
        }
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
            style={{
                ...buttonStyle,
                ':hover': !disabled ? { opacity: hoverOpacity } : {}
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...restProps}
        >
            {iconPosition === 'left' && iconElement}
            <span>{text}</span>
            {iconPosition === 'right' && iconElement}
        </button>
    );
};

export default Button;