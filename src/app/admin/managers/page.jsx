'use client';
import React, { useState, useRef } from 'react';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { useDisclosure } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { useCreateManagerMutation, useGetAllManagersQuery, useUpdateManagerMutation, useDeleteManagerMutation } from 'store/apiEndPoints/managersApi';
import { useGetAllPermissionsQuery } from 'store/apiEndPoints/permissionsApi';
import Table from 'components/settings/walletAddress/Table';
import CustomModal from 'components/modal/CustomModal';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import { FaUserShield } from "react-icons/fa";
import AddManagerForm from 'components/managers/AddManagerForm';

const ManagersDashboard = () => {
  const { data: managers, error: managersError, isLoading: managersLoading } = useGetAllManagersQuery('');
  const { data: permissionsData, error: permissionsError, isLoading: permissionsLoading } = useGetAllPermissionsQuery('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editRowData, setEditRowData] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [managerToDelete, setManagerToDelete] = useState(null);
  const [createManager, { isLoading: isCreatingManager, error: createManagerError }] = useCreateManagerMutation();
  const [updateManager, { isLoading: isUpdatingManager, error: updateManagerError }] = useUpdateManagerMutation();
  const [deleteManager, { isLoading: isDeletingManager, error: deleteManagerError }] = useDeleteManagerMutation();
  const dispatch = useDispatch();
  const formRef = useRef(null);

  // Get permissions from API or use empty array while loading
  const permissions = permissionsData?.flat || [];

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.id}</p>,
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: (info) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.firstName}</p>,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: (info) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.lastName}</p>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.email}</p>,
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: (info) => {
        const permissionCount = info.row.original.permissionIds?.length || 0;
        const permissionModules = info.row.original.permissionIds?.map(id => {
          const permission = permissions.find(p => p.value === id);
          return permission?.module || '';
        }).filter(Boolean);

        const uniqueModules = [...new Set(permissionModules)];
        const moduleNames = uniqueModules.join(', ');

        return (
          <div className="text-sm text-gray-800 dark:text-white">
            <p className="font-medium">{permissionCount} permissions</p>
            {moduleNames && (
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]" title={moduleNames}>
                {moduleNames}
              </p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
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

  // Show loading state while permissions are loading
  if (permissionsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brandGreen"></div>
        <span className="ml-2 text-gray-600">Loading permissions...</span>
      </div>
    );
  }

  // Show error state if permissions failed to load
  if (permissionsError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error loading permissions. Please refresh the page.</p>
      </div>
    );
  }

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
        headerTitle={undefined}
        headerDescription={undefined}
        showFooterCancelButton={undefined}
        footerConfirmButtonIcon={undefined}
        showModalBackButton={undefined}
        handleClickBack={undefined}
      >
        <AddManagerForm
          ref={formRef}
          onSubmit={editRowData ? handleUpdateManager : handleCreateManager}
          permissions={permissions}
          permissionsGrouped={permissionsData?.grouped}
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