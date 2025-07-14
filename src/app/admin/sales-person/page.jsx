'use client';
import React, { useState, useRef } from 'react';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { useDisclosure } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { useCreateSalespersonMutation, useGetAllSalespersonsQuery, useUpdateSalespersonMutation, useDeleteSalespersonMutation } from 'store/apiEndPoints/salesPersonApi';
import { useGetAllPermissionsQuery } from 'store/apiEndPoints/permissionsApi';
import Table from 'components/settings/walletAddress/Table';
import CustomModal from 'components/modal/CustomModal';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import { FaUserTie } from "react-icons/fa";
import AddSalesPersonForm from 'components/salesPerson/AddSalesPersonForm';

const Dashboard = () => {
  const { data: salespersons, error: salespersonsError, isLoading: salespersonsLoading } = useGetAllSalespersonsQuery('');
  const { data: permissionsData, error: permissionsError, isLoading: permissionsLoading } = useGetAllPermissionsQuery('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editRowData, setEditRowData] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [salespersonToDelete, setSalespersonToDelete] = useState(null);
  const [createSalesperson, { isLoading: isCreatingSalesperson, error: createSalespersonError }] = useCreateSalespersonMutation();
  const [updateSalesperson, { isLoading: isUpdatingSalesperson, error: updateSalespersonError }] = useUpdateSalespersonMutation();
  const [deleteSalesperson, { isLoading: isDeletingSalesperson, error: deleteSalespersonError }] = useDeleteSalespersonMutation();
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const mockManagers = [
    { value: 1, label: 'John Smith - Senior Manager' },
    { value: 2, label: 'Sarah Johnson - Team Lead' },
    { value: 3, label: 'Mike Davis - Regional Manager' },
    { value: 4, label: 'Lisa Wilson - Sales Director' },
  ];

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
      accessorKey: "manager",
      header: "Manager",
      cell: (info) => {
        const manager = mockManagers.find(m => m.value === info.row.original.managerId);
        return <p className="text-sm text-gray-800 dark:text-white">{manager?.label || 'N/A'}</p>;
      },
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: (info) => {
        const permissionCount = info.row.original.permissionIds?.length || 0;
        const permissionNames = info.row.original.permissionIds?.map(id => {
          const permission = permissions.find(p => p.value === id);
          return permission?.module || '';
        }).filter(Boolean).join(', ');

        return (
          <div className="text-sm text-gray-800 dark:text-white">
            <p className="font-medium">{permissionCount} permissions</p>
            {permissionNames && (
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]" title={permissionNames}>
                {permissionNames}
              </p>
            )}
          </div>
        );
      },
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

  const handleCreateSalesperson = async (newSalespersonData) => {
    if (newSalespersonData) {
      try {
        await createSalesperson(newSalespersonData).unwrap();
        dispatch(showAlert({ message: 'Salesperson Created Successfully!', severity: 'success', duration: 2000 }));
        onClose();
      } catch (error) {
        console.error('Create salesperson error:', error);
        dispatch(showAlert({ message: 'Error creating salesperson. Please try again.', severity: 'error', duration: 2000 }));
      }
    }
  };

  const handleEditClick = (editRowData) => {
    setEditRowData(editRowData);
    onOpen();
  };

  const handleUpdateSalesperson = async (updatedSalespersonData) => {
    if (updatedSalespersonData) {
      try {
        await updateSalesperson({
          id: updatedSalespersonData.id,
          salespersonData: updatedSalespersonData,
        }).unwrap();
        dispatch(showAlert({ message: 'Salesperson Updated Successfully!', severity: 'success', duration: 2000 }));
        onClose();
      } catch (error) {
        console.error('Update salesperson error:', error);
        dispatch(showAlert({ message: 'Error updating salesperson. Please try again.', severity: 'error', duration: 2000 }));
      }
    }
  };

  const handleDelete = async () => {
    if (salespersonToDelete) {
      try {
        await deleteSalesperson(salespersonToDelete.id).unwrap();
        dispatch(showAlert({ message: 'Salesperson Deleted Successfully!', severity: 'success', duration: 2000 }));
        setDeleteModalOpen(false);
      } catch (error) {
        console.error('Delete salesperson error:', error);
        dispatch(showAlert({ message: 'Error deleting salesperson. Please try again.', severity: 'error', duration: 2000 }));
      }
    }
  };

  const openDeleteModal = (salesperson) => {
    setSalespersonToDelete(salesperson);
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
        <HeadingCard icon={<FaUserTie className="text-brandGreen text-3xl" />} subtitle="Manage Sales Team">
          <HeaderButton
            icon={MdAdd}
            text="Add New Salesperson"
            size="md"
            color="bg-brandGreen"
            onClick={handleAddClick}
            variant={undefined}
          />
        </HeadingCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <Table
          data={salespersons || []}
          columns={columns}
          onDelete={openDeleteModal}
          onEdit={handleEditClick}
          isLoading={salespersonsLoading}
        />
      </div>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={editRowData ? 'Edit Sales Person' : 'Add New Sales Person'}
        size="1xl"
        handlePrint={undefined}
        footerConfirmation={handleModalSubmit}
        footerConfirmButtonText={editRowData ? 'Update Salesperson' : 'Create Salesperson'}
        isLoading={isCreatingSalesperson || isUpdatingSalesperson}
        showFooter={true}
      >
        <AddSalesPersonForm
          ref={formRef}
          onSubmit={editRowData ? handleUpdateSalesperson : handleCreateSalesperson}
          managers={mockManagers}
          permissions={permissions}
          permissionsGrouped={permissionsData?.grouped}
          initialData={editRowData}
          isLoading={isCreatingSalesperson || isUpdatingSalesperson}
        />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={salespersonToDelete ? `${salespersonToDelete.firstName} ${salespersonToDelete.lastName}` : ''}
        isLoading={isDeletingSalesperson}
      />
    </div>
  );
};

export default Dashboard;