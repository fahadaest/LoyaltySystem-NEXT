'use client';
import React, { useState, useEffect } from 'react';
import ProductSizeTable from 'components/admin/default/ProductSizeTable';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductSizeComponent from 'components/form/AddProductSize';
import { useGetAllProductSizesQuery, useDeleteProductSizeMutation } from 'store/productSizesApi';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { MdAdd } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/alertSlice';
import Button from 'components/button/Button';
import { FaRuler } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteProductSize] = useDeleteProductSizeMutation();
  const { data, error, isLoading, refetch } = useGetAllProductSizesQuery(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedProductSize, setSelectedProductSize] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      try {
        await deleteProductSize(deleteId).unwrap();
        dispatch(showAlert({ message: "Product size deleted successfully!", severity: "success", duration: 2000 }));
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting product size:", error);
        dispatch(showAlert({ message: "Failed to delete product size.", severity: "error", duration: 2000 }));
      }
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditClick = (productSize: any) => {
    setSelectedProductSize(productSize);
    onOpen();
  };

  const handleAddProduct = () => {
    setSelectedProductSize(null);
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
        <HeadingCard icon={<FaRuler className="text-brandGreen" />} subtitle="Size Listing">
          <HeaderButton
            icon={MdAdd}
            text="Add Product"
            size="lg"
            color="bg-brandGreen"
            onClick={handleAddProduct}
            variant={undefined}
          />
        </HeadingCard>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <CircularProgress style={{ color: "#36a18f" }} />
          </div>
        ) : tableData.length > 0 ? (
          <ProductSizeTable
            tableData={tableData}
            onAddClick={onOpen}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
          />
        ) : (
          <div className="col-span-full text-center flex flex-col items-center justify-center">
            <div className="text-lg font-semibold text-gray-700 mb-4">
              No product sizes available yet
            </div>
            <p className="text-sm text-gray-500 mb-4">
              It looks like you haven't added any product sizes. Click the button below to add your first product size.
            </p>
            <Button
              icon={MdAdd}
              text="Add Your First Product Size"
              size="md"
              color="bg-brandGreen"
              onClick={handleAddProduct}
              className="mt-4"
            />
          </div>
        )}
      </div>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={selectedProductSize ? "Edit Product Size" : "Add Product Size"}
        size="md"
        handlePrint={undefined}      >
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