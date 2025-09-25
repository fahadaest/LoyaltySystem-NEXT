"use client";
import React, { useState } from "react";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import NoDataComponent from "@/components/ui/NoDataComponent";
import DeleteConfirmationComponent from "@/components/ui/DeleteConfirmationModal";
import AddAddressComponent from "@/components/settings/AddAddressComponent";
import {
    useGetAllAddressesQuery,
    useCreateAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation
} from "@/store/slices/adminSettingsApis"; // Update path as needed

const StoreAddressesPage = () => {
    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [addressToEdit, setAddressToEdit] = useState(null);
    const [addressToDelete, setAddressToDelete] = useState(null);

    // API hooks
    const { data: addressesResponse, error, isLoading, refetch } = useGetAllAddressesQuery();
    const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation();
    const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
    const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();

    // Extract addresses data
    const addresses = addressesResponse?.data || addressesResponse || [];

    const tableHeaders = [
        {
            label: "Addresses",
            key: "address",
            className: "flex-[4]",
            align: "left"
        },
        {
            label: "Actions",
            key: "actions",
            className: "flex-[1]",
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
        setAddressToEdit(item);
        setIsEditModalOpen(true);
    };

    const handleDelete = (item) => {
        setAddressToDelete(item);
        setShowDeleteModal(true);
    };

    const handleAddNewAddress = () => {
        console.log("abcd")
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setAddressToEdit(null);
    };

    const handleSubmitAddress = async (addressData) => {
        try {
            await createAddress(addressData).unwrap();
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Failed to create address:", error);
            alert(`Error creating address: ${error.message || 'Unknown error'}`);
        }
    };

    const handleUpdateAddress = async (addressData) => {
        try {
            await updateAddress({
                addressId: addressToEdit.id,
                addressData
            }).unwrap();
            setIsEditModalOpen(false);
            setAddressToEdit(null);
        } catch (error) {
            console.error("Failed to update address:", error);
            alert(`Error updating address: ${error.message || 'Unknown error'}`);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteAddress(addressToDelete.id).unwrap();
            setShowDeleteModal(false);
            setAddressToDelete(null);
        } catch (error) {
            console.error("Failed to delete address:", error);
            alert(`Error deleting address: ${error.message || 'Unknown error'}`);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setAddressToDelete(null);
    };

    // Modal footer for add/edit modals
    const getModalFooter = (isEditMode) => (
        <div className="flex justify-end gap-3">
            <button
                onClick={isEditMode ? handleCloseEditModal : handleCloseAddModal}
                disabled={isEditMode ? isUpdating : isCreating}
                className="h-10 px-6 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
                Cancel
            </button>
            <button
                onClick={() => {
                    const form = document.querySelector('form');
                    if (form) form.requestSubmit();
                }}
                disabled={isEditMode ? isUpdating : isCreating}
                className="h-10 px-6 bg-black rounded-full text-sm font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
                {isEditMode
                    ? (isUpdating ? "Updating..." : "Update Address")
                    : (isCreating ? "Adding..." : "Add Address")
                }
            </button>
        </div>
    );


    return (
        <main className="h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-start justify-between flex-shrink-0">
                <ComponentHeader
                    title="Store Addresses"
                    subtitle="Add, edit, update or remove addresses"
                    infoMessage="This page allows you to add, edit, and manage all your store addresses."
                />

                <Button
                    text={"Add New Address"}
                    onClick={handleAddNewAddress}
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
                {addresses.length > 0 ? (
                    <Table
                        headers={tableHeaders}
                        data={addresses}
                        headerFontSize="0.8rem"
                        bodyFontSize="0.675rem"
                    />
                ) : (
                    <NoDataComponent
                        type="general"
                        title="No Addresses Found"
                        subtitle="You haven't added any store addresses yet. Start by adding your first address."
                        showButton={false}
                    />
                )}
            </div>

            {/* Add Address Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                title="Add Address"
                subtitle="Add, edit information provided"
                maxWidth="743px"
                maxHeight="528px"
                footer={getModalFooter(false)}
            >
                <AddAddressComponent
                    onSubmit={handleSubmitAddress}
                    onClose={handleCloseAddModal}
                />
            </Modal>

            {/* Edit Address Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                title="Edit Address"
                subtitle="Update address information"
                maxWidth="743px"
                maxHeight="528px"
                footer={getModalFooter(true)}
            >
                <AddAddressComponent
                    onSubmit={handleUpdateAddress}
                    editMode={true}
                    initialData={addressToEdit}
                    onClose={handleCloseEditModal}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && addressToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4">
                        <DeleteConfirmationComponent
                            itemName={`address: ${addressToDelete.address}`}
                            onConfirm={handleConfirmDelete}
                            onCancel={handleCancelDelete}
                            isLoading={isDeleting}
                        />
                    </div>
                </div>
            )}
        </main>
    );
};

export default StoreAddressesPage;