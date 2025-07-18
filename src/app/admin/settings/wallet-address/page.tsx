'use client';
import React, { useState, useRef } from 'react';
import HeadingCard from 'components/header/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { useDisclosure } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { useCreateAddressMutation, useGetAllAddressesQuery, useGetAddressByIdQuery, useUpdateAddressMutation, useDeleteAddressMutation } from 'store/apiEndPoints/settingsApi';
import Table from 'components/ui/Table';
import AddressSelectionComponent from 'components/settings/walletAddress/AddressSelection';
import CustomModal from 'components/modal/CustomModal';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import { MdLocationOn } from "react-icons/md";

const Dashboard = () => {
  const { data: allAddress, error: allAddressError, isLoading: allAddressLoadinng } = useGetAllAddressesQuery('');
  const [updateAddress, { isLoading: isUpdating, error: updateError }] = useUpdateAddressMutation();
  const [createAddress, { isLoading: isCreating, error: createError }] = useCreateAddressMutation();
  const [deleteAddress, { isLoading: isDeleting, error: deleteError }] = useDeleteAddressMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editRowData, setEditRowData] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const dispatch = useDispatch();

  const columns = [
    {
      accessorKey: "address",
      header: "Address Name",
      cell: (info: any) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.address}</p>,
    },
  ];

  const handleAddClick = () => {
    setEditRowData(null);
    onOpen();
  };

  const handleCreateAddress = async (newAddressData: any) => {
    if (newAddressData) {
      try {
        await createAddress(newAddressData).unwrap();
        dispatch(showAlert({ message: "Address Created Successfully!", severity: "success", duration: 2000 }));
        onClose();
      } catch (error) {
        dispatch(showAlert({ message: "Error creating address. Please try again.", severity: "error", duration: 2000 }));
      }
    }
  };

  const handleEditClick = (editRowData: any) => {
    setEditRowData(editRowData);
    onOpen();
  };

  const handleUpdateAddress = async (updatedAddressData: any) => {
    if (updatedAddressData) {
      try {
        await updateAddress({
          id: updatedAddressData.id,
          formData: updatedAddressData,
        }).unwrap();
        dispatch(showAlert({ message: "Address Updated Successfully!", severity: "success", duration: 2000 }));
        onClose();
      } catch (error) {
        dispatch(showAlert({ message: "Error updating address. Please try again.", severity: "error", duration: 2000 }));
      }
    }
  };

  const handleDelete = async () => {
    if (addressToDelete) {
      try {
        await deleteAddress(addressToDelete.id).unwrap();
        dispatch(showAlert({ message: "Address Deleted Successfully!", severity: "success", duration: 2000 }));
        setDeleteModalOpen(false);
      } catch (error) {
        dispatch(showAlert({ message: "Error deleting address. Please try again.", severity: "error", duration: 2000 }));
      }
    }
  };

  const openDeleteModal = (address: any) => {
    setAddressToDelete(address);
    setDeleteModalOpen(true);
  };

  return (
    <div>
      <div className="mt-3 mb-5">
        <HeadingCard icon={<MdLocationOn className="text-brandGreen text-3xl" />} subtitle="All Addresses">
          <HeaderButton
            icon={MdAdd}
            text="Add New Address"
            size="lg"
            color="bg-brandGreen"
            onClick={handleAddClick}
            variant={undefined}
          />
        </HeadingCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <Table
          data={allAddress || []}
          columns={columns}
          onDelete={openDeleteModal}
          onEdit={handleEditClick}
          isLoading={false} />
      </div>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={editRowData ? "Edit Address" : "Add Address"}
        handlePrint={null}
        size="2xl"
        showModalBackButton={false}
        handleClickBack={() => { }}
        headerTitle={editRowData ? "Edit Address" : "Add Address"}
        headerDescription=""
        showFooter={false}
        showFooterCancelButton={false}
        footerConfirmation={false} footerConfirmButtonIcon={undefined}      >
        <AddressSelectionComponent
          onClose={onClose}
          editRowData={editRowData}
          onSubmit={editRowData ? handleUpdateAddress : handleCreateAddress}
        />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={addressToDelete ? addressToDelete.address : ''}
      />
    </div>
  );
};

export default Dashboard;