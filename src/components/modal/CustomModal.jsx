import React from "react";
import { MdClose } from "react-icons/md";

const CustomModal = ({ isOpen, onClose, title = "", size = "xl", children }) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        "2xl": "max-w-5xl",
        "3xl": "max-w-6xl",
        "4xl": "max-w-7xl",
    };

    const modalWidth = sizeClasses[size] || sizeClasses.xl;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-[2px]"
                onClick={onClose}
            />
            <div className={`relative bg-white rounded-xl shadow-2xl w-full ${modalWidth} max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100`}>
                {title && (
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <MdClose size={20} className="text-gray-500" />
                        </button>
                    </div>
                )}

                <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CustomModal;