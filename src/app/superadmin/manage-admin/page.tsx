'use client';

import React, { useState } from 'react';
import CustomModal from 'components/modal/CustomModal';
import HeadingCard from 'components/header/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { IoPeopleOutline } from 'react-icons/io5';
import AdminListTable from 'components/tables/AdminListTable';
import { useListAdminsQuery, useDeleteAdminMutation } from 'store/apiEndPoints/adminApi';
import AdminForm from 'components/form/AdminForm';
import { MdAdd } from 'react-icons/md';
import { useDisclosure } from '@chakra-ui/react';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import { useDispatch } from 'react-redux';
import AdminDetail from 'components/superadmin/AdminDetail';

const AdminListPage = () => {
  const { data: admin, error, isLoading } = useListAdminsQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setSelectedAdmin(null);
    setIsDeleteMode(false);
    setIsViewMode(false);
    onClose();
  };

  return (
    <div className="mt-5 grid grid-cols-1 gap-5">

      <div className="mt-3">
        <HeadingCard subtitle="Admin List" icon={<IoPeopleOutline className="text-3xl text-brandGreen dark:text-white" />}>
          <HeaderButton
            icon={MdAdd}
            text="Add Admin"
            size="lg"
            color="bg-brandGreen"
            onClick={onOpen}
            variant={undefined}
          />
        </HeadingCard>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <AdminListTable
          data={admin || []}
          onEdit={(row) => {
            setSelectedAdmin(row);
            setIsDeleteMode(false);
            setIsViewMode(false);
            onOpen();
          }}
          onDelete={(row) => {
            setSelectedAdmin(row);
            setIsDeleteMode(true);
            setIsViewMode(false);
            onOpen();
          }}
          onView={(row) => {
            setSelectedAdmin(row);
            setIsViewMode(true);
            onOpen();
          }}
        />
      </div>

      <CustomModal
        isOpen={isOpen && !isDeleteMode && !isViewMode}
        onClose={handleCloseModal}
        title={selectedAdmin ? "Edit Admin" : "Add Admin"}
        size="xl"
        handlePrint={undefined} showModalBackButton={undefined} handleClickBack={undefined} headerTitle={undefined} headerDescription={undefined} showFooter={undefined} showFooterCancelButton={undefined} footerConfirmation={undefined} footerConfirmButtonIcon={undefined}     >
        <AdminForm
          initialData={selectedAdmin}
          isEditMode={!!selectedAdmin}
          handleCloseModal={handleCloseModal}
        />
      </CustomModal>

      <CustomModal
        isOpen={isOpen && isViewMode}
        onClose={handleCloseModal}
        title={`Admin Details: ${selectedAdmin?.firstName} ${selectedAdmin?.lastName}`}
        size="xl"
        handlePrint={undefined} showModalBackButton={undefined} handleClickBack={undefined} headerTitle={undefined} headerDescription={undefined} showFooter={undefined} showFooterCancelButton={undefined} footerConfirmation={undefined} footerConfirmButtonIcon={undefined}      >
        <AdminDetail
          admin={selectedAdmin}
        />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={isOpen && isDeleteMode}
        onClose={handleCloseModal}
        onConfirm={async () => {
          try {
            if (selectedAdmin?.id) {
              await deleteAdmin(selectedAdmin.id).unwrap();
              dispatch(showAlert({ message: 'Admin deleted successfully!', severity: 'success', duration: 2000 }));
              handleCloseModal();
            }
          } catch (err) {
            console.error("Failed to delete admin:", err);
            dispatch(showAlert({ message: 'Failed to delete admin!', severity: 'error', duration: 2000 }));
          }
        }}
        itemName={`${selectedAdmin?.firstName || ''} ${selectedAdmin?.lastName || ''}`}
        title="Delete Admin"
      />
    </div>
  );
};

export default AdminListPage;