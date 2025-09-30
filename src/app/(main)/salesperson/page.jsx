"use client";
import React, { useState } from "react";
import { Plus } from 'lucide-react';
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import AddSalesPersonComponent from "@/components/salesperson/AddSalesPersonComponent";
import DeleteConfirmationComponent from "@/components/ui/DeleteConfirmationModal";
import NoDataComponent from "@/components/ui/NoDataComponent";
import {
    useCreateSalespersonMutation,
    useGetAllSalespersonsQuery,
    useUpdateSalespersonMutation,
    useDeleteSalespersonMutation,
} from "@/store/slices/salespersonsApis";
import { useGetAllManagersQuery } from "@/store/slices/managersApis";
import { useGetAllPermissionsQuery } from "@/store/slices/permissionsApis";

const SalesPersonPage = () => {
    // Modal state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [salespersonToEdit, setSalespersonToEdit] = useState(null);
    const [salespersonToDelete, setSalespersonToDelete] = useState(null);

    // API hooks
    const { data: salespersonsData = [], isLoading, error } = useGetAllSalespersonsQuery();
    const { data: managers = [] } = useGetAllManagersQuery();
    const { data: permissions = [] } = useGetAllPermissionsQuery();
    const [createSalesperson, { isLoading: isCreating }] = useCreateSalespersonMutation();
    const [updateSalesperson, { isLoading: isUpdating }] = useUpdateSalespersonMutation();
    const [deleteSalesperson, { isLoading: isDeleting }] = useDeleteSalespersonMutation();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate pagination
    const totalItems = salespersonsData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = salespersonsData.slice(startIndex, endIndex);

    const tableHeaders = [
        {
            label: "Name",
            key: "name",
            className: "flex-[2]",
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
        const editData = {
            ...item,
            firstName: item.name.split(' ')[0] || '',
            lastName: item.name.split(' ').slice(1).join(' ') || '',
            permissions: item.permissions || []
        };
        setSalespersonToEdit(editData);
        setIsEditModalOpen(true);
    };

    const handleDelete = (item) => {
        setSalespersonToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const handleAddNewSalesPerson = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSalespersonToEdit(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSalespersonToDelete(null);
    };

    const handleSubmitSalesperson = async (salespersonData) => {
        try {
            await createSalesperson(salespersonData).unwrap();
            setIsAddModalOpen(false);
            console.log("Salesperson created successfully");
        } catch (error) {
            console.error("Error creating salesperson:", error);
        }
    };

    const handleUpdateSalesperson = async (salespersonData) => {
        try {
            await updateSalesperson({
                id: salespersonToEdit.id,
                ...salespersonData
            }).unwrap();
            setIsEditModalOpen(false);
            setSalespersonToEdit(null);
            console.log("Salesperson updated successfully");
        } catch (error) {
            console.error("Error updating salesperson:", error);
        }
    };

    const handleConfirmDelete = async () => {
        if (salespersonToDelete) {
            try {
                await deleteSalesperson(salespersonToDelete.id).unwrap();
                setIsDeleteModalOpen(false);
                setSalespersonToDelete(null);
                console.log("Salesperson deleted successfully");
            } catch (error) {
                console.error("Error deleting salesperson:", error);
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
                {isEditMode ? (isUpdating ? "Updating..." : "Update Sales Person") : (isCreating ? "Adding..." : "Add New Sales Person")}
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
                <div className="text-lg font-medium text-gray-600">Loading salespersons...</div>
            </main>
        );
    }

    return (
        <main className="h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-start justify-between flex-shrink-0">
                <ComponentHeader
                    title="Sales Person"
                    subtitle="Manage sales persons and their profile"
                    infoMessage="This page allows you to add, edit, and manage all your sales persons and their permissions."
                />

                <Button
                    text={"Add New Sales Person"}
                    onClick={handleAddNewSalesPerson}
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
                {salespersonsData.length === 0 ? (
                    <NoDataComponent
                        type="salesperson"
                        onButtonClick={handleAddNewSalesPerson}
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

            {/* Add Sales Person Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                title="Add Sales Person"
                subtitle="Please provide the information required to add sales person"
                maxWidth="40vw"
                maxHeight="70vh"
                footer={getModalFooter(false)}
            >
                <AddSalesPersonComponent
                    onSubmit={handleSubmitSalesperson}
                    managers={managers}
                    permissions={permissions}
                />
            </Modal>

            {/* Edit Sales Person Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                title="Edit Sales Person"
                subtitle="Update sales person information and permissions"
                maxWidth="40vw"
                maxHeight="70vh"
                footer={getModalFooter(true)}
            >
                <AddSalesPersonComponent
                    onSubmit={handleUpdateSalesperson}
                    editMode={true}
                    initialData={salespersonToEdit}
                    managers={managers}
                    permissions={permissions}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && salespersonToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <DeleteConfirmationComponent
                            itemName={salespersonToDelete.name}
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

export default SalesPersonPage;