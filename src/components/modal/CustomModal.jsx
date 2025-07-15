import React from "react";
import { MdClose, MdPrint } from "react-icons/md";
import AnimatedButton from "components/ui/AnimatedButton";
import { MdPersonAdd } from 'react-icons/md';
import { ChevronLeft, Save, Eye } from 'lucide-react';

const CustomModal = ({
    showModalBackButton,
    handleClickBack,
    headerTitle,
    headerDescription,
    showFooter,
    showFooterCancelButton,
    footerConfirmation,
    footerConfirmButtonText = "Confirm",
    footerConfirmButtonIcon,






    isOpen,
    onClose,
    title = "",
    size = "xl",
    children,
    handlePrint,
    noScroll = false,


    isLoading = false,

    footerButtonIcon = MdPersonAdd
}) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        "2xl": "max-w-5xl",
        "3xl": "max-w-6xl",
        "4xl": "max-w-7xl",
        "1xl": "max-w-3xl",
    };

    const modalWidth = sizeClasses[size] || sizeClasses.xl;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div onClick={onClose} className="absolute inset-0 bg-black opacity-50" />

            <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full ${modalWidth} max-h-[90vh] ${noScroll ? 'overflow-hidden' : 'overflow-hidden'} transform transition-all duration-300 scale-100`}>

                {headerTitle && (
                    <div className="flex items-center justify-between p-4 px-8 border-b border-gray-200 dark:border-gray-700">

                        <div className="flex items-center justify-center gap-5">
                            {showModalBackButton && (
                                <>
                                    <button onClick={handleClickBack} className="flex items-center text-gray-600 hover:text-brandGreen transition-colors"   >
                                        <ChevronLeft className="w-5 h-5 mr-2" />
                                        Back
                                    </button>
                                    <div className="w-px h-8 bg-gray-300" />
                                </>
                            )}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {headerTitle}
                                </h2>
                                <p className="text-gray-600">
                                    {headerDescription}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {handlePrint && (
                                <button onClick={handlePrint} className="flex items-center bg-brandGreen text-white p-2 px-5 rounded-md hover:bg-brandGreen-600 transition-colors"    >
                                    <MdPrint className="mr-2" />
                                    Print
                                </button>
                            )}
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"   >
                                <MdClose size={20} className="text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>
                )}

                <div className={noScroll ? 'h-full' : 'overflow-y-auto max-h-[calc(90vh-140px)]'}>
                    <div>
                        {children}
                    </div>
                </div>

                {showFooter && (

                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end gap-3 bg-white dark:bg-gray-750 rounded-b-xl">

                        {showFooterCancelButton && (
                            <AnimatedButton
                                variant="secondary"
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </AnimatedButton>
                        )}

                        {footerConfirmation && (
                            <AnimatedButton
                                variant="primary"
                                onClick={footerConfirmation}
                                loading={isLoading}
                                disabled={isLoading}
                                icon={footerConfirmButtonIcon}
                            >
                                {isLoading ? 'Processing...' : footerConfirmButtonText}
                            </AnimatedButton>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default CustomModal;