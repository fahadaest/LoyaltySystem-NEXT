'use client';
import React, { useState, useRef } from 'react';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { useDisclosure } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { useCreateManagerMutation, useGetAllManagersQuery, useGetManagerByIdQuery, useUpdateManagerMutation, useDeleteManagerMutation } from 'store/apiEndPoints/managersApi';
import Table from 'components/settings/walletAddress/Table';
import CustomModal from 'components/modal/CustomModal';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import { FaUserShield } from "react-icons/fa";
import AddManagerForm from 'components/managers/AddManagerForm';

const ManagersDashboard = () => {
  const { data: managers, error: managersError, isLoading: managersLoading } = useGetAllManagersQuery('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editRowData, setEditRowData] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [managerToDelete, setManagerToDelete] = useState(null);
  const [createManager, { isLoading: isCreatingManager, error: createManagerError }] = useCreateManagerMutation();
  const [updateManager, { isLoading: isUpdatingManager, error: updateManagerError }] = useUpdateManagerMutation();
  const [deleteManager, { isLoading: isDeletingManager, error: deleteManagerError }] = useDeleteManagerMutation();
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const mockPermissions = [
    { value: 1, label: 'View Sales Reports' },
    { value: 2, label: 'Create Leads' },
    { value: 3, label: 'Edit Customer Data' },
    { value: 4, label: 'Manage Opportunities' },
    { value: 5, label: 'Access Analytics' },
    { value: 6, label: 'Export Data' },
    { value: 7, label: 'Manage Team' },
    { value: 8, label: 'Admin Access' },
    { value: 9, label: 'Create Reports' },
    { value: 10, label: 'Manage Salespersons' },
    { value: 11, label: 'View Dashboard' },
    { value: 12, label: 'Manage Territories' },
    { value: 13, label: 'Approve Deals' },
    { value: 14, label: 'Budget Management' },
    { value: 15, label: 'Performance Tracking' },
    { value: 16, label: 'Training Management' },
    { value: 17, label: 'Commission Management' },
    { value: 18, label: 'Goal Setting' },
  ];

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info: any) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.id}</p>,
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: (info: any) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.firstName}</p>,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: (info: any) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.lastName}</p>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info: any) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.email}</p>,
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: (info: any) => {
        const permissionCount = info.row.original.permissionIds?.length || 0;
        return <p className="text-sm text-gray-800 dark:text-white">{permissionCount} permissions</p>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      ),
    },
  ];

  const handleAddClick = () => {
    setEditRowData(null);
    onOpen();
  };

  const handleModalSubmit = () => {
    if (formRef.current && formRef.current.handleSubmit) {
      formRef.current.handleSubmit();
    }
  };

  const handleCreateManager = async (newManagerData) => {
    if (newManagerData) {
      try {
        await createManager(newManagerData).unwrap();
        dispatch(showAlert({ message: 'Manager Created Successfully!', severity: 'success', duration: 2000 }));
        onClose();
      } catch (error) {
        console.error('Create manager error:', error);
        dispatch(showAlert({ message: 'Error creating manager. Please try again.', severity: 'error', duration: 2000 }));
      }
    }
  };

  const handleEditClick = (editRowData) => {
    setEditRowData(editRowData);
    onOpen();
  };

  const handleUpdateManager = async (updatedManagerData) => {
    if (updatedManagerData) {
      try {
        await updateManager({
          id: updatedManagerData.id,
          managerData: updatedManagerData,
        }).unwrap();
        dispatch(showAlert({ message: 'Manager Updated Successfully!', severity: 'success', duration: 2000 }));
        onClose();
      } catch (error) {
        console.error('Update manager error:', error);
        dispatch(showAlert({ message: 'Error updating manager. Please try again.', severity: 'error', duration: 2000 }));
      }
    }
  };

  const handleDelete = async () => {
    if (managerToDelete) {
      try {
        await deleteManager(managerToDelete.id).unwrap();
        dispatch(showAlert({ message: 'Manager Deleted Successfully!', severity: 'success', duration: 2000 }));
        setDeleteModalOpen(false);
      } catch (error) {
        console.error('Delete manager error:', error);
        dispatch(showAlert({ message: 'Error deleting manager. Please try again.', severity: 'error', duration: 2000 }));
      }
    }
  };

  const openDeleteModal = (manager) => {
    setManagerToDelete(manager);
    setDeleteModalOpen(true);
  };

  return (
    <div>
      <div className="mt-3 mb-5">
        <HeadingCard icon={<FaUserShield className="text-brandGreen text-3xl" />} subtitle="Manage Managers">
          <HeaderButton
            icon={MdAdd}
            text="Add New Manager"
            size="md"
            color="bg-brandGreen"
            onClick={handleAddClick}
            variant={undefined}
          />
        </HeadingCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <Table
          data={managers || []}
          columns={columns}
          onDelete={openDeleteModal}
          onEdit={handleEditClick}
          isLoading={managersLoading}
        />
      </div>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={editRowData ? 'Edit Manager' : 'Add New Manager'}
        size="1xl"
        handlePrint={undefined}
        footerConfirmation={handleModalSubmit}
        footerConfirmButtonText={editRowData ? 'Update Manager' : 'Create Manager'}
        isLoading={isCreatingManager || isUpdatingManager}
        showFooter={true}
      >
        <AddManagerForm
          ref={formRef}
          onSubmit={editRowData ? handleUpdateManager : handleCreateManager}
          permissions={mockPermissions}
          initialData={editRowData}
          isLoading={isCreatingManager || isUpdatingManager}
        />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={managerToDelete ? `${managerToDelete.firstName} ${managerToDelete.lastName}` : ''}
        isLoading={isDeletingManager}
      />
    </div>
  );
};

export default ManagersDashboard;