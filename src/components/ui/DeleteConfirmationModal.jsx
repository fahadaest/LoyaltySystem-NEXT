import React from 'react';
import { X } from 'lucide-react';

const DeleteConfirmationComponent = ({ onConfirm, onCancel, itemName }) => {
    return (
        <div className="flex flex-col items-center justify-center py-4 relative">
            {/* Close Icon - Top Right */}
            <button
                onClick={onCancel}
                className="absolute top-2 right-2 w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200"
            >
                <X className="w-5 h-5 text-white" />
            </button>

            {/* Trash Icon */}
            <div className="w-[60px] h-[60px] bg-black rounded-full flex items-center justify-center mb-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19ZM10 11V17M14 11V17"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Title */}
            <h2 className="text-[16px] font-normal text-center text-black leading-[24px] mb-5 max-w-[300px]">
                Are you sure you want to permanently delete <span className="font-medium">{itemName}</span>?
            </h2>

            {/* Buttons - Increased width */}
            <div className="flex gap-3 mb-4 w-full max-w-[280px]">
                <button
                    onClick={onCancel}
                    className="w-1/2 h-[35px] bg-[#F5F5F5] text-[#636363] text-[11px] font-semibold px-6 rounded-[30px] border border-[#E2E2E2] hover:bg-gray-200 transition-colors duration-200"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="w-1/2 h-[35px] bg-black text-white text-[11px] font-semibold px-6 rounded-[30px] hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-1"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19ZM10 11V17M14 11V17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Delete
                </button>
            </div>

            {/* Warning Message */}
            <div className="w-full max-w-[280px] bg-[#FEFCE8] border border-gray-100 rounded-[10px] p-2">
                <p className="text-[10px] font-medium text-[#BC9000] text-center leading-[14px]">
                    Warning: This action is permanent and irreversible!
                </p>
            </div>
        </div>
    );
};

export default DeleteConfirmationComponent;