'use client';
import { useState, useEffect } from 'react';
import ProductCard from 'components/card/ProductCard';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductForm from 'components/product/AddProductForm';
import HeadingCard from 'components/header/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { MdAdd, MdEdit } from 'react-icons/md';
import { FaBox } from "react-icons/fa";
import { useGetAllProductsQuery, useDeleteProductMutation, useCreateProductMutation, useUpdateProductMutation } from 'store/apiEndPoints/productsApi';
import { useGetAllProductSizesQuery } from 'store/apiEndPoints/productSizesApi';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { getImageUrl } from 'utils/imageUtils';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  // Product queries and mutations
  const { data: products, error, isLoading, refetch } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: productSizes, error: productSizesError, isLoading: productSizesLoading } = useGetAllProductSizesQuery(undefined);

  // Modal and selection states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // Form states (moved from AddProductForm)
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

  // Derived data
  const sizeOptions = productSizes ? productSizes.map((option) => ({
    value: option.id,
    label: option.size,
  })) : [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Reset form states
  const resetFormStates = () => {
    setProductName('');
    setDescription('');
    setSize('');
    setPreviewImage(null);
    setImageBlob(null);
  };

  // Populate form states when editing
  const populateFormStates = (product) => {
    setProductName(product.name);
    setDescription(product.description);
    setSize(product.size ? product.size.id : '');
    const fullImageUrl = getImageUrl(product?.image);
    setPreviewImage(fullImageUrl || null);
    setImageBlob(null); // Reset image blob for editing
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    populateFormStates(product);
    onOpen();
  };

  const handleDelete = (id) => {
    setDeleteItemId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteItemId !== null) {
      try {
        await deleteProduct(deleteItemId).unwrap();
        dispatch(showAlert({ message: "Product deleted successfully!", severity: "success", duration: 2000 }));
        setDeleteItemId(null);
        onClose();
      } catch (error) {
        dispatch(showAlert({ message: "Product deletion failed!", severity: "error", duration: 2000 }));
      }
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    resetFormStates();
    onOpen();
  };

  const handleCloseModal = () => {
    resetFormStates();
    setSelectedProduct(null);
    onClose();
  };

  // Create product handler
  const handleCreateProduct = async () => {
    if (!productName || !description || !size || !imageBlob) {
      dispatch(showAlert({ message: 'Please fill out all fields and upload an image.', severity: 'error', duration: 2000 }));
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('sizeId', size);
    formData.append('image', imageBlob, 'product.jpg');

    try {
      await createProduct(formData).unwrap();
      dispatch(showAlert({ message: 'Product created successfully!', severity: 'success', duration: 2000 }));
      resetFormStates();
      handleCloseModal();
    } catch (err) {
      dispatch(showAlert({ message: 'Product creation failed!', severity: 'error', duration: 2000 }));
    }
  };

  // Update product handler
  const handleUpdateProduct = async () => {
    if (!productName || !description || !size) {
      dispatch(showAlert({ message: 'Please fill out all fields.', severity: 'error', duration: 2000 }));
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('sizeId', size);

    if (imageBlob) {
      formData.append('image', imageBlob, 'product.jpg');
    } else {
      if (selectedProduct && selectedProduct.image) {
        formData.append('image', selectedProduct.image);
      }
    }

    if (selectedProduct && selectedProduct.id) {
      try {
        await updateProduct({
          id: selectedProduct.id,
          formData,
        }).unwrap();
        dispatch(showAlert({ message: 'Product updated successfully!', severity: 'success', duration: 2000 }));
        handleCloseModal();
      } catch (err) {
        dispatch(showAlert({ message: 'Product update failed!', severity: 'error', duration: 2000 }));
      }
    } else {
      dispatch(showAlert({ message: 'Product not found for update.', severity: 'error', duration: 2000 }));
    }
  };

  // Form props to pass to AddProductForm
  const formProps = {
    // Form states
    productName,
    setProductName,
    description,
    setDescription,
    size,
    setSize,
    previewImage,
    setPreviewImage,
    imageBlob,
    setImageBlob,

    // Data
    sizeOptions,
    selectedProduct,

    // Loading states
    isLoading: selectedProduct ? isUpdating : isCreating,

    // Handlers
    onSubmit: selectedProduct ? handleUpdateProduct : handleCreateProduct,
    onClose: handleCloseModal,
  };

  return (
    <div className="relative">
      <div className="mt-3 mb-5">
        <HeadingCard icon={<FaBox className="text-brandGreen" />} subtitle="Manage Products">
          <HeaderButton
            icon={MdAdd}
            text="Add Product"
            size="lg"
            color="bg-brandGreen"
            onClick={handleAddProduct}
          />
        </HeadingCard>
      </div>

      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 z-20">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-screen">
              <CircularProgress style={{ color: "#36a18f" }} />
            </div>
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                price={product.price}
                image={product.image}
                size={product.size ? product.size.size : null}
                product={product}
                onEdit={() => handleEdit(product)}
                onDelete={() => handleDelete(product.id)}
                extra="any-additional-classes"
              />
            ))
          ) : (
            <div className="col-span-full text-center flex flex-col items-center justify-center">
              <div className="text-lg font-semibold text-gray-700 mb-4">
                No products available yet
              </div>
              <p className="text-sm text-gray-500 mb-4">
                It looks like you haven't added any products. Click the button below to add your first product.
              </p>
              <HeaderButton
                icon={MdAdd}
                text="Add Your First Product"
                size="md"
                color="bg-brandGreen"
                onClick={handleAddProduct}
                className="mt-4"
              />
            </div>
          )}
        </div>
      </div>

      <CustomModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        headerTitle={selectedProduct ? "Edit Product" : "Add Product"}
        headerDescription={selectedProduct ? "Edit your existing product" : "Add your new product"}
        size="xl"
        showFooter={true}
        showFooterCancelButton={onClose}
        footerConfirmation={selectedProduct ? handleUpdateProduct : handleCreateProduct}
        footerConfirmButtonText={selectedProduct ? "Edit Product" : "Add Product"}
        footerConfirmButtonIcon={selectedProduct ? MdEdit : MdAdd}
      >
        <AddProductForm {...formProps} />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={deleteItemId !== null}
        onClose={() => setDeleteItemId(null)}
        onConfirm={handleConfirmDelete}
        itemName={deleteItemId ? `Product ${deleteItemId}` : ""}
        title="Delete Product"
      />
    </div>
  );
};

export default Dashboard;