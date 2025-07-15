import React, { useEffect } from 'react';
import Button from 'components/button/Button';
import { IoTrashOutline, IoCloseOutline, IoWarningOutline } from "react-icons/io5";
import AnimatedButton from 'components/ui/AnimatedButton';

type DeleteConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    title?: string;
    isLoading?: boolean;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    isLoading = false,
    title = "Delete Confirmation",
}) => {
    // Handle escape key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isLoading) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, isLoading, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && !isLoading) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 animate-fadeIn"
                onClick={handleBackdropClick}
            />

            {/* Modal Container */}
            <div className="flex items-center justify-center min-h-full p-4">
                <div className="relative bg-white dark:bg-navy-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-scaleIn">

                    {/* Content */}
                    <div className="px-6 pb-6">
                        {/* Animated Background Pattern */}
                        <div className="relative">
                            <div className="absolute inset-0  dark:from-red-900/20 dark:to-orange-900/20 rounded-xl opacity-50"></div>

                            <div className=" relative text-center py-6">
                                {/* Animated Warning Icon */}
                                <div className="mx-auto mb-6 relative">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg mx-auto animate-pulse">
                                        <IoWarningOutline className="h-8 w-8 text-white animate-bounce" />
                                    </div>
                                </div>

                                {/* Animated Description */}
                                <div className=" space-y-3 animate-slideUp">
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Are you sure you want to <br></br> permanently delete
                                        <strong className="text-red-700 dark:text-red-300 font-semibold">
                                            {' ' + itemName}?
                                        </strong>
                                    </p>
                                    <div className="inline-flex items-center gap-5 animate-fadeIn">
                                        <AnimatedButton
                                            icon={IoCloseOutline}
                                            variant="secondary"
                                            onClick={onClose}
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </AnimatedButton>
                                        <AnimatedButton
                                            icon={IoTrashOutline}
                                            variant="warning"
                                            onClick={onConfirm}
                                            disabled={isLoading}
                                        >
                                            Delete
                                        </AnimatedButton>
                                    </div>


                                </div>

                                {/* Loading State */}
                                {isLoading && (
                                    <div className="mb-6 flex items-center justify-center space-x-2 animate-fadeIn">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
                                        <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                                            Deleting...
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Warning Banner */}
                            <div className=" p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg animate-slideUp animation-delay-200">
                                <div className="flex items-center">
                                    <IoWarningOutline className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0" />
                                    <span className="text-xs text-yellow-700 dark:text-yellow-300 font-medium">
                                        Warning: This action is permanent and irreversible
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                
                .animate-slideUp {
                    animation: slideUp 0.4s ease-out;
                }
                
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
                
                .animation-delay-75 {
                    animation-delay: 75ms;
                }
                
                .animation-delay-200 {
                    animation-delay: 200ms;
                }
            `}</style>
        </div>
    );
};

export default DeleteConfirmationModal;