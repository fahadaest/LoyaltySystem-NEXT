import React from 'react';
import { Plus } from 'lucide-react';

const Button = ({
    text,
    onClick,
    backgroundColor = '#000000',
    textColor = '#FFFFFF',
    icon = null,
    showIcon = false,
    iconPosition = 'right', // 'left' or 'right'
    disabled = false,
    className = ''
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center justify-between space-x-1.5 border transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            style={{
                background: backgroundColor,
                color: textColor,
                borderRadius: '24px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '11px',
                fontWeight: '500',
                lineHeight: '130%',
                height: '32px',
                border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
        >
            {showIcon && iconPosition === 'left' && (
                <div
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: textColor }}
                >
                    <div style={{ color: backgroundColor }}>
                        {icon || <Plus className="w-2 h-2" />}
                    </div>
                </div>
            )}

            <span>{text}</span>

            {showIcon && iconPosition === 'right' && (
                <div
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: textColor }}
                >
                    <div style={{ color: backgroundColor }}>
                        {icon || <Plus className="w-2 h-2" />}
                    </div>
                </div>
            )}
        </button>
    );
};

export default Button;