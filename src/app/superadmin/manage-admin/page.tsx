'use client';

import React, { useState, useEffect } from 'react';
import CustomModal from 'components/modal/CustomModal';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { IoPeopleOutline } from 'react-icons/io5';
import AdminListTable from 'components/tables/AdminListTable';
import { useListAdminsQuery, useDeleteAdminMutation } from 'store/adminApi';
import AdminForm from 'components/form/AdminForm';
import { MdAdd } from 'react-icons/md';
import { useDisclosure } from '@chakra-ui/react';
import { DeleteAdminContent } from 'components/superadmin/manageAdmin/DeleteAdminContent';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';

const AdminListPage = () => {
  const { data: admin, error, isLoading } = useListAdminsQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const handleCloseModal = () => {
    setSelectedAdmin(null);
    setIsDeleteMode(false);
    onClose();
  };

  return (
    <div className="mt-5 grid grid-cols-1 gap-5">

      <div className="mt-3">
        <HeadingCard subtitle="Admin List" icon={<IoPeopleOutline className="text-3xl text-brandGreen dark:text-white" />}>
          <HeaderButton
            icon={MdAdd}
            text="Add Admin"
            size="md"
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
            onOpen();
          }}
          onDelete={(row) => {
            setSelectedAdmin(row);
            setIsDeleteMode(true);
            onOpen();
          }}
          onView={(row) => console.log("View", row)}
        />
      </div>

      <CustomModal
        isOpen={isOpen && !isDeleteMode}
        onClose={handleCloseModal}
        title={selectedAdmin ? "Edit Admin" : "Add Admin"}
        size="xl"
      >
        <AdminForm
          initialData={selectedAdmin}
          isEditMode={!!selectedAdmin}
        />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={isOpen && isDeleteMode}
        onClose={handleCloseModal}
        onConfirm={async () => {
          try {
            if (selectedAdmin?.id) {
              await deleteAdmin(selectedAdmin.id).unwrap();
              handleCloseModal();
            }
          } catch (err) {
            console.error("Failed to delete admin:", err);
          }
        }}
        itemName={`${selectedAdmin?.firstName || ''} ${selectedAdmin?.lastName || ''}`}
        title="Delete Admin"
      />
    </div>
  );
};

export default AdminListPage;