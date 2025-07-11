'use client';
import React, { useState, useRef } from 'react';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { useDisclosure } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { useCreateSalespersonMutation, useGetAllSalespersonsQuery, useGetSalespersonByIdQuery, useUpdateSalespersonMutation, useDeleteSalespersonMutation } from 'store/apiEndPoints/salesPersonApi';
import Table from 'components/settings/walletAddress/Table';
import CustomModal from 'components/modal/CustomModal';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import { FaUserTie } from "react-icons/fa";
import AddSalesPersonForm from 'components/salesPerson/AddSalesPersonForm';

const Dashboard = () => {
  const { data: salespersons, error: salespersonsError, isLoading: salespersonsLoading } = useGetAllSalespersonsQuery('');
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

  const mockPermissions = [
    { value: 1, label: 'View Sales Reports' },
    { value: 2, label: 'Create Leads' },
    { value: 3, label: 'Edit Customer Data' },
    { value: 4, label: 'Manage Opportunities' },
    { value: 5, label: 'Access Analytics' },
    { value: 6, label: 'Export Data' },
    { value: 7, label: 'Manage Team' },
    { value: 8, label: 'Admin Access' },
    { value: 9, label: 'Create Leads' },
    { value: 10, label: 'Edit Customer Data' },
    { value: 11, label: 'Manage Opportunities' },
    { value: 12, label: 'Access Analytics' },
    { value: 113, label: 'Export Data' },
    { value: 114, label: 'Manage Team' },
    { value: 15, label: 'Admin Access' },
    { value: 16, label: 'Access Analytics' },
    { value: 17, label: 'Export Data' },
    { value: 18, label: 'Manage Team' },
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
      accessorKey: "manager",
      header: "Manager",
      cell: (info: any) => {
        const manager = mockManagers.find(m => m.value === info.row.original.managerId);
        return <p className="text-sm text-gray-800 dark:text-white">{manager?.label || 'N/A'}</p>;
      },
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: (info: any) => {
        const permissionCount = info.row.original.permissionIds?.length || 0;
        return <p className="text-sm text-gray-800 dark:text-white">{permissionCount} permissions</p>;
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
          permissions={mockPermissions}
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