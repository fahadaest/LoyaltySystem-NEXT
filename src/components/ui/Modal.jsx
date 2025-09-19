import React from 'react';
import { X } from 'lucide-react';

const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    subtitle,
    maxWidth,
    maxHeight,
    showCloseButton = true,
    footer,
    hideHeader = false // New prop to hide header
}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0, 0, 0, 0.63)' }}
            onClick={handleBackdropClick}
        >
            {/* Modal Container */}
            <div
                className="bg-white border border-gray-200 shadow-lg rounded-[30px] relative overflow-hidden flex flex-col"
                style={{
                    maxWidth: maxWidth,
                    maxHeight: maxHeight,
                    width: '90vw',
                    height: 'auto',
                    boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header - Only show if not hidden and has title or close button */}
                {!hideHeader && (title || showCloseButton) && (
                    <div className="flex justify-between items-start p-4">
                        <div>
                            {title && (
                                <h2
                                    className="text-black mb-1"
                                    style={{
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        lineHeight: '150%'
                                    }}
                                >
                                    {title}
                                </h2>
                            )}
                            {subtitle && (
                                <p
                                    className="text-gray-500"
                                    style={{
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '9px',
                                        fontWeight: '500',
                                        lineHeight: '140%',
                                        color: '#636363'
                                    }}
                                >
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        {/* Close Button */}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="w-6 h-6 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        )}
                    </div>
                )}

                {/* Divider - Only show if header is visible */}
                {!hideHeader && (title || showCloseButton) && (
                    <div
                        className="border-t mx-5"
                        style={{ borderColor: '#E2E2E2' }}
                    />
                )}

                {/* Content */}
                <div
                    className={`overflow-auto flex-1 ${hideHeader ? 'p-3' : 'px-3 pt-3'}`}
                    style={{ maxHeight: 'calc(100vh - 200px)' }}
                >
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="py-3 px-5">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;