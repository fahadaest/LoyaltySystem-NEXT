"use client";
import React, { useState } from "react";
import { Plus } from 'lucide-react';
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import BeaconCard from "@/components/settings/BeaconCard";
import Modal from "@/components/ui/Modal";
import AddBeaconComponent from "@/components/settings/AddBeaconComponent";
import DeleteConfirmationComponent from "@/components/ui/DeleteConfirmationModal";
import NoDataComponent from "@/components/ui/NoDataComponent";
import {
    useGetAllBeaconsQuery,
    useCreateBeaconMutation,
    useUpdateBeaconMutation,
    useDeleteBeaconMutation
} from "@/store/slices/adminSettingsApis";

const WalletBeaconsPage = () => {
    const [isAddBeaconModalOpen, setIsAddBeaconModalOpen] = useState(false);
    const [isEditBeaconModalOpen, setIsEditBeaconModalOpen] = useState(false);
    const [beaconToEdit, setBeaconToEdit] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [beaconToDelete, setBeaconToDelete] = useState(null);

    // API hooks
    const { data: beaconsResponse, isLoading: isLoadingBeacons } = useGetAllBeaconsQuery();
    const [createBeacon, { isLoading: isCreating }] = useCreateBeaconMutation();
    const [updateBeacon, { isLoading: isUpdating }] = useUpdateBeaconMutation();
    const [deleteBeacon, { isLoading: isDeleting }] = useDeleteBeaconMutation();

    const beacons = beaconsResponse?.data || [];

    const handleAddNewBeacon = () => {
        setIsAddBeaconModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddBeaconModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setIsEditBeaconModalOpen(false);
        setBeaconToEdit(null);
    };

    const handleSubmitBeacon = async (beaconData) => {
        try {
            await createBeacon(beaconData).unwrap();
            setIsAddBeaconModalOpen(false);
            // Show success message
            alert("Beacon created successfully!");
        } catch (error) {
            console.error('Error creating beacon:', error);
            alert(`Error creating beacon: ${error?.data?.message || error.message || 'Unknown error'}`);
        }
    };

    const handleEditBeacon = (beacon) => {
        setBeaconToEdit(beacon);
        setIsEditBeaconModalOpen(true);
    };

    const handleUpdateBeacon = async (beaconData) => {
        if (!beaconToEdit) return;

        try {
            await updateBeacon({
                beaconId: beaconToEdit.id,
                beaconData: beaconData
            }).unwrap();
            setIsEditBeaconModalOpen(false);
            setBeaconToEdit(null);
            alert("Beacon updated successfully!");
        } catch (error) {
            console.error('Error updating beacon:', error);
            alert(`Error updating beacon: ${error?.data?.message || error.message || 'Unknown error'}`);
        }
    };

    const handleDeleteBeacon = (beacon) => {
        setBeaconToDelete(beacon);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!beaconToDelete) return;

        try {
            await deleteBeacon(beaconToDelete.id).unwrap();
            setShowDeleteModal(false);
            setBeaconToDelete(null);
            alert("Beacon deleted successfully!");
        } catch (error) {
            console.error('Error deleting beacon:', error);
            alert(`Error deleting beacon: ${error?.data?.message || error.message || 'Unknown error'}`);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setBeaconToDelete(null);
    };

    const getModalFooter = (isEditMode) => (
        <div className="flex justify-end gap-3">
            <button
                onClick={isEditMode ? handleCloseEditModal : handleCloseAddModal}
                disabled={isEditMode ? isUpdating : isCreating}
                className="h-10 px-8 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
                Cancel
            </button>
            <button
                onClick={() => document.querySelector('form').requestSubmit()}
                disabled={isEditMode ? isUpdating : isCreating}
                className="h-10 px-8 bg-black rounded-full flex items-center gap-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
                {isEditMode ? (isUpdating ? "Updating..." : "Update Beacon") : (isCreating ? "Adding..." : "Add Beacon")}
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <Plus className="w-2.5 h-2.5 text-black" />
                </div>
            </button>
        </div>
    );

    // Transform beacon data for display
    const transformBeaconForDisplay = (beacon) => ({
        id: beacon.id,
        city: beacon.address?.city || 'Unknown City',
        address: beacon.address?.street || 'Unknown Address',
        description: beacon.text || 'No description',
        radius: `${beacon.radius}m` || '0m'
    });

    if (isLoadingBeacons) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading beacons...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-[80vh] flex flex-col">
            <div className="flex items-start justify-between flex-shrink-0 mb-8">
                <ComponentHeader
                    title="Wallet Beacons"
                    subtitle="Add, edit, update or remove wallet beacons"
                    infoMessage="This page allows you to manage location-based beacons for your digital wallet."
                />

                <Button
                    text={"Add New Beacon"}
                    onClick={handleAddNewBeacon}
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

            {/* Beacons Grid */}
            <div className="flex-1">
                {beacons.length === 0 ? (
                    <NoDataComponent
                        type="beacons"
                        onButtonClick={handleAddNewBeacon}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {beacons.map((beacon) => {
                            const displayBeacon = transformBeaconForDisplay(beacon);
                            return (
                                <BeaconCard
                                    key={beacon.id}
                                    city={displayBeacon.city}
                                    address={displayBeacon.address}
                                    description={displayBeacon.description}
                                    radius={displayBeacon.radius}
                                    onEdit={() => handleEditBeacon(beacon)}
                                    onDelete={() => handleDeleteBeacon(beacon)}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Add Beacon Modal */}
            <Modal
                isOpen={isAddBeaconModalOpen}
                onClose={handleCloseAddModal}
                title="Add Beacon"
                subtitle="Add, edit information provided"
                maxWidth="743px"
                maxHeight="418px"
                footer={getModalFooter(false)}
            >
                <AddBeaconComponent
                    onSubmit={handleSubmitBeacon}
                    editMode={false}
                />
            </Modal>

            {/* Edit Beacon Modal */}
            <Modal
                isOpen={isEditBeaconModalOpen}
                onClose={handleCloseEditModal}
                title="Edit Beacon"
                subtitle="Update beacon information"
                maxWidth="743px"
                maxHeight="418px"
                footer={getModalFooter(true)}
            >
                <AddBeaconComponent
                    onSubmit={handleUpdateBeacon}
                    editMode={true}
                    initialData={beaconToEdit}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && beaconToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4">
                        <DeleteConfirmationComponent
                            itemName={`beacon "${beaconToDelete.text || 'Unknown beacon'}"`}
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

export default WalletBeaconsPage;