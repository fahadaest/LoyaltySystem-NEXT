'use client';
import React, { useState, useRef } from 'react';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { useDisclosure } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { useCreateBeaconMutation, useGetAllBeaconsQuery, useGetBeaconByIdQuery, useUpdateBeaconMutation, useDeleteBeaconMutation } from 'store/settingsApi';
import Table from 'components/settings/walletAddress/Table';
import CustomModal from 'components/modal/CustomModal';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/alertSlice';
import AddBeacons from 'components/settings/walletBeacons/AddBeaconsForm';
import { FaBacon } from "react-icons/fa";

const Dashboard = () => {
  const { data: beacons, error: beaconsError, isLoading: beaconsLoading } = useGetAllBeaconsQuery('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editRowData, setEditRowData] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [createBeacon, { isLoading: isCreatingBeacon, error: createBeaconError }] = useCreateBeaconMutation();
  const [updateBeacon, { isLoading: isUpdatingBeacon, error: updateBeaconError }] = useUpdateBeaconMutation();
  const [deleteBeacon, { isLoading: isDeletingBeacon, error: deleteBeaconError }] = useDeleteBeaconMutation();
  const dispatch = useDispatch();

  const columns = [
    {
      accessorKey: "id",
      header: "Number",
      cell: (info: any) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.id}</p>,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: (info: any) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.address.address}</p>,
    },
    {
      accessorKey: "beaconText",
      header: "Beacon Text",
      cell: (info: any) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.beaconText}</p>,
    },
  ];

  const handleAddClick = () => {
    setEditRowData(null);
    onOpen();
  };

  const handleCreateBeacon = async (newBeaconData) => {
    if (newBeaconData) {
      try {
        await createBeacon(newBeaconData).unwrap();
        dispatch(showAlert({ message: 'Beacon Created Successfully!', severity: 'success', duration: 2000 }));
        onClose();
      } catch (error) {
        dispatch(showAlert({ message: 'Error creating beacon. Please try again.', severity: 'error', duration: 2000 }));
      }
    }
  };

  const handleEditClick = (editRowData) => {
    setEditRowData(editRowData);
    onOpen();
  };

  const handleUpdateBeacon = async (updatedBeaconData) => {
    if (updatedBeaconData) {
      try {
        await updateBeacon({
          id: updatedBeaconData.id,
          formData: updatedBeaconData,
        }).unwrap();
        dispatch(showAlert({ message: 'Beacon Updated Successfully!', severity: 'success', duration: 2000 }));
        onClose();
      } catch (error) {
        dispatch(showAlert({ message: 'Error updating beacon. Please try again.', severity: 'error', duration: 2000 }));
      }
    }
  };

  const handleDelete = async () => {
    if (addressToDelete) {
      try {
        await deleteBeacon(addressToDelete.id).unwrap();
        dispatch(showAlert({ message: 'Beacon Deleted Successfully!', severity: 'success', duration: 2000 }));
        setDeleteModalOpen(false);
      } catch (error) {
        dispatch(showAlert({ message: 'Error deleting beacon. Please try again.', severity: 'error', duration: 2000 }));
      }
    }
  };

  const openDeleteModal = (address) => {
    setAddressToDelete(address);
    setDeleteModalOpen(true);
  };

  return (
    <div>
      <div className="mt-3 mb-5">
        <HeadingCard icon={<FaBacon className="text-brandGreen text-3xl" />} subtitle="Manage Wallet Beacons">
          <HeaderButton
            icon={MdAdd}
            text="Add New Beacon"
            size="md"
            color="bg-brandGreen"
            onClick={handleAddClick}
            variant={undefined}
          />
        </HeadingCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <Table
          data={beacons || []}
          columns={columns}
          onDelete={openDeleteModal}
          onEdit={handleEditClick}
        />
      </div>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={editRowData ? 'Edit Beacon' : 'Add Beacon'}
        size="lg"
        handlePrint={undefined}
      >
        <AddBeacons
          onClose={onClose}
          editRowData={editRowData}
          onSubmit={editRowData ? handleUpdateBeacon : handleCreateBeacon}
        />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={addressToDelete ? addressToDelete?.address?.addressId : ''}
      />
    </div>
  );
};

export default Dashboard;
