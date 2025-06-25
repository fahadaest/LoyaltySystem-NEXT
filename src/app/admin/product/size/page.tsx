'use client';
import React, { useState } from 'react';
import ProductSizeTable from 'components/admin/default/ProductSizeTable';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductSizeComponent from 'components/form/AddProductSize';
import { useGetAllProductSizesQuery, useDeleteProductSizeMutation } from 'store/productSizesApi';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { MdAdd } from "react-icons/md";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteProductSize] = useDeleteProductSizeMutation();
  const { data, error, isLoading } = useGetAllProductSizesQuery(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedProductSize, setSelectedProductSize] = useState(null);

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

  const handleEditClick = (productSize: any) => {
    setSelectedProductSize(productSize);
    onOpen();
  };

  const handleAddProduct = () => {
    onOpen();
  };

  const tableData = data
    ? data.map((item: any) => ({
      id: item.id,
      size: item.size,
    }))
    : [];

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5">
        <HeadingCard subtitle="Size Listing">
          <HeaderButton
            icon={MdAdd}
            text="Add Product"
            size="lg"
            color="bg-brandGreen"
            onClick={handleAddProduct}
            variant={undefined}
          />
        </HeadingCard>
        <ProductSizeTable tableData={tableData} onAddClick={onOpen} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
      </div>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={selectedProductSize ? "Edit Product Size" : "Add Product Size"}
        size="md"
      >
        <AddProductSizeComponent productSize={selectedProductSize} onClose={onClose} />
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