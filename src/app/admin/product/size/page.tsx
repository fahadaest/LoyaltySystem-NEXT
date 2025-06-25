'use client';
import React, { useState } from 'react';
import ProductSizeTable from 'components/admin/default/ProductSizeTable';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductSizeComponent from 'components/form/AddProductSize';
import { useGetAllProductSizesQuery, useDeleteProductSizeMutation } from 'store/productSizesApi';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteProductSize] = useDeleteProductSizeMutation();
  const { data, error, isLoading } = useGetAllProductSizesQuery(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteProductSize(deleteId);
    }
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const tableData = data
    ? data.map((item: any) => ({
      id: item.id,
      size: item.size,
    }))
    : [];

  console.log(tableData)

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5">
        <ProductSizeTable tableData={tableData} onAddClick={onOpen} onDeleteClick={handleDeleteClick} />
      </div>

      <CustomModal isOpen={isOpen} onClose={onClose} title="Add Product" size="md">
        <AddProductSizeComponent />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName="Product Size"
      />
    </div>
  );
};

export default Dashboard;