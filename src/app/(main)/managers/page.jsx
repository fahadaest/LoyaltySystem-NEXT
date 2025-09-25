"use client";
import React, { useState } from "react";
import { Plus } from 'lucide-react';
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import AddManagerComponent from "@/components/managers/AddManagerComponent";
import DeleteConfirmationComponent from "@/components/ui/DeleteConfirmationModal";
import NoDataComponent from "@/components/ui/NoDataComponent";
import {
    useCreateManagerMutation,
    useGetAllManagersQuery,
    useUpdateManagerMutation,
    useDeleteManagerMutation,
} from "@/store/slices/managersApis";
import { useGetAllPermissionsQuery } from "@/store/slices/permissionsApis";

const ManagersPage = () => {
    // Modal state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [managerToEdit, setManagerToEdit] = useState(null);
    const [managerToDelete, setManagerToDelete] = useState(null);

    // API hooks
    const { data: managersData = [], isLoading, error } = useGetAllManagersQuery();
    const { data: permissions = [] } = useGetAllPermissionsQuery();
    const [createManager, { isLoading: isCreating }] = useCreateManagerMutation();
    const [updateManager, { isLoading: isUpdating }] = useUpdateManagerMutation();
    const [deleteManager, { isLoading: isDeleting }] = useDeleteManagerMutation();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate pagination
    const totalItems = managersData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = managersData.slice(startIndex, endIndex);

    const tableHeaders = [
        {
            label: "First Name",
            key: "firstName",
            className: "flex-[1.2]",
            align: "left"
        },
        {
            label: "Last Name",
            key: "lastName",
            className: "flex-[1.2]",
            align: "left"
        },
        {
            label: "Email",
            key: "email",
            className: "flex-[2.5]",
            align: "left"
        },
        {
            label: "Permissions",
            key: "permissions",
            className: "flex-[1.5]",
            align: "left",
            render: (item) => (
                <div>
                    <div className="font-medium text-black">
                        {item.permissionIds?.length || 0} Permission{item.permissionIds?.length !== 1 ? 's' : ''}
                    </div>
                    <div className="text-xs text-gray-500">
                        {item.permissionNames?.slice(0, 3).join(', ') || 'No permissions'}
                        {item.permissionNames?.length > 3 && '...'}
                    </div>
                </div>
            )
        },
        {
            label: "Status",
            key: "status",
            className: "flex-[1]",
            align: "center",
            render: (item) => (
                <div className="flex justify-center">
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {item.status || 'Active'}
                    </span>
                </div>
            )
        },
        {
            label: "Actions",
            key: "actions",
            className: "flex-[1.2]",
            align: "center",
            render: (item) => (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        text={"Edit"}
                        onClick={() => handleEdit(item)}
                        backgroundColor={'#EDEDED'}
                        textColor={'#000000'}
                        icon={"/img/general/edit.svg"}
                        showIcon={true}
                        iconPosition={'right'}
                        disabled={false}
                        height={'1.8rem'}
                        fontSize={'0.65rem'}
                        padding={'0px 4px 0px 10px'}
                        iconBackgroundColor={'#000000'}
                        iconWidth={'1.2rem'}
                        iconHeight={'1.2rem'}
                        iconImageWidth={'0.8rem'}
                        iconImageHeight={'0.8rem'}
                        gap={'8px'}
                        borderRadius={'20px'}
                    />
                    <Button
                        text={""}
                        onClick={() => handleDelete(item)}
                        backgroundColor={'#000000'}
                        textColor={'#FFFFFF'}
                        icon={"/img/general/trash.svg"}
                        showIcon={true}
                        iconPosition={'center'}
                        disabled={false}
                        height={'1.8rem'}
                        width={'1.8rem'}
                        fontSize={'0.65rem'}
                        padding={'0px'}
                        iconWidth={'1rem'}
                        iconHeight={'1rem'}
                        iconImageWidth={'0.7rem'}
                        iconImageHeight={'0.7rem'}
                        borderRadius={'50%'}
                    />
                </div>
            )
        }
    ];

    const handleEdit = (item) => {
        setManagerToEdit(item);
        setIsEditModalOpen(true);
    };

    const handleDelete = (item) => {
        setManagerToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const handleAddNewManager = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setManagerToEdit(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setManagerToDelete(null);
    };

    const handleSubmitManager = async (managerData) => {
        try {
            await createManager(managerData).unwrap();
            setIsAddModalOpen(false);
            console.log("Manager created successfully");
        } catch (error) {
            console.error("Error creating manager:", error);
        }
    };

    const handleUpdateManager = async (managerData) => {
        try {
            await updateManager({
                id: managerToEdit.id,
                ...managerData
            }).unwrap();
            setIsEditModalOpen(false);
            setManagerToEdit(null);
            console.log("Manager updated successfully");
        } catch (error) {
            console.error("Error updating manager:", error);
        }
    };

    const handleConfirmDelete = async () => {
        if (managerToDelete) {
            try {
                await deleteManager(managerToDelete.id).unwrap();
                setIsDeleteModalOpen(false);
                setManagerToDelete(null);
                console.log("Manager deleted successfully");
            } catch (error) {
                console.error("Error deleting manager:", error);
            }
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getModalFooter = (isEditMode) => (
        <div className="flex justify-end gap-3">
            <button
                onClick={isEditMode ? handleCloseEditModal : handleCloseAddModal}
                disabled={isEditMode ? isUpdating : isCreating}
                className="h-10 px-6 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50 font-['Poppins']"
            >
                Cancel
            </button>
            <button
                onClick={() => document.querySelector('form').requestSubmit()}
                disabled={isEditMode ? isUpdating : isCreating}
                className="h-10 px-6 bg-black rounded-full flex items-center gap-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-50 font-['Poppins']"
            >
                {isEditMode ? (isUpdating ? "Updating..." : "Update Manager") : (isCreating ? "Adding..." : "Add New Manager")}
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <Plus className="w-3 h-3 text-black" />
                </div>
            </button>
        </div>
    );

    // Footer pagination info
    const paginationInfo = `page ${currentPage} of ${totalPages || 1}`;

    // Footer buttons
    const footerButtons = [
        {
            text: "Previous",
            onClick: handlePrevious,
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
            iconBackgroundColor: '#000000',
            icon: "/img/general/arrow_left_white.svg",
            showIcon: true,
            iconPosition: 'left',
            disabled: currentPage === 1,
            height: '1.5rem',
            fontSize: '0.5rem',
            padding: '0px 12px 0px 4px',
            iconWidth: '1rem',
            iconHeight: '1rem',
            iconImageWidth: '0.5rem',
            iconImageHeight: '0.5rem',
            gap: '8px'
        },
        {
            text: "Next",
            onClick: handleNext,
            backgroundColor: '#000000',
            textColor: '#FFFFFF',
            icon: "/img/general/arrow_right_black.svg",
            showIcon: true,
            iconPosition: 'right',
            disabled: currentPage === totalPages,
            height: '1.5rem',
            fontSize: '0.5rem',
            padding: '0px 4px 0px 12px',
            iconWidth: '1rem',
            iconHeight: '1rem',
            iconImageWidth: '0.6rem',
            iconImageHeight: '0.6rem',
            gap: '8px'
        }
    ];

    if (isLoading) {
        return (
            <main className="h-[80vh] flex flex-col items-center justify-center">
                <div className="text-lg font-medium text-gray-600">Loading managers...</div>
            </main>
        );
    }

    return (
        <main className="h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-start justify-between flex-shrink-0">
                <ComponentHeader
                    title="Manage Managers"
                    subtitle="Add, edit, update or remove managers"
                    infoMessage="This page allows you to add, edit, and manage all your managers and their permissions."
                />

                <Button
                    text={"Add New Manager"}
                    onClick={handleAddNewManager}
                    backgroundColor={'#000000'}
                    textColor={'#FFFFFF'}
                    icon={"/img/general/plus.svg"}
                    showIcon={true}
                    iconPosition={'right'}
                    disabled={false}
                    height={'2rem'}
                    fontSize={'0.7rem'}
                    padding={'0px 4px 0px 12px'}
                    iconWidth={'1.4rem'}
                    iconHeight={'1.4rem'}
                    iconImageWidth={'1rem'}
                    iconImageHeight={'1rem'}
                    gap={'12px'}
                />
            </div>

            <div className="flex-1 min-h-0">
                {managersData.length === 0 ? (
                    <NoDataComponent
                        type="manager"
                        onButtonClick={handleAddNewManager}
                    />
                ) : (
                    <Table
                        headers={tableHeaders}
                        data={currentData}
                        headerFontSize="0.8rem"
                        bodyFontSize="0.675rem"
                        paginationInfo={paginationInfo}
                        footerButtons={footerButtons}
                    />
                )}
            </div>

            {/* Add Manager Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                title="Add Manager"
                subtitle="Please provide the information required to add manager"
                maxWidth="40vw"
                maxHeight="70vh"
                footer={getModalFooter(false)}
            >
                <AddManagerComponent
                    onSubmit={handleSubmitManager}
                    permissions={permissions}
                />
            </Modal>

            {/* Edit Manager Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                title="Edit Manager"
                subtitle="Update manager information and permissions"
                maxWidth="40vw"
                maxHeight="70vh"
                footer={getModalFooter(true)}
            >
                <AddManagerComponent
                    onSubmit={handleUpdateManager}
                    editMode={true}
                    initialData={managerToEdit}
                    permissions={permissions}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && managerToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <DeleteConfirmationComponent
                            itemName={`${managerToDelete.firstName} ${managerToDelete.lastName}`}
                            onConfirm={handleConfirmDelete}
                            onCancel={handleCloseDeleteModal}
                            isLoading={isDeleting}
                        />
                    </div>
                </div>
            )}
        </main>
    );
};

export default ManagersPage;