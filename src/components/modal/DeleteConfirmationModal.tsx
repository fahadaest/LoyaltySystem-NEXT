import React from 'react';
import Button from 'components/button/Button';
import CustomModal from 'components/modal/CustomModal';
import { IoTrashOutline, IoCloseOutline } from "react-icons/io5";

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
    isLoading,
    title = "Delete Item",
}) => {
    return (
        <CustomModal handlePrint={undefined} isOpen={isOpen} onClose={onClose} title={title} size="md" showModalBackButton={undefined} handleClickBack={undefined} headerTitle={undefined} headerDescription={undefined} showFooter={undefined} showFooterCancelButton={undefined} footerConfirmation={undefined} footerConfirmButtonIcon={undefined} >
            <div className="text-center mt-8">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                    <svg
                        className="h-6 w-6 text-red-600 dark:text-red-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    {title}
                </h3>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete{' '}
                    <strong>{itemName}</strong>? This action cannot be undone.
                </p>
            </div>
            <div className="mb-8 flex justify-center space-x-3">
                <Button
                    text="Cancel"
                    size="md"
                    color="bg-gray-200"
                    hoverColor="hover:bg-gray-300"
                    onClick={onClose}
                    extra="flex-1"
                    icon={IoCloseOutline}
                />
                <Button
                    text="Delete"
                    size="md"
                    color="bg-brandRed"
                    hoverColor="hover:bg-red-700"
                    onClick={onConfirm}
                    extra="flex-1"
                    icon={IoTrashOutline}
                />
            </div>
        </CustomModal>
    );
};

export default DeleteConfirmationModal;
