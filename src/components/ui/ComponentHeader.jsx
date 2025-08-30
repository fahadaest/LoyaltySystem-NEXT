import React, { useState } from 'react';
import Button from '../buttons/Button'

const ComponentHeader = ({
    title,
    subtitle,
    buttons = [],
    infoMessage,
    className = ''
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className={`flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-3 ${className}`}>
            <div>
                <div className="flex items-center gap-2">
                    <h1
                        className="text-black"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '16px',
                            fontWeight: '700',
                            lineHeight: '140%'
                        }}
                    >
                        {title}
                    </h1>

                    {infoMessage && (
                        <div className="relative inline-block">
                            <img
                                src="/img/general/info.svg"
                                alt="Info"
                                className="w-4 h-4 cursor-help opacity-60 hover:opacity-100 transition-opacity duration-200"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            />

                            {showTooltip && (
                                <div
                                    className="absolute left-0 top-6 z-50 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg"
                                    style={{
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '11px',
                                        fontWeight: '400',
                                        lineHeight: '140%'
                                    }}
                                >
                                    {infoMessage}
                                    {/* Tooltip arrow */}
                                    <div className="absolute -top-1 left-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {subtitle && (
                    <p
                        className="text-gray-500 mt-0.5"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '10px',
                            fontWeight: '400',
                            lineHeight: '130%',
                            color: '#636363'
                        }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Right side - Buttons */}
            {buttons.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {buttons.map((button, index) => (
                        <Button
                            key={index}
                            text={button.text}
                            onClick={button.onClick}
                            backgroundColor={button.backgroundColor || '#000000'}
                            textColor={button.textColor || '#FFFFFF'}
                            icon={button.icon}
                            showIcon={button.showIcon || false}
                            iconPosition={button.iconPosition || 'right'}
                            disabled={button.disabled || false}
                            className={button.className || ''}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComponentHeader;