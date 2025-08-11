'use client';
import { useState, useEffect } from 'react';
import ProductCard from 'components/card/ProductCard';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductForm from 'components/product/AddProductForm';
import HeadingCard from 'components/header/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import ImageSelector from 'components/ui/ImageSelector';
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
  const { isOpen: isImageSelectorOpen, onOpen: onImageSelectorOpen, onClose: onImageSelectorClose } = useDisclosure();
  const dispatch = useDispatch();

  const { data: products, error, isLoading, refetch } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: productSizes, error: productSizesError, isLoading: productSizesLoading } = useGetAllProductSizesQuery(undefined);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

  const sizeOptions = productSizes ? productSizes.map((option) => ({
    value: option.id,
    label: option.size,
  })) : [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  const resetFormStates = () => {
    setProductName('');
    setDescription('');
    setPrice('');
    setSize('');
    setPreviewImage(null);
    setImageBlob(null);
  };

  const populateFormStates = (product) => {
    setProductName(product.name);
    setDescription(product.description);
    setPrice(product.price ? product.price.toString() : '');
    setSize(product.size ? product.size.id : '');
    const fullImageUrl = getImageUrl(product?.image);
    setPreviewImage(fullImageUrl || null);
    setImageBlob(null);
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

  const handleImageChange = (imageUrl, blob) => {
    setPreviewImage(imageUrl);
    setImageBlob(blob);
    onImageSelectorClose();
  };

  const handleOpenImageSelector = () => {
    onImageSelectorOpen();
  };

  const handleCreateProduct = async () => {
    if (!productName || !description || !price || !size || !imageBlob) {
      dispatch(showAlert({ message: 'Please fill out all fields and upload an image.', severity: 'error', duration: 2000 }));
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', price);
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

  const handleUpdateProduct = async () => {
    if (!productName || !description || !price || !size) {
      dispatch(showAlert({ message: 'Please fill out all fields.', severity: 'error', duration: 2000 }));
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', price);
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

  const formProps = {
    productName,
    setProductName,
    description,
    setDescription,
    price,
    setPrice,
    size,
    setSize,
    previewImage,
    onOpenImageSelector: handleOpenImageSelector,

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
        <HeadingCard icon={<FaBox className="text-brandGreen" />} title="Manage Products" subtitle="Manage Your Products">
          <HeaderButton
            icon={MdAdd}
            text="Add Product"
            size="md"
            color="bg-brandGreen"
            onClick={handleAddProduct}
          />
        </HeadingCard>
      </div>

      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-20">
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

      {/* Product Form Modal */}
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

      {/* Image Selector Modal - This will appear on top */}
      {isImageSelectorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999]">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Product Image
              </h3>
              <button
                onClick={onImageSelectorClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ImageSelector
              label="Product Image"
              value={previewImage}
              onChange={handleImageChange}
              onBlobChange={setImageBlob}
              aspectRatio={1.3}
              placeholder="Upload product image"
              maxWidth={400}
              maxHeight={300}
              quality={0.9}
              required
            />
          </div>
        </div>
      )}

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