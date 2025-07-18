'use client';
import React, { useState, useEffect } from 'react';
import ProductSizeTable from 'components/admin/default/ProductSizeTable';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductSizeComponent from 'components/product-size/AddProductSize';
import { useGetAllProductSizesQuery, useCreateProductSizeMutation, useGetProductSizeByIdQuery, useUpdateProductSizeMutation, useDeleteProductSizeMutation } from 'store/apiEndPoints/productSizesApi';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import HeadingCard from 'components/header/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import Button from 'components/button/Button';
import { FaRuler } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import { MdAdd, MdEdit } from 'react-icons/md';

const Dashboard = () => {
  // API hooks
  const { data, error, isLoading, refetch } = useGetAllProductSizesQuery(undefined);
  const [createProductSize, { isLoading: isCreating }] = useCreateProductSizeMutation();
  const [updateProductSize, { isLoading: isUpdating }] = useUpdateProductSizeMutation();
  const [deleteProductSize, { isLoading: isDeleting }] = useDeleteProductSizeMutation();

  // Modal states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form states
  const [selectedProductSize, setSelectedProductSize] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({ size: '' });
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ size: '' });
      setFormErrors({});
      setSelectedProductSize(null);
    }
  }, [isOpen]);

  // Set form data when editing
  useEffect(() => {
    if (selectedProductSize) {
      setFormData({ size: selectedProductSize.size });
    }
  }, [selectedProductSize]);

  // Handle add product
  const handleAddProduct = () => {
    setSelectedProductSize(null);
    setFormData({ size: '' });
    setFormErrors({});
    onOpen();
  };

  // Handle edit product
  const handleEditClick = (productSize) => {
    setSelectedProductSize(productSize);
    onOpen();
  };

  // Handle delete click
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};

    if (!formData.size.trim()) {
      errors.size = "Size is required";
    } else if (formData.size.trim().length < 2) {
      errors.size = "Size must be at least 2 characters long";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form data change
  const handleFormDataChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Add confirmation handler
  const addConfirmation = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const payload = { size: formData.size.trim() };
      await createProductSize(payload).unwrap();
      dispatch(showAlert({
        message: "Product size added successfully!",
        severity: "success",
        duration: 2000
      }));
      onClose();
      refetch(); // Refresh the data
    } catch (error) {
      console.error("Error adding product size:", error);
      dispatch(showAlert({
        message: "Failed to add product size.",
        severity: "error",
        duration: 2000
      }));
    }
  };

  // Edit confirmation handler
  const editConfirmation = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const payload = { size: formData.size.trim() };
      await updateProductSize({
        id: selectedProductSize.id,
        formData: payload
      }).unwrap();
      dispatch(showAlert({
        message: "Product size updated successfully!",
        severity: "success",
        duration: 2000
      }));
      onClose();
      refetch(); // Refresh the data
    } catch (error) {
      console.error("Error updating product size:", error);
      dispatch(showAlert({
        message: "Failed to update product size.",
        severity: "error",
        duration: 2000
      }));
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (deleteId) {
      try {
        await deleteProductSize(deleteId).unwrap();
        dispatch(showAlert({
          message: "Product size deleted successfully!",
          severity: "success",
          duration: 2000
        }));
        setIsDeleteModalOpen(false);
        setDeleteId(null);
        refetch(); // Refresh the data
      } catch (error) {
        console.error("Error deleting product size:", error);
        dispatch(showAlert({
          message: "Failed to delete product size.",
          severity: "error",
          duration: 2000
        }));
      }
    }
  };

  // Handle delete cancel
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  // Handle modal close
  const handleModalClose = () => {
    if (!isCreating && !isUpdating) {
      onClose();
    }
  };

  // Prepare table data
  const tableData = data
    ? data.map((item) => ({
      id: item.id,
      size: item.size,
    }))
    : [];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <CircularProgress />
      </div>
    );
  }

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

        <ProductSizeTable
          tableData={tableData}
          onAddClick={handleAddProduct}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
        />
      </div>

      <CustomModal
        size="md"
        isOpen={isOpen}
        onClose={handleModalClose}
        headerTitle={selectedProductSize ? "Edit Size" : "Add Size"}
        headerDescription={selectedProductSize ? "Edit your existing product size" : "Add new size for products"}
        showFooter={true}
        showFooterCancelButton={handleModalClose}
        footerConfirmation={selectedProductSize ? editConfirmation : addConfirmation}
        footerConfirmButtonText={selectedProductSize ? "Edit Size" : "Add Size"}
        footerConfirmButtonIcon={selectedProductSize ? MdEdit : MdAdd}
        handlePrint={undefined}
        showModalBackButton={undefined}
        handleClickBack={undefined}
      >
        <AddProductSizeComponent
          productSize={selectedProductSize}
          formData={formData}
          formErrors={formErrors}
          onFormDataChange={handleFormDataChange}
          isLoading={isCreating || isUpdating}
        />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName="Product Size"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Dashboard;